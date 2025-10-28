import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@3rdparty/ui/dialog";
import { Button } from "@3rdparty/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@3rdparty/ui/avatar";
import { Copy, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  QueryReferrerTrustAwardDto,
  ReferrerTrustAwardCategory,
} from "../referrer/leaderboard/models";
import { useTrustNetworkStore } from "../libs/useTrustNetworkStore";
import { copyToClipboard } from "@lib/utils";

interface ShareRankModalProps {
  member: QueryReferrerTrustAwardDto;
  rank: number;
  category: ReferrerTrustAwardCategory;
}

export default function ShareRankModal({
  member,
  rank,
  category,
}: ShareRankModalProps) {
  const { shareRankModalOpened, setShareRankModalOpened } =
    useTrustNetworkStore();

  const message = `Proud to be #${rank} in ${category?.name} on Veriprops — building a safer property market!`;

  const handleCopyLink = async () => {
    await copyToClipboard(message);
    toast.success("Message copied to clipboard!");
    setShareRankModalOpened(false);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(
      `Veriprops Leaderboard - #${rank} in ${category?.name}`
    );
    const body = encodeURIComponent(message);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setShareRankModalOpened(false);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShareRankModalOpened(false);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(message);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    setShareRankModalOpened(false);
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
    setShareRankModalOpened(false);
  };

  return (
    <Dialog open={shareRankModalOpened} onOpenChange={setShareRankModalOpened}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Rank</DialogTitle>
          <DialogDescription>
            Celebrate your achievement with your network
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar} alt={member.fullname} />
            <AvatarFallback>
              {member.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-foreground">{member.fullname}</p>
            <p className="text-sm text-muted-foreground">{category?.name}</p>
            <p className="text-2xl font-bold text-accent">#{rank}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/10 p-4">
          <p className="text-sm text-foreground">{message}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Message
          </Button>
          <Button variant="outline" onClick={handleEmailShare}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button
            variant="outline"
            onClick={handleWhatsAppShare}
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none"
          >
            <Share2 className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={handleTwitterShare}
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Twitter
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => setShareRankModalOpened(false)}
          className="mt-2"
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
