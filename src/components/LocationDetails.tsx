import { MapPin, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LocationDetailsProps {
  location: string;
  isRemote: boolean;
  timezone?: string;
  workingHours?: string;
  travelRequired?: boolean;
}

const LocationDetails = ({
  location,
  isRemote,
  timezone = 'UTC',
  workingHours = 'Flexible',
  travelRequired = false,
}: LocationDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
        <CardDescription>
          Job location and working arrangement information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium mb-1">Work Location</h4>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{location}</span>
                {isRemote && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Remote
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/60">
            <div>
              <h4 className="font-medium mb-1">Timezone</h4>
              <span className="text-muted-foreground">{timezone}</span>
            </div>
            <div>
              <h4 className="font-medium mb-1">Working Hours</h4>
              <span className="text-muted-foreground">{workingHours}</span>
            </div>
          </div>

          {travelRequired && (
            <div className="pt-4 border-t border-border/60">
              <Badge variant="outline" className="bg-yellow-50">
                Travel Required
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                This position may require occasional travel for meetings or events.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;