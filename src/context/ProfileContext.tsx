
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Profile, mockProfiles } from '@/data/profiles';
import { toast } from '@/components/ui/use-toast';

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  selectedProfile: Profile | null;
  filteredProfiles: Profile[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectProfile: (profile: Profile) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
  deleteProfile: (id: number) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  // Initialize with mock data (in a real app, this would fetch from an API)
  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(mockProfiles);
        setFilteredProfiles(mockProfiles);
      } catch (error) {
        console.error('Failed to load profiles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profiles. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Filter profiles based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const filtered = profiles.filter(profile => {
      return (
        profile.name.toLowerCase().includes(normalizedSearchTerm) ||
        profile.description.toLowerCase().includes(normalizedSearchTerm) ||
        profile.address.toLowerCase().includes(normalizedSearchTerm) ||
        profile.company?.toLowerCase().includes(normalizedSearchTerm) ||
        profile.position?.toLowerCase().includes(normalizedSearchTerm) ||
        profile.interests?.some(interest => 
          interest.toLowerCase().includes(normalizedSearchTerm)
        )
      );
    });
    
    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const addProfile = (profile: Profile) => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(...profiles.map(p => p.id), 0) + 1;
    const newProfile = { ...profile, id: newId };
    
    setProfiles(prevProfiles => [...prevProfiles, newProfile]);
    toast({
      title: 'Success',
      description: 'Profile added successfully!',
    });
  };

  const updateProfile = (updatedProfile: Profile) => {
    setProfiles(prevProfiles => 
      prevProfiles.map(profile => 
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    
    // Also update the selected profile if it's the one being edited
    if (selectedProfile?.id === updatedProfile.id) {
      setSelectedProfile(updatedProfile);
    }
    
    toast({
      title: 'Success',
      description: 'Profile updated successfully!',
    });
  };

  const deleteProfile = (id: number) => {
    setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== id));
    
    // Clear selected profile if it was deleted
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
    
    toast({
      title: 'Success',
      description: 'Profile deleted successfully!',
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        selectedProfile,
        filteredProfiles,
        searchTerm,
        setSearchTerm,
        selectProfile,
        addProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};
