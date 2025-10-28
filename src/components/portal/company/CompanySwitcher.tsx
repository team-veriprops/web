"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@3rdparty/ui/dropdown-menu";
import { Button } from "@3rdparty/ui/button";
import { Building2, ChevronDown, Plus, User2 } from "lucide-react";
import { useCompanyStore } from "./libs/useCompanyStore";
import { useCompanyQueries } from "./libs/useCompanyQueries";
import { useEffect, useMemo } from "react";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { QueryCompanyDto } from "./models";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/3rdparty/ui/avatar";

interface ProjectSwitcherProps {
  compact?: boolean; // compact = mobile version
}

export default function CompanySwitcher({
  compact = false,
}: ProjectSwitcherProps) {
  const company_page_size = 100;

  const { updateFilters } = useCompanyStore();
  const { currentCompany, setCurrentCompany } = useCompanyStore();

  const { useSearchCompanyPage } = useCompanyQueries();
  const { data: dataPage, isLoading, isError } = useSearchCompanyPage();

  useEffect(() => {
    updateFilters({ page_size: company_page_size });
  }, [company_page_size, updateFilters]);

  interface Company {
    id?: string;
    name: string;
    avatar?: string;
    isPersonal: boolean;
  }

  const allCompanies: Company[] = useMemo<Company[]>(() => [], []); 
  const personal = {
    name: "Personal",
    isPersonal: true,
  };

  allCompanies.push(personal);

  const activeCompany = currentCompany as Company;

  useEffect(() => {
    if (!activeCompany) {
      setCurrentCompany(allCompanies[0] as QueryCompanyDto);
    }
  }, [activeCompany, setCurrentCompany, allCompanies]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={compact ? "ghost" : "outline"}
          className={`flex items-center justify-between ${
            compact ? "px-2 space-x-2" : "w-full"
          }`}
        >
          {activeCompany?.isPersonal && (
            <User2 className={`h-4 w-4 text-muted-foreground`} />
          )}

          {!activeCompany?.isPersonal && (
            <Avatar className="h-4 w-4">
              <AvatarImage src={activeCompany?.avatar} alt={"Logo"} />
              <AvatarFallback>
                <Building2 className={`h-4 w-4 text-muted-foreground`} />
              </AvatarFallback>
            </Avatar>
          )}

          <div>
            <p className={`text-sm text-muted-foreground`}>
              {activeCompany?.name}
            </p>
          </div>

          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <div className="max-h-[200px] overflow-y-auto">
          <AsyncStateComponent
            isLoading={isLoading}
            isError={isError}
            data={dataPage}
            loadingText="Loading companies..."
            errorText="Failed to load companies, please try again later."
            emptyText="No companies found."
          >
            {(data) => {
              allCompanies.splice(0, allCompanies.length);
              allCompanies.push(personal);

              data.items.forEach((company) =>
                allCompanies.push({
                  id: company.id!,
                  name: company.name,
                  avatar: company.avatar,
                  isPersonal: false,
                })
              );

              return (
                <>
                  {allCompanies.map((company, key) => {
                    const text_color =
                      activeCompany && activeCompany.id === company.id
                        ? "text-foreground"
                        : "text-muted-foreground";

                    return (
                      <DropdownMenuItem
                        key={key}
                        onClick={() =>
                          setCurrentCompany(company as QueryCompanyDto)
                        }
                        className="cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          {company.isPersonal && (
                            <User2 className={`h-4 w-4 ${text_color}`} />
                          )}

                          {!company.isPersonal && (
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={company.avatar} alt={"Logo"} />
                              <AvatarFallback>
                                <Building2
                                  className={`h-4 w-4 ${text_color}`}
                                />
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div>
                            <p className={`text-sm ${text_color}`}>
                              {company.name}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </>
              );
            }}
          </AsyncStateComponent>
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
