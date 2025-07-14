import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatementOfFaithModal from "@/components/StatementOfFaithModal";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";
import AddressAutocomplete from "@/components/AddressAutocomplete";

// TODO: Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyDa5uwzQ5wwtYTUG5CxdZLoPkqnJG1BKwE";
// This is a separate key from the Maps API key
const ADDRESS_VALIDATION_API_KEY = "AIzaSyDa5uwzQ5wwtYTUG5CxdZLoPkqnJG1BKwE";


interface FormState {
  accountType: "organization" | "individual";
  organizationName: string;
  fullName: string;
  role: string;
  address: {
    description: string;
    placeId: string;
    components: google.maps.GeocoderAddressComponent[];
  };
  agreeToS: boolean;
  agreeToSoF: boolean;
}

const Join: React.FC = () => {
  const [formState, setFormState] = useState<Partial<FormState>>({
    accountType: "organization",
    role: "owner",
  });
  const [sofModalOpen, setSofModalOpen] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    console.log("Selected Place: ", place);
    setFormState(prev => ({
      ...prev,
      address: {
        description: place.formatted_address || "",
        placeId: place.place_id || "",
        components: place.address_components || [],
      }
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof FormState) => (value: string) => {
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleAccountTypeChange = (value: "organization" | "individual") => {
    setFormState(prev => ({ ...prev, accountType: value }));
  };

  const handleCheckboxChange = (id: keyof FormState) => (checked: boolean) => {
    setFormState(prev => ({...prev, [id]: checked}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formState);

    if (!formState.address) {
      alert("Please select an address.");
      return;
    }

    // Call Google's Address Validation API
    try {
      const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${ADDRESS_VALIDATION_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: {
            addressLines: [formState.address.description],
          },
        }),
      });

      const data = await response.json();
      console.log("Address Validation Response:", data);
      alert("Address validation result logged to console.");

      // Here you would handle the response (Fix, Confirm, Accept scenarios)
      // and proceed with form submission to your backend.

    } catch (error) {
      console.error("Error validating address:", error);
      alert("An error occurred during address validation.");
    }
  };


  return (
    <>
      <div className="container py-12 flex justify-center">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold">Just one more step Elizabeth!</h2>
              <p className="text-3xl font-bold">
                Register as an Organization or an Individual
              </p>
              <CardDescription>
                This is who will enter into the legal agreement with Bible
                Publishers
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <RadioGroup
                  defaultValue="organization"
                  className="flex justify-center space-x-4"
                  onValueChange={handleAccountTypeChange}
                  value={formState.accountType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="organization" id="r1" />
                    <Label htmlFor="r1">Organization</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="r2" />
                    <Label htmlFor="r2">Individual</Label>
                  </div>
                </RadioGroup>

                {formState.accountType === "organization" && (
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      placeholder="Come and See (autofilled)"
                      value={formState.organizationName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="fullName">First and Last Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Elizabeth Haynes (autofilled)"
                      value={formState.fullName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={handleSelectChange('role')} value={formState.role}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <AddressAutocomplete
                    apiKey={GOOGLE_MAPS_API_KEY}
                    onPlaceSelect={handlePlaceSelect}
                  />
                </div>
                
                {/* More address fields can be added here and populated by Google API */}

                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeToSoF" checked={formState.agreeToSoF} onCheckedChange={(checked) => handleCheckboxChange('agreeToSoF')(!!checked)} />
                  <Label htmlFor="agreeToSoF" className="text-sm font-normal">
                    You agree to the{" "}
                    <span
                      className="text-primary hover:underline cursor-pointer"
                      onClick={() => setSofModalOpen(true)}
                    >
                      Statement of Faith
                    </span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeToS" checked={formState.agreeToS} onCheckedChange={(checked) => handleCheckboxChange('agreeToS')(!!checked)} />
                  <Label htmlFor="agreeToS" className="text-sm font-normal">
                    You agree to the{" "}
                    <span
                      className="text-primary hover:underline cursor-pointer"
                      onClick={() => setTosModalOpen(true)}
                    >
                      YouVersion Platform ToS
                    </span>
                  </Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="stroked" type="button">Cancel</Button>
                  <Button type="submit">Submit</Button>
                </div>
              </CardContent>
            </form>
            <StatementOfFaithModal
              open={sofModalOpen}
              onOpenChange={setSofModalOpen}
              onAccept={() => handleCheckboxChange('agreeToSoF')(true)}
            />
            <TermsOfServiceModal
              open={tosModalOpen}
              onOpenChange={setTosModalOpen}
              onAccept={() => handleCheckboxChange('agreeToS')(true)}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Join; 