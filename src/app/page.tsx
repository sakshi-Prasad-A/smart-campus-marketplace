'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ListingCard } from '@/components/ListingCard';
import { ListingModal } from '@/components/ListingModal';
import { Footer } from '@/components/Footer';
import { DUMMY_LISTINGS } from '@/data/dummyListings';
import { fetchListingsFromSupabase } from '@/lib/supabaseClient';
import { Listing, ListingCategory } from '@/types/listing';
import { SearchX, Database, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveDatabase, setIsLiveDatabase] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ListingCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Load live Supabase data on mount
  const loadSupabaseData = async () => {
    setLoading(true);
    const { data, error } = await fetchListingsFromSupabase();
    
    if (!error && data !== null) {
      setListings(data);
      setIsLiveDatabase(true);
    } else {
      console.warn('Using dummy listings fallback due to error:', error);
      setListings(DUMMY_LISTINGS);
      setIsLiveDatabase(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSupabaseData();
  }, []);

  // Compute category item counts dynamically
  const itemCounts = useMemo(() => {
    const counts = {
      All: listings.length,
      Books: 0,
      Electronics: 0,
      'Lab Equipment': 0
    };

    listings.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    return counts;
  }, [listings]);

  // Filter listings based on active category tab & search query
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category check
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

      // Search query check (title, description, roll number, seller name)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.roll_number && item.roll_number.toLowerCase().includes(q)) ||
        (item.seller_name && item.seller_name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [listings, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white selection:bg-indigo-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Database Status Indicator Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400">Data Source:</span>
              {isLiveDatabase ? (
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Live Supabase Database (vyibmdkdlvxljxmwtyqm)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Initial Placeholder Data
                </span>
              )}
            </div>

            <button
              onClick={loadSupabaseData}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
              <span>{loading ? 'Refreshing...' : 'Sync DB'}</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          itemCounts={itemCounts}
        />

        {/* Listings Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Campus Marketplace Listings</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-slate-900/60 rounded-2xl border border-slate-800" />
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={(item) => setSelectedListing(item)}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto my-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No listings found</h3>
              <p className="text-xs text-slate-400">
                No items match your search &quot;{searchQuery}&quot; in {activeCategory}. Try adjusting your filter criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </section>
      </main>

      {/* Item Detail Modal */}
      <ListingModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
