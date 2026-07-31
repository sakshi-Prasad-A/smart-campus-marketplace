# 🎓 Smart Campus Marketplace

> A full-stack web app for **BCA students** to buy and sell used books, electronics, and lab equipment within campus — fast, safe, and mobile-first.

🔗 **Live Demo:** [https://smart-campus-marketplace-tech-7e38.vercel.app](https://smart-campus-marketplace-tech-7e38.vercel.app) *(Publicly Accessible — No Login Required)*

📂 **GitHub Repo:** [https://github.com/sakshi-Prasad-A/smart-campus-marketplace](https://github.com/sakshi-Prasad-A/smart-campus-marketplace)

---

## ✨ Features

- 🏪 **Browse Listings** — Responsive card grid of campus items pulled live from Supabase
- 🔍 **Smart Search & Filtering** — Filter by category (Books / Electronics / Lab Equipment) and search by title, seller name, or roll number
- 📦 **Item Detail Modal** — Full listing detail with seller info, condition, location, and direct WhatsApp contact
- ➕ **Post a Listing** — `/sell` form to publish new items directly to the Supabase database
- 🟢 **Live DB Status Bar** — Shows whether data is live from Supabase or using placeholder data
- 💬 **WhatsApp Integration** — One-click pre-filled WhatsApp message to contact the seller
- 🌙 **Dark Glassmorphism UI** — Premium dark theme with backdrop blur, gradient text, and hover glow effects
- 📱 **Mobile-First Responsive** — Fully responsive across phones, tablets, and desktops

---

## 🛠️ Tech Stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| **Frontend** | Next.js 15 (App Router) + TypeScript     |
| **Styling**  | Tailwind CSS v4 + Custom CSS Utilities   |
| **Icons**    | Lucide React                             |
| **Database** | Supabase (PostgreSQL + Row Level Security)|
| **Auth**     | Supabase Auth (demo seller ID for guest) |
| **Hosting**  | Vercel (Production)                      |

---

## 📁 Project Structure

```
smart-campus-marketplace/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Inter font + metadata
│   │   ├── globals.css         # Global CSS + glassmorphism utilities
│   │   ├── page.tsx            # Home page (/) — listing grid + DB status
│   │   └── sell/
│   │       └── page.tsx        # Sell page (/sell) — create listing form
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky glass nav with brand + Sell Item CTA
│   │   ├── HeroBanner.tsx      # Hero section with gradient headline + feature pills
│   │   ├── CategoryFilter.tsx  # Tab filter (All / Books / Electronics / Lab) + search
│   │   ├── ListingCard.tsx     # Card component with image, price, seller info
│   │   ├── ListingModal.tsx    # Detail modal with WhatsApp contact button
│   │   └── Footer.tsx          # Footer with campus trade guidelines
│   ├── lib/
│   │   └── supabaseClient.ts   # Supabase client + fetch/create listing functions
│   ├── types/
│   │   └── listing.ts          # TypeScript interfaces for Listing & Profile
│   └── data/
│       └── dummyListings.ts    # 6 sample placeholder listings (fallback)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 🗄️ Supabase Data Model

### `profiles` table
| Column           | Type      | Notes                              |
|------------------|-----------|------------------------------------|
| `id`             | uuid      | Primary key, references auth.users |
| `full_name`      | text      |                                    |
| `roll_number`    | text      |                                    |
| `contact_number` | text      |                                    |
| `created_at`     | timestamp | Default `now()`                    |

### `listings` table
| Column        | Type      | Notes                                    |
|---------------|-----------|------------------------------------------|
| `id`          | uuid      | Primary key, auto-generated              |
| `seller_id`   | uuid      | Foreign key → `profiles.id`             |
| `title`       | text      |                                          |
| `description` | text      |                                          |
| `price`       | numeric   |                                          |
| `category`    | text      | `Books` / `Electronics` / `Lab Equipment`|
| `image_url`   | text      | Nullable                                 |
| `created_at`  | timestamp | Default `now()`                          |

### Row Level Security Policies
- ✅ Any user can `SELECT` all listings
- 🔒 Users can only `INSERT/UPDATE/DELETE` rows where `seller_id = auth.uid()`

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/sakshi-Prasad-A/smart-campus-marketplace.git
cd smart-campus-marketplace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Pages

| Route   | Description                                                                 |
|---------|-----------------------------------------------------------------------------|
| `/`     | Home — responsive grid of listings, category filter, search, DB status bar |
| `/sell` | Sell — form to post a new item (title, category, price, description, image) |

---

## 🎨 Design Highlights

- **Glassmorphism Cards** — Backdrop blur with dark translucent backgrounds
- **Gradient Text** — Indigo → Purple → Emerald animated gradient on headline
- **Glow Hover Effect** — Cards lift and glow indigo on hover
- **Custom Scrollbar** — Dark-themed scrollbar for the modal overlay
- **DB Status Indicator** — Real-time indicator showing Live Supabase vs. Placeholder data
- **Pulse Skeleton Loading** — Animated placeholder cards while fetching data

---

## 🔮 Out of Scope (Phase 1)

- Full user authentication flow (login/signup UI)
- Payment / checkout integration
- AI-powered semantic search
- Image upload (uses URL input only in Phase 1)

---

## 📦 Build & Deploy

The app is deployed to **Vercel** for production hosting.

```bash
npm run build   # Build production bundle
npm run start   # Start production server
```

**Vercel Environment Variables to set:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🙌 Built By

**Sakshi Prasad** — BCA Student Project  
Smart Campus Marketplace — Phase 1 Prototype
