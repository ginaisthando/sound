'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Waveform } from '@/components/ui/waveform';
import { Track, formatDuration } from '@/lib/utils';
import { Play, Pause, Lock, Download } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
  isPurchased?: boolean;
  previewTrackId?: string;
}

export function TrackList({ tracks, isPurchased = false, previewTrackId }: TrackListProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlayTrack = (trackId: string, isLocked: boolean) => {
    if (isLocked && !isPurchased) {
      // Show tooltip or modal about unlocking
      return;
    }

    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
      // In a real app, this would trigger audio playback
      setTimeout(() => setPlayingTrackId(null), 3000); // Auto-stop after 3s for demo
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Track List</h2>
        <div className="text-sm text-gray-600">
          {tracks.length} tracks • {formatDuration(tracks.reduce((sum, track) => sum + track.duration, 0))}
        </div>
      </div>

      <div className="space-y-3">
        {tracks.map((track, index) => {
          const isPreview = track.id === previewTrackId;
          const isPlaying = playingTrackId === track.id;
          const canPlay = !track.isLocked || isPurchased || isPreview;

          return (
            <Card 
              key={track.id} 
              className={`transition-all hover:shadow-md ${isPreview ? 'ring-2 ring-green-500' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Track Number */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-sm font-medium text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => handlePlayTrack(track.id, track.isLocked)}
                    disabled={!canPlay}
                    className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      canPlay
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    title={!canPlay ? 'Unlock with purchase' : 'Play preview'}
                  >
                    {!canPlay ? (
                      <Lock className="h-4 w-4" />
                    ) : isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </button>

                  {/* Waveform */}
                  <div className="flex-1 min-w-0">
                    <Waveform
                      size="sm"
                      isPlaying={isPlaying}
                      isLocked={track.isLocked && !isPurchased && !isPreview}
                      barCount={20}
                      animated={true}
                      className="w-full"
                    />
                  </div>

                  {/* Track Info */}
                  <div className="flex-shrink-0 text-right min-w-0">
                    <div className="font-medium text-gray-900 truncate max-w-48">
                      {track.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDuration(track.duration)}
                    </div>
                  </div>

                  {/* Preview Badge */}
                  {isPreview && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Free Preview
                      </span>
                    </div>
                  )}

                  {/* Locked Indicator */}
                  {track.isLocked && !isPurchased && !isPreview && (
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        <Lock className="h-3 w-3" />
                        <span className="text-xs">Locked</span>
                      </div>
                    </div>
                  )}

                  {/* Download Button (for purchased tracks) */}
                  {isPurchased && (
                    <div className="flex-shrink-0">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>

                {/* Locked Track Tooltip */}
                {track.isLocked && !isPurchased && !isPreview && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                      🔒 This track is locked. Purchase the pack to unlock all tracks.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Purchase CTA for locked tracks */}
      {!isPurchased && tracks.some(track => track.isLocked) && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Unlock All Tracks
              </h3>
              <p className="text-gray-600">
                Get access to all {tracks.length} tracks in high quality with commercial license.
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Lock className="h-4 w-4" />
              Unlock Pack
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
