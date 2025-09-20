<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
    <div class="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-8 max-w-md w-full mx-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Authenticating...</h2>
        <p class="text-gray-600">Please wait while we complete your sign-in</p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p class="text-gray-600 mb-6">You have been successfully signed in</p>
        <NuxtLink 
          to="/dashboard"
          class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
          <span>Go to Dashboard</span>
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Authentication Failed</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <div class="space-y-3">
          <button 
            @click="retryAuth"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Try Again
          </button>
          <NuxtLink 
            to="/"
            class="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { handleAuthCallback } = useAuth()

const isLoading = ref(true)
const isSuccess = ref(false)
const error = ref('')

const retryAuth = () => {
  isLoading.value = true
  error.value = ''
  processAuth()
}

const processAuth = async () => {
  try {
    // Get URL parameters
    const route = useRoute()
    const code = route.query.code as string
    const state = route.query.state as string
    const errorParam = route.query.error as string

    if (errorParam) {
      throw new Error(errorParam)
    }

    // If no code or state, redirect to home
    if (!code || !state) {
      console.log('No OAuth parameters found, redirecting to home')
      if (process.client) {
        await navigateTo('/')
      }
      return
    }

    // Parse the state parameter to get the provider
    let provider: 'gmail' | 'outlook'
    try {
      const stateData = JSON.parse(decodeURIComponent(state))
      provider = stateData.provider
    } catch (error) {
      console.error('Error parsing state parameter:', error)
      throw new Error('Invalid state parameter')
    }

    if (!provider) {
      throw new Error('No provider specified in state')
    }

    // Handle the authentication callback
    await handleAuthCallback(code, provider)
    
    // Show success state briefly before redirect
    isLoading.value = false
    isSuccess.value = true
    
    // Redirect after a short delay
    setTimeout(async () => {
      console.log('Redirecting to dashboard...')
      if (process.client) {
        try {
          await navigateTo('/dashboard')
        } catch (error) {
          console.error('Navigation error:', error)
          // Fallback to window.location
          window.location.href = '/dashboard'
        }
      }
    }, 2000)

  } catch (err) {
    console.error('Auth callback error:', err)
    isLoading.value = false
    error.value = err instanceof Error ? err.message : 'Authentication failed'
  }
}

onMounted(() => {
  processAuth()
})

useSeoMeta({
  title: 'Authentication - SignaturePro',
  description: 'Completing your sign-in process.'
})
</script> 