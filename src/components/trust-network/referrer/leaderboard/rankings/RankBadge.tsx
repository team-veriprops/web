import { Trophy, Medal, Award } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

export default function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Trophy className="h-8 w-8 fill-[#FFD700] text-[#FFD700]" />
      </div>
    );
  }
  
  if (rank === 2) {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Medal className="h-8 w-8 fill-[#C0C0C0] text-[#C0C0C0]" />
      </div>
    );
  }
  
  if (rank === 3) {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Award className="h-8 w-8 fill-[#CD7F32] text-[#CD7F32]" />
      </div>
    );
  }
  
  return (
    <div className="flex h-12 w-12 items-center justify-center">
      <span className="text-xl font-bold text-muted-foreground">#{rank}</span>
    </div>
  );
}
