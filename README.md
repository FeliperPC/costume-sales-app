# Pinda.Studio - Cosmaker & Prop Maker

A full-stack e-commerce web application for **Pinda.Studio**, a cosplay costume and prop-making business. Customers can browse available suits/costumes, view detailed product versions, and place custom orders with body measurements for tailored fits.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, React 19)
- **CMS:** [Sanity v4](https://www.sanity.io) (embedded studio at `/admin`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Forms:** React Hook Form + Zod validation
- **Language:** TypeScript

## Features

- **Landing Page** - Hero section, about us, stats, custom suit showcase, and client reviews
- **Product Catalog** (`/trajes`) - Paginated listing of available costumes with card previews
- **Product Details** (`/trajes/[slug]`) - Detailed view with version variants, image galleries, pricing, and rich descriptions
- **Order System** (`/pedido`) - Multi-section order form collecting:
  - Customer info (name, email, phone, gender)
  - Full body measurements (chest, waist, hip, thigh, knee, calf, biceps, forearm, wrist, neck, palm, hand length, height, weight, shoe size)
  - Shipping address (Brazilian format with CEP)
  - Optional notes, deadline, and reference images
- **Custom Suit Orders** - Customers can request fully custom costumes beyond the catalog
- **Admin Panel** (`/admin`) - Sanity Studio for managing suits, orders, reviews, and scheduling
- **WhatsApp Integration** - Floating contact button for direct communication
- **Real-time Content** - Sanity Live for instant content updates without redeployment

## Content Schema

| Document     | Description                                      |
|-------------|--------------------------------------------------|
| `suit`      | Costumes with multiple version variants           |
| `order`     | Customer orders with measurements and address     |
| `review`    | Client testimonials                               |
| `schedule`  | Singleton for managing open/closed booking status |
| `about`     | About section content                             |
| `customSuit`| Custom suit section content                       |

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project (get one at [sanity.io](https://www.sanity.io))

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-14
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the Sanity Studio.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing pages
│   │   ├── page.tsx         # Landing page
│   │   ├── trajes/          # Product catalog & detail pages
│   │   └── pedido/          # Order form pages
│   └── admin/               # Sanity Studio
├── components/
│   ├── landing-page/        # Hero, AboutUs, Stats, Reviews, etc.
│   ├── product/             # ProductCard, SuitDetails, SuitsList, FAQ
│   ├── order/               # Order form fields
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── product/             # Server actions & validations
└── sanity/
    ├── schemaTypes/         # Sanity document schemas
    └── lib/                 # Client, queries, image helpers
```

## Scripts

| Command         | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |
