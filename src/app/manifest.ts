import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Frogobox Media Indonesia',
    short_name: 'Frogobox',
    description: 'Frogobox Media Indonesia - We Build Scalable Digital Solutions Beyond The Box',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1120',
    theme_color: '#0b1120',
    icons: [
      {
        src: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
