
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Profile } from '@/data/profiles';
import { Mail, Phone, Globe, MapPin, Briefcase, Heart } from 'lucide-react';
import Map from './Map';

interface ProfileDetailProps {
  profile: Profile;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="p-0">
          <div className="relative h-64 w-full overflow-hidden md:h-80">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <div>
            <h1 className="mb-1 text-3xl font-bold">{profile.name}</h1>
            {profile.position && profile.company && (
              <div className="mb-4 flex items-center text-lg text-muted-foreground">
                <Briefcase className="mr-2 h-5 w-5" />
                <span>
                  {profile.position} at {profile.company}
                </span>
              </div>
            )}
            <p className="mb-6 text-lg">{profile.description}</p>

            <h2 className="mb-3 text-xl font-semibold">Contact Information</h2>
            <div className="space-y-2">
              {profile.contact?.email && (
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="hover:text-primary hover:underline"
                  >
                    {profile.contact.email}
                  </a>
                </div>
              )}
              {profile.contact?.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  <a
                    href={`tel:${profile.contact.phone}`}
                    className="hover:text-primary hover:underline"
                  >
                    {profile.contact.phone}
                  </a>
                </div>
              )}
              {profile.contact?.website && (
                <div className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  <a
                    href={profile.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {profile.contact.website.replace(/https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>

            {profile.interests && profile.interests.length > 0 && (
              <>
                <Separator className="my-4" />
                <h2 className="mb-3 text-xl font-semibold">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium"
                    >
                      <Heart className="mr-1 h-4 w-4 text-primary" />
                      {interest}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-xl font-semibold">Location</h2>
              <div className="flex items-center mb-2">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span>{profile.address}</span>
              </div>
              <Map profile={profile} height="300px" />
            </div>

            {profile.socialMedia && Object.values(profile.socialMedia).some(Boolean) && (
              <div>
                <h2 className="mb-3 text-xl font-semibold">Social Media</h2>
                <div className="flex flex-wrap gap-3">
                  {profile.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${profile.socialMedia.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-[#1DA1F2] px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Twitter
                    </a>
                  )}
                  {profile.socialMedia.linkedin && (
                    <a
                      href={profile.socialMedia.linkedin.startsWith('http') 
                        ? profile.socialMedia.linkedin 
                        : `https://${profile.socialMedia.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-[#0A66C2] px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      LinkedIn
                    </a>
                  )}
                  {profile.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${profile.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-[#E4405F] px-4 py-2 text-white hover:bg-opacity-90"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
