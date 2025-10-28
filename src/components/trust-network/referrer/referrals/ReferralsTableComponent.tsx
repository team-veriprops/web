"use client";

import { Copy, Eye } from "lucide-react";
import { Badge } from "@3rdparty/ui/badge";
import { copyToClipboard, formatMoney } from "@lib/utils";
import { useGlobalSettings } from "@stores/useGlobalSettings";
import { useEffect, useState } from "react";
import { Action, Column, DataTable } from "@components/ui/DataTable";
import { useReferralUserQueries } from "./libs/useReferralUserQueries";
import { useReferralUserStore } from "./libs/useReferralUserStore";
import { QueryReferralUserDto } from "./models";
import { Avatar, AvatarFallback, AvatarImage } from "@components/3rdparty/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/3rdparty/ui/tooltip";
import { Button } from "@components/3rdparty/ui/button";
import { Progress } from "@components/3rdparty/ui/progress";
import { toast } from "@components/3rdparty/ui/use-toast";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import ReferralNetworkDetailsSheet from "./ReferralNetworkDetailsSheet";
import { formatDate } from "@lib/time";

export default function ReferralsTableComponent() {
  const { activeAuditor } = useAuthStore();
  const [showFullEmail, setShowFullEmail] = useState<string | undefined>(undefined);
  const { settings } = useGlobalSettings();
  const {
    filters,
    updateFilters,
    setCurrentReferral,
    setViewCurrentReferralNetwork,
  } = useReferralUserStore();

  const { useSearchReferralUserPage } = useReferralUserQueries();
  const { data, isLoading, isError, error } = useSearchReferralUserPage(
    activeAuditor?.id!
  );

  useEffect(() => {
    updateFilters({ page_size: settings.rowsPerPage });
  }, [settings.rowsPerPage, updateFilters]);

  const onViewNetwork = (referral: QueryReferralUserDto) => {
    setCurrentReferral(referral);
    setViewCurrentReferralNetwork(true);
  };

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return `${name.slice(0, Math.min(4, name.length))}****@${domain}`;
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await copyToClipboard(email);
      toast({
        title: "Email copied",
        description: "Email address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy email",
        variant: "destructive",
      });
    }
  };

  const columns: Column<QueryReferralUserDto>[] = [
    {
      key: "fullname",
      label: "Name",
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={item.avatar} alt={item.fullname} />
            <AvatarFallback>
              {item.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.fullname}</p>
            {item.is_active && (
              <Badge variant="default" className="text-xs mt-1">
                Active
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (value, item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="text-sm hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                onMouseEnter={() => setShowFullEmail(item.email)}
                onMouseLeave={() => setShowFullEmail(undefined)}
                onFocus={() => setShowFullEmail(item.email)}
                onBlur={() => setShowFullEmail(undefined)}
                aria-label={`Email: ${item.email}`}
              >
                {showFullEmail === item.email ? item.email : maskEmail(item.email)}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="flex items-center gap-2">
                <span>{item.email}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                  onClick={handleCopyEmail.bind(null, item.email)}
                  aria-label="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click to copy email (visible only to you)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "date_created",
      label: "Date Joined",
      sortable: true,
      render: (value, item) => formatDate(item.date_created!),
    },
    {
      key: "direct_referral_count",
      label: "Their Referrals",
      sortable: true,
      render: (value, item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => onViewNetwork(item)}
                aria-label={`View ${item.fullname}'s network of ${item.direct_referral_count} referrals`}
              >
                {item.direct_referral_count}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>These are your indirect referrals through {item.fullname}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "tier_key",
      label: "Tier",
      sortable: true,
      filterable: true,
      render: (value, item) => (
        <Badge variant="outline" className="text-xs">
          {item.tier_name}
        </Badge>
      ),
    },
    {
      key: "trust_score",
      label: "Trust Score",
      sortable: true,
      render: (value, item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded px-1">
                <Progress value={item.trust_score} className="w-16 h-2" />
                <span className="text-sm font-medium w-8">
                  {item.trust_score}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trust Score is based on verified activity and reliability</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "contribution_to_direct_referrer",
      label: "Contribution",
      sortable: true,
      render: (value, item) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="focus:outline-none focus:ring-2 focus:ring-primary rounded px-1">
                <p className="font-medium text-sm">
                  {formatMoney(item.contribution_to_direct_referrer.amount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.contribution_to_direct_referrer.sales} Sales
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.contribution_to_direct_referrer.buys} Buys
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">Earning Breakdown</p>
              <p className="text-sm">
                Total earnings:{" "}
                {formatMoney(item.contribution_to_direct_referrer.amount)}
              </p>
              <p className="text-sm">
                Verified Sales: {item.contribution_to_direct_referrer.sales}
              </p>
              <p className="text-sm">
                Verified Buys: {item.contribution_to_direct_referrer.buys}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ];

  const actions: Action<QueryReferralUserDto>[] = [
    {
      label: "View Direct Referrals",
      icon: Eye,
      onClick: (referral_user) => onViewNetwork(referral_user),
    },
  ];

  if (!isLoading && !isError && (!data || data.items.length === 0)) {
    return (
      <div className="text-center py-16 border rounded-lg bg-card">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Start Building Your Network</h3>
          <p className="text-muted-foreground">
            Share your link on WhatsApp or Email — help friends avoid scams.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        actions={actions}
        dataPage={data!}
        isLoading={isLoading}
        isError={isError}
        error={error}
        currentPage={filters.page!}
        updateFilters={updateFilters}
        isRowClickable={true}
        onRowClick={(referral_user) => onViewNetwork(referral_user)}
      />

      <ReferralNetworkDetailsSheet />
    </>
  );
}
