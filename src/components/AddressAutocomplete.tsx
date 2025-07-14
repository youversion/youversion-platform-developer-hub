import React, { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface AddressAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  apiKey: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onPlaceSelect, apiKey }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autocompleteElement, setAutocompleteElement] = useState<google.maps.places.PlaceAutocompleteElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (containerRef.current) {
        const element = new google.maps.places.PlaceAutocompleteElement({
          types: ["address"],
          componentRestrictions: { country: "us" }, // Example restriction
        });
        
        element.id = "address-autocomplete";
        
        // Style the element to match shadcn/ui Input component
        element.style.cssText = `
          flex: 1 1 0%;
          border-radius: calc(var(--radius) - 2px);
          border: 1px solid hsl(var(--border));
          background-color: hsl(var(--background));
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
          outline: 2px solid transparent;
          outline-offset: 2px;
          width: 100%;
        `;
        
        containerRef.current.appendChild(element);
        setAutocompleteElement(element);
      }
    }).catch(e => {
      console.error("Failed to load Google Maps API", e);
    });
  }, [apiKey]);

  useEffect(() => {
    if (autocompleteElement) {
      const handlePlaceSelect = async (event: any) => {
        const { placePrediction } = event;
        if (placePrediction) {
          try {
            const place = placePrediction.toPlace();
            await place.fetchFields({ 
              fields: ['displayName', 'formattedAddress', 'location', 'addressComponents'] 
            });
            
            // Convert the new Place object to the expected PlaceResult format
            const placeResult: google.maps.places.PlaceResult = {
              formatted_address: place.formattedAddress,
              geometry: place.location ? { location: place.location } : undefined,
              name: place.displayName,
              place_id: place.id,
              address_components: place.addressComponents,
            };
            
            onPlaceSelect(placeResult);
          } catch (error) {
            console.error("Error fetching place details:", error);
          }
        } else {
          console.log("No place prediction available");
        }
      };

      autocompleteElement.addEventListener("gmp-select", handlePlaceSelect);
      
      return () => {
        autocompleteElement.removeEventListener("gmp-select", handlePlaceSelect);
      };
    }
  }, [autocompleteElement, onPlaceSelect]);

  return (
    <div 
      ref={containerRef}
      className="relative"
    />
  );
};

export default AddressAutocomplete; 