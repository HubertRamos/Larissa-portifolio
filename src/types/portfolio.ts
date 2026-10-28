export interface SiteConfig {
  atelierName: string;
  tagline: string;
  subtitle: string;
  designerRole: string;
  manifesto: string[];
  edition: string;
  season: string;
  location: string;
  contactEmail: string;
  instagramHandle: string;
  linkedinUrl: string;
  showDemoNotice: boolean;
  notesForOwner: string;
}

export interface TechnicalSheet {
  silhouette?: string;
  fabrication?: string[];
  colorPalette?: string[];
  constructionTechniques?: string[];
  sampleSize?: string;
  year?: string;
}

export interface ProcessItem {
  id: string;
  title: string;
  category: 'sketch' | 'draping' | 'textile' | 'fitting' | string;
  caption: string;
  imageUrl: string;
  aspectRatio?: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
  credit?: string;
}

export interface Project {
  // Required core fields
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: (string | GalleryItem)[];
  featured: boolean;
  published: boolean;

  // Optional editorial fields
  year?: string;
  materials?: string | string[];
  credits?: string | string[];
  references?: string | string[];

  // Extended editorial attributes (optional)
  categoryLabel?: string;
  issueNumber?: string;
  summary?: string;
  concept?: string[];
  galleryImages?: GalleryItem[];
  technical?: TechnicalSheet;
  process?: ProcessItem[];
  outcomes?: string[];
  isFeatured?: boolean;
  isDemo?: boolean;
}

export interface AtelierStudy {
  id: string;
  title: string;
  medium: string;
  date: string;
  series: string;
  imageUrl: string;
  description: string;
  tags: string[];
  isDemo: boolean;
}

export interface ContactInquiry {
  name: string;
  email: string;
  type: 'general' | 'press' | 'collaboration' | 'commission';
  message: string;
}
