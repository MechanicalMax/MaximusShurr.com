'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CarouselData } from '@/lib/types';

interface MediaCarouselProps {
  carouselData: CarouselData;
  slug: string;
}

export default function MediaCarousel({ carouselData, slug }: MediaCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define slide types
  type SlideData = 
    | { type: 'youtube'; url: string; caption: string }
    | { type: 'image' | 'video'; filename: string; path: string; caption: string; extension: '.webp' | '.webm' };

  // Build complete slide array including YouTube and media assets
  const slides: SlideData[] = [];
  
  // Add YouTube slide if present
  if (carouselData.hasYoutube && carouselData.youtubeUrl) {
    slides.push({
      type: 'youtube' as const,
      url: carouselData.youtubeUrl,
      caption: 'Project Video'
    });
  }
  
  // Add media assets
  carouselData.media.forEach(asset => {
    slides.push({
      type: asset.type,
      filename: asset.filename,
      path: asset.path,
      caption: asset.caption,
      extension: asset.extension
    });
  });

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (totalSlides === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden">
      {/* Main slide container */}
      <div className="relative aspect-video bg-black">
        {/* Slide content will be rendered here by sub-components */}
        <div className="absolute inset-0 flex items-center justify-center">
          {currentSlideData.type === 'youtube' && (
            <YouTubeSlide url={currentSlideData.url} />
          )}
          {currentSlideData.type === 'image' && (
            <ImageSlide 
              filename={currentSlideData.filename}
              path={currentSlideData.path}
              caption={currentSlideData.caption}
              slug={slug}
            />
          )}
          {currentSlideData.type === 'video' && (
            <VideoSlide 
              filename={currentSlideData.filename}
              path={currentSlideData.path}
              caption={currentSlideData.caption}
              slug={slug}
            />
          )}
        </div>

        {/* Navigation arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="bg-gray-800 px-6 py-4">
        <p className="text-white text-center font-medium">
          {currentSlideData.caption}
        </p>
      </div>

      {/* Slide indicators */}
      {totalSlides > 1 && (
        <div className="bg-gray-800 px-6 pb-4">
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentSlide
                    ? 'bg-white'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// YouTube slide component with security attributes
function YouTubeSlide({ url }: { url: string }) {
  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      
      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v');
      }
      
      // Handle youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      
      // Handle youtube.com/embed/VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/embed/')[1];
      }
      
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getYouTubeVideoId(url);
  
  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Invalid YouTube URL</p>
          <p className="text-sm text-gray-400">Unable to load video</p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;

  return (
    <iframe
      src={embedUrl}
      title="Project Video"
      className="w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-same-origin allow-presentation"
    />
  );
}

function ImageSlide({ filename, path, caption, slug }: { 
  filename: string; 
  path: string; 
  caption: string; 
  slug: string; 
}) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Image not found</p>
          <p className="text-sm text-gray-400">{filename}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <Image
        src={path}
        alt={caption}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        onError={() => setImageError(true)}
        priority={false}
      />
    </div>
  );
}

function VideoSlide({ filename, path, caption, slug }: { 
  filename: string; 
  path: string; 
  caption: string; 
  slug: string; 
}) {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (videoError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Video failed to load</p>
          <p className="text-sm text-gray-400">{filename}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}
      <video
        src={path}
        className="w-full h-full object-contain"
        autoPlay
        loop
        muted
        playsInline
        onError={() => setVideoError(true)}
        onLoadedData={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        preload="metadata"
      >
        <p className="text-white text-center">
          Your browser does not support the video tag.
        </p>
      </video>
    </div>
  );
}