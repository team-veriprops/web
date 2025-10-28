import { Card, CardContent, CardHeader, CardTitle } from '@3rdparty/ui/card';
import { Label } from '@3rdparty/ui/label';
import { Input } from '@3rdparty/ui/input';
import { Textarea } from '@3rdparty/ui/textarea';
import { Checkbox } from '@3rdparty/ui/checkbox';
import { QueryVerifierTaskDto } from '@components/trust-network/verifier/models';

interface RegistryFormProps {
  task: QueryVerifierTaskDto;
  data: any;
  onChange: (data: any) => void;
}

export function RegistryForm({ task, data, onChange }: RegistryFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">🏛 Registry Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registryRefNumber">Registry Reference Number *</Label>
            <Input
              id="registryRefNumber"
              placeholder="Official registry reference..."
              value={data.registryRefNumber || ''}
              onChange={(e) => updateField('registryRefNumber', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stampNumber">Official Stamp Number</Label>
            <Input
              id="stampNumber"
              placeholder="Stamp identification number..."
              value={data.stampNumber || ''}
              onChange={(e) => updateField('stampNumber', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Match Check *</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="matchCheck"
                checked={data.matchCheck || false}
                onCheckedChange={(checked) => updateField('matchCheck', checked)}
              />
              <Label htmlFor="matchCheck" className="font-normal">
                Property details match official registry records
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registryNotes">Registry Notes *</Label>
            <Textarea
              id="registryNotes"
              placeholder="Provide details about the registry verification..."
              value={data.registryNotes || ''}
              onChange={(e) => updateField('registryNotes', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="officerName">Verifying Officer</Label>
            <Input
              id="officerName"
              placeholder="Officer name"
              value={data.officerName || ''}
              onChange={(e) => updateField('officerName', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
