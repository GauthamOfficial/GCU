-- Add display_order column to testimonials table
ALTER TABLE testimonials 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Set initial order based on created_at (oldest first)
UPDATE testimonials 
SET display_order = subquery.row_number 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) - 1 as row_number 
  FROM testimonials
) AS subquery 
WHERE testimonials.id = subquery.id;
