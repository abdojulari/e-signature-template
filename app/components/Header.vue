<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div class="absolute inset-0 bg-gradient-to-r from-slate-100/30 via-white/10 to-slate-100/30 backdrop-blur-xl border-b border-white/30">
      <!-- Enhanced top highlight -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      <!-- Additional depth gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
    </div>
    <div class="relative container mx-auto px-6 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-orange-300 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/40  hover:scale-105 transition-all duration-300 hover:shadow-glass-lg relative">
            <!-- Email icon as background -->
            <svg class="w-5 h-5 text-white/60 drop-shadow-sm absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <!-- Letter S as foreground -->
            <span class="text-white font-bold text-lg drop-shadow-lg relative z-10">S</span>
          </div>
          <h1 class="text-2xl font-bold tracking-wide drop-shadow-xl">
            Signature<span class="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">Pro</span>
          </h1>
        </div>
        
        <div v-if="isAuthenticated" class="relative" ref="dropdownContainer">
          <button 
            @click.stop="toggleDropdown"
            class="flex items-center space-x-3  px-4 py-3  transition-all duration-300  hover:scale-105"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-white/30 to-white/10 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <span class="text-sm font-semibold text-gray-800">{{ displayUserName }}</span>
            <svg 
              class="w-4 h-4 text-gray-800 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="isDropdownOpen"
            @click.stop
            class="absolute  mt-8 w-64 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-10 animate-in slide-in-from-top-2 duration-200"
          >
            <div class="px-5 py-4 border-b border-white/20">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-white/30 to-white/10 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ displayUserName }}</p>
                  <p class="text-xs text-gray-700">{{ displayUserEmail }}</p>
                </div>
              </div>
            </div>
            <button 
              @click="handleSignOut"
              class="w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-white/10 transition-all duration-200 flex items-center space-x-3 rounded-xl mx-2 my-1"
            >
              <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
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
