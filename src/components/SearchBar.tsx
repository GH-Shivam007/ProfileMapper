
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfiles } from '@/context/ProfileContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useProfiles();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search profiles by name, location, interests..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {localSearchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full rounded-l-none px-3"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" className="ml-2">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
