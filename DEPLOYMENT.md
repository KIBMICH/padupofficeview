# Deployment Guide

## Pre-Deployment Checklist

- [ ] All TypeScript errors resolved
- [ ] Form validation working correctly
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] API endpoints configured
- [ ] Environment variables set
- [ ] Build completes without errors
- [ ] Performance optimized
- [ ] Accessibility tested

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

For Vite, use `VITE_` prefix:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_ENV=production
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Deployment Options

### 1. Vercel (Recommended)

**Advantages:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Environment variables UI

**Steps:**

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
npm i -g vercel
vercel
```

### 2. Netlify

**Advantages:**
- Easy GitHub integration
- Automatic deployments
- Form handling
- Serverless functions

**Steps:**

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables
5. Deploy

### 3. AWS S3 + CloudFront

**Advantages:**
- Highly scalable
- Cost-effective
- Full control
- Global distribution

**Steps:**

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 4. GitHub Pages

**Advantages:**
- Free hosting
- GitHub integration
- Simple setup

**Steps:**

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

2. Add deploy script to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

4. Deploy:
```bash
npm run deploy
```

### 5. Docker Deployment

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**

```bash
docker build -t dist-app .
docker run -p 3000:3000 dist-app
```

## Performance Optimization

### 1. Code Splitting

Already configured with Vite. Routes are automatically code-split.

### 2. Image Optimization

Currently using emoji for icons (lightweight). For images:

```typescript
// Use WebP with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.png" alt="Description" />
</picture>
```

### 3. Caching Strategy

**Cache headers for static assets:**

```
# Vercel (automatic)
# Netlify (automatic)

# AWS S3 + CloudFront
Cache-Control: public, max-age=31536000, immutable
```

### 4. Bundle Analysis

```bash
npm install --save-dev vite-plugin-visualizer
```

Update `vite.config.ts`:

```typescript
import { visualizer } from 'vite-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
})
```

Run build to generate `stats.html`.

## Monitoring & Analytics

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.VITE_ENV,
});
```

### 2. Analytics (Google Analytics)

```bash
npm install react-ga4
```

```typescript
import ReactGA from "react-ga4";

ReactGA.initialize("GA_MEASUREMENT_ID");
```

### 3. Performance Monitoring

```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Security Best Practices

### 1. Environment Variables

Never commit `.env` files:

```bash
# .gitignore
.env
.env.local
.env.*.local
```

### 2. HTTPS

Always use HTTPS in production. All major hosting providers provide free SSL.

### 3. Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

### 4. CORS Configuration

Backend should handle CORS properly:

```typescript
// Express example
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### 5. Input Validation

Already implemented in forms. Always validate on backend too.

## Rollback Strategy

### Vercel
- Automatic rollback available in dashboard
- Previous deployments preserved

### Netlify
- Rollback to previous deployment
- Automatic backups

### Manual Rollback
```bash
# Keep previous build
git revert <commit-hash>
npm run build
# Deploy
```

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Post-Deployment

### 1. Verify Deployment

- [ ] Site loads correctly
- [ ] All routes work
- [ ] Forms submit successfully
- [ ] API calls work
- [ ] Mobile responsive
- [ ] No console errors

### 2. Monitor Performance

- Check Core Web Vitals
- Monitor error rates
- Track user analytics
- Review server logs

### 3. Set Up Alerts

- Error rate threshold
- Performance degradation
- Uptime monitoring
- API response time

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deploy

- Check browser console for errors
- Verify environment variables
- Check API endpoints
- Review build output

### Slow Performance

- Run bundle analysis
- Check image sizes
- Enable gzip compression
- Use CDN for static assets

### API Calls Fail

- Verify CORS headers
- Check API URL in environment
- Verify authentication tokens
- Check network tab in DevTools

## Support & Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
