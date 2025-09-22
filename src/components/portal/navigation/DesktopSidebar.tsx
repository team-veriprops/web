"use client";

import Link from "next/link";
import { Separator } from "@3rdparty/ui/separator";
import { LogOut, HelpCircle, Settings as SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { mainNavItems } from "./NavItems";
import CompanySwitcher from "./CompanySwitcher";
import { onLogoutRedirect } from "@lib/utils";
import BrandLogo from "@components/ui/BrandLogo";

export default function DesktopSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 h-dvh border-r border-border bg-background fixed overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <CompanySwitcher />
        </div>

        <Separator className="mb-6" />

        <nav className="space-y-1 mb-8">
          {mainNavItems.map((item) => {
            const Icon = item.icon as any;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <Separator className="mb-6" />

        <nav className="space-y-1">
          <Link
            href="/portal/help"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </Link>
          <Link
            href="/portal/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={onLogoutRedirect}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="fixed bottom-4 left-10">
        <BrandLogo />
      </div>

      {/* <div className="flex items-center space-x-3 mb-4 bg-background fixed bottom-4 left-10">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold">V</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">veriprops</h3>
          <p className=" text-sm -mt-1.5 text-muted-foreground">verified properties</p>
        </div>
      </div> */}
    </aside>
  );
}
