# Quick Start Guide

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

## Testing the Features

### Signup Page (`/`)
- Scroll through the hero section and benefits
- Click "Get Started" to jump to the signup form
- Try different account types (Sales Agent / Distributor)
- Packages update dynamically based on account type
- Form validation triggers on invalid inputs
- Submit the form to see success message

**Test Credentials:**
- Full Name: John Doe
- Email: john@example.com
- Phone: +234 (0) 123 456 7890
- Password: Password123

### Order Tracking Page (`/track-order`)
- Navigate to "Track Order" in the header
- Try these demo tracking IDs:
  - `ORD-001` - Delivered order
  - `ORD-002` - In transit order
  - `ORD-003` - Recently placed order
- View the timeline stepper with status progression

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Test by resizing browser or using device emulation

### Form Validation
- Email format validation
- Phone number validation (10+ digits)
- Password strength (8+ characters)
- Password confirmation matching
- Real-time error clearing

### Accessibility
- Semantic HTML elements
- ARIA labels on form inputs
- Keyboard navigation support
- Focus visible states
- Reduced motion support

### Color Scheme
- **Lemon Green** (#A6E22E): Primary actions, success states
- **Brand Orange** (#F97316): Secondary actions, highlights
- **Neutral**: White & gray palette

## Project Structure

```
src/
├── components/common/      # Reusable UI components
├── components/signup/      # Signup page components
├── components/tracking/    # Tracking page components
├── pages/                  # Full page components
├── routes/                 # Routing setup
├── data/                   # Static data (benefits, packages)
├── types/                  # TypeScript interfaces
└── App.tsx                 # Root component
```

## Development Tips

### Adding New Features
1. Create components in `src/components/`
2. Define types in `src/types/index.ts`
3. Add routes in `src/routes/AppRoutes.tsx`
4. Use existing components as templates

### Styling
- Use Tailwind utility classes
- Extend theme in `tailwind.config.js`
- No inline styles or CSS files needed
- Responsive classes: `md:`, `lg:`, etc.

### Type Safety
- All components are fully typed
- Use interfaces from `src/types/index.ts`
- Enable strict mode in `tsconfig.json`

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment.

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**TypeScript errors?**
```bash
npm run build
```

**Need to reset node_modules?**
```bash
rm -r node_modules package-lock.json
npm install
```

## Next Steps

1. Connect to a backend API
2. Add authentication
3. Implement payment processing
4. Add user dashboard
5. Set up analytics tracking
