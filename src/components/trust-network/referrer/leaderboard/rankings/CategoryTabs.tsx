import { Tabs, TabsContent, TabsList, TabsTrigger } from "@3rdparty/ui/tabs";
import { TrendingUp, Users, DollarSign, Shield, Award } from "lucide-react";
import { useReferrerTrustAwardStore } from "../libs/useReferrerTrustAwardStore";
import {
  ReferrerTrustAwardCategories,
  ReferrerTrustAwardCategoryKey,
} from "../models";
import RankingCategoryListComponent from "./RankingCategoryListComponent";

const iconMap = {
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Award,
};

export default function CategoryTabs() {
  const { filters, updateFilters } =
    useReferrerTrustAwardStore();

  return (
    <Tabs
      value={filters.category!}
      onValueChange={(referrerTrustCategory) =>
        updateFilters({category: referrerTrustCategory as ReferrerTrustAwardCategoryKey})
      }
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
        {ReferrerTrustAwardCategories.map((category) => {
          const Icon =
            iconMap[category.icon as keyof typeof iconMap] || TrendingUp;
          return (
            <TabsTrigger
              key={category.key}
              value={category.key}
              className="text-xs"
            >
              <Icon className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(" ")[0]}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {ReferrerTrustAwardCategories.map((category) => (
        <TabsContent key={category.key} value={category.key} className="mt-6" id={`${category.key}-card`}>
          <RankingCategoryListComponent category={category} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
