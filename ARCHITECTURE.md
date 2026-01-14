# Architecture & Code Standards

## Overview

This is a production-ready React + TypeScript + Tailwind CSS application following clean code principles and scalable component architecture.

## Design Principles

### 1. Component Architecture

**Atomic Design Pattern:**
- **Common Components** (`components/common/`): Reusable UI primitives (Button, Input, Card, Select)
- **Feature Components** (`components/signup/`, `components/tracking/`): Feature-specific components
- **Page Components** (`pages/`): Full page layouts combining features

**Benefits:**
- Single responsibility principle
- Easy to test and maintain
- Reusable across features
- Clear component hierarchy

### 2. Type Safety

**Strict TypeScript Mode:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Type Organization:**
- All types in `src/types/index.ts`
- Enums for fixed values (AccountType, OrderStatus, etc.)
- Interfaces for data structures
- Props interfaces for components

### 3. State Management

**Current Approach:**
- React hooks (useState, useRef) for local state
- Props drilling for component communication
- Form state in component level

**Future Scaling:**
- Consider Context API for global state
- Redux/Zustand for complex state
- React Query for server state

### 4. Styling

**Tailwind CSS Only:**
- No CSS files or inline styles
- Utility-first approach
- Responsive design with breakpoints
- Custom theme colors in `tailwind.config.js`

**Responsive Breakpoints:**
```
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

## File Structure

```
dist-app/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button.tsx       # Primary, secondary, outline variants
│   │   │   ├── Input.tsx        # Text input with validation
│   │   │   ├── Card.tsx         # Container with shadow & highlight
│   │   │   └── Select.tsx       # Dropdown select
│   │   ├── signup/              # Signup page features
│   │   │   ├── HeroSection.tsx  # Hero banner with CTA
│   │   │   ├── BenefitsSection.tsx  # Benefits grid
│   │   │   ├── PackagesSection.tsx  # Package cards
│   │   │   └── SignupForm.tsx   # Main signup form
│   │   └── tracking/            # Tracking page features
│   │       ├── TrackingForm.tsx # Tracking ID input
│   │       └── TrackingResult.tsx   # Timeline display
│   ├── pages/                   # Full page components
│   │   ├── SignupPage.tsx       # Signup page layout
│   │   └── TrackOrderPage.tsx   # Tracking page layout
│   ├── routes/
│   │   └── AppRoutes.tsx        # React Router setup
│   ├── data/                    # Static data
│   │   ├── benefits.ts          # Benefits array
│   │   └── packages.ts          # Package definitions
│   ├── types/
│   │   └── index.ts             # All TypeScript types
│   ├── services/
│   │   └── api.ts               # API integration layer
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/
├── index.html                   # HTML template
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── package.json                 # Dependencies
├── README.md                    # Project overview
├── QUICKSTART.md                # Getting started guide
└── ARCHITECTURE.md              # This file
```

## Component Patterns

### Common Component Template

```typescript
import React from 'react';

interface ComponentProps {
  // Props definition
  children?: React.ReactNode;
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`base-styles ${className}`}>
      {children}
    </div>
  );
};
```

### Feature Component Template

```typescript
import React, { useState } from 'react';
import { TypeInterface } from '../types';
import { CommonComponent } from '../common/CommonComponent';

interface FeatureComponentProps {
  data: TypeInterface[];
  onAction: (id: string) => void;
}

export const FeatureComponent: React.FC<FeatureComponentProps> = ({
  data,
  onAction,
}) => {
  const [state, setState] = useState<string>('');

  return (
    <section className="py-16 px-4">
      {/* Component JSX */}
    </section>
  );
};
```

## Type System

### Enums for Constants

```typescript
export enum AccountType {
  SALES_AGENT = 'sales_agent',
  DISTRIBUTOR = 'distributor',
}
```

### Interfaces for Data

```typescript
export interface Package {
  id: PackageType;
  name: string;
  price: number;
  commission: number;
  isPopular?: boolean;
  accountType: AccountType;
}
```

### Props Interfaces

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}
```

## Form Handling

### Validation Pattern

```typescript
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Invalid email format';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Controlled Components

```typescript
const [formData, setFormData] = useState<FormData>({
  email: '',
  password: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};
```

## Styling Guidelines

### Utility Classes

```typescript
// Good: Use Tailwind utilities
className="px-4 py-3 bg-lemonGreen text-black rounded-lg hover:bg-opacity-90"

// Avoid: Inline styles
style={{ padding: '12px 16px', backgroundColor: '#A6E22E' }}

// Avoid: CSS files
import './Button.css'
```

### Responsive Design

```typescript
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
className="px-4 md:px-8 py-8 md:py-16"
```

### Color System

```typescript
// Primary (Lemon Green)
className="bg-lemonGreen text-black"

// Secondary (Brand Orange)
className="bg-brandOrange text-white"

// Neutral
className="bg-gray-50 text-gray-900"
```

## API Integration

### Service Layer Pattern

```typescript
// src/services/api.ts
export const signupUser = async (data: SignupFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

### Component Integration

```typescript
const handleSubmit = async (data: SignupFormData) => {
  setIsLoading(true);
  try {
    await signupUser(data);
    setSubmitStatus('success');
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};
```

## Accessibility

### Semantic HTML

```typescript
// Good: Semantic elements
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" required />
  <button type="submit">Submit</button>
</form>

// Avoid: Non-semantic divs
<div onClick={handleSubmit}>
  <div>Email</div>
  <div>...</div>
</div>
```

### ARIA Attributes

```typescript
<button aria-label="Close menu" onClick={closeMenu}>
  ✕
</button>

<div role="status" aria-live="polite">
  {successMessage}
</div>
```

### Focus Management

```typescript
// Tailwind focus styles
className="focus:outline-none focus:ring-2 focus:ring-lemonGreen"
```

## Performance Optimization

### Code Splitting

```typescript
// Use React.lazy for route-based splitting
const SignupPage = React.lazy(() => import('../pages/SignupPage'));
```

### Memoization

```typescript
// Memoize expensive components
export const PackageCard = React.memo(({ package: Package }) => {
  return <Card>{/* ... */}</Card>;
});
```

### Image Optimization

```typescript
// Use emoji for icons (lightweight)
<div className="text-5xl">💰</div>

// Or use SVG for complex graphics
```

## Testing Strategy

### Unit Tests (Future)

```typescript
// Test components in isolation
describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-lemonGreen');
  });
});
```

### Integration Tests (Future)

```typescript
// Test feature workflows
describe('Signup Flow', () => {
  it('submits form with valid data', async () => {
    render(<SignupPage />);
    // Fill form and submit
  });
});
```

## Deployment

### Build Process

```bash
npm run build
```

### Environment Variables

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

### Hosting Options

- Vercel (recommended for Vite)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Best Practices Checklist

- ✅ TypeScript strict mode enabled
- ✅ All components typed with interfaces
- ✅ No inline styles (Tailwind only)
- ✅ Semantic HTML & ARIA labels
- ✅ Mobile-first responsive design
- ✅ Form validation & error handling
- ✅ Loading states on async operations
- ✅ Reusable component architecture
- ✅ Clean separation of concerns
- ✅ API service layer ready
- ✅ Accessibility compliant
- ✅ Performance optimized

## Future Enhancements

1. **Authentication**
   - JWT token management
   - Protected routes
   - User context

2. **State Management**
   - Context API for global state
   - Redux for complex state
   - React Query for server state

3. **Testing**
   - Jest for unit tests
   - React Testing Library
   - E2E tests with Cypress

4. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

5. **Features**
   - User dashboard
   - Payment processing
   - Email notifications
   - Admin panel
