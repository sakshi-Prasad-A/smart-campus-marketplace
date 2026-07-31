export type ListingCategory = 'Books' | 'Electronics' | 'Lab Equipment';

export interface Profile {
  id: string;
  full_name: string;
  roll_number: string;
  contact_number?: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  image_url: string | null;
  created_at: string;
  // UI extended metadata for dummy data display
  seller_name?: string;
  roll_number?: string;
  contact_number?: string | null;
  condition?: 'Like New' | 'Good' | 'Fair';
  location?: string;
}
