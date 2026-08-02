# Boomerang Landing

Single full-viewport marketing landing page for Boomerang, a conversational
AI platform for financial institutions.

Stack: React + TypeScript + Vite + Tailwind CSS + lucide-react.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Notes

- `src/components/BoomerangVideoBg.tsx` plays the source CloudFront video
  once (no native loop), capturing every frame to an offscreen canvas
  (downscaled to 960px wide) via `requestVideoFrameCallback` (falling back
  to `requestAnimationFrame`). Once the video ends, it switches to a
  `<canvas>` that ping-pongs the captured frames forward/backward at 30fps,
  forever.
- Fonts (`P22 Mackinac W01 Book`, Inter) are loaded via `<link>` tags in
  `index.html` and wired into Tailwind's `fontFamily` theme.
- Only Lucide icon in use is `ArrowRight`, on the three feature rows.
