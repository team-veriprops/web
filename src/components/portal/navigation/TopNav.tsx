"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  User,
  HelpCircle,
  Settings,
  LogOut,
  GitCompareArrows,
  Heart,
} from "lucide-react";
import { Button } from "@3rdparty/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@3rdparty/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@3rdparty/ui/sheet";
import { onLogoutRedirect } from "@lib/utils";
import { redirect } from "next/navigation";
import { Badge } from "@components/3rdparty/ui/badge";
import { Separator } from "@components/3rdparty/ui/separator";
import { motion } from "framer-motion";
import { useUI, useWishlist, useCompare } from "@stores/useStore";

export default function TopNav() {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setCompareModalOpen } = useUI();
  const wishlistItems = useWishlist((state) => state.items);
  const compareItems = useCompare((state) => state.items);

  const notifications = [
    { id: 1, title: "Design phase completed", time: "2h ago", type: "success" },
    { id: 2, title: "Invoice #1001 is due", time: "1d ago", type: "warning" },
    { id: 3, title: "New message from team", time: "3h ago", type: "info" },
  ];

  const handleCompareClick = () => {
    if (compareItems.length > 0) {
      setCompareModalOpen(true);
    }
  };

  // TODO: Replace with real auth logic (or put in middleware)
  const user = { email: "kingsley.ezenwere@gmail.com", name: "Kingsley" };

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      {/* Search Button */}
      {/* <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(true)}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button> */}
      {/* Compare */}
      <motion.button
        onClick={handleCompareClick}
        className="relative hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <GitCompareArrows size={20} />
        {compareItems.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="bg-accent text-accent-foreground text-xs min-w-[1.25rem] h-5 p-0 flex items-center justify-center">
              {compareItems.length}
            </Badge>
          </motion.div>
        )}
      </motion.button>

      {/* Wishlist */}
      <motion.button
        className="relative hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart size={20} />
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="bg-heart text-heart-foreground text-xs min-w-[1.25rem] h-5 p-0 flex items-center justify-center">
              {wishlistItems.length}
            </Badge>
          </motion.div>
        )}
      </motion.button>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {notifications.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-4">
            <h4 className="font-medium mb-2">Notifications</h4>
            <Separator className="mb-6" />

            <div className="space-y-2">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-2 hover:bg-accent rounded-lg"
                  >
                    <p className="text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Profile">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => ""}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => redirect("/portal/settings/profile")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogoutRedirect}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Sheet (Mobile-friendly overlay) */}
      {/* <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="sm:max-w-lg mx-auto">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search projects, tasks, messages..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
        </SheetContent>
      </Sheet> */}
    </div>
  );
}
