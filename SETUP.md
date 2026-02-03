# Studio GCU - Setup Guide

This guide will help you set up and deploy the Studio GCU booking website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Vercel account (free tier works)
- Google Cloud Console account (for Google Sign-In)

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: Studio GCU
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to Sri Lanka (e.g., Singapore)
4. Click "Create new project"

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from the project root
4. Paste into the SQL editor
5. Click "Run" to execute the schema
6. Verify tables were created in **Table Editor**

### 1.3 Configure Google OAuth

1. In Supabase, go to **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Enable Google provider
4. You'll need to set up Google OAuth credentials (see Step 2)

### 1.4 Get API Keys

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 2: Google OAuth Setup

### 2.1 Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure consent screen if prompted
6. Application type: **Web application**
7. Add authorized redirect URIs:
   ```
   https://YOUR_SUPABASE_PROJECT_URL.supabase.co/auth/v1/callback
   ```
8. Click **Create**
9. Copy **Client ID** and **Client Secret**

### 2.2 Add to Supabase

1. Return to Supabase **Authentication** → **Providers** → **Google**
2. Paste **Client ID** and **Client Secret**
3. Click **Save**

### 2.3 Restrict Admin Access (Important!)

By default, any Google account can sign in. To restrict to specific admin emails:

1. In Supabase, go to **Authentication** → **Policies**
2. You can add custom logic or manually manage admin users
3. **Recommended**: After first admin signs in, disable public signups:
   - Go to **Authentication** → **Settings**
   - Disable "Enable email signups"
   - Only allow OAuth (Google)

## Step 3: Local Development

### 3.1 Install Dependencies

```bash
cd d:\My Files\gcu
npm install
```

### 3.2 Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 3.3 Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## Step 4: Google Drive Setup

### 4.1 Upload Videos

1. Upload your videos to Google Drive
2. For each video:
   - Right-click → **Get link**
   - Set to **Anyone with the link can view**
   - Copy the shareable link

### 4.2 Add to Portfolio

1. Sign in to admin dashboard at `/admin`
2. Go to **Portfolio** tab
3. Add new items with Google Drive links
4. The system will automatically convert them to embeddable format

**Note**: For thumbnails, you can:
- Upload thumbnail images to Google Drive
- Use the same sharing process
- Or leave blank for a placeholder

## Step 5: Deployment to Vercel

### 5.1 Push to GitHub

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/studio-gcu.git
   git push -u origin main
   ```

### 5.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

6. Click **Deploy**

### 5.3 Update Google OAuth

After deployment, add your Vercel domain to Google OAuth:

1. Go to Google Cloud Console → Credentials
2. Edit your OAuth client
3. Add authorized redirect URI:
   ```
   https://YOUR_SUPABASE_PROJECT_URL.supabase.co/auth/v1/callback
   ```
4. Also add your Vercel domain if needed

## Step 6: Post-Deployment

### 6.1 Add Sample Data

1. Visit your deployed site
2. Sign in to `/admin` with Google
3. Add packages, portfolio items, and test the booking flow

### 6.2 Update Contact Information

Edit `src/components/Footer.tsx` to update:
- WhatsApp number
- Email address
- Any other contact details

### 6.3 SEO & Metadata

Update `src/app/layout.tsx` with:
- Correct site URL
- Social media links (if applicable)
- Open Graph images

## Troubleshooting

### Issue: "Invalid API key"
- Double-check your `.env.local` file
- Ensure no extra spaces in environment variables
- Restart dev server after changing env vars

### Issue: Google Sign-In not working
- Verify redirect URIs match exactly
- Check that Google OAuth is enabled in Supabase
- Ensure you're using the correct Client ID and Secret

### Issue: Videos not loading from Google Drive
- Ensure sharing is set to "Anyone with the link"
- Check that URLs are in the correct format
- Try using the direct file ID format

### Issue: RLS policies blocking access
- Verify you're signed in as admin
- Check Supabase logs for policy violations
- Ensure service role key is correct for admin operations

## Maintenance

### Adding New Packages
1. Sign in to admin dashboard
2. Currently manual via Supabase dashboard
3. Future: Add UI for package management

### Managing Bookings
1. View all bookings in admin dashboard
2. Update status as you progress
3. Click WhatsApp numbers to contact clients directly

### Updating Portfolio
1. Upload videos to Google Drive
2. Add via admin dashboard
3. Set display order for sorting

## Support

For issues or questions:
- Check Supabase logs: **Logs** → **API Logs**
- Check Vercel logs: **Deployments** → Select deployment → **Logs**
- Review browser console for client-side errors

---

**Congratulations!** Your Studio GCU booking website is now live. 🎬
