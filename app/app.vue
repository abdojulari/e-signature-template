<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Initialize dark mode
const { initDarkMode } = useDarkMode()

// Add FontAwesome for social media icons globally
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      integrity: 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==',
      crossorigin: 'anonymous'
    }
  ]
})

// Initialize dark mode on app start
onMounted(() => {
  initDarkMode()
})

useSeoMeta({
  title: 'SignaturePro - Beautiful Email Signature Generator',
  description: 'Create stunning, professional email signatures with glassmorphism effects. Install directly in Gmail, Yahoo Mail, and other email clients.',
  keywords: 'email signature, gmail signature, yahoo signature, professional signature, glassmorphism',
  ogTitle: 'SignaturePro - Beautiful Email Signature Generator',
  ogDescription: 'Create stunning, professional email signatures with glassmorphism effects.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<style>
:root {
  --primary: #4361ee;
  --secondary: #3f37c9;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--dark);
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark body {
  color: #e2e8f0;
}
</style>

