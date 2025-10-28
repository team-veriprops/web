import { Page } from "types/models";
import {
  QueryReferrerTrustAwardDto,
  ReferrerTrustAwardCategory,
} from "../models";
import { useReferrerTrustAwardQueries } from "../libs/useReferrerTrustAwardQueries";
import InfiniteScrollTriggerComponent from "@components/ui/InfiniteScrollTriggerComponent";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import RankingListItem from "./RankingListItem";

export default function RankingCategoryListComponent({
  category,
}: {
  category: ReferrerTrustAwardCategory;
}) {
  const { activeAuditor } = useAuthStore();
  const { useSearchReferrerTrustAwardInfinite } =
    useReferrerTrustAwardQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchReferrerTrustAwardInfinite();

  // Flattened data
  const allCategoryMembers =
    data?.pages.flatMap(
      (page: Page<QueryReferrerTrustAwardDto>) => page.items
    ) ?? [];

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{category.description}</p>
        {category.eligibility && (
          <p className="mt-1 text-xs text-accent">{category.eligibility}</p>
        )}
      </div>

      <div className="space-y-2">
        {allCategoryMembers.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No members found in this category
            </p>
          </div>
        ) : (
          allCategoryMembers.map((member) => {
            const isCurrentUser = activeAuditor?.id === member.user_id;
            return (
              <RankingListItem
                key={member.id}
                member={member}
                rank={member.rank}
                category={category}
                isCurrentUser={isCurrentUser}
              />
            );
          })
        )}

        <InfiniteScrollTriggerComponent
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
