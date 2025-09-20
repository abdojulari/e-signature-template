<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div class="absolute inset-0 bg-white/20 backdrop-blur-md border-b border-white/30"></div>
    <div class="relative container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SignaturePro
          </h1>
        </div>
        
        <div v-if="isAuthenticated" class="relative" ref="dropdownContainer">
          <button 
            @click.stop="toggleDropdown"
            class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/20 transition-colors"
          >
            <i class="fas fa-user-circle text-xl text-gray-700"></i>
            <span class="text-sm font-medium text-gray-700">{{ displayUserName }}</span>
            <i 
              class="fas fa-chevron-down text-xs text-gray-600 transition-transform"
              :class="{ 'rotate-180': isDropdownOpen }"
            ></i>
          </button>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="isDropdownOpen"
            @click.stop
            class="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/30 py-1 z-10"
          >
            <div class="px-4 py-3 border-b border-gray-200/50">
              <div class="flex items-center space-x-3">
                <i class="fas fa-user-circle text-2xl text-gray-600"></i>
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ displayUserName }}</p>
                  <p class="text-xs text-gray-600">{{ displayUserEmail }}</p>
                </div>
              </div>
            </div>
            <button 
              @click="handleSignOut"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors flex items-center space-x-2"
            >
              <i class="fas fa-sign-out-alt text-gray-600"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, isAuthenticated, signOut } = useAuth()
const isDropdownOpen = ref(false)
const dropdownContainer = ref<HTMLElement>()

// Computed properties for user display
const displayUserName = computed(() => {
  if (user.value?.name && user.value.name !== 'Demo User') {
    return user.value.name
  }
  // If we have a real email, extract name from it
  if (user.value?.email && user.value.email !== 'user@example.com') {
    const emailName = user.value.email.split('@')[0]
    if (emailName) {
      return emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._]/g, ' ')
    }
  }
  return 'User Account'
})

const displayUserEmail = computed(() => {
  return user.value?.email || 'user@example.com'
})

const toggleDropdown = () => {
  console.log('Toggling dropdown, current state:', isDropdownOpen.value)
  isDropdownOpen.value = !isDropdownOpen.value
  console.log('New dropdown state:', isDropdownOpen.value)
}

const handleSignOut = async () => {
  isDropdownOpen.value = false
  await signOut()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (dropdownContainer.value && !dropdownContainer.value.contains(target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
