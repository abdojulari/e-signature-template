<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
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
  background-color: #f5f7fa;
  color: var(--dark);
  margin: 0;
  padding: 0;
}
</style>

