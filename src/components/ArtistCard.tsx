
import { Star, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  profession: string;
  location: string;
  rate: number;
  rating: number;
  skills: string[];
  bio: string;
}

interface ArtistCardProps {
  artist: Artist;
  onContact: (artistId: string) => void;
}

const ArtistCard = ({ artist, onContact }: ArtistCardProps) => {
  return (
    <div className="subtle-card rounded-xl overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4 overflow-hidden">
            {artist.avatar ? (
              <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-primary">
                {artist.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">{artist.name}</h3>
            <p className="text-muted-foreground">{artist.profession}</p>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center mr-3">
                <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{artist.location}</span>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">${artist.rate}/hr</span>
              </div>
            </div>
          </div>
          
          <div className="ml-auto flex items-center">
            <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{artist.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {artist.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {artist.skills.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{artist.skills.length - 5} more
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {artist.bio}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <Button variant="outline" size="sm" className="flex items-center" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Portfolio
            </a>
          </Button>
          
          <Button onClick={() => onContact(artist.id)}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
