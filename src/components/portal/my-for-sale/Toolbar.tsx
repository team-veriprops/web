"use client";

import { Input } from "@3rdparty/ui/input";
import { Button } from "@3rdparty/ui/button";
import { Grid2x2Plus, HandPlatter, HousePlus, Plus, Search } from "lucide-react";
import { useMyForSaleStore } from "@stores/useMyForSaleStore";

interface ToolbarProps {
  category: 'lands' | 'houses' | 'services';
  onAddNew: () => void;
}
export function Toolbar({ category, onAddNew }: ToolbarProps) {
  const { searchQuery, setSearchQuery } = useMyForSaleStore();

  const getPlaceholder = () => {
    const categoryMap = {
      lands: 'Search lands...',
      houses: 'Search houses...',
      services: 'Search services...',
    };
    return categoryMap[category];
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={getPlaceholder()}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add New Button */}
      <Button onClick={onAddNew} className="flex items-center gap-2 capitalize">
        {category === "lands" && (<Grid2x2Plus  className="h-4 w-4" />)}
        {category === "houses" && (<HousePlus  className="h-4 w-4" />)}
        {category === "services" && (<HandPlatter  className="h-4 w-4" />)}
        Add New {category.slice(0, -1)}
      </Button>
    </div>
  );
};