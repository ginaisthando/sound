'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waveform } from '@/components/ui/waveform';
import { useCart } from '@/hooks/useCart';
import { SoundPack, formatPrice } from '@/lib/utils';
import { Play, Pause, Download, Star, ShoppingCart } from 'lucide-react';

interface PackGridProps {
  packs: SoundPack[];
  loading?: boolean;
}

export function PackGrid({ packs, loading = false }: PackGridProps) {
  const { addItem, isInCart } = useCart();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayPreview = (packId: string) => {
    if (playingId === packId) {
      setPlayingId(null);
    } else {
      setPlayingId(packId);
      // In a real app, this would trigger audio playback
      setTimeout(() => setPlayingId(null), 3000); // Auto-stop after 3s for demo
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded mb-4" />
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-5 w-16 bg-gray-200 rounded" />
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="h-8 bg-gray-200 rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No sound packs found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packs.map((pack) => (
        <Card 
          key={pack.id} 
          variant="interactive" 
          className="group overflow-hidden transition-all duration-200 hover:shadow-lg"
        >
          {/* Pack Cover */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <Waveform
                size="lg"
                isPlaying={playingId === pack.id}
                barCount={25}
                animated={true}
                className={`transition-all duration-300 ${
                  playingId === pack.id 
                    ? 'text-blue-600 scale-110' 
                    : 'text-blue-400 group-hover:text-blue-500'
                }`}
              />
            </div>
            
            {/* Play Button */}
            <button
              onClick={() => handlePlayPreview(pack.id)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-90 text-blue-600 shadow-md transition-all hover:bg-opacity-100 hover:scale-110 group-hover:scale-105"
            >
              {playingId === pack.id ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {pack.isFree && (
                <Badge variant="free">
                  Free
                </Badge>
              )}
              {!pack.isFree && pack.price < 20 && (
                <Badge variant="warning" className="bg-orange-100 text-orange-800">
                  Sale
                </Badge>
              )}
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="text-xs capitalize">
                {pack.category}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <Link href={`/pack/${pack.id}`} className="group-hover:text-blue-600 transition-colors">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                {pack.title}
              </h3>
            </Link>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {pack.description}
            </p>

            {/* Pack Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                🎵 {pack.trackCount} tracks
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {pack.rating}
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {pack.downloads.toLocaleString()}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {pack.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
              {pack.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0">
                  +{pack.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {pack.isFree ? (
                <span className="text-lg font-bold text-green-600">Free</span>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(pack.price)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Link href={`/pack/${pack.id}`}>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </Link>
              {!isInCart(pack.id) ? (
                <Button
                  size="sm"
                  onClick={() => addItem(pack)}
                  className="gap-1"
                >
                  {pack.isFree ? (
                    <>
                      <Download className="h-3 w-3" />
                      Download
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3 w-3" />
                      Add to Cart
                    </>
                  )}
                </Button>
              ) : (
                <Badge variant="success" className="px-3 py-1">
                  In Cart
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
