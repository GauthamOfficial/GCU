-- Testimonials Table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    role TEXT,
    message TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials
CREATE POLICY "Public can view active testimonials"
ON testimonials FOR SELECT
USING (is_active = true);

-- Sample testimonials (optional - for testing)
INSERT INTO testimonials (name, role, message, image_url, is_active) VALUES
('Sarah Johnson', 'Bride', 'Studio GCU captured our wedding day perfectly. The cinematic quality and attention to detail exceeded our expectations. Highly recommend!', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', true),
('Michael Chen', 'Event Organizer', 'Professional, creative, and reliable. They transformed our corporate event into a visual masterpiece.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', true),
('Priya Sharma', 'Birthday Celebrant', 'The pre-shoot and birthday video were absolutely stunning. Worth every penny!', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', true);
