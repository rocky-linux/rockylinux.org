# Getting Started with Development

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm package manager
- Git
- A code editor (VS Code recommended)

## Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/rocky-linux/rockylinux.org.git
   cd rockylinux.org
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## Development Workflow

### 1. Working with Pages

Pages are located in `/app/[locale]/`. To create a new page:

```typescript
// app/[locale]/example/page.tsx
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "example" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function ExamplePage() {
  const t = useTranslations("example");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

### 2. Adding Translations

1. Add your English translations to `/messages/en.json`:

   ```json
   {
     "example": {
       "meta": {
         "title": "Example Page",
         "description": "This is an example page"
       },
       "title": "Example Page",
       "description": "Welcome to the example page"
     }
   }
   ```

2. Other languages will be handled by Crowdin automatically

### 3. Creating Components

Follow the established pattern for components:

```typescript
// components/ui/custom-button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const customButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(customButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton, customButtonVariants };
```

### 4. Working with the Download Page

The download page uses URL state for architecture selection:

```typescript
// Reading architecture from URL
const searchParams = useSearchParams();
const currentArch = searchParams.get("arch") || detectedArch;

// Updating URL state
const updateArchitecture = (arch: string) => {
  const params = new URLSearchParams(searchParams);
  params.set("arch", arch);
  router.push(`?${params.toString()}`);
};
```

### 5. Adding News/Blog Posts

Create a new Markdown file in `/news/`:

```markdown
---
title: "Rocky Linux 9.5 Released"
date: "2024-11-25"
author: "Rocky Team"
---

Content of your blog post here...
```

## Code Style Guidelines

### TypeScript

- Use explicit types for function parameters and return values
- Prefer interfaces over types for object shapes
- Use const assertions for literal types

### React/Next.js

- Use Server Components by default
- Add "use client" only when needed
- Prefer named exports for components
- Use next/image for all images

### Styling

- Use Tailwind utilities first
- Create component variants with CVA
- Keep responsive design mobile-first
- Use CSS variables for theme values

## Common Patterns

### Loading States

```typescript
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
```

### Error Handling

```typescript
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white"
      >
        Try again
      </button>
    </div>
  );
}
```

## Debugging Tips

1. **Check translations**: Use the browser console to verify translation keys
2. **Inspect URL state**: Check browser URL for state parameters
3. **Component props**: Use React DevTools browser extension
4. **Network requests**: Monitor browser Network tab
5. **Build errors**: Run `npm run build` to catch type errors

## Performance Considerations

1. Use dynamic imports for heavy components
2. Optimize images with next/image
3. Keep bundle sizes small
4. Use Server Components when possible
5. Implement proper loading states

## Getting Help

- Check existing code for patterns
- Review TypeScript errors carefully
- Test in multiple browsers
- Verify mobile responsiveness
- Run linting before commits
