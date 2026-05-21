"use client";

import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

const vertexShaderSource = `
precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;
uniform vec3 u_base_color;
uniform vec3 u_accent_color;
uniform float u_speed;
uniform float u_intensity;
uniform float u_wave_scale;
uniform float u_interactive;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float p) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = u_wave_scale;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer) + 2.4 * p;
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= 1.2;
  }

  return res.x + res.y;
}

void main() {
  vec2 uv = .5 * vUv;
  uv.x *= u_ratio;

  vec2 pointer = vUv - u_pointer_position;
  pointer.x *= u_ratio;
  float p = clamp(length(pointer), 0., 1.);
  p = .5 * pow(1. - p, 2.);
  p *= u_interactive;

  float t = .001 * u_time * u_speed;
  float noise = neuro_shape(uv, t, p);
  noise = 1.2 * pow(noise, 3.);
  noise += pow(noise, 10.);
  noise = max(.0, noise - .5);
  noise *= 1. - length(vUv - .5);
  noise *= u_intensity;

  vec3 color = u_base_color;
  color += u_accent_color * sin(3.0 * u_scroll_progress + 1.5);
  color = color * noise;

  gl_FragColor = vec4(color, noise);
}
`;

function parseColorToVec3(color: string): Rgb {
  const hex = color.replace("#", "");
  const normalized = hex.length === 3 ? hex.split("").map((char) => char + char).join("") : hex;

  return [
    Number.parseInt(normalized.slice(0, 2), 16) / 255 || 0,
    Number.parseInt(normalized.slice(2, 4), 16) / 255 || 0,
    Number.parseInt(normalized.slice(4, 6), 16) / 255 || 0
  ];
}

function createShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Lighting background shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Lighting background program error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
  return {
    u_time: gl.getUniformLocation(program, "u_time"),
    u_ratio: gl.getUniformLocation(program, "u_ratio"),
    u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
    u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
    u_base_color: gl.getUniformLocation(program, "u_base_color"),
    u_accent_color: gl.getUniformLocation(program, "u_accent_color"),
    u_speed: gl.getUniformLocation(program, "u_speed"),
    u_intensity: gl.getUniformLocation(program, "u_intensity"),
    u_wave_scale: gl.getUniformLocation(program, "u_wave_scale"),
    u_interactive: gl.getUniformLocation(program, "u_interactive")
  };
}

export function LightingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0.48, targetY: 0.52 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });

    if (!gl) {
      return;
    }

    const activeCanvas = canvas;
    const activeGl = gl;
    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
      return;
    }

    const uniforms = getUniforms(gl, program);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    const position = gl.getAttribLocation(program, "a_position");
    const baseColor = parseColorToVec3("1f8fff");
    const accentColor = parseColorToVec3("36d6b8");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    activeGl.bindBuffer(activeGl.ARRAY_BUFFER, buffer);
    activeGl.bufferData(activeGl.ARRAY_BUFFER, vertices, activeGl.STATIC_DRAW);
    activeGl.useProgram(program);
    activeGl.enableVertexAttribArray(position);
    activeGl.vertexAttribPointer(position, 2, activeGl.FLOAT, false, 0, 0);
    activeGl.enable(activeGl.BLEND);
    activeGl.blendFunc(activeGl.SRC_ALPHA, activeGl.ONE_MINUS_SRC_ALPHA);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));

      activeCanvas.width = width;
      activeCanvas.height = height;
      activeGl.viewport(0, 0, width, height);
      activeGl.uniform1f(uniforms.u_ratio, width / height);
    }

    function render() {
      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;

      activeGl.clearColor(0, 0, 0, 0);
      activeGl.clear(activeGl.COLOR_BUFFER_BIT);
      activeGl.uniform1f(uniforms.u_time, reduceMotion.matches ? 2500 : performance.now());
      activeGl.uniform2f(uniforms.u_pointer_position, pointer.x, pointer.y);
      activeGl.uniform1f(uniforms.u_scroll_progress, window.scrollY / Math.max(window.innerHeight * 2, 1));
      activeGl.uniform3f(uniforms.u_base_color, baseColor[0], baseColor[1], baseColor[2]);
      activeGl.uniform3f(uniforms.u_accent_color, accentColor[0], accentColor[1], accentColor[2]);
      activeGl.uniform1f(uniforms.u_speed, 0.86);
      activeGl.uniform1f(uniforms.u_intensity, 1.42);
      activeGl.uniform1f(uniforms.u_wave_scale, 7.2);
      activeGl.uniform1f(uniforms.u_interactive, 1);
      activeGl.drawArrays(activeGl.TRIANGLE_STRIP, 0, 4);

      if (!reduceMotion.matches) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      pointerRef.current.targetX = event.clientX / Math.max(window.innerWidth, 1);
      pointerRef.current.targetY = 1 - event.clientY / Math.max(window.innerHeight, 1);
    }

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#edf4fb]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.44),transparent_34rem),linear-gradient(180deg,rgba(246,248,251,0.24),rgba(238,243,248,0.66))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(31,143,255,0.18),transparent_30rem),radial-gradient(circle_at_84%_62%,rgba(54,214,184,0.2),transparent_28rem)]" />
    </div>
  );
}
