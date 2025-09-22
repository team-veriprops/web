"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@3rdparty/ui/dropdown-menu";
import { Button } from "@3rdparty/ui/button";
import { Building2, ChevronDown, Plus, User2 } from "lucide-react";
import { Company } from "../company/models";
import { useUI } from "@stores/useStore";

interface ProjectSwitcherProps {
  compact?: boolean; // compact = mobile version
}

export default function CompanySwitcher({
  compact = false,
}: ProjectSwitcherProps) {
  const { activeCompany, setActiveCompany } = useUI();

  const companies: Company[] = [
    { id: "1", name: "Adrone Home" },
    { id: "2", name: "Land Lagos" },
    { id: "3", name: "Land Wey" },
    { id: "4", name: "Land Doctor" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={compact ? "ghost" : "outline"}
          className={`flex items-center justify-between ${
            compact ? "px-2 space-x-2" : "w-full"
          }`}
        >
          {activeCompany ? (
            <>
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div className="text-left">
                {/* <p className="font-medium text-sm">{currentProject.company}</p> */}
                <p className="text-xs text-muted-foreground">
                  {activeCompany.name}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-left">
                <p className="font-medium text-sm">{"Personal"}</p>
              </div>
            </>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <div className="max-h-[200px] overflow-y-auto">
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <User2 className={`h-4 w-4 text-muted-foreground`} />
              <div>
                <p className={`text-sm text-muted-foreground`}>{"Personal"}</p>
              </div>
            </div>
          </DropdownMenuItem>
          {companies.map((company) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => setActiveCompany(company)}
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Building2
                  className={`h-4 w-4 ${activeCompany && activeCompany.id === company.id ? "text-foreground" : "text-muted-foreground"}`}
                />
                <div>
                  <p
                    className={`text-sm ${activeCompany && activeCompany.id === company.id ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {company.name}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuItem onClick={() => ""}>
          <div className="flex items-center space-x-2">
            <Plus className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Add New Company</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
