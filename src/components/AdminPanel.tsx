
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfiles } from '@/context/ProfileContext';
import { Profile } from '@/data/profiles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, Trash } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import Map from './Map';
import { toast } from '@/components/ui/use-toast';

interface AdminPanelProps {
  mode: 'add' | 'edit';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ mode }) => {
  const { profiles, addProfile, updateProfile } = useProfiles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const emptyProfile: Profile = {
    id: 0,
    name: '',
    photo: '',
    description: '',
    address: '',
    coordinates: [0, 0],
    contact: {
      email: '',
      phone: '',
      website: ''
    },
    interests: [''],
    socialMedia: {
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    company: '',
    position: ''
  };
  
  const [formData, setFormData] = useState<Profile>(emptyProfile);
  
  // Load profile data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && id) {
      const profileId = parseInt(id);
      const profileToEdit = profiles.find(p => p.id === profileId);
      
      if (profileToEdit) {
        setFormData({
          ...profileToEdit,
          interests: [...(profileToEdit.interests || [''])],
          contact: { ...(profileToEdit.contact || { email: '', phone: '', website: '' }) },
          socialMedia: { ...(profileToEdit.socialMedia || { twitter: '', linkedin: '', instagram: '' }) }
        });
      } else {
        toast({
          title: 'Error',
          description: 'Profile not found',
          variant: 'destructive',
        });
        navigate('/admin');
      }
    }
  }, [mode, id, profiles, navigate]);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => {
        const sectionObj = prev[section as keyof Profile] as Record<string, any>;
        return {
          ...prev,
          [section]: {
            ...sectionObj,
            [field]: value
          }
        } as Profile;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value } as Profile));
    }
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle coordinates input
  const handleCoordinateChange = (index: number, value: string) => {
    const newCoords: [number, number] = [...formData.coordinates] as [number, number];
    newCoords[index] = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, coordinates: newCoords }));
  };
  
  // Handle interests array
  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...(formData.interests || [''])];
    newInterests[index] = value;
    setFormData(prev => ({ ...prev, interests: newInterests }));
  };
  
  const addInterest = () => {
    setFormData(prev => ({
      ...prev,
      interests: [...(prev.interests || []), '']
    }));
  };
  
  const removeInterest = (index: number) => {
    const newInterests = [...(formData.interests || [])];
    newInterests.splice(index, 1);
    setFormData(prev => ({ ...prev, interests: newInterests.length ? newInterests : [''] }));
  };
  
  // Validate form
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.photo.trim()) errors.photo = 'Photo URL is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    
    // Validate that coordinates are numbers
    if (isNaN(formData.coordinates[0]) || isNaN(formData.coordinates[1])) {
      errors.coordinates = 'Valid coordinates are required';
    }
    
    // Validate email format if provided
    if (formData.contact?.email && !/^\S+@\S+\.\S+$/.test(formData.contact.email)) {
      errors['contact.email'] = 'Invalid email format';
    }
    
    // Validate URL format if provided
    if (formData.contact?.website && !/^(http|https):\/\/[^ "]+$/.test(formData.contact.website)) {
      errors['contact.website'] = 'Invalid website URL format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        if (mode === 'add') {
          addProfile(formData);
        } else {
          updateProfile(formData);
        }
        
        setLoading(false);
        navigate('/admin');
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description: `Failed to ${mode === 'add' ? 'add' : 'update'} profile`,
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return <LoadingIndicator fullScreen message={`${mode === 'add' ? 'Adding' : 'Updating'} profile...`} />;
  }
  
  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>
        <h1 className="text-2xl font-bold">
          {mode === 'add' ? 'Add New Profile' : 'Edit Profile'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={formErrors.name ? 'border-destructive' : ''}
              />
              {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL *</Label>
              <Input 
                id="photo" 
                name="photo" 
                value={formData.photo} 
                onChange={handleChange}
                className={formErrors.photo ? 'border-destructive' : ''}
              />
              {formErrors.photo && <p className="text-sm text-destructive">{formErrors.photo}</p>}
              {formData.photo && (
                <div className="mt-2 h-16 w-16 overflow-hidden rounded-md">
                  <img 
                    src={formData.photo} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows={3}
                className={formErrors.description ? 'border-destructive' : ''}
              />
              {formErrors.description && <p className="text-sm text-destructive">{formErrors.description}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position" 
                name="position" 
                value={formData.position || ''} 
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact.email">Email</Label>
              <Input 
                id="contact.email" 
                name="contact.email" 
                value={formData.contact?.email || ''} 
                onChange={handleChange}
                className={formErrors['contact.email'] ? 'border-destructive' : ''}
              />
              {formErrors['contact.email'] && <p className="text-sm text-destructive">{formErrors['contact.email']}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact.phone">Phone</Label>
              <Input 
                id="contact.phone" 
                name="contact.phone" 
                value={formData.contact?.phone || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact.website">Website</Label>
              <Input 
                id="contact.website" 
                name="contact.website" 
                value={formData.contact?.website || ''} 
                onChange={handleChange}
                className={formErrors['contact.website'] ? 'border-destructive' : ''}
              />
              {formErrors['contact.website'] && <p className="text-sm text-destructive">{formErrors['contact.website']}</p>}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                className={formErrors.address ? 'border-destructive' : ''}
              />
              {formErrors.address && <p className="text-sm text-destructive">{formErrors.address}</p>}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude *</Label>
                <Input 
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.coordinates[0]}
                  onChange={(e) => handleCoordinateChange(0, e.target.value)}
                  className={formErrors.coordinates ? 'border-destructive' : ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude *</Label>
                <Input 
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.coordinates[1]}
                  onChange={(e) => handleCoordinateChange(1, e.target.value)}
                  className={formErrors.coordinates ? 'border-destructive' : ''}
                />
              </div>
            </div>
            {formErrors.coordinates && <p className="text-sm text-destructive">{formErrors.coordinates}</p>}
            
            <div className="mt-4">
              <Label>Map Preview</Label>
              <div className="mt-2">
                <Map profile={formData} height="300px" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="socialMedia.twitter">Twitter</Label>
              <Input 
                id="socialMedia.twitter" 
                name="socialMedia.twitter" 
                value={formData.socialMedia?.twitter || ''} 
                onChange={handleChange}
                placeholder="@username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialMedia.linkedin">LinkedIn</Label>
              <Input 
                id="socialMedia.linkedin" 
                name="socialMedia.linkedin" 
                value={formData.socialMedia?.linkedin || ''} 
                onChange={handleChange}
                placeholder="linkedin.com/in/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialMedia.instagram">Instagram</Label>
              <Input 
                id="socialMedia.instagram" 
                name="socialMedia.instagram" 
                value={formData.socialMedia?.instagram || ''} 
                onChange={handleChange}
                placeholder="@username"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Interests</CardTitle>
            <Button type="button" size="sm" variant="outline" onClick={addInterest}>
              <Plus className="mr-1 h-4 w-4" /> Add Interest
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.interests?.map((interest, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input 
                  value={interest} 
                  onChange={(e) => handleInterestChange(index, e.target.value)}
                  placeholder="Enter an interest"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeInterest(index)}
                  disabled={formData.interests?.length === 1 && !interest}
                  className="flex-none h-10 w-10 text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={() => navigate('/admin')}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            {mode === 'add' ? 'Add Profile' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
