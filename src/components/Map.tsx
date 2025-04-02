
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '@/data/profiles';
import LoadingIndicator from './LoadingIndicator';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  profile?: Profile | null;
  profiles?: Profile[];
  height?: string;
  showAllProfiles?: boolean;
}

const Map: React.FC<MapProps> = ({
  profile = null,
  profiles = [],
  height = '400px',
  showAllProfiles = false
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem('mapbox_token') || ''
  );

  // Function to initialize the map
  const initializeMap = (container: HTMLDivElement) => {
    if (!mapboxToken) {
      setLoading(false);
      return;
    }

    try {
      // Set the access token
      mapboxgl.accessToken = mapboxToken;
      
      // Save token to localStorage for future use
      localStorage.setItem('mapbox_token', mapboxToken);

      // Create the map instance
      map.current = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Set up event handlers
      map.current.on('load', () => {
        setLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        toast({
          title: 'Map Error',
          description: 'Unable to load the map. Please check your Mapbox token and try again.',
          variant: 'destructive',
        });
        setLoading(false);
        // Check for unauthorized error (401) without using status property
        // Instead check the error message or use a different approach
        if (e.error && typeof e.error === 'object' && 'message' in e.error) {
          const errorMessage = String(e.error.message).toLowerCase();
          if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
            localStorage.removeItem('mapbox_token');
            setMapboxToken('');
          }
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to initialize the map. Please try again later.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  // Update markers when profile or profiles change
  useEffect(() => {
    if (!map.current || loading) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Function to add a marker
    const addMarker = (p: Profile) => {
      try {
        if (!p.coordinates || !Array.isArray(p.coordinates) || p.coordinates.length !== 2) {
          console.warn(`Invalid coordinates for profile: ${p.name}`);
          return null;
        }

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div>
              <h3 class="font-medium">${p.name}</h3>
              <p class="text-sm">${p.address}</p>
            </div>
          `);

        const marker = new mapboxgl.Marker({ color: '#0092ff' })
          .setLngLat(p.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        markersRef.current.push(marker);
        return marker;
      } catch (error) {
        console.error('Error adding marker:', error);
        return null;
      }
    };

    // Add markers based on props
    if (profile && profile.coordinates) {
      const marker = addMarker(profile);
      if (marker && map.current) {
        // Center the map on this profile
        map.current.flyTo({
          center: profile.coordinates,
          zoom: 14,
          essential: true
        });
      }
    } else if (showAllProfiles && profiles.length > 0) {
      // Add all profile markers
      const validProfiles = profiles.filter(p => p.coordinates && Array.isArray(p.coordinates) && p.coordinates.length === 2);
      validProfiles.forEach(addMarker);

      // Fit the map to show all markers
      if (validProfiles.length > 0 && map.current) {
        const bounds = new mapboxgl.LngLatBounds();
        validProfiles.forEach(p => bounds.extend(p.coordinates));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [profile, profiles, showAllProfiles, loading]);

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      initializeMap(mapContainer.current);
    }

    return () => {
      // Clean up map when component unmounts
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      if (mapContainer.current) {
        initializeMap(mapContainer.current);
      }
    }
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height }}>
      {loading && <LoadingIndicator message="Loading map..." />}
      
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4">
          <h3 className="text-lg font-medium mb-2">Mapbox API Key Required</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Please enter your Mapbox public token to enable the map functionality
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-sm">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
            >
              Submit
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            You can get a token at <a href="https://www.mapbox.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
          </p>
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0" />
      )}
    </div>
  );
};

export default Map;
