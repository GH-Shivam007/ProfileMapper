
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfiles } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import ProfileDetail from '@/components/ProfileDetail';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, LogOut } from 'lucide-react';

const ProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profiles, loading } = useProfiles();
  const { signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading && id) {
      const profileId = parseInt(id);
      const foundProfile = profiles.find(p => p.id === profileId);
      
      if (foundProfile) {
        setProfile(foundProfile);
      } else {
        setNotFound(true);
      }
    }
  }, [id, profiles, loading]);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  if (notFound) {
    return (
      <div className="container py-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-4xl font-bold">Profile Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-brand-600" />
            <h1 className="text-xl font-bold">ProfileMapper</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profiles
            </Link>
          </Button>
        </div>

        {profile && <ProfileDetail profile={profile} />}
      </main>
    </div>
  );
};

export default ProfileView;
