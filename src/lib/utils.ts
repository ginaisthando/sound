import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
  }).format(price);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CATEGORIES = [
  { id: 'ambient', name: 'Ambient', icon: '🌙' },
  { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
  { id: 'electronic', name: 'Electronic', icon: '⚡' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'urban', name: 'Urban', icon: '🏙️' },
  { id: 'industrial', name: 'Industrial', icon: '⚙️' },
  { id: 'orchestral', name: 'Orchestral', icon: '🎼' },
  { id: 'retro', name: 'Retro', icon: '📻' },
] as const;

export type Category = typeof CATEGORIES[number];

export interface SoundPack {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  isFree: boolean;
  trackCount: number;
  duration: number;
  previewUrl?: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  downloads: number;
  rating: number;
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  waveformData: number[];
  audioUrl?: string;
  isLocked: boolean;
}

export const MOCK_PACKS: SoundPack[] = [
  {
    id: '1',
    title: 'Urban Nightscape',
    description: 'Atmospheric sounds from the city after dark',
    category: 'urban',
    price: 531.45,
    isFree: false,
    trackCount: 8,
    duration: 240,
    tags: ['city', 'night', 'atmospheric'],
    createdAt: '2024-01-15',
    downloads: 1247,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Forest Ambience',
    description: 'Natural forest sounds for relaxation',
    category: 'nature',
    price: 0,
    isFree: true,
    trackCount: 5,
    duration: 180,
    tags: ['forest', 'birds', 'peaceful'],
    createdAt: '2024-01-20',
    downloads: 3421,
    rating: 4.9,
  },
  {
    id: '3',
    title: 'Cinematic Orchestra',
    description: 'Epic orchestral compositions for film and games',
    category: 'orchestral',
    price: 886.22,
    isFree: false,
    trackCount: 12,
    duration: 480,
    tags: ['epic', 'orchestral', 'cinematic', 'dramatic'],
    createdAt: '2024-01-18',
    downloads: 892,
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Electronic Dreams',
    description: 'Futuristic electronic soundscapes',
    category: 'electronic',
    price: 442.59,
    isFree: false,
    trackCount: 10,
    duration: 320,
    tags: ['electronic', 'futuristic', 'synth'],
    createdAt: '2024-01-22',
    downloads: 2156,
    rating: 4.6,
  },
  {
    id: '5',
    title: 'Retro Arcade',
    description: 'Classic 8-bit and 16-bit game sounds',
    category: 'retro',
    price: 354.31,
    isFree: false,
    trackCount: 15,
    duration: 200,
    tags: ['8-bit', '16-bit', 'arcade', 'nostalgia'],
    createdAt: '2024-01-25',
    downloads: 1834,
    rating: 4.8,
  },
  {
    id: '6',
    title: 'Industrial Machinery',
    description: 'Heavy industrial and mechanical sounds',
    category: 'industrial',
    price: 620.28,
    isFree: false,
    trackCount: 20,
    duration: 600,
    tags: ['industrial', 'mechanical', 'heavy'],
    createdAt: '2024-01-28',
    downloads: 567,
    rating: 4.5,
  },
];
