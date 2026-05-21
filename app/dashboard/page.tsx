import { AppShell } from "@/components/layout/AppShell";
import { PromptDashboard } from "@/components/prompt/PromptDashboard";

export default function DashboardPage() {
  return (
    <AppShell>
      <PromptDashboard />
    </AppShell>
  );
}
