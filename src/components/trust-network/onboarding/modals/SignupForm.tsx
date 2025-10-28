import { useState } from 'react';
import { Button } from '@3rdparty/ui/button';
import { Input } from '@3rdparty/ui/input';
import { Label } from '@3rdparty/ui/label';
import { Textarea } from '@3rdparty/ui/textarea';
import { Checkbox } from '@3rdparty/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@3rdparty/ui/select';
import { Loader2 } from 'lucide-react';
import { ProfessionType, RoleType } from '../../models';
import { useTrustNetworkStore } from '../../libs/useTrustNetworkStore';


export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verifier: boolean;
  referrer: boolean;
  profession?: string;
  state?: string;
  lga?: string;
}

export interface StateData {
  state: string;
  lgas: string[];
}

export const mockUser: UserProfile = {
  id: "user_01",
  name: "Aisha Bello",
  email: "aisha@example.com",
  verifier: false,
  referrer: false,
};

export const nigerianStates: StateData[] = [
  {
    state: "Lagos",
    lgas: ["Ikeja", "Surulere", "Ikorodu", "Lekki", "Victoria Island", "Yaba", "Epe"],
  },
  {
    state: "Abuja FCT",
    lgas: ["Gwagwalada", "Kuje", "Bwari", "Abaji", "Kwali", "Garki"],
  },
  {
    state: "Rivers",
    lgas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Ikwerre", "Oyigbo"],
  },
  {
    state: "Kano",
    lgas: ["Kano Municipal", "Nassarawa", "Fagge", "Dala", "Gwale"],
  },
  {
    state: "Oyo",
    lgas: ["Ibadan North", "Ibadan South-West", "Ogbomosho", "Oyo", "Iseyin"],
  },
  {
    state: "Kaduna",
    lgas: ["Kaduna North", "Kaduna South", "Zaria", "Kafanchan", "Sabon Gari"],
  },
  {
    state: "Delta",
    lgas: ["Warri", "Sapele", "Asaba", "Ughelli", "Agbor"],
  },
  {
    state: "Ogun",
    lgas: ["Abeokuta South", "Ijebu Ode", "Sagamu", "Ado-Odo/Ota", "Ilaro"],
  },
];

export const professions = [
  { id: "lawyer", label: "Land/Property Lawyer" },
  { id: "surveyor", label: "Land/Property Surveyor" },
  { id: "field", label: "Field Agent & Property Guide" },
  { id: "other", label: "Other Professional" },
];


export function SignupForm() {
    
        const {selectedRole, setOpenOnboarding, selectedProfession} = useTrustNetworkStore()

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    state: '',
    lga: '',
    profession: selectedProfession || '',
    bio: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedStateData = nigerianStates.find(s => s.state === formData.state);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Email or phone is required';
    } else if (formData.contact.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contact)) {
        newErrors.contact = 'Invalid email address';
      }
    } else if (!/^\d{10,11}$/.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = 'Invalid phone number';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (selectedRole === 'verifier' && !formData.profession) {
      newErrors.profession = 'Profession is required for verifiers';
    }

    if (formData.bio && formData.bio.length > 200) {
      newErrors.bio = 'Bio must be less than 200 characters';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm the accuracy of your information';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 700));
    
    setLoading(false);
    // onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-semibold mb-2">
          Join as a {selectedRole === 'verifier' ? 'Verifier' : selectedRole === 'referrer' ? 'Referrer' : 'Member'}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in your details to complete your registration
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'border-destructive' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contact">
            Email or Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className={errors.contact ? 'border-destructive' : ''}
            placeholder="email@example.com or 08012345678"
          />
          {errors.contact && (
            <p className="text-xs text-destructive mt-1">{errors.contact}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">
              State <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value, lga: '' })}
            >
              <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((state) => (
                  <SelectItem key={state.state} value={state.state}>
                    {state.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-xs text-destructive mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lga">LGA (Optional)</Label>
            <Select
              value={formData.lga}
              onValueChange={(value) => setFormData({ ...formData, lga: value })}
              disabled={!formData.state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select LGA" />
              </SelectTrigger>
              <SelectContent>
                {selectedStateData?.lgas.map((lga) => (
                  <SelectItem key={lga} value={lga}>
                    {lga}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedRole === 'verifier' && (
          <div>
            <Label htmlFor="profession">
              Profession / Area of Focus <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.profession}
              onValueChange={(value) => setFormData({ ...formData, profession: value })}
            >
              <SelectTrigger className={errors.profession ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.profession && (
              <p className="text-xs text-destructive mt-1">{errors.profession}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="bio">Short Bio (Optional)</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className={errors.bio ? 'border-destructive' : ''}
            placeholder="Tell us a bit about your experience..."
            rows={3}
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData.bio.length}/200
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, consent: checked as boolean })
            }
            className={errors.consent ? 'border-destructive' : ''}
          />
          <label
            htmlFor="consent"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I confirm that the information I provide is accurate.{' '}
            <span className="text-destructive">*</span>
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-destructive">{errors.consent}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 trust-gradient"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Join Now
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpenOnboarding(false)}
          disabled={loading}
        >
          Finish later
        </Button>
      </div>
    </form>
  );
}
