import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatementOfFaithModal from "@/components/StatementOfFaithModal";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { APP_ID } from '@/lib/constants';
import { yvpFetch } from '@/lib/utils';

// TODO: Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyDa5uwzQ5wwtYTUG5CxdZLoPkqnJG1BKwE";
// This is a separate key from the Maps API key
const ADDRESS_VALIDATION_API_KEY = "AIzaSyDa5uwzQ5wwtYTUG5CxdZLoPkqnJG1BKwE";

interface UserData {
  avatar_url?: string;
  first_name?: string;
  last_name?: string;
  id?: number;
}

interface FormState {
  accountType: "organization" | "individual";
  organizationName: string;
  firstName: string;
  lastName: string;
  profitDesignation: "non-profit" | "for-profit";
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
    profitDesignation: "non-profit",
  });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sofModalOpen, setSofModalOpen] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('yvp_user_data');
    if (storedUserData) {
      try {
        const parsedUserData: UserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        
        // Prefill the form with user data
        setFormState(prev => ({
          ...prev,
          firstName: parsedUserData.first_name || '',
          lastName: parsedUserData.last_name || ''
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

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

  const handleAccountTypeChange = (value: "organization" | "individual") => {
    setFormState(prev => ({ ...prev, accountType: value }));
  };

  const handleProfitDesignationChange = (
    value: "non-profit" | "for-profit"
  ) => {
    setFormState((prev) => ({ ...prev, profitDesignation: value }));
  };

  const handleCheckboxChange = (id: keyof FormState) => (checked: boolean) => {
    setFormState(prev => ({...prev, [id]: checked}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formState);

    if (!formState.address) {
      toast({
        title: "Please select an address.",
        description: "You must provide an address for the organization.",
        variant: "destructive",
      });
      return;
    }

    if (!formState.agreeToS || !formState.agreeToSoF) {
      toast({
        title: "Please agree to both the Terms of Service and Statement of Faith.",
        description: "You must agree to both terms to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get user's yvp_id from localStorage
      const storedUserData = localStorage.getItem('yvp_user_data');
      if (!storedUserData) {
        toast({
          title: "User data not found. Please sign in again.",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        navigate('/login'); // Redirect to login if user data is missing
        return;
      }

      const parsedUserData = JSON.parse(storedUserData);
      const yvpUserId = parsedUserData.id || parsedUserData.yvp_user_id;
      
      if (!yvpUserId) {
        toast({
          title: "User ID not found. Please sign in again.",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        navigate('/login'); // Redirect to login if user ID is missing
        return;
      }

      // Determine organization name
      let organizationName;
      if (formState.accountType === "organization") {
        organizationName = formState.organizationName || "My Organization";
      } else {
        // For individual accounts, use the user's name
        organizationName = `${formState.firstName || parsedUserData.first_name || ''} ${formState.lastName || parsedUserData.last_name || ''}`.trim() || "Individual Account";
      }

      // Prepare the request body for organization creation
      const orgData = {
        name: organizationName,
        profit_designation: formState.profitDesignation || "non-profit",
        is_indie: true,
        address: {
          formatted_address: formState.address.description,
          name: formState.address.description,
          place_id: formState.address.placeId
        },
        members: [
          {
            yvp_id: yvpUserId,
            role: "owner"
          }
        ]
      };

      console.log("Creating organization with data:", orgData);

      // Create the organization
      const response = await yvpFetch('/admin/create_organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orgData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create organization: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Organization created successfully:", result);

      if (result.success && result.organization) {
        toast({
          title: `Organization "${result.organization.name}" created successfully!`,
          description: "You are now the owner of the organization.",
        });
        navigate('/get-started'); // Redirect to platform or login to refresh the organization data
      } else {
        throw new Error("Organization creation failed - invalid response");
      }

    } catch (error) {
      console.error("Error creating organization:", error);
      toast({
        title: "An error occurred while creating the organization.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (userData?.first_name && userData?.last_name) {
      return `${userData.first_name[0]}${userData.last_name[0]}`;
    }
    return "U";
  };

  // Get greeting message
  const getGreeting = () => {
    if (userData?.first_name) {
      return `Just one more step ${userData.first_name}!`;
    }
    return "Just one more step!";
  };

  return (
    <>
      <div className="container py-12 flex justify-center">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={userData?.avatar_url?.replace('{width}', '96').replace('{height}', '96')} 
                    alt="User" 
                  />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold">{getGreeting()}</h2>
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

                <div className="space-y-2">
                  <Label htmlFor="profitDesignation">Profit Designation</Label>
                  <Select
                    onValueChange={handleProfitDesignationChange}
                    defaultValue={formState.profitDesignation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select profit designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="non-profit">Non Profit</SelectItem>
                      <SelectItem value="for-profit">For Profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder={userData ? userData.first_name || "First Name" : "First Name"}
                      value={formState.firstName || ""}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder={userData ? userData.last_name || "Last Name" : "Last Name"}
                      value={formState.lastName || ""}
                      onChange={handleInputChange}
                      disabled
                    />
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