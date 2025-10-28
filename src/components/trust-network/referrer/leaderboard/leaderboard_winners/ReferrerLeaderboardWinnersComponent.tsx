import { useReferrerTrustAwardQueries } from "../libs/useReferrerTrustAwardQueries";
import { useReferrerTrustAwardStore } from "../libs/useReferrerTrustAwardStore";
import { ReferrerTrustAwardCategoryKey } from "../models";
import CategoryWinnerCard from "./CategoryWinnerCard";
import HallOfIntegrityCard from "./HallOfIntegrityCard";

export default function ReferrerLeaderboardWinnersComponent() {
  const { useGetReferrerTrustAwardCategoryWinners } =
    useReferrerTrustAwardQueries();

  const {
    data: categoryWinners,
    isLoading,
    isError,
  } = useGetReferrerTrustAwardCategoryWinners();

  const { updateFilters } = useReferrerTrustAwardStore();

  const categoryKeys = [
    ReferrerTrustAwardCategoryKey.TOP_TRUST,
    ReferrerTrustAwardCategoryKey.TOP_REFERRERS,
    ReferrerTrustAwardCategoryKey.TOP_EARNERS,
    ReferrerTrustAwardCategoryKey.MOST_DISPUTE_FREE,
    ReferrerTrustAwardCategoryKey.MOST_IMPROVED,
  ];

  const getCategoryWinner = (categoryKey: ReferrerTrustAwardCategoryKey) => {
    return categoryWinners
      ? categoryWinners?.find(
          (categoryWinner) => categoryWinner.category === categoryKey
        )
      : undefined;
  };

  const handleCategoryClick = (categoryKey: ReferrerTrustAwardCategoryKey) => {
    updateFilters({ category: categoryKey });
    requestAnimationFrame(() => {
      document
        .getElementById(`${categoryKey}-card`)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoryKeys.map((categoryKey, index) => {
          const categoryWinner = getCategoryWinner(categoryKey);
          return (
            <CategoryWinnerCard
              key={index}
              isLoading={isLoading}
              isError={isError}
              categoryKey={categoryKey}
              categoryWinner={categoryWinner!}
              index={index}
              onClick={() => {
                handleCategoryClick(categoryKey);
              }}
            />
          );
        })}
      </div>

      <HallOfIntegrityCard
        onViewFull={() => {
          handleCategoryClick(ReferrerTrustAwardCategoryKey.HALL_OF_INTEGRITY);
        }}
      />
    </>
  );
}
