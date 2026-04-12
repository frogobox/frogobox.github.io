# Add Testimonial Feature Implementation Plan

## Goal Description
Implement a feature allowing users to add new testimonials directly from the frontend. This includes a button in the testimonial section, a new form page at `/add-testimonial`, and an API endpoint to process the submission (including image uploads), update `data/testimonials.json`, save the image to `public/images/testimonials`, and auto-commit the changes to the `master` branch.

## Proposed Changes

### `app/components/TestimonialSection.tsx`
[MODIFY]
- Add a "Tambah Testimoni" `<button>` (or `Link`) below the testimonial carousel, navigating to `/add-testimonial`.

### `app/add-testimonial/page.tsx`
[NEW]
- Create a client-side form with fields: Name, Role, Rating (1-5), Content, and Photo (`<input type="file" accept="image/*">`).
- Uses Tailwind styling mimicking the existing UI.
- On submit, uses `FormData` to send a POST request with `multipart/form-data` to `/api/testimonials`.

### `app/api/testimonials/route.ts`
[NEW]
- Next.js API Route for handling `POST` requests.
- Parse `request.formData()`.
- If an image file is provided, save it to `public/images/testimonials/` with a unique filename (e.g., timestamp).
- If no image is provided, assign a placeholder using DiceBear: `https://api.dicebear.com/7.x/initials/svg?seed=[URL Encoded Name]`.
- Read `data/testimonials.json` and append the new testimonial object.
- Use `child_process.exec` to run `git add public/images/testimonials/* data/testimonials.json` and `git commit -m "Auto add testimonial via UI"` on the `master` branch.

## Verification Plan
1. Ensure the form page loads correctly at `/add-testimonial`.
2. Fill out the form with an image and submit -> Verify image is saved locally and JSON is updated.
3. Fill out the form without an image -> Verify the DiceBear placeholder is generated in JSON.
4. Verify the git log shows the new commit containing the JSON and potentially the new image.
