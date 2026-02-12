import React from 'react';

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export const LearnMorePage: React.FC = () => {
  const videos = [
    {
      videoId: 'kpPCplrJy6Q',
      title: 'Getting Started as a Distributor',
      description: 'Learn the basics of becoming a successful distributor with our platform.'
    },
    {
      videoId: 'kpPCplrJy6Q',
      title: 'Maximizing Your Earnings',
      description: 'Discover strategies to increase your income as a sales agent.'
    },
    {
      videoId: 'kpPCplrJy6Q',
      title: 'Real-Time Order Tracking',
      description: 'See how our tracking system keeps you and your customers informed.'
    },
    {
      videoId: 'kpPCplrJy6Q',
      title: 'High Demand Products Overview',
      description: 'Explore the range of products available for distribution.'
    },
    {
      videoId: 'kpPCplrJy6Q',
      title: 'Success Stories from Our Agents',
      description: 'Hear from top-performing distributors about their journey.'
    },
    {
      videoId: 'kpPCplrJy6Q',
      title: 'Package Plans Explained',
      description: 'Understand which package is right for your business goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Learn More About Our Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch these videos to discover how you can benefit from joining our network of distributors and sales agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
};
