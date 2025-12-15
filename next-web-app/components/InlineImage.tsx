'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface InlineImageProps {
  filename: string;
  alt?: string;
  className?: string;
}

/**
 * InlineImage component for referencing carousel assets within markdown content
 * Automatically resolves paths to the current case study's asset folder
 */
export default function InlineImage({ filename, alt, className = '' }: InlineImageProps) {
  const [imageError, setImageError] = useState(false);
  const params = useParams();
  const slug = params?.slug as string;

  // Validate filename to prevent path traversal attacks
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    console.warn(`Invalid filename provided to InlineImage: ${filename}`);
    return (
      <div 
        className="block my-6 text-center bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 mx-auto max-w-fit"
        role="alert"
        aria-label="Invalid image filename"
      >
        Invalid filename
      </div>
    );
  }

  // Validate slug
  if (!slug || typeof slug !== 'string') {
    console.warn('InlineImage: No valid slug found in params');
    return (
      <div 
        className="block my-6 text-center bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 mx-auto max-w-fit"
        role="alert"
        aria-label="Unable to resolve image path"
      >
        Unable to resolve image path
      </div>
    );
  }

  // Resolve path to current case study's asset folder
  const imagePath = `/case-study/${slug}/${filename}`;
  
  // Generate alt text from filename if not provided
  const altText = alt || filename.replace(/\.(webp|webm|jpg|jpeg|png|gif)$/i, '').replace(/-/g, ' ');

  // Handle image loading errors gracefully
  if (imageError) {
    return (
      <div 
        className="block my-6 text-center bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 mx-auto max-w-fit"
        role="alert"
        aria-label={`Image not found: ${filename}`}
      >
        Image not found: {filename}
      </div>
    );
  }

  return (
    <figure className={`block my-6 text-center ${className}`}>
      <Image
        src={imagePath}
        alt={altText}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        className="w-auto h-auto max-w-full rounded-lg shadow-sm border border-gray-200 mx-auto"
        onError={() => setImageError(true)}
        style={{
          maxHeight: '500px',
          objectFit: 'contain'
        }}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      {/* Optional caption for better accessibility */}
      {alt && (
        <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}