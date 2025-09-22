import SettingsTabs from "@components/portal/settings/SettingsTabs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings | Veriprops",
  description: "Manage your profile, security, notifications, and contract details",
};

interface SettingsPageProps {
  params: {
    active_tab: string;
  };
}

export default function SettingsPage({ params }: SettingsPageProps }) {
  const { active_tab } = params;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <SettingsTabs active_tab={active_tab!} />
    </div>
  );
}
