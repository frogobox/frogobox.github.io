# Admin Dashboard Implementation Plan

## Goal Description
Build a simple, React-based Admin Dashboard at `/admin` to edit the contents of all JSON files directly from the browser by using the existing `/api/cms` endpoint. The dashboard will have tabs or sections for `site.json`, `services.json`, `testimonials.json`, and `cta.json`. It will use existing Tailwind CSS styling.

## Proposed Changes

### `app/admin/page.tsx`
[NEW] A new Route for the Admin Dashboard.
- Will be a Client Component (`'use client'`).
- Use `fetch` to read (GET) and save (POST) data to the `api/cms` endpoint.
- Provide a simple GUI for editing JSON fields, and JSON editors for lists (services, testimonials) for rapid development.
- Include a "Simpan" (Save) button to test changes directly.

### `app/components/Navbar.tsx`
[MODIFY]
- Import `usePathname` from `next/navigation`.
- If `pathname.startsWith('/admin')`, return `null` so the frontend navigation bar does not appear in the admin UI.

### `app/components/Footer.tsx`
[MODIFY]
- Import `usePathname` from `next/navigation`.
- If `pathname.startsWith('/admin')`, return `null`.

## Verification Plan
After implementation, I will make an API test fetch, ensure `/admin` renders without the main Navbar/Footer, and test out modifying text on the database to see the results dynamically modify.
