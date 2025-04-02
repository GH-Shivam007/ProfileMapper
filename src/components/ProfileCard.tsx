
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Profile } from '@/data/profiles';
import { MapPin, Info, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfiles } from '@/context/ProfileContext';

interface ProfileCardProps {
  profile: Profile;
  isAdmin?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isAdmin = false }) => {
  const { selectProfile, deleteProfile } = useProfiles();
  
  const handleShowLocation = () => {
    selectProfile(profile);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete ${profile.name}'s profile?`)) {
      deleteProfile(profile.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {profile.company && (
            <div className="absolute bottom-2 right-2 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white">
              {profile.position}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-medium">{profile.name}</h3>
        </div>
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{profile.address}</span>
        </div>
        <p className="text-sm line-clamp-3">{profile.description}</p>
        
        {profile.interests && profile.interests.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleShowLocation}
        >
          <MapPin className="mr-1 h-4 w-4" />
          <span>Location</span>
        </Button>
        
        <Link to={`/profile/${profile.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            <Info className="mr-1 h-4 w-4" />
            <span>Details</span>
          </Button>
        </Link>
        
        {isAdmin && (
          <>
            <Link to={`/admin/edit/${profile.id}`} className="flex-none">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="flex-none h-8 w-8 text-destructive hover:bg-destructive/10"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
