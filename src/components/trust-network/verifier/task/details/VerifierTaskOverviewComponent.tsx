import { Badge } from "@components/3rdparty/ui/badge";
import { Card, CardContent } from "@components/3rdparty/ui/card";
import { formatMeasurement } from "@lib/utils";
import { FileText } from "lucide-react";
import { useVerifierStore } from "../../libs/useVerifierStore";

export default function VerifierTaskOverviewComponent() {
  const { currentVerifierTask } = useVerifierStore();

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Property Details</h4>
          <div className="grid gap-2 text-sm">
            {currentVerifierTask?.property_parcel_id && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parcel ID:</span>
                <span className="font-medium">
                  {currentVerifierTask.property_parcel_id}
                </span>
              </div>
            )}
            {currentVerifierTask?.plot_size && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">
                  {" "}
                  {formatMeasurement(currentVerifierTask.plot_size)}
                </span>
              </div>
            )}
            {currentVerifierTask?.location && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordinates:</span>
                <span className="font-mono text-xs">
                  {currentVerifierTask.location.coordinates?.lat.toFixed(4)},{" "}
                  {currentVerifierTask.location.coordinates?.lng.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div >
          <h4 className="text-sm font-medium mb-2">Verification Focus</h4>
          <ul className="space-y-1">
            {currentVerifierTask?.verification_focus.map((focus, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">•</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Required Evidence</h4>
          <div className="flex flex-wrap gap-2">
            {currentVerifierTask?.required_response.map((req, i) => (
              <Badge key={i} variant="outline">
                <FileText className="mr-1 h-3 w-3" />
                {req.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
