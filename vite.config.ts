import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'FavoFlicks films',
        short_name: 'FavoFlicks',
        theme_color: '#6366F1',
        background_color: '#0F1115',
        display: 'standalone',
        "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
      },
    })],
})
