# Frontend

React single-page application for the Infra Control Plane. The production build
is deployed to S3 and served through CloudFront.

## Technology baseline

```text
React + TypeScript + Vite

UI        Tailwind CSS, shadcn/ui, Beautiful UI
Data      TanStack Query, TanStack Table
Routing   TanStack Router
State     Zustand (UI-only state)
Forms     React Hook Form, Zod
Animation Framer Motion
Icons     Lucide
Realtime  SSE
```

Next.js is intentionally not used.

## Ownership and conventions

- Use **shadcn/ui** as the base design system.
- Use **Beautiful UI** for higher-level visual and interaction patterns,
  especially Diff, task, approval, table, and search experiences.
- Use **TanStack Query** for FastAPI data and server state. Do not mirror
  server state into Zustand without a specific UI-state reason.
- Use **TanStack Table** for scalable Asset and Resource tables, with
  server-side pagination, filtering, and sorting where needed.
- Use **SSE** for Workflow execution updates and dynamic logs.
- Keep **Framer Motion** subtle and purposeful; status must be understandable
  without animation or color alone.

The SPA owns navigation, views, forms, tables, change previews, and workflow
visualization. FastAPI owns business logic and persistent state. See
[`../docs/frontend.md`](../docs/frontend.md) for the UX and implementation
specification.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run test
npm run build
```
