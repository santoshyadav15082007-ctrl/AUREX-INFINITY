export type AmbienceTheme = 'solaris-gold' | 'midnight-obsidian' | 'platinum-aurora';

export interface SignatureExperience {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  curatorNotes: string;
  features: string[];
  availability: string;
  allocation: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  edition: string;
  category: 'all' | 'horlogerie' | 'aeronautica' | 'nautical' | 'estates';
  image: string;
  description: string;
  specifications: { label: string; value: string }[];
  status: string;
}

export interface MetricItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  title: string;
  location: string;
  acquisitionType: string;
  year: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  tierLevel: string;
  annualDues: string;
  initiation: string;
  privileges: string[];
  recommended?: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  assetInterest: string;
  timeframe: string;
  confidentialNotes: string;
}
