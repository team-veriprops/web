import { Button } from "@components/3rdparty/ui/button";
import { Input } from "@components/3rdparty/ui/input";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import {
  AlertCircle,
  CheckCheck,
  Loader2,
  Paperclip,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDisputeStore } from "../libs/useDisputeStore";
import { formatDate } from "@lib/time";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useDisputeQueries } from "../libs/useDisputeQueries";
import { QueryDisputeConversationDto } from "../models";
import { Page } from "types/models";
import { UserType } from "@components/user/models";
import { toast } from "@components/3rdparty/ui/use-toast";

export default function DisputeConversations() {
  const { currentDispute } = useDisputeStore();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { activeAuditor } = useAuthStore();

  const { useSearchDisputeConversationInfinite } = useDisputeQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchDisputeConversationInfinite(
      activeAuditor?.id!,
      currentDispute?.id!
    );

  // Flattened data
  const allDisputeConversations =
    data?.pages.flatMap(
      (page: Page<QueryDisputeConversationDto>) => page.items
    ) ?? [];

  //   useEffect(() => {
  //     if (dispute) {
  //       markMessagesRead(dispute.id, userId);

  //       // Check if just resolved
  //       if (
  //         dispute.status === "Resolved" &&
  //         dispute.resolutionTimeline &&
  //         dispute.resolutionTimeline.length > 0
  //       ) {
  //         const lastResolution =
  //           dispute.resolutionTimeline[dispute.resolutionTimeline.length - 1];
  //         const hoursSinceResolution = timeDiffHours(lastResolution.date);
  //         if (hoursSinceResolution < 1) {
  //           setShowConfetti(true);
  //           setTimeout(() => setShowConfetti(false), 5000);
  //         }
  //       }
  //     }
  //   }, [dispute, userId]);

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    // setSending(true);
    // try {
    //   await addMessageToDispute(dispute.id, {
    //     sender: "User",
    //     senderId: userId,
    //     text: message.trim(),
    //   });

    //   setMessage("");
    //   onRefresh();
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description:
    //       error instanceof Error ? error.message : "Failed to send message",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setSending(false);
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <>
      <div className="space-y-4 py-4 px-6 h-[calc(100%-80px)]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center h-full py-12">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Fetching conversations...
          </div>
        ) : allDisputeConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversation yet!</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              Try explaining the issue in a few lines and attach any documents
              that may help.
            </p>
          </div>
        ) : (
          <>
            {allDisputeConversations.map((msg, index) => {
              const isUser = msg.sender_user_type === UserType.USER;
              const isSystem = msg.sender_user_type === UserType.SYSTEM;

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <div className="bg-muted/50 rounded-lg px-4 py-2 text-xs text-muted-foreground max-w-[80%] text-center">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isUser
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span>{formatDate(msg.date_created!)}</span>
                      {isUser && msg.read_by && msg.read_by.length > 1 && (
                        <CheckCheck className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <InfiniteScrollTriggerComponent
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>

      {/* Composer */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Button variant="outline" size="icon" disabled>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={sending}
            className="flex-1"
            aria-label="Type a message"
          />
          <Button
            onClick={handleSendMessage}
            disabled={sending || !message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
