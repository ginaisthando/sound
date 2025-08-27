'use client';

import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const waveformVariants = cva(
  "flex items-end justify-center gap-0.5 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-blue-500",
        playing: "text-blue-600 animate-pulse",
        muted: "text-gray-300",
        locked: "text-gray-200"
      },
      size: {
        sm: "h-8",
        default: "h-12",
        lg: "h-16",
        xl: "h-24"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface WaveformProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof waveformVariants> {
  isPlaying?: boolean;
  isLocked?: boolean;
  barCount?: number;
  animated?: boolean;
}

const Waveform = forwardRef<HTMLDivElement, WaveformProps>(
  ({ 
    className, 
    variant, 
    size, 
    isPlaying = false, 
    isLocked = false,
    barCount = 20,
    animated = true,
    ...props 
  }, ref) => {
    const [bars, setBars] = useState<number[]>([]);

    useEffect(() => {
      // Generate random bar heights
      const newBars = Array.from({ length: barCount }, () => 
        Math.random() * 0.8 + 0.2 // Heights between 20% and 100%
      );
      setBars(newBars);
    }, [barCount]);

    const getVariant = () => {
      if (isLocked) return 'locked';
      if (isPlaying) return 'playing';
      return variant;
    };

    return (
      <div
        ref={ref}
        className={clsx(waveformVariants({ variant: getVariant(), size }), className)}
        {...props}
      >
        {bars.map((height, index) => (
          <div
            key={index}
            className={clsx(
              "w-1 bg-current rounded-full transition-all duration-150",
              animated && isPlaying && "animate-waveform",
              isLocked && "opacity-30"
            )}
            style={{
              height: `${height * 100}%`,
              animationDelay: animated ? `${index * 0.1}s` : '0s'
            }}
          />
        ))}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-gray-800 bg-opacity-80 p-2">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Waveform.displayName = "Waveform";

export { Waveform, waveformVariants };
