# Distribution Hub - Sales Agent & Distributor Platform

A production-ready, responsive web application built with React, TypeScript, and Tailwind CSS for a product distribution brand.

## Features

### Pages

1. **Signup Page** (`/`)
   - Hero section with compelling CTA
   - Benefits showcase with icon grid
   - Dynamic package selection (Sales Agent & Distributor)
   - Type-safe form with validation
   - Success/error feedback

2. **Order Tracking Page** (`/track-order`)
   - Tracking ID input form
   - Real-time order status display
   - Visual timeline stepper
   - Mock data for demo (ORD-001, ORD-002, ORD-003)

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety with strict mode
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Vite** - Build tool & dev server

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Select.tsx
│   ├── signup/           # Signup page components
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── PackagesSection.tsx
│   │   └── SignupForm.tsx
│   └── tracking/         # Tracking page components
│       ├── TrackingForm.tsx
│       └── TrackingResult.tsx
├── pages/                # Page components
│   ├── SignupPage.tsx
│   └── TrackOrderPage.tsx
├── routes/               # Routing configuration
│   └── AppRoutes.tsx
├── data/                 # Static data
│   ├── benefits.ts
│   └── packages.ts
├── types/                # TypeScript interfaces & enums
│   └── index.ts
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
cd dist-app
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design System

### Colors

- **Lemon Green**: `#A6E22E` - Primary buttons, success states
- **Brand Orange**: `#F97316` - Highlights, in-progress states
- **Neutral**: White & light gray palette

### Components

All components follow these principles:

- Type-safe with TypeScript interfaces
- Accessible with semantic HTML & ARIA
- Responsive mobile-first design
- Tailwind utility classes (no inline styles)
- Smooth transitions and hover states

## Features Implemented

✅ Responsive design (mobile → desktop)
✅ Form validation with error handling
✅ Type-safe state management
✅ Dynamic package selection
✅ Order tracking with timeline
✅ Accessible UI components
✅ Clean separation of concerns
✅ Reusable component architecture
✅ Mock data for demo purposes
✅ Smooth animations & transitions

## API Integration Ready

The app is structured for easy backend integration:

- `SignupForm` has `onSubmit` callback for API calls
- `TrackingForm` accepts async submission handler
- Mock data in `TrackOrderPage` can be replaced with API calls
- All form data is properly typed for API requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
