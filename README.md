# Codez Devhub Login Page

This project contains a ready-to-use animated login page built with React, TypeScript, Tailwind CSS, and shadcn-style components.

## What is included

- Animated login page component
- Dot background pattern component
- shadcn-style UI components for button, input, checkbox, and label
- Tailwind CSS setup
- TypeScript setup

## How to use it in another project

If your friend wants to use this login page in their own app, they can copy these files:

- `src/components/ui/animated-characters-login-page.tsx`
- `src/components/ui/bg-pattern.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/label.tsx`
- `src/lib/utils.ts`

They should also make sure these project files exist in their app:

- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `src/index.css`

## Install dependencies

Run this in the project folder:

```bash
npm install
npm install lucide-react @radix-ui/react-slot class-variance-authority @radix-ui/react-checkbox @radix-ui/react-label clsx tailwind-merge
```

## Basic setup notes

- Use `src/components/ui` for reusable UI components.
- Keep `src/lib/utils.ts` for the `cn` helper.
- Make sure the `@/` import path points to the `src` folder.
- Tailwind should be enabled before using these components.

## How to show the login page

Import the component in a page file and render it:

```tsx
import { Component } from '@/components/ui/animated-characters-login-page'

export default function LoginPage() {
  return <Component />
}
```

## Run the project

```bash
npm run dev
```

## Build the project

```bash
npm run build
```

## Simple sharing tip

If you want to share this with a friend, send the project folder or copy these files into their project. They only need to install the packages above and import the component into their page.
