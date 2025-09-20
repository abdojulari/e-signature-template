// https://nuxt.com/docs/api/configuration/nuxt-config

// Updated for Nuxt 4 compatibility

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Disable SSR to fix routing injection issues for browser-heavy app
  ssr: false,

  css: [
    '~/assets/css/styles.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  modules: [
    '@nuxt/devtools',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'SignaturePro - Beautiful Email Signature Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Create stunning, professional email signatures with glassmorphism effects. Install directly in Gmail, Outlook, and other email clients.' },
        { name: 'keywords', content: 'email signature, gmail signature, outlook signature, professional signature, glassmorphism' },
        { name: 'author', content: 'SignaturePro' },
        { property: 'og:title', content: 'SignaturePro - Beautiful Email Signature Generator' },
        { property: 'og:description', content: 'Create stunning, professional email signatures with glassmorphism effects.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://signaturepro.com' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SignaturePro - Beautiful Email Signature Generator' },
        { name: 'twitter:description', content: 'Create stunning, professional email signatures with glassmorphism effects.' },
        { name: 'twitter:image', content: '/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      gmailClientId: process.env.GMAIL_CLIENT_ID || 'YOUR_GMAIL_CLIENT_ID',
      gmailClientSecret: process.env.GMAIL_CLIENT_SECRET || 'YOUR_GMAIL_CLIENT_SECRET',
      outlookClientId: process.env.OUTLOOK_CLIENT_ID || 'YOUR_OUTLOOK_CLIENT_ID',
      outlookClientSecret: process.env.OUTLOOK_CLIENT_SECRET || 'YOUR_OUTLOOK_CLIENT_SECRET'
    }
  }
})

// Nuxt 4 configuration updates can be applied here as needed