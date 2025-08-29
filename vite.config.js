import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,              // 자동 등록 끔(중복 방지)
      filename: 'pwa-sw.js',            // 플러그인 SW 파일명을 pwa-sw.js로 고정
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '쏠쏠한 한끼',
        short_name: '쏠쏠한 한끼',
        description: '너만 땡기면 바로주문하는 음식 주문 PWA 앱',
        theme_color: '#667eea',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 4173,
    // proxy: {
    //   '/sol/api': { target: 'http://192.168.12.92:8080', changeOrigin: true, secure: false }
    // }
  },
  preview: {
    allowedHosts: ['localhost', '127.0.0.1', 'https://cfd8d161bbf2.ngrok-free.app', '.ngrok-free.app'],
    // proxy: {
    //   '/sol/api': { target: 'http://192.168.12.92:8080', changeOrigin: true, secure: false }
    // }
  },
  css: {
    modules: { localsConvention: 'camelCase', generateScopedName: '[name]__[local]___[hash:base64:5]' }
  },
})