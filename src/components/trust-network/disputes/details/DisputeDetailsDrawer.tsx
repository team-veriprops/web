import { useDisputeStore } from "../libs/useDisputeStore";
import { useBodyOverflowHidden } from "@hooks/useBodyOverflowHidden";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavigationBottomPadding from "@components/ui/MobileNavigationBottomPadding";
import { Button } from "@components/3rdparty/ui/button";
import { AlertTriangle, PartyPopper, X } from "lucide-react";
import { DisputeStatus } from "../models";
import { Badge } from "@components/3rdparty/ui/badge";
import { timeDiffHours } from "@lib/time";
import { Progress } from "@components/3rdparty/ui/progress";
import { useState } from "react";
import DisputeConversations from "./DisputeConversations";
import DisputeDetailsMetadata from "./DisputeDetailsMetadata";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/3rdparty/ui/tabs";

export default function DisputeDetailsDrawer() {
  const {
    viewCurrentDispute,
    setViewCurrentDispute,
    currentDispute,
    setCurrentDispute,
  } = useDisputeStore();

  // Lock body scroll when modal is open
  useBodyOverflowHidden(viewCurrentDispute);
  const onOpenChange = (open: boolean) => {
    setViewCurrentDispute(false);
    if (!open) {
      // Delay clearing until AFTER exit animation finishes
      setTimeout(() => setCurrentDispute(null), 300);
    }
  };

  const [showConfetti, setShowConfetti] = useState(false);

  const getStatusBadge = (status: DisputeStatus) => {
    const variants: Record<string, { color: string; label: string }> = {
      Open: {
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        label: "Open",
      },
      "Under Review": {
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        label: "Under Review",
      },
      Escalated: {
        color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        label: "Escalated",
      },
      Resolved: {
        color: "bg-green-500/10 text-green-500 border-green-500/20",
        label: "Resolved",
      },
      Dismissed: {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        label: "Dismissed",
      },
    };
    const variant = variants[status] || variants.Open;
    return (
      <Badge variant="outline" className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  const slaProgress = (() => {
    const raisedAt = currentDispute?.date_created;
    const expected = currentDispute?.sla?.expected_response_hours ?? 48;
    const elapsed = timeDiffHours(raisedAt!);
    return Math.min((elapsed / expected) * 100, 100);
  })();

  const isEscalated = (() => {
    const raisedAt = currentDispute?.date_created;
    const escalateAfter = currentDispute?.sla?.escalate_after_hours;
    if (escalateAfter == null) return false;
    return timeDiffHours(raisedAt!) > escalateAfter;
  })();

  return (
    <AnimatePresence>
      {viewCurrentDispute && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(viewCurrentDispute)}
            className="fixed inset-0 w-full h-full bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={
              "fixed right-0 top-0 h-full w-full bg-card border-l border-border shadow-2xl z-50 overflow-y-auto sm:max-w-[850px]"
            }
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border z-10 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2
                    id="dispute-title"
                    className="text-lg font-semibold text-foreground"
                  >
                    {currentDispute?.ref_id}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentDispute?.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(currentDispute?.status!)}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(viewCurrentDispute)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* SLA Banner */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Expected response time:{" "}
                    {currentDispute?.sla?.expected_response_hours ?? 48}h
                  </span>
                  {isEscalated && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Escalated
                    </Badge>
                  )}
                </div>
                <Progress value={slaProgress} className="h-1" />
                <p className="text-xs text-muted-foreground">
                  {!isEscalated &&
                    currentDispute?.sla?.escalate_after_hours &&
                    `If unresolved after ${currentDispute?.sla?.escalate_after_hours}h, this case may be escalated.`}
                </p>
              </div>
            </div>

            {/* Confetti Overlay */}
            {showConfetti &&
              currentDispute?.status === DisputeStatus.RESOLVED && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/95 z-10 flex items-center justify-center p-8"
                >
                  <div className="text-center">
                    <PartyPopper className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      🎉 Dispute resolved!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for helping make Veriprops safer.
                    </p>
                    <Button onClick={() => setShowConfetti(false)}>
                      View resolution timeline
                    </Button>
                  </div>
                </motion.div>
              )}

            <Tabs
              defaultValue="chat"
              className="flex-1 flex flex-col h-[calc(100%-151px)]"
            >
              <TabsList className="mx-4 mt-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                <DisputeConversations />
              </TabsContent>

              <TabsContent
                value="details"
                className="flex-1 flex flex-col mt-0"
              >
                <DisputeDetailsMetadata />
              </TabsContent>
            </Tabs>

            <MobileNavigationBottomPadding />
          </motion.div>
        </>
      )}
    </AnimatePresence>
    // <DetailDrawer
    //   open={viewCurrentDispute}
    //   onOpenChange={(open: any) => {
    //     setViewCurrentDispute(false);
    //     if (!open) {
    //       // Delay clearing until AFTER exit animation finishes
    //       setTimeout(() => setCurrentDispute(null), 300);
    //     }
    //   }}
    //   title={`${"currentReferral?.fullname"}'s Network`}
    //   reference={"currentReferral?.referral_code!"}
    //   description={`These are your indirect referrals through ${"currentReferral?.fullname"}`}
    //   drawerWidth={DetailDrawerWidth.MEDIUM}
    // >
    //     <></>
    // </DetailDrawer>
  );
}
