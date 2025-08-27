'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waveform } from '@/components/ui/waveform';
import { useCart } from '@/hooks/useCart';
import { useAudio } from '@/hooks/useAudio';
import { SoundPack, formatPrice, CATEGORIES } from '@/lib/utils';
import { Play, Pause, Download, Star, ShoppingCart, Share2 } from 'lucide-react';

interface PackHeroProps {
  pack: SoundPack;
  previewTrack?: {
    title: string;
    audioUrl: string;
  };
}

export function PackHero({ pack, previewTrack }: PackHeroProps) {
  const { addItem, isInCart } = useCart();
  const { isPlaying, toggle } = useAudio(previewTrack?.audioUrl);
  const [isSharing, setIsSharing] = useState(false);

  const category = CATEGORIES.find(c => c.id === pack.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pack.title,
          text: pack.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Waveform Visualization */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center h-64 relative">
                <Waveform
                  size="xl"
                  isPlaying={isPlaying}
                  barCount={40}
                  animated={true}
                  className="w-full"
                />
                
                {/* Play Button Overlay */}
                {previewTrack && (
                  <button
                    onClick={toggle}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all rounded-2xl group"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all group-hover:scale-110">
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </div>
                  </button>
                )}
              </div>
              
              {previewTrack && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Preview: {previewTrack.title}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pack Information */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {pack.isFree && (
                <Badge variant="free" className="text-sm px-3 py-1">
                  Free Download
                </Badge>
              )}
              {category && (
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {category.icon} {category.name}
                </Badge>
              )}
              <Badge variant="outline" className="text-sm px-3 py-1">
                {pack.trackCount} Tracks
              </Badge>
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {pack.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {pack.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{pack.rating}</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Download className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold">{pack.downloads.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">
                  {Math.floor(pack.duration / 60)}m {pack.duration % 60}s
                </div>
                <p className="text-sm text-gray-600">Total Duration</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {pack.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  {pack.isFree ? (
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(pack.price)}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Commercial license included
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  {isSharing ? 'Copied!' : 'Share'}
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {pack.isFree ? (
                  <Button size="lg" className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download Free Pack
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 gap-2"
                      onClick={() => addItem(pack)}
                      disabled={isInCart(pack.id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isInCart(pack.id) ? 'In Cart' : 'Add to Cart'}
                    </Button>
                    <Button variant="outline" size="lg">
                      Buy Now
                    </Button>
                  </>
                )}
              </div>

              {!pack.isFree && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  30-day money-back guarantee • Instant download
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
