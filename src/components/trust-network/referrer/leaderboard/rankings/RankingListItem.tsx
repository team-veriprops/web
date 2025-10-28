import { motion } from "framer-motion";
import { Card } from "@3rdparty/ui/card";
import { Badge } from "@3rdparty/ui/badge";
import { Button } from "@3rdparty/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@3rdparty/ui/avatar";
import { Share2} from "lucide-react";
import RankBadge from "./RankBadge";
import { QueryReferrerTrustAwardDto, ReferrerTrustAwardCategory } from "../models";
import { getReferrerMetricDisplay } from "../leaderboard_winners/CategoryWinnerCard";
import ShareRankModal from "@components/trust-network/ui/ShareRankModal";
import { useTrustNetworkStore } from "@components/trust-network/libs/useTrustNetworkStore";
import { toTimeAgo } from "@lib/time";

interface RankingListItemProps {
  member: QueryReferrerTrustAwardDto;
  rank: number;
  category: ReferrerTrustAwardCategory;
  isCurrentUser: boolean;
}

export default function RankingListItem({ member, rank, category, isCurrentUser }: RankingListItemProps) {
  const { setShareRankModalOpened } = useTrustNetworkStore();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rank * 0.005, duration: 0.3 }}
      >
        <Card 
          className={`p-4 transition-all hover:shadow-card ${
            isCurrentUser ? "ring-2 ring-accent/50 bg-accent/5" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <RankBadge rank={rank} />
            
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.fullname} />
              <AvatarFallback>{member.fullname.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground truncate">{member.fullname}</p>
                <Badge variant="outline" className="text-xs shrink-0">
                  {member.tier_name}
                </Badge>
                {isCurrentUser && (
                  <Badge variant="default" className="text-xs shrink-0">
                    You
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-xs capitalize">{member.region}</span>
                <span className="text-xs">•</span>
                <span className="text-xs">Active {toTimeAgo(member.date_last_active)}</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{getReferrerMetricDisplay(category, member)}</p>
            </div>
            
            <div className="flex items-center gap-1">
              {isCurrentUser && <Button
                variant="ghost"
                size="icon"
                onClick={() => setShareRankModalOpened(true)}
                aria-label="Share rank"
              >
                <Share2 className="h-4 w-4" />
              </Button>}
              {/* <Button
                variant="ghost"
                size="icon"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </Card>
      </motion.div>
      
      <ShareRankModal
        member={member}
        rank={rank}
        category={category}
      />
    </>
  );
}
