<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
    <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200/50">
        <h2 class="text-xl font-semibold text-gray-800 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          Social Media Settings
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100/50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- Social Network Selection -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4">Select Social Networks</label>
          <div class="grid grid-cols-4 gap-3 mb-6">
            <div 
              v-for="network in socialNetworks" 
              :key="network.id"
              @click="toggleSocialNetwork(network.id)"
              class="flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-100/50 border relative hover:scale-105 hover:shadow-lg"
              :class="localSelectedNetworks.includes(network.id) ? 'bg-blue-50 border-blue-300 shadow-md' : 'border-gray-200'"
            >
              <!-- Social Media Icon -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                   :style="{ backgroundColor: getSocialNetworkColor(network.id) }">
                <i :class="getSocialNetworkIcon(network.id)" 
                   :style="{ color: getSocialNetworkTextColor(network.id) }" 
                   class="text-sm"></i>
              </div>
              
              <!-- Selection Indicator -->
              <div v-if="localSelectedNetworks.includes(network.id)" 
                   class="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              <span class="text-xs text-center font-medium text-gray-700">{{ network.name }}</span>
            </div>
          </div>
        </div>
        
        <!-- Social Links Input -->
        <div v-if="localSelectedNetworks.length > 0" class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">Social Media URLs</h3>
          <div v-for="network in localSelectedNetworks" :key="network" class="space-y-2">
            <label class="block text-sm font-medium text-gray-600">
              <div class="flex items-center mb-2">
                <div class="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                     :style="{ backgroundColor: getSocialNetworkColor(network) }">
                  <i :class="getSocialNetworkIcon(network)" 
                     :style="{ color: getSocialNetworkTextColor(network) }" 
                     class="text-xs"></i>
                </div>
                {{ getSocialNetworkName(network) }} URL
              </div>
            </label>
            <input 
              :value="localSocialLinks[network] || ''"
              @input="updateSocialLink(network, $event.target.value)"
              type="url" 
              :placeholder="`Enter your ${getSocialNetworkName(network)} URL`"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/80 text-gray-700 placeholder-gray-400 transition-all duration-200"
            >
            <p v-if="getURLError(network)" class="mt-1 text-xs text-red-600">
              {{ getURLError(network) }}
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="localSelectedNetworks.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          <p class="text-gray-500 text-sm">Select social networks above to add your profiles</p>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="flex items-center justify-between p-6 border-t border-gray-200/50 bg-gray-50/50">
        <div class="text-sm text-gray-600">
          {{ localSelectedNetworks.length }} network{{ localSelectedNetworks.length !== 1 ? 's' : '' }} selected
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="saveSettings" 
            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  selectedSocialNetworks: string[]
  socialLinks: Record<string, string>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'save': [data: { selectedNetworks: string[], socialLinks: Record<string, string> }]
}>()

// Local state
const localSelectedNetworks = ref([...props.selectedSocialNetworks])
const localSocialLinks = ref({...props.socialLinks})
const urlErrors = ref<Record<string, string>>({})

// Social networks data
const socialNetworks = [
  { id: 'linkedin', icon: 'fab fa-linkedin-in', name: 'LinkedIn' },
  { id: 'twitter', icon: 'fab fa-twitter', name: 'Twitter' },
  { id: 'facebook', icon: 'fab fa-facebook-f', name: 'Facebook' },
  { id: 'instagram', icon: 'fab fa-instagram', name: 'Instagram' },
  { id: 'youtube', icon: 'fab fa-youtube', name: 'YouTube' },
  { id: 'github', icon: 'fab fa-github', name: 'GitHub' },
  { id: 'whatsapp', icon: 'fab fa-whatsapp', name: 'WhatsApp' },
  { id: 'telegram', icon: 'fab fa-telegram-plane', name: 'Telegram' },
  { id: 'snapchat', icon: 'fab fa-snapchat-ghost', name: 'Snapchat' },
  { id: 'pinterest', icon: 'fab fa-pinterest-p', name: 'Pinterest' },
  { id: 'tiktok', icon: 'fab fa-tiktok', name: 'TikTok' },
  { id: 'discord', icon: 'fab fa-discord', name: 'Discord' }
]

// Watch for props changes
watch(() => props.selectedSocialNetworks, (newVal) => {
  localSelectedNetworks.value = [...newVal]
})

watch(() => props.socialLinks, (newVal) => {
  localSocialLinks.value = {...newVal}
})

const toggleSocialNetwork = (networkId: string) => {
  if (localSelectedNetworks.value.includes(networkId)) {
    localSelectedNetworks.value = localSelectedNetworks.value.filter(id => id !== networkId)
    delete localSocialLinks.value[networkId]
    delete urlErrors.value[networkId]
  } else {
    localSelectedNetworks.value.push(networkId)
  }
}

const updateSocialLink = (network: string, value: string) => {
  localSocialLinks.value[network] = value
  
  // Simple URL validation
  if (value && !isValidURL(value)) {
    urlErrors.value[network] = 'Please enter a valid URL'
  } else {
    delete urlErrors.value[network]
  }
}

const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const getURLError = (network: string): string => {
  return urlErrors.value[network] || ''
}

const getSocialNetworkColor = (networkId: string): string => {
  const colors: Record<string, string> = {
    linkedin: '#0077B5',
    twitter: '#1DA1F2',
    facebook: '#1877F2',
    instagram: '#E4405F',
    youtube: '#FF0000',
    github: '#181717',
    whatsapp: '#25D366',
    telegram: '#0088CC',
    snapchat: '#FFFC00',
    pinterest: '#BD081C',
    tiktok: '#000000',
    discord: '#5865F2'
  }
  return colors[networkId] || '#6b7280'
}

const getSocialNetworkTextColor = (networkId: string): string => {
  return networkId === 'snapchat' ? '#000000' : '#ffffff'
}

const getSocialNetworkIcon = (networkId: string): string => {
  const network = socialNetworks.find(n => n.id === networkId)
  return network?.icon || 'fas fa-link'
}

const getSocialNetworkName = (networkId: string): string => {
  const network = socialNetworks.find(n => n.id === networkId)
  return network?.name || networkId
}

const saveSettings = () => {
  // Only save if no validation errors
  if (Object.keys(urlErrors.value).length === 0) {
    emit('save', {
      selectedNetworks: localSelectedNetworks.value,
      socialLinks: localSocialLinks.value
    })
    emit('close')
  }
}
</script>
