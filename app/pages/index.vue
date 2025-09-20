<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12 pt-24">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Beautiful Email
          </span>
          <br>
          <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Signatures
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create stunning, professional email signatures in minutes. 
          Choose from beautiful templates and install directly in your email client.
        </p>
        
        <!-- Authentication Section -->
        <div v-if="!isAuthenticated" class="max-w-md mx-auto">
          <div class="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Get Started</h2>
            <p class="text-gray-600 mb-6">Sign in with your email account to create your signature</p>
            
            <div class="space-y-4">
              <button 
                @click="signInWithGmail"
                :disabled="isLoading"
                class="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Gmail</span>
              </button>
              
              <button 
                @click="signInWithOutlook"
                :disabled="isLoading"
                class="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#0078D4" d="M23.5 12h-11v11h11V12zM12 12H1v11h11V12z"/>
                  <path fill="#0078D4" d="M12 1H1v11h11V1z"/>
                </svg>
                <span>Continue with Outlook</span>
              </button>
            </div>
            
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-500">
                By continuing, you agree to our 
                <a href="#" class="text-blue-600 hover:underline">Terms of Service</a> and 
                <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
        
        <!-- Dashboard Access -->
        <div v-else class="max-w-md mx-auto">
          <NuxtLink 
            to="/dashboard"
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            <span>Go to Dashboard</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Beautiful Templates</h3>
          <p class="text-gray-600">Choose from a variety of professionally designed templates with glassmorphism effects.</p>
        </div>
        
        <div class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Easy Installation</h3>
          <p class="text-gray-600">Install browser extensions to automatically apply signatures in Gmail, Outlook, and more.</p>
        </div>
        
        <div class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Cross-Platform</h3>
          <p class="text-gray-600">Works seamlessly across Chrome, Firefox, Safari, and Edge browsers.</p>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Template Preview</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div class="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span class="text-gray-500 font-medium">{{ template.name }}</span>
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">{{ template.name }}</h3>
            <p class="text-sm text-gray-600">{{ template.description }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'

const { user, isAuthenticated, isLoading, signInWithGmail, signInWithOutlook } = useAuth()
const { templates } = useSignatureGenerator()

useSeoMeta({
  title: 'SignaturePro - Beautiful Email Signature Generator',
  description: 'Create stunning, professional email signatures with glassmorphism effects. Install directly in Gmail, Outlook, and other email clients.',
  keywords: 'email signature, gmail signature, outlook signature, professional signature, glassmorphism',
  ogTitle: 'SignaturePro - Beautiful Email Signature Generator',
  ogDescription: 'Create stunning, professional email signatures with glassmorphism effects.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style> 