# Studio GCU

A minimal, premium, cinematic booking website for Studio GCU - offering cinematic reels and short films for birthdays, pre-shoots, traditional shoots, and personal events in Sri Lanka.

## Features

- 🎬 **Cinematic Design**: Monochrome aesthetic with large typography and generous spacing
- 📱 **Mobile-First**: Fully responsive design optimized for all devices
- 🔐 **Secure Admin**: Google Sign-In authentication for admin dashboard
- 📦 **Package Management**: Display and manage service packages
- 🎥 **Portfolio Gallery**: Filterable portfolio with Google Drive video integration
- 📝 **Booking System**: Simple booking form with WhatsApp integration
- 🔒 **Row Level Security**: Supabase RLS policies for data protection

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Storage**: Google Drive (videos and images)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gcu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy contents of supabase-schema.sql and run in Supabase SQL Editor
   ```

5. **Configure Google OAuth**
   
   Follow the setup guide in `SETUP.md` for detailed instructions.

6. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gcu/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── book/           # Booking page
│   │   ├── packages/       # Packages page
│   │   ├── portfolio/      # Portfolio page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navigation.tsx  # Site navigation
│   │   └── Footer.tsx      # Site footer
│   └── lib/
│       ├── supabase/       # Supabase clients
│       └── types.ts        # TypeScript types
├── supabase-schema.sql     # Database schema
├── SETUP.md                # Detailed setup guide
└── README.md
```

## Key Pages

- **Home** (`/`): Hero section, services overview, featured work
- **Portfolio** (`/portfolio`): Filterable video gallery
- **Packages** (`/packages`): Service packages with pricing
- **Book** (`/book`): Booking request form
- **Admin** (`/admin`): Dashboard for managing bookings, packages, and portfolio

## Database Schema

### Tables

- **bookings**: Customer booking requests
- **packages**: Service packages with pricing
- **portfolio_items**: Portfolio videos and images

### Security

All tables use Row Level Security (RLS):
- Public: Read-only access to packages and portfolio
- Public: Insert-only access to bookings
- Admin: Full access to all tables (authenticated users)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

See `SETUP.md` for detailed deployment instructions.

## Design Principles

- **Minimal**: No visual clutter, only essential features
- **Premium**: High-end aesthetic with attention to detail
- **Cinematic**: Large typography, generous spacing, editorial feel
- **Monochrome**: Strictly black, white, and neutral greys
- **Mobile-First**: Optimized for mobile devices

## Google Drive Integration

Videos and images are stored in Google Drive to avoid Supabase's 1GB storage limit. The system automatically converts Google Drive sharing links to embeddable format.

### Adding Portfolio Items

1. Upload video to Google Drive
2. Set sharing to "Anyone with the link can view"
3. Copy shareable link
4. Add to portfolio via admin dashboard

## Admin Access

### Restricting Admin Users

After initial setup:
1. Sign in with your Google account at `/admin`
2. In Supabase, disable public signups
3. Only allow OAuth (Google)
4. Manually manage admin users in Supabase

## License

Private project for Studio GCU.

## Support

For setup help, see `SETUP.md` or contact the development team.
