'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waveform } from '@/components/ui/waveform';
import { useCart } from '@/hooks/useCart';
import { useAudio } from '@/hooks/useAudio';
import { MOCK_PACKS, formatPrice } from '@/lib/utils';
import { Play, Pause, Download, Star } from 'lucide-react';
import { useState } from 'react';

export function FeaturedPacks() {
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

  const featuredPacks = MOCK_PACKS.slice(0, 6);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Sound Packs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked collections from our top creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPacks.map((pack) => (
            <Card key={pack.id} variant="elevated" className="overflow-hidden">
              {/* Pack Cover */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 p-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Waveform
                    size="lg"
                    isPlaying={playingId === pack.id}
                    barCount={25}
                    animated={true}
                    className={playingId === pack.id ? 'text-blue-600' : 'text-blue-400'}
                  />
                </div>
                
                {/* Play Button */}
                <button
                  onClick={() => handlePlayPreview(pack.id)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-90 text-blue-600 shadow-md transition-all hover:bg-opacity-100 hover:scale-110"
                >
                  {playingId === pack.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>

                {/* Free Badge */}
                {pack.isFree && (
                  <Badge variant="free" className="absolute top-4 left-4">
                    Free
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {pack.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pack.description}
                    </p>
                  </div>
                </div>

                {/* Pack Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{pack.trackCount} tracks</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{pack.rating}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{pack.downloads.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pack.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
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
                      View Pack
                    </Button>
                  </Link>
                  {!isInCart(pack.id) && (
                    <Button
                      size="sm"
                      onClick={() => addItem(pack)}
                      disabled={pack.isFree}
                    >
                      {pack.isFree ? 'Download' : 'Add to Cart'}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/browse">
            <Button variant="outline" size="lg">
              Browse All Packs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
