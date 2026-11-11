import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isAndroid = mode === 'android';

  const plugins: any[] = [
    react(),
    tailwindcss(),
  ];

  if (isAndroid) {
    plugins.push({
      name: 'android-index-html',
      closeBundle() {
        const mobilePath = path.resolve(__dirname, 'dist-android/mobile.html');
        const indexPath = path.resolve(__dirname, 'dist-android/index.html');
        if (fs.existsSync(mobilePath)) {
          fs.copyFileSync(mobilePath, indexPath);
        }
      },
    });
  }

  // Only enable PWA service worker plugin for the web build, not for the native Android build
  if (!isAndroid) {
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          id: '/#resident-auth',
          name: 'KYUSI-LIGTAS: Smart Evacuation & Flood Warning',
          short_name: 'KYUSI-LIGTAS',
          description: 'An IoT-enabled flood early warning and shelter management platform enhancing mandatory evacuation protocols in Quezon City.',
          theme_color: '#0F172A',
          background_color: '#0F172A',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/#resident-auth',
          scope: '/',
          categories: ['government', 'utilities', 'weather'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'cdn-jsdelivr-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      })
    );
  }

  return {
    base: isAndroid ? './' : '/',
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: isAndroid
      ? {
          outDir: 'dist-android',
          emptyOutDir: true,
          rollupOptions: {
            input: {
              index: path.resolve(__dirname, 'mobile.html'),
            },
          },
        }
      : {
          outDir: 'dist',
          emptyOutDir: true,
        },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
