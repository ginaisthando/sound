'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Waveform } from '@/components/ui/waveform';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-red-500 py-20 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find the perfect sound for your{' '}
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              next project
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="mb-8 text-lg text-blue-100 sm:text-xl lg:text-2xl">
            Discover thousands of high-quality sound effects and music packs 
            from professional creators around the world.
          </p>

          {/* Animated Waveform */}
          <div className="mb-10 flex justify-center">
            <Waveform 
              size="xl" 
              variant="default"
              barCount={30}
              animated={true}
              isPlaying={true}
              className="text-white opacity-60"
            />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/browse">
              <Button 
                size="xl" 
                variant="secondary"
                className="w-full bg-white text-blue-600 hover:bg-blue-50 sm:w-auto"
              >
                Browse Packs
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                size="xl" 
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-blue-600 sm:w-auto"
              >
                Start Free
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold sm:text-3xl">10K+</div>
              <div className="text-sm text-blue-100">Sound Packs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold sm:text-3xl">50K+</div>
              <div className="text-sm text-blue-100">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold sm:text-3xl">1M+</div>
              <div className="text-sm text-blue-100">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold sm:text-3xl">4.9★</div>
              <div className="text-sm text-blue-100">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
