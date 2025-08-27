'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waveform } from '@/components/ui/waveform';
import { useCart } from '@/hooks/useCart';
import { SoundPack, formatPrice } from '@/lib/utils';
import { Play, Pause, Star, Download } from 'lucide-react';

interface RelatedPacksProps {
  packs: SoundPack[];
  currentPackId: string;
}

export function RelatedPacks({ packs, currentPackId }: RelatedPacksProps) {
  const { addItem, isInCart } = useCart();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const relatedPacks = packs.filter(pack => pack.id !== currentPackId).slice(0, 3);

  const handlePlayPreview = (packId: string) => {
    if (playingId === packId) {
      setPlayingId(null);
    } else {
      setPlayingId(packId);
      // In a real app, this would trigger audio playback
      setTimeout(() => setPlayingId(null), 3000); // Auto-stop after 3s for demo
    }
  };

  if (relatedPacks.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You Might Also Like
          </h2>
          <p className="text-gray-600">
            More sound packs from similar categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPacks.map((pack) => (
            <Card key={pack.id} variant="elevated" className="overflow-hidden group">
              {/* Pack Cover */}
              <div className="relative h-40 bg-gradient-to-br from-blue-100 to-purple-100 p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Waveform
                    size="default"
                    isPlaying={playingId === pack.id}
                    barCount={20}
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
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white bg-opacity-90 text-blue-600 shadow-md transition-all hover:bg-opacity-100 hover:scale-110"
                >
                  {playingId === pack.id ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3 ml-0.5" />
                  )}
                </button>

                {/* Free Badge */}
                {pack.isFree && (
                  <Badge variant="free" className="absolute top-3 left-3 text-xs">
                    Free
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <Link href={`/pack/${pack.id}`} className="group-hover:text-blue-600 transition-colors">
                  <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-1">
                    {pack.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {pack.description}
                </p>

                {/* Pack Stats */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{pack.trackCount} tracks</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{pack.rating}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{pack.downloads > 1000 ? `${Math.floor(pack.downloads / 1000)}k` : pack.downloads}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {pack.isFree ? (
                    <span className="text-base font-bold text-green-600">Free</span>
                  ) : (
                    <span className="text-base font-bold text-gray-900">
                      {formatPrice(pack.price)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href={`/pack/${pack.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  {!isInCart(pack.id) && (
                    <Button
                      size="sm"
                      onClick={() => addItem(pack)}
                      disabled={pack.isFree}
                    >
                      {pack.isFree ? 'Download' : 'Add'}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/browse">
            <Button variant="outline">
              Browse More Packs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
