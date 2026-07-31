'use client';

import React from 'react';
import { Listing } from '@/types/listing';
import { User, MapPin, Tag, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Books':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Electronics':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Lab Equipment':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div
      onClick={() => onClick(listing)}
      className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 glow-on-hover cursor-pointer flex flex-col group transition-all duration-300"
    >
      {/* Listing Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={listing.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md ${getCategoryColor(listing.category)}`}>
            {listing.category}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-xl text-sm font-extrabold bg-slate-950/90 text-emerald-400 border border-emerald-500/30 shadow-md">
            ₹{listing.price}
          </span>
        </div>

        {/* Location tag bottom overlay */}
        {listing.location && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800 backdrop-blur-sm">
            <MapPin className="w-3 h-3 text-indigo-400" />
            <span className="truncate max-w-[180px]">{listing.location}</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg line-clamp-2 group-hover:text-indigo-300 transition-colors leading-snug">
            {listing.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Seller Info & Meta */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-[10px]">
              {listing.seller_name ? listing.seller_name.charAt(0) : 'U'}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-200 text-xs truncate max-w-[110px]">
                {listing.seller_name || 'Student Seller'}
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">
                {listing.roll_number || 'BCA Verified'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{getTimeAgo(listing.created_at)}</span>
          </div>
        </div>

        {/* View Details Action */}
        <div className="pt-1 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
          <span>View Listing Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
