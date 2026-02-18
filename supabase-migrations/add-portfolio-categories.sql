-- Add new portfolio categories (Web Project, Web Development, Design, Graphic Design)
-- Run this in Supabase SQL Editor if you get "Invalid category" when adding website/design items.

-- Drop the existing check constraint (Postgres names it portfolio_items_category_check)
ALTER TABLE portfolio_items
  DROP CONSTRAINT IF EXISTS portfolio_items_category_check;

-- Add updated check constraint with new categories
ALTER TABLE portfolio_items
  ADD CONSTRAINT portfolio_items_category_check CHECK (
    category IN (
      'Birthday', 'Pre-shoot', 'Traditional', 'Event', 'Music Video',
      'Travel Highlights', 'Wedding Highlights', 'Promotion Videos',
      'Web Project', 'Web Development', 'Design', 'Graphic Design'
    )
  );
