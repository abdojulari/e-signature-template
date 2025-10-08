<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Glassmorphism Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
    
    <!-- Floating Glass Orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-gray-300/30 to-slate-400/30 dark:from-gray-600/20 dark:to-gray-700/20 rounded-full blur-3xl animate-bounce-gentle"></div>
      <div class="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-slate-300/20 to-gray-400/20 dark:from-gray-600/15 dark:to-gray-700/15 rounded-full blur-3xl animate-bounce-gentle" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-gray-400/25 to-slate-500/25 dark:from-gray-600/20 dark:to-gray-700/20 rounded-full blur-3xl animate-bounce-gentle" style="animation-delay: 2s;"></div>
    </div>

    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="relative z-10 container mx-auto px-4 py-24 pt-24">
      <!-- Hero Section -->
      <div class="text-center my-16">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 dark:from-gray-300 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
            Beautiful Email
          </span>
          <br>
          <span class="bg-gradient-to-r from-orange-600 to-yellow-100 dark:from-orange-400 dark:to-yellow-200 bg-clip-text text-transparent">
            Signatures
          </span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning, professional email signatures in minutes. 
          Choose from beautiful templates and install directly in your email client.
        </p>
        
        <!-- Authentication Section -->
        <div v-if="!isAuthenticated" class="max-w-md mx-auto">
          <div class="relative group">
            <!-- Glass morphism card -->
            <div class="absolute -inset-1 bg-gradient-to-r from-gray-400/20 to-slate-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-glass border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 transition-all duration-300">
              <h2 class="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-6">Get Started</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6">Sign in with your email account to create your signature</p>
              
              <div class="space-y-4">
                <button 
                  @click="signInWithGmail"
                  :disabled="isLoading"
                  class="w-full flex items-center justify-center space-x-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-white/50 dark:border-gray-600/50 rounded-xl px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-white/95 dark:hover:bg-gray-600/95 hover:shadow-glass-sm transition-all duration-300 disabled:opacity-50 group/btn"
                >
                  <svg class="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Gmail</span>
                </button>
                
                <button 
                  @click="signInWithYahoo"
                  :disabled="isLoading"
                  class="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-slate-600/90 to-slate-700/90 dark:from-slate-500/90 dark:to-slate-600/90 backdrop-blur-sm text-white rounded-xl px-6 py-3 hover:from-slate-700/90 hover:to-slate-800/90 dark:hover:from-slate-400/90 dark:hover:to-slate-500/90 hover:shadow-glass transition-all duration-300 disabled:opacity-50 group/btn border border-white/20 dark:border-gray-600/20"
                >
                  <svg class="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Continue with Yahoo</span>
                </button>
              </div>
              
              <div class="mt-6 text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  By continuing, you agree to our 
                  <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-slate-700 dark:hover:text-gray-200 hover:underline transition-colors duration-200">Terms of Service</a> and 
                  <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-slate-700 dark:hover:text-gray-200 hover:underline transition-colors duration-200">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Dashboard Access -->
        <div v-else class="max-w-md mx-auto">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-gray-500 to-slate-600 dark:from-gray-600 dark:to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <NuxtLink 
              to="/dashboard"
              class="relative inline-flex items-center space-x-2 bg-gradient-to-r from-slate-600/90 to-gray-700/90 dark:from-slate-500/90 dark:to-gray-600/90 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold hover:from-slate-700/90 hover:to-gray-800/90 dark:hover:from-slate-400/90 dark:hover:to-gray-500/90 transition-all transform hover:scale-105 shadow-glass border border-white/20 dark:border-gray-600/20 group/btn"
            >
              <svg class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <span>Go to Dashboard</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-gray-400/30 to-slate-500/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-glass border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-600 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-2">Beautiful Templates</h3>
            <p class="text-gray-600 dark:text-gray-300">Choose from a variety of professionally designed templates with glassmorphism effects.</p>
          </div>
        </div>
        
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-slate-400/30 to-gray-500/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-glass border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 dark:from-slate-600 dark:to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-2">Easy Installation</h3>
            <p class="text-gray-600 dark:text-gray-300">Install browser extensions to automatically apply signatures in Gmail, Yahoo Mail, and more.</p>
          </div>
        </div>
        
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-gray-500/30 to-slate-600/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-glass border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-600 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-2">Cross-Platform</h3>
            <p class="text-gray-600 dark:text-gray-300">Works seamlessly across Chrome, while Firefox, Safari, and Edge browsers are coming soon.</p>
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="relative p-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-gray-200 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent mb-4">Template Preview</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-gray-500 to-slate-600 dark:from-gray-400 dark:to-gray-500 rounded-full mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="relative group cursor-pointer h-full"
          >
            <div class="absolute -inset-0.5 bg-gradient-to-r from-gray-400/20 to-slate-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl rounded-xl p-6 shadow-glass border border-white/50 dark:border-gray-700/50 hover:border-white/70 dark:hover:border-gray-600/70 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-glass h-full flex flex-col">
              <div class="h-32 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-white/30 dark:border-gray-600/30 flex-shrink-0">
                <img :src="`/templates/${template.image}`" :alt="template.name" class="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105">
              </div>
              <div class="flex-grow flex flex-col">
                <h3 class="font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-2">{{ template.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 flex-grow">{{ template.description }}</p>
              </div>
            </div>
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

const { user, isAuthenticated, isLoading, signInWithGmail, signInWithYahoo } = useAuth()
const { templates } = useSignatureGenerator()

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

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style> 