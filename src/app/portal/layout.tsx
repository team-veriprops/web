'use client'

import { ReactNode } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@3rdparty/ui/button";
import { 
  LayoutDashboard, 
  FolderOpen, 
  User, 
  LogOut,
  Menu
} from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@3rdparty/ui/sheet";
import Link from "next/link";

interface PortalLayoutProps {
  children: ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
//   const { user } = useAuth();
//   const location = useLocation();
//   const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    // const { error } = await supabase.auth.signOut();
    // if (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to sign out",
    //     variant: "destructive",
    //   });
    // }
  };

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/portal/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/portal/projects",
      icon: FolderOpen,
    },
    {
      title: "Profile",
      href: "/portal/profile",
      icon: User,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavigationContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Portal
        </h2>
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-muted/10">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="font-bold text-lg">
            Appodus
          </Link>
        </div>
        <NavigationContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex h-16 items-center justify-between border-b px-4 bg-background">
          <Link href="/" className="font-bold text-lg">
            Appodus
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <NavigationContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
