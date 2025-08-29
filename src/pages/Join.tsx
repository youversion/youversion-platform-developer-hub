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
import BibleLicenseModal from "@/components/BibleLicenseModal";
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
import { useAuth } from '@/contexts/AuthContext';
import { YVP_SDK_URL } from '@/lib/constants';

declare global {
  interface Window {
    YouVersionPlatform?: {
      SignIn?: {
        getAuthData?: () => { accessToken?: string } | undefined;
        handleAuthCallback?: () => void;
      };
      userInfo?: (
        accessToken: string
      ) => Promise<{ firstName: string; lastName: string; userId: string; avatarUrl?: string }>;
      signOut?: () => void;
    };
  }
}

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
  agreeToBibleLicense: boolean;
}

const Join: React.FC = () => {
  const [formState, setFormState] = useState<Partial<FormState>>({
    accountType: "organization",
    profitDesignation: "non-profit",
  });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sofModalOpen, setSofModalOpen] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);
  const [bibleLicenseModalOpen, setBibleLicenseModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [yvpUserId, setYvpUserId] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  // Ensure SDK is present and fetch persisted auth user info
  useEffect(() => {
    const ensureAppId = () => {
      if (document.body.dataset.youversionPlatformAppId) return;
      const apps = [
        { host: 'preview--yv-platform-dev.lovable.app', id: 'gGzypYFGGi7eGzFGYEiSyMnlbtDBfAYQs2YO6AHgE7jrjZIF' },
        { host: 'lovable.dev', id: 'gKtUcNTYQ0mcAYte9Uta9KZRUAA4u5FcdOnTYmggiBFtKStJ' },
        { host: 'platform.youversion.com', id: 'dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2' },
        { host: 'localhost', id: 'iAfkrb9YmBbmASXMGPXxxwLXEFXkXa7cyLLwzc2GpQuGgtJW' }
      ];
      const currentHost = window.location.hostname;
      const match = apps.find(a => currentHost.includes(a.host));
      if (match) {
        document.body.dataset.youversionPlatformAppId = match.id;
      }
    };

    const loadSdkIfNeeded = () => {
      if (window.YouVersionPlatform?.SignIn?.getAuthData) {
        setSdkReady(true);
        return;
      }
      // Ensure app id is set BEFORE injecting the script (Index/GetStarted should also do this)
      if (!document.body.dataset.youversionPlatformAppId) {
        // no-op here
      }
      if (!document.querySelector(`script[src="${YVP_SDK_URL}"]`)) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = YVP_SDK_URL;
        script.onload = () => setSdkReady(true);
        document.head.appendChild(script);
      } else {
        setTimeout(() => setSdkReady(true), 0);
      }
    };

    ensureAppId();
    loadSdkIfNeeded();
  }, []);

  useEffect(() => {
    if (!sdkReady) return;
    const auth = window.YouVersionPlatform?.SignIn?.getAuthData?.();
    if (auth?.accessToken && window.YouVersionPlatform?.userInfo) {
      window.YouVersionPlatform.userInfo(auth.accessToken)
        .then(me => {
          setYvpUserId(me.userId);
          const mapped: UserData = {
            first_name: me.firstName,
            last_name: me.lastName,
            avatar_url: me.avatarUrl,
          };
          setUserData(mapped);
          setFormState(prev => ({
            ...prev,
            firstName: mapped.first_name || '',
            lastName: mapped.last_name || ''
          }));
        })
        .catch(err => {
          console.error('Failed to load user from persisted auth:', err);
        });
    }
  }, [sdkReady]);

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

    if (!formState.agreeToS || !formState.agreeToBibleLicense) {
      toast({
        title: "Please agree to all terms and licenses.",
        description: "You must agree to all terms to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!yvpUserId || !userData) {
        toast({
          title: "User data not found. Please sign in again.",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      // Determine organization name
      let organizationName;
      if (formState.accountType === "organization") {
        organizationName = formState.organizationName || "My Organization";
      } else {
        // For individual accounts, use the user's name
        organizationName = `${formState.firstName || userData.first_name || ''} ${formState.lastName || userData.last_name || ''}`.trim() || "Individual Account";
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
      const response = await yvpFetch('/admin/create_developer', {
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

      if (result.success && result.developer) {
        toast({
          title: `Organization "${result.developer.name}" created successfully!`,
          description: "You are now the owner of the organization.",
        });
        
        // Log in the user after successful organization creation to properly authenticate them
        try {
          await login('oauth@youversion.com', 'oauth_flow');
          navigate('/platform'); // Now redirect to platform since user is authenticated
        } catch (loginError) {
          console.error('Failed to authenticate after organization creation:', loginError);
          navigate('/get-started'); // Fallback to get-started if login fails
        }
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
                      placeholder="Organization name"
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
                  <Checkbox id="agreeToBibleLicense" checked={formState.agreeToBibleLicense} onCheckedChange={(checked) => {
                    if (checked) {
                      setBibleLicenseModalOpen(true);
                      return;
                    }
                    handleCheckboxChange('agreeToBibleLicense')(false);
                  }} />
                  <Label htmlFor="agreeToBibleLicense" className="text-sm font-bold">
                    {" "}
                    <span
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      onClick={() => setBibleLicenseModalOpen(true)}
                    >
                      YouVersion Platform Bible License v1
                    </span>
                  </Label>
                </div>

                {/* Statement of Faith checkbox intentionally hidden */}

                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeToS" checked={formState.agreeToS} onCheckedChange={(checked) => {
                    if (checked) {
                      setTosModalOpen(true);
                      return;
                    }
                    handleCheckboxChange('agreeToS')(false);
                  }} />
                  <Label htmlFor="agreeToS" className="text-sm font-bold">
                    You agree to the{" "}
                    <span
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
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
            <BibleLicenseModal
              open={bibleLicenseModalOpen}
              onOpenChange={setBibleLicenseModalOpen}
              onAccept={() => handleCheckboxChange('agreeToBibleLicense')(true)}
            />
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