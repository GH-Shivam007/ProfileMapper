
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfiles } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import ProfileCard from '@/components/ProfileCard';
import SearchBar from '@/components/SearchBar';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Button } from '@/components/ui/button';
import { Plus, User, ArrowLeft, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
  const { loading, filteredProfiles, searchTerm } = useProfiles();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-brand-600" />
            <h1 className="text-xl font-bold">ProfileMapper Admin</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profiles
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex-1">
            <SearchBar />
          </div>
          
          <Button onClick={() => navigate('/admin/add')} className="flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Add New Profile
          </Button>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center">
            <h2 className="mb-2 text-2xl font-medium">No profiles found</h2>
            <p className="mb-6 max-w-md text-muted-foreground">
              {searchTerm
                ? `No profiles match your search for "${searchTerm}". Try a different search term.`
                : "There are no profiles available. Add some profiles to get started."}
            </p>
            <Button onClick={() => navigate('/admin/add')}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Profile
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} isAdmin={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
