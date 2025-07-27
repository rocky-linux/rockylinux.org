# Deployment Overview

## Build Process

### Production Build

To create a production-ready build:

```bash
npm run build
```

This command:

1. Compiles TypeScript to JavaScript
2. Bundles and optimizes all assets
3. Generates static HTML for all pages
4. Creates optimized images
5. Outputs to `.next/` directory

### Build Output

The build creates:

- Static HTML pages for each route and locale
- Optimized JavaScript bundles
- CSS files with Tailwind utilities
- Optimized images in various formats
- Static assets copied from `/public`

## Testing

### Unit Testing

Run Jest unit tests:

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### E2E Testing

Run Playwright end-to-end tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run specific test file
npm run e2e tests/homepage.spec.ts
```

### Linting and Formatting

Before deployment, ensure code quality:

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type check with TypeScript
npm run type-check
```

## Pre-deployment Checklist

1. **Code Quality**
   - [ ] Run `npm run lint` - no errors
   - [ ] Run `npm run type-check` - no errors
   - [ ] Run `npm run test` - all tests pass
   - [ ] Run `npm run build` - builds successfully

2. **Content Review**
   - [ ] All translations are complete
   - [ ] Images are optimized
   - [ ] Links are working
   - [ ] Meta tags are set

3. **Performance Check**
   - [ ] Lighthouse score > 90
   - [ ] Bundle size within budget
   - [ ] Images using next/image
   - [ ] No console errors

## Deployment Methods

### 1. Vercel (Recommended)

The easiest deployment method. Push code to a feature branch and Vercel will automatically create a preview deployment.

### 2. Self-Hosted with Node.js, Docker Deployment, Static Export

Other deployment methods for official Rocky Linux deployments are not supported.

## Rollback Strategy

Use Vercel's rollback feature to rollback to a known working version.

## Post-Deployment

1. **Verify deployment**
   - Check all pages load
   - Test critical user flows
   - Verify analytics working
   - Check error logs

2. **Monitor performance**
   - Page load times
   - Error rates
   - User feedback
   - Analytics data
