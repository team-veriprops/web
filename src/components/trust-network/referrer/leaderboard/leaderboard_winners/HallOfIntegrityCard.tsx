import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@3rdparty/ui/card";
import { Badge } from "@3rdparty/ui/badge";
import { Button } from "@3rdparty/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@3rdparty/ui/avatar";
import { Award, ChevronRight } from "lucide-react";
import { useReferrerTrustAwardQueries } from "../libs/useReferrerTrustAwardQueries";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import { ReferrerTrustAwardCategoryKey } from "../models";
import { getReferrerTrustAwardCategory } from "./CategoryWinnerCard";

interface HallOfIntegrityCardProps {
  onViewFull: () => void;
}

export default function HallOfIntegrityCard({
  onViewFull,
}: HallOfIntegrityCardProps) {
  const pageSize = 5;
  const { useSearchReferrerTrustAwardPage } = useReferrerTrustAwardQueries();

  const {
    data: hallOfIntegrityWinners,
    isLoading,
    isError,
  } = useSearchReferrerTrustAwardPage(
    0,
    pageSize,
    ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY
  );

  const limit = 50;

  const referrerTrustAwardCategory = getReferrerTrustAwardCategory(
    ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="border-reward/20 bg-gradient-to-br from-reward/5 to-background">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-reward" />
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                Hall of Integrity
                <Badge variant="secondary" className="text-xs">
                  Limited to {limit}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                Members with TPS ≥ 80, zero disputes, and completed KYC
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <AsyncStateComponent
              isLoading={isLoading}
              isError={isError}
              data={hallOfIntegrityWinners?.items}
              loadingText={`Loading top ${referrerTrustAwardCategory?.name} members...`}
              errorText={`Failed to load top ${referrerTrustAwardCategory?.name} members, please try again later.`}
              emptyText={`No top ${referrerTrustAwardCategory?.name} members yet`}
            >
              {() => {
                const remaining =
                  hallOfIntegrityWinners?.total! < limit
                    ? hallOfIntegrityWinners?.total! - pageSize
                    : limit - pageSize;
                return (
                  <>
                    {hallOfIntegrityWinners?.items.map((member, idx) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        className="relative"
                      >
                        <Avatar className="h-14 w-14 ring-2 ring-reward/30">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.fullname}
                          />
                          <AvatarFallback>
                            {member.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {idx < 3 && (
                          <div className="absolute -top-1 -right-1">
                            <Award className="h-5 w-5 fill-reward text-reward" />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {remaining > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onViewFull}
                        className="h-14 px-4"
                      >
                        +{remaining} more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </>
                );
              }}
            </AsyncStateComponent>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
