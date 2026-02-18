-- Studio GCU Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PACKAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PORTFOLIO ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Birthday', 'Pre-shoot', 'Traditional', 'Event', 'Music Video', 'Travel Highlights', 'Wedding Highlights', 'Promotion Videos', 'Web Project', 'Web Development', 'Design', 'Graphic Design')),
  video_url TEXT NOT NULL, -- Google Drive shareable link
  thumbnail_url TEXT, -- Google Drive shareable link for thumbnail
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  occasion_type TEXT NOT NULL,
  location TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Confirmed', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PACKAGES POLICIES
-- ============================================

-- Allow public read access to packages
CREATE POLICY "Allow public read access to packages"
  ON packages
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users (admin) full access to packages
CREATE POLICY "Allow authenticated full access to packages"
  ON packages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- PORTFOLIO ITEMS POLICIES
-- ============================================

-- Allow public read access to portfolio items
CREATE POLICY "Allow public read access to portfolio_items"
  ON portfolio_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users (admin) full access to portfolio items
CREATE POLICY "Allow authenticated full access to portfolio_items"
  ON portfolio_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- BOOKINGS POLICIES
-- ============================================

-- Allow public insert access to bookings (for booking form)
CREATE POLICY "Allow public insert access to bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) full access to bookings
CREATE POLICY "Allow authenticated full access to bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_packages_display_order ON packages(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_display_order ON portfolio_items(display_order);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Insert sample packages
INSERT INTO packages (name, description, starting_price, deliverables, is_popular, display_order)
VALUES
  (
    'Essential',
    'Perfect for intimate celebrations and small gatherings',
    25000,
    ARRAY['1-2 minute cinematic reel', 'Color grading', 'Background music', 'Digital delivery'],
    false,
    1
  ),
  (
    'Premium',
    'Our most popular package for memorable occasions',
    45000,
    ARRAY['3-4 minute cinematic reel', 'Professional color grading', 'Custom music selection', 'Raw footage included', 'Digital delivery', '2 revisions'],
    true,
    2
  ),
  (
    'Cinematic',
    'Full-scale production for your most special moments',
    75000,
    ARRAY['5-7 minute cinematic film', 'Advanced color grading', 'Custom soundtrack', 'Raw footage included', 'Drone shots (if applicable)', 'Digital delivery', 'Unlimited revisions'],
    false,
    3
  )
ON CONFLICT DO NOTHING;

-- Insert sample portfolio items (replace with actual Google Drive URLs)
INSERT INTO portfolio_items (title, category, video_url, thumbnail_url, description, display_order)
VALUES
  (
    'Sarah''s 21st Birthday',
    'Birthday',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=450&fit=crop',
    'A vibrant celebration of youth and joy',
    1
  ),
  (
    'Amal & Nisha Pre-Wedding',
    'Pre-shoot',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
    'A romantic journey through Colombo',
    2
  ),
  (
    'Traditional Homecoming',
    'Traditional',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=450&fit=crop',
    'Honoring heritage and family traditions',
    3
  )
ON CONFLICT DO NOTHING;
