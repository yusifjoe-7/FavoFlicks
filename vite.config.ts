import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import sitemap from 'vite-plugin-sitemap'





// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    sitemap({
      hostname: 'https://favo-flicks.vercel.app',
      dynamicRoutes: [
        '/',
        '/discover',
        '/favorites',
        '/details/tv/246',
        '/details/tv/94605',
        '/details/tv/87108',
        '/details/tv/1399',
        
        
      ],
    }),
    
    
    VitePWA({registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'FavoFlicks films',
        short_name: 'FavoFlicks',
        theme_color: '#5c0000',
        background_color: '#0F1115',
        display: 'standalone',
        "icons": [
  { "src": "/icons/icon-192.svg", "sizes": "192x192", "type": "image/svg+xml" },
  { "src": "/icons/icon-512.svg", "sizes": "512x512", "type": "image/svg+xml" }
]
      },
    })],
})
