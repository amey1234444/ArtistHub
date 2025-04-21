import { Star, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <motion.div
      className="subtle-card rounded-xl overflow-hidden animate-fade-in card-hover-effect"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center mb-4">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-4 overflow-hidden ring-2 ring-primary/5 shadow-inner"
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {artist.avatar ? (
              <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            ) : (
              <span className="text-xl font-bold gradient-text">
                {artist.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{artist.name}</h3>
            <p className="text-muted-foreground font-medium">{artist.profession}</p>
            
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
            <motion.div
              className="flex items-center bg-primary/5 px-2.5 py-1.5 rounded-full shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 250 }}
              whileHover={{ scale: 1.13, boxShadow: "0 2px 12px #fde68a" }}
            >
              <Star className="h-4 w-4 text-yellow-500 mr-1.5 animate-pulse" />
              <span className="font-semibold">{artist.rating.toFixed(1)}</span>
            </motion.div>
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
          <Button variant="outline" size="sm" className="flex items-center hover:bg-primary/5" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover:rotate-45" />
              Portfolio
            </a>
          </Button>
          
          <Button 
            onClick={() => onContact(artist.id)}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
