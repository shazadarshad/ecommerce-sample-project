# 🛍️ Zenva Store - Modern E-Commerce Frontend

A modern, fully responsive e-commerce front-end built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Framer Motion**. This project demonstrates advanced front-end state management, smooth animations, and polished UI/UX design.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=flat-square&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-6B2C91?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23-0055FF?style=flat-square)

## ✨ Features

- 🎨 **Beautiful UI/UX** - Modern design with custom color palette and glassmorphic effects
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🛒 **Shopping Cart** - Persistent cart using Zustand with localStorage
- 🎭 **Smooth Animations** - Framer Motion powered transitions and hover effects
- 🖼️ **Product Grid** - Responsive grid layout with product cards
- 🔍 **Product Details** - Modal with full product information
- 💳 **Checkout Mockup** - Complete checkout form with order summary
- 🎯 **Type-Safe** - Full TypeScript support throughout
- ⚡ **Performance** - Optimized with Next.js App Router and Image optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1 with custom theme
- **State Management**: Zustand 5.0 (with localStorage persistence)
- **Animations**: Framer Motion 12.23
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 🎨 Design System

### Color Palette

- **Dark Navy** (`#0F172A`) - Primary text and backgrounds
- **Light Blue** (`#38BDF8`) - Accent buttons and highlights
- **Purple Accent** (`#A855F7`) - Gradient accents and hover states
- **Light Background** (`#F1F5F9`) - Cards and sections

### Typography

- **Font Family**: Inter (sans-serif)
- Responsive sizing with Tailwind typography utilities

### Components

- Glassmorphic cards with backdrop blur
- Gradient buttons with hover transitions
- Soft shadows and rounded corners
- Smooth animations throughout

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with Navbar/Footer
│   ├── page.tsx             # Home page - product grid
│   ├── cart/page.tsx        # Cart page
│   ├── checkout/page.tsx    # Checkout page
│   └── globals.css          # Global styles + Tailwind
├── components/
│   ├── Navbar.tsx           # Top navigation with cart badge
│   ├── Footer.tsx            # Footer with branding
│   ├── ProductCard.tsx      # Product card with hover effects
│   ├── ProductModal.tsx     # Product details modal
│   └── CartDrawer.tsx       # Slide-in cart drawer
├── lib/
│   └── store.ts             # Zustand cart store
├── data/
│   └── products.ts          # Mock product data (16 items)
├── utils/
│   └── formatCurrency.ts    # Currency formatting utility
└── types/
    └── index.ts             # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shazadarshad/ecommerce-sample-project.git
cd ecommerce-sample-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages & Features

### 1. Home Page - Product Grid

- Responsive grid layout (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`)
- Product cards with hover animations
- Click to view product details in modal
- Floating cart button on mobile

### 2. Product Details Modal

- Smooth scale + opacity entrance animation
- Larger product image
- Full description and category
- Quantity selector
- Add to cart functionality

### 3. Cart Drawer/Page

- Slide-in drawer from right (mobile/desktop)
- Full cart page view
- Quantity adjustment controls
- Remove items functionality
- Order summary with totals
- Clear cart option

### 4. Checkout Page

- Shipping information form
- Payment method selection
- Order summary sidebar
- Form validation
- Mock order placement with success screen

### 5. Navigation

- Sticky navbar with logo
- Cart count badge
- Responsive mobile menu
- Smooth transitions

## 🎯 State Management

The cart state is managed using **Zustand** with the following features:

- Add items to cart
- Remove items from cart
- Update item quantities
- Clear entire cart
- Calculate totals
- Get item count
- **localStorage persistence** - Cart persists across page refreshes

## 🎨 Animations

Powered by **Framer Motion**:

- Product card hover effects (scale + shadow)
- Modal entrance/exit (scale + opacity)
- Cart drawer slide animation
- Grid items fade-in-up on scroll
- Button hover transitions
- Smooth page transitions

## 🧪 Mock Data

The project includes 16 diverse mock products across categories:
- Electronics
- Clothing
- Accessories
- Sports
- Home

All products use Unsplash images and realistic descriptions.

## 🔧 Customization

### Adding Products

Edit `src/data/products.ts` to add or modify products:

```typescript
{
  id: number,
  name: string,
  description: string,
  shortDescription?: string,
  price: number,
  image: string,
  category: string,
}
```

### Styling

Customize colors in `tailwind.config.ts`:

```typescript
colors: {
  "dark-navy": "#0F172A",
  "light-blue": "#38BDF8",
  "purple-accent": "#A855F7",
  "light-bg": "#F1F5F9",
}
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

Potential features to add:

- ✨ Toast notifications for cart actions
- 🔍 Search bar and category filters
- 🌙 Dark/light mode toggle
- 💾 Skeleton loading effects
- 🖼️ Product image lazy loading
- 📊 Analytics integration
- 🔐 User authentication
- 💰 Real payment integration

## 📸 Screenshots

*Add screenshots of your application here*

## 👨‍💻 Developer

**Made by [Shazad Arshad](https://instagram.com/shazad.ar) | [Zenva Digitals](https://instagram.com/zenvadigitals)**

- Instagram: [@shazad.ar](https://instagram.com/shazad.ar)
- Instagram: [@zenvadigitals](https://instagram.com/zenvadigitals)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- State managed with [Zustand](https://zustand-demo.pmnd.rs/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

⭐ Star this repo if you find it helpful!

