
export interface Profile {
  id: number;
  name: string;
  photo: string;
  description: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  interests?: string[];
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  company?: string;
  position?: string;
}

export const mockProfiles: Profile[] = [
  {
    id: 1,
    name: "Emma Wilson",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "UX designer specializing in user research and interface design.",
    address: "123 Tech Lane, San Francisco, CA",
    coordinates: [-122.4194, 37.7749],
    contact: {
      email: "emma.wilson@example.com",
      phone: "+1 (555) 123-4567",
      website: "emmadesigns.example.com"
    },
    interests: ["Design", "Photography", "Hiking"],
    socialMedia: {
      twitter: "@emmadesigns",
      linkedin: "linkedin.com/in/emmawilson",
      instagram: "@emma.creates"
    },
    company: "Design Forward Labs",
    position: "Senior UX Designer"
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Full stack developer with a passion for building scalable applications.",
    address: "456 Coding Blvd, Seattle, WA",
    coordinates: [-122.3321, 47.6062],
    contact: {
      email: "michael.chen@example.com",
      phone: "+1 (555) 987-6543",
      website: "michaelcodes.example.com"
    },
    interests: ["Programming", "AI", "Rock Climbing"],
    socialMedia: {
      twitter: "@michaelcodes",
      linkedin: "linkedin.com/in/michaelchen",
      instagram: "@michael.dev"
    },
    company: "TechStack Solutions",
    position: "Lead Developer"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Marketing strategist with expertise in digital campaigns and brand growth.",
    address: "789 Market Street, New York, NY",
    coordinates: [-74.0060, 40.7128],
    contact: {
      email: "sophia.rodriguez@example.com",
      phone: "+1 (555) 765-4321",
      website: "sophiamarketing.example.com"
    },
    interests: ["Marketing", "Travel", "Cooking"],
    socialMedia: {
      twitter: "@sophiamarkets",
      linkedin: "linkedin.com/in/sophiarodriguez",
      instagram: "@sophia.markets"
    },
    company: "BrandBoost Agency",
    position: "Marketing Director"
  },
  {
    id: 4,
    name: "David Kim",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Data scientist specialized in machine learning and predictive analytics.",
    address: "101 Data Drive, Austin, TX",
    coordinates: [-97.7431, 30.2672],
    contact: {
      email: "david.kim@example.com",
      phone: "+1 (555) 234-5678",
      website: "davidkim.example.com"
    },
    interests: ["Data Science", "Chess", "Running"],
    socialMedia: {
      twitter: "@davidanalytics",
      linkedin: "linkedin.com/in/davidkim",
      instagram: "@david.data"
    },
    company: "DataDriven Research",
    position: "Chief Data Scientist"
  },
  {
    id: 5,
    name: "Olivia Johnson",
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Product manager focused on creating innovative solutions that solve real problems.",
    address: "202 Innovation Way, Boston, MA",
    coordinates: [-71.0589, 42.3601],
    contact: {
      email: "olivia.johnson@example.com",
      phone: "+1 (555) 876-5432",
      website: "oliviapm.example.com"
    },
    interests: ["Product Strategy", "Yoga", "Reading"],
    socialMedia: {
      twitter: "@oliviaproducts",
      linkedin: "linkedin.com/in/oliviajohnson",
      instagram: "@olivia.creates"
    },
    company: "NextGen Products",
    position: "Senior Product Manager"
  },
  {
    id: 6,
    name: "James Wilson",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Financial analyst with a strong background in investment strategy and market trends.",
    address: "303 Finance Court, Chicago, IL",
    coordinates: [-87.6298, 41.8781],
    contact: {
      email: "james.wilson@example.com",
      phone: "+1 (555) 345-6789",
      website: "jameswilson.example.com"
    },
    interests: ["Finance", "Golf", "History"],
    socialMedia: {
      twitter: "@jamesfinance",
      linkedin: "linkedin.com/in/jameswilson",
      instagram: "@james.invests"
    },
    company: "Future Investments Inc.",
    position: "Investment Strategist"
  }
];
