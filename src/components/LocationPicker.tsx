import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  defaultAddress?: string;
}

const LocationPicker = ({ onLocationSelect, defaultAddress = '' }: LocationPickerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [address, setAddress] = useState(defaultAddress);
  const mapContainerId = 'location-picker-map';

  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerId).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleAddressSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon: lng } = data[0];
        const location = { address, lat: parseFloat(lat), lng: parseFloat(lng) };

        // Update map view
        mapRef.current?.setView([location.lat, location.lng], 13);

        // Update or create marker
        if (markerRef.current) {
          markerRef.current.setLatLng([location.lat, location.lng]);
        } else {
          markerRef.current = L.marker([location.lat, location.lng]).addTo(mapRef.current!);
        }

        onLocationSelect(location);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="location-input">Location</Label>
              <Input
                id="location-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address or location"
                onKeyDown={(e) => e.key === 'Enter' && handleAddressSearch()}
              />
            </div>
            <button
              type="button"
              onClick={handleAddressSearch}
              className="px-4 py-2 mt-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Search
            </button>
          </div>
          <div
            id={mapContainerId}
            className="w-full h-[300px] rounded-md overflow-hidden border border-input"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;