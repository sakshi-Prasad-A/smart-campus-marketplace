import { createClient } from '@supabase/supabase-js';
import { Listing } from '@/types/listing';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vyibmdkdlvxljxmwtyqm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aWJtZGtkbHZ4bGp4bXd0eXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NjY2MTYsImV4cCI6MjEwMTA0MjYxNn0.rP2oIMIyoSJQyGl-aeCXmPfC3evuSP5JdNEGKj-touc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default campus seller profile for demo / guest submissions
export const DEFAULT_DEMO_SELLER_ID = '11111111-1111-1111-1111-111111111111';

/**
 * Fetch all listings from Supabase joined with seller profile info
 */
export async function fetchListingsFromSupabase(): Promise<{ data: Listing[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        seller_id,
        title,
        description,
        price,
        category,
        image_url,
        created_at,
        profiles (
          full_name,
          roll_number,
          contact_number
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return { data: null, error };
    }

    if (!data) return { data: [], error: null };

    // Format joined payload into Listing objects
    const formatted: Listing[] = data.map((item: any) => ({
      id: item.id,
      seller_id: item.seller_id,
      title: item.title,
      description: item.description,
      price: Number(item.price),
      category: item.category,
      image_url: item.image_url,
      created_at: item.created_at,
      seller_name: item.profiles?.full_name || 'Rahul Sharma',
      roll_number: item.profiles?.roll_number || 'BCA-2024-042',
      contact_number: item.profiles?.contact_number || '+919876543210',
      condition: item.category === 'Books' ? 'Good' : 'Like New',
      location: 'BCA Main Block'
    }));

    return { data: formatted, error: null };
  } catch (err) {
    console.error('Unexpected Supabase error:', err);
    return { data: null, error: err };
  }
}

/**
 * Create a new listing row in Supabase listings table
 */
export async function createListingInSupabase(newListing: {
  title: string;
  description: string;
  price: number;
  category: 'Books' | 'Electronics' | 'Lab Equipment';
  image_url?: string | null;
  seller_id?: string;
}): Promise<{ data: any; error: any }> {
  const sellerId = newListing.seller_id || DEFAULT_DEMO_SELLER_ID;

  const payload = {
    seller_id: sellerId,
    title: newListing.title,
    description: newListing.description,
    price: newListing.price,
    category: newListing.category,
    image_url: newListing.image_url || null,
  };

  const { data, error } = await supabase
    .from('listings')
    .insert([payload])
    .select();

  return { data, error };
}
