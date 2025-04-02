
# ProfileMapper - Interactive Profile Management App

## Overview

ProfileMapper is a modern web application that allows users to view and manage profiles while interactively exploring their locations on a map. The application provides both a user interface for browsing profiles and an admin panel for managing profile data.

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Application                        │
├───────────┬─────────────┬──────────────┬────────────┬───────────┤
│           │             │              │            │           │
│  Context  │  Components │    Pages     │   Hooks    │  Services │
│  Providers│             │              │            │           │
├───────────┼─────────────┼──────────────┼────────────┼───────────┤
│           │             │              │            │           │
│ AuthCntxt │ ProfileCard │    Index     │ use-mobile │ Supabase  │
│ PrflCntxt │ ProfileDtail│   ProfileView│ use-toast  │  Client   │
│           │    Map      │     Auth     │            │           │
│           │ SearchBar   │    Admin     │            │           │
│           │AdminPanel   │  AdminPanel  │            │           │
│           │LoadingIndic.│   NotFound   │            │           │
└───────────┴─────────────┴──────────────┴────────────┴───────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
├────────────────────────────────┬────────────────────────────────┤
│                                │                                 │
│         Supabase Backend       │          Mapbox API            │
│                                │                                 │
├────────────────────────────────┼────────────────────────────────┤
│ - Authentication               │ - Interactive Maps             │
│ - User Management              │ - Geocoding                    │
│ - Profile Data Storage         │ - Location Markers             │
│ - Row-Level Security           │ - Address Visualization        │
└────────────────────────────────┴────────────────────────────────┘
```

## User Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Auth Page  │────►│  Home Page  │────►│Profile View │
│             │     │             │     │             │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           │
                           ▼
┌─────────────┐     ┌─────────────┐
│             │     │             │
│ Admin Panel │◄────┤Settings Menu│
│             │     │             │
└─────────────┘     └─────────────┘
```

### Detailed User Flow

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│                       New User                            │
│                           │                               │
│                           ▼                               │
│┌─────────────┐    ┌───────────────┐    ┌───────────────┐ │
││             │    │               │    │               │ │
││  Sign Up    │───►│Email Verfctn  │───►│  First Login  │ │
││             │    │               │    │               │ │
│└─────────────┘    └───────────────┘    └───────┬───────┘ │
│                                                │         │
└────────────────────────────────────────────────┼─────────┘
                                                 │
┌────────────────────────────────────────────────┼─────────┐
│                                                │         │
│                    Returning User               ▼        │
│                                         ┌─────────────┐  │
│                                         │             │  │
│                                         │   Login     │  │
│                                         │             │  │
│                                         └──────┬──────┘  │
│                                                │         │
└────────────────────────────────────────────────┼─────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        Main Application                     │
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │             │      │             │      │             │ │
│  │ Grid View   │◄────►│  Map View   │      │Search/Filter│ │
│  │             │      │             │      │             │ │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘ │
│         │                    │                    │        │
│         ▼                    ▼                    ▼        │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │             │      │             │      │             │ │
│  │Profile Card │      │Location View│      │Profile View │ │
│  │             │      │             │      │             │ │
│  └─────────────┘      └─────────────┘      └─────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Admin Access
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                       Admin Functionality                   │
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │             │      │             │      │             │ │
│  │Admin Overview│────►│ Add Profile │      │ Edit Profile│ │
│  │             │      │             │      │             │ │
│  └─────────────┘      └─────────────┘      └─────────────┘ │
│         │                                         ▲        │
│         │                                         │        │
│         └─────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Features

### 1. Authentication
- **User Registration**: Create a new account with email and password
- **Login**: Secure login with email and password
- **Session Management**: Persistent sessions with automatic token refresh
- **Protected Routes**: Content is protected and only available to authenticated users
- **Admin Access**: Special admin interface for authorized users

### 2. Profile Browsing
- **Grid View**: Browse profiles in a clean, card-based layout
- **Map View**: View all profiles on an interactive map
- **Profile Details**: Click on a profile to view comprehensive information
- **Responsive Design**: Access from any device with a responsive interface

### 3. Interactive Mapping
- **Mapbox Integration**: Visualize profile locations using Mapbox
- **Location Markers**: Clickable markers show profile information
- **Dynamic Map Navigation**: Pan and zoom to explore locations
- **Profile Selection**: View a specific profile's location by selecting it

### 4. Search and Filtering
- **Real-time Search**: Filter profiles as you type
- **Multi-field Search**: Search across name, description, address, company, position, and interests
- **Empty State Handling**: Informative messages when no profiles match the search

### 5. Admin Functionality
- **Admin Access**: Access the admin panel through the settings icon on the home page
- **Profile Management**: Add, edit, and delete profiles with a comprehensive form interface
- **Form Validation**: Ensure all required fields are properly filled
- **Image URL Support**: Add profile photos via URL
- **Location Coordinates**: Specify precise map coordinates for each profile
- **Interest Management**: Add and remove profile interests dynamically

### 6. User Experience
- **Loading Indicators**: Visual feedback during data loading
- **Toast Notifications**: Informative messages for user actions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Error Handling**: Graceful error management with user feedback
- **Animated Transitions**: Smooth animations between views and states

## Technical Details

### Technologies Used
- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **React Router**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **Mapbox GL**: Interactive mapping
- **Lucide React**: Icon library
- **React Query**: Data fetching
- **Supabase**: Backend authentication and data storage

## How to Use

### Authentication

1. **Sign Up**: Create a new account with email and password
2. **Log In**: Access your account with your credentials
3. **Log Out**: Sign out from the application using the logout button

### Viewing Profiles

1. **Browse Profiles**: The home page displays all profiles in a grid layout by default
2. **Switch Views**: Toggle between grid and map views using the buttons in the top right
3. **Search**: Use the search bar to filter profiles by name, description, address, company, position, or interests
4. **View Details**: Click the "Details" button on a profile card to see more information
5. **View Location**: Click the "Location" button to highlight the profile on the map

### Using the Map

1. **Enter Mapbox Token**: When first using the map, you'll need to enter your Mapbox public token
2. **Navigate**: Use mouse or touch controls to pan and zoom
3. **View Markers**: Click on markers to see brief profile information
4. **Select Profile**: When a profile is selected, its information appears below the map

### Admin Functionality

1. **Access Admin**: Click the settings icon in the top right of the home page
2. **Manage Profiles**: View all profiles with edit and delete options
3. **Add Profile**: Click "Add New Profile" to create a new profile
4. **Edit Profile**: Click the edit icon on a profile to modify its information
5. **Delete Profile**: Click the trash icon to remove a profile (with confirmation)

## Setup and Development

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Environment Setup**: Configure your Supabase credentials
4. **Start Development Server**: `npm run dev`
5. **Mapbox Integration**: For the map functionality, you'll need a Mapbox public token
6. **Authentication**: Database is already configured with Row-Level Security for user data protection

## Troubleshooting

### Authentication Issues
- If you're having trouble logging in, ensure your email and password are correct
- For new accounts, check your email for verification if required
- Clear browser cache if persistent issues occur
- For development, you may want to disable email verification in the Supabase dashboard

### Map Not Loading
- Ensure you've entered a valid Mapbox public token
- Check console for any errors related to map initialization
- Verify that coordinates are in the correct format [longitude, latitude]
- If the map shows an unauthorized error, try clearing your mapbox token from local storage

### Profile Changes Not Saving
- Ensure all required fields are filled
- Check for any validation errors highlighted in the form
- Verify you are properly authenticated before attempting changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
