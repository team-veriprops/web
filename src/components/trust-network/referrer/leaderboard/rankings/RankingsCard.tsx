import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@3rdparty/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import { Badge } from "@3rdparty/ui/badge";
import CategoryTabs from "./CategoryTabs";
import { useReferrerTrustAwardStore } from "../libs/useReferrerTrustAwardStore";
import { regions } from "../models";
import { toTimeAgo } from "@lib/time";

export default function RankingsCard() {
  const { filters, updateFilters, timeLastUpdated } =
    useReferrerTrustAwardStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              Rankings
              <Badge variant="secondary" className="text-xs">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Live
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              {timeLastUpdated && (
                <span>Updated {toTimeAgo(timeLastUpdated)}</span>
              )}
            </CardDescription>
          </div>

          <Select
            value={filters.region}
            onValueChange={(selectedRegion: any) =>
              updateFilters({ region: selectedRegion })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Select region"} />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region, index) => (
                <SelectItem key={index} value={region.key}>
                  {region.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <CategoryTabs />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Scores are based on verified activity only
        </p>
      </CardContent>
    </Card>
  );
}
