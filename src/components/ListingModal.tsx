'use client';

import React from 'react';
import { Listing } from '@/types/listing';
import { X, MapPin, User, ShieldCheck, MessageSquare, Phone, ExternalLink } from 'lucide-react';

interface ListingModalProps {
  listing: Listing | null;
  onClose: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({ listing, onClose }) => {
  if (!listing) return null;

  const phone = listing.contact_number || '+919876543210';
  // Strip non-digit characters for WhatsApp API link
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hi ${listing.seller_name || 'Seller'}, I am interested in buying your listing "${listing.title}" (₹${listing.price}) listed on Smart Campus Marketplace.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={listing.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            {/* Price badge floating */}
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-black text-emerald-400 bg-slate-950/90 px-4 py-1.5 rounded-xl border border-emerald-500/40 shadow-xl">
                ₹{listing.price}
              </span>
            </div>
          </div>

          {/* Title and Category */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {listing.category}
              </span>
              {listing.condition && (
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Condition: {listing.condition}
                </span>
              )}
              <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Campus Verified
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {listing.title}
            </h2>
          </div>

          {/* Description */}
          <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Item Description</h4>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Seller & Contact Info Card */}
          <div className="bg-slate-950/90 p-5 rounded-2xl border border-indigo-500/20 space-y-4">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-400" />
              Seller Contact & Verification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-xs text-slate-400 block">Seller Name</span>
                <span className="text-sm font-bold text-white">{listing.seller_name || 'BCA Student'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Roll Number</span>
                <span className="text-sm font-bold text-indigo-300 font-mono">{listing.roll_number || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">WhatsApp / Phone</span>
                <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                  {phone}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Preferred Campus Meetup</span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {listing.location || 'BCA Department Main Entrance'}
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.01]"
            >
              <MessageSquare className="w-5 h-5 text-emerald-200" />
              <span>Contact Seller via WhatsApp Message</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
