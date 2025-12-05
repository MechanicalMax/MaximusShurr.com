interface Props {
  url: string;
}

export default function CaseStudyVideo({ url }: Props) {
  // Convert regular YouTube URLs to privacy-enhanced embed URLs
  const getEmbedUrl = (videoUrl: string): string => {
    // Handle various YouTube URL formats
    let videoId = '';
    
    // Extract video ID from different URL formats
    if (videoUrl.includes('youtube.com/watch?v=')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (videoUrl.includes('youtube.com/embed/')) {
      videoId = videoUrl.split('embed/')[1]?.split('?')[0] || '';
    }
    
    // Return privacy-enhanced embed URL
    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
    
    // If already a proper embed URL, ensure it uses youtube-nocookie
    if (videoUrl.includes('youtube-nocookie.com')) {
      return videoUrl;
    }
    
    // Fallback: replace youtube.com with youtube-nocookie.com
    return videoUrl.replace('youtube.com', 'youtube-nocookie.com');
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="aspect-video">
      <iframe
        src={embedUrl}
        className="w-full h-full rounded-lg shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Case study video"
      />
    </div>
  );
}
