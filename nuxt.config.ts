// https://nuxt.com/docs/api/configuration/nuxt-config

// Updated for Nuxt 4 compatibility

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Enable static generation for Netlify deployment
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  
  // Disable SSR to fix routing injection issues for browser-heavy app
  ssr: false,


  css: [
    '~/assets/css/styles.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'SignaturePro - Beautiful Email Signature Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Create stunning, professional email signatures with glassmorphism effects. Free signature generator with templates, QR codes, and social media integration. Install directly in Gmail, Yahoo, and other email clients.' },
        { name: 'keywords', content: 'email signature generator, gmail signature, yahoo signature, professional signature, email signature templates, glassmorphism signature, free signature maker, business email signature, signature creator, email signature design' },
        { name: 'author', content: 'SignaturePro' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:title', content: 'SignaturePro - Beautiful Email Signature Generator' },
        { property: 'og:description', content: 'Create stunning, professional email signatures with glassmorphism effects. Free signature generator with templates, QR codes, and social media integration.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://signature-pro.ca' },
        { property: 'og:image', content: 'https://signature-pro.ca/og-image.jpg' },
        { property: 'og:site_name', content: 'SignaturePro' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SignaturePro - Beautiful Email Signature Generator' },
        { name: 'twitter:description', content: 'Create stunning, professional email signatures with glassmorphism effects. Free signature generator with templates, QR codes, and social media integration.' },
        { name: 'twitter:image', content: 'https://signature-pro.ca/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://signature-pro.ca' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SignaturePro",
            "description": "Create stunning, professional email signatures with glassmorphism effects. Free signature generator with templates, QR codes, and social media integration.",
            "url": "https://signature-pro.ca",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CAD"
            },
            "creator": {
              "@type": "Organization",
              "name": "SignaturePro"
            }
          })
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      gmailClientId: process.env.GMAIL_CLIENT_ID || 'YOUR_GMAIL_CLIENT_ID',
      gmailClientSecret: process.env.GMAIL_CLIENT_SECRET || 'YOUR_GMAIL_CLIENT_SECRET',
      yahooClientId: process.env.YAHOO_CLIENT_ID || 'YOUR_YAHOO_CLIENT_ID',
      yahooClientSecret: process.env.YAHOO_CLIENT_SECRET || 'YOUR_YAHOO_CLIENT_SECRET'
    }
  }
})

// Nuxt 4 configuration updates can be applied here as needed