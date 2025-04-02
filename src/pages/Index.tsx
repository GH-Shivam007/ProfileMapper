
import React, { useState } from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import ProfileCard from '@/components/ProfileCard';
import SearchBar from '@/components/SearchBar';
import Map from '@/components/Map';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Button } from '@/components/ui/button';
import { MapPin, Grid, User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

enum ViewType {
  GRID = 'grid',
  MAP = 'map'
}

const Index: React.FC = () => {
  const { loading, selectedProfile, filteredProfiles, searchTerm } = useProfiles();
  const { user, signOut } = useAuth();
  const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-brand-600" />
            <h1 className="text-xl font-bold">ProfileMapper</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="mr-4 text-sm">
              {user?.email}
            </div>
            <Link to="/admin">
              <Button variant="ghost" size="icon" title="Admin Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <SearchBar />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={viewType === ViewType.GRID ? 'default' : 'outline'}
              onClick={() => setViewType(ViewType.GRID)}
              className="flex items-center"
              size="sm"
            >
              <Grid className="mr-1 h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewType === ViewType.MAP ? 'default' : 'outline'}
              onClick={() => setViewType(ViewType.MAP)}
              className="flex items-center"
              size="sm"
            >
              <MapPin className="mr-1 h-4 w-4" />
              Map
            </Button>
          </div>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center">
            <h2 className="mb-2 text-2xl font-medium">No profiles found</h2>
            <p className="mb-6 max-w-md text-muted-foreground">
              {searchTerm
                ? `No profiles match your search for "${searchTerm}". Try a different search term.`
                : "There are no profiles available. Add some profiles to get started."}
            </p>
            <Link to="/admin/add">
              <Button>Add New Profile</Button>
            </Link>
          </div>
        ) : viewType === ViewType.GRID ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Map
              profiles={filteredProfiles}
              profile={selectedProfile}
              showAllProfiles={true}
              height="600px"
            />
            
            {selectedProfile && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold">{selectedProfile.name}</h2>
                <p className="mb-2 text-sm text-muted-foreground">
                  <MapPin className="mr-1 inline-block h-4 w-4" />
                  {selectedProfile.address}
                </p>
                <p className="mb-4 text-sm">{selectedProfile.description}</p>
                <Link to={`/profile/${selectedProfile.id}`}>
                  <Button size="sm">View Full Profile</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
