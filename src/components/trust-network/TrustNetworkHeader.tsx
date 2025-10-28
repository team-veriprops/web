"use client";

import { Button } from "@components/3rdparty/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/3rdparty/ui/dropdown-menu";
import NotificationComponent from "@components/ui/NotificationComponent";
import { onLogoutRedirect } from "@lib/utils";
import { LogOut, Shield, User } from "lucide-react";
import Link from "next/link";

export default function TrustNetworkHeader() {
  const notifications = [
    {
      id: "1",
      title: "Design phase completed",
      time: "2h ago",
      type: "success",
    },
    { id: "2", title: "Invoice #1001 is due", time: "1d ago", type: "warning" },
    { id: "3", title: "New message from team", time: "3h ago", type: "info" },
  ];

  const isAuthenticated = true;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/trust-network"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {"Veriprops Trust Network"}
            </span>
            <span className="text-xs text-muted-foreground">
              Building Trust Together
            </span>
          </div>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" asChild>
                <Link href="/trust-network/verifier">Verifier</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/trust-network/referrer">Referrer</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/trust-network/activities">Activities</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/trust-network/disputes">Disputes</Link>
              </Button>
            </nav>

            <NotificationComponent notifications={notifications} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{"Kingsley Ezenwere"}</p>
                  <p className="text-xs text-muted-foreground">
                    {"kingsley.ezenwere@gmail.com"}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogoutRedirect}
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
