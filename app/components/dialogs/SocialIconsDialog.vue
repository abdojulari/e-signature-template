<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
            <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Social Icon Settings</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">Real icons that work in all email clients</p>
          </div>
        </div>
        <button @click="$emit('close')" class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- Icon Style -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Icon Style</label>
          <div class="grid grid-cols-3 gap-3">
            <button 
              @click="selectedIconType = 'branded'"
              class="px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200"
              :class="selectedIconType === 'branded' 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400' 
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'"
            >
              <div class="flex items-center justify-center gap-1 mb-1.5">
                <div class="w-4 h-4 rounded-full bg-[#0077B5] flex items-center justify-center">
                  <img src="/social-icons/linkedin.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                  <img src="/social-icons/facebook.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full bg-[#E4405F] flex items-center justify-center">
                  <img src="/social-icons/instagram.svg" alt="" class="w-2.5 h-2.5" />
                </div>
              </div>
              Branded
            </button>
            <button 
              @click="selectedIconType = 'colored'"
              class="px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200"
              :class="selectedIconType === 'colored' 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400' 
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'"
            >
              <div class="flex items-center justify-center gap-1 mb-1.5">
                <div class="w-4 h-4 rounded-full flex items-center justify-center" :style="{ backgroundColor: selectedIconBackground }">
                  <img src="/social-icons/linkedin.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full flex items-center justify-center" :style="{ backgroundColor: selectedIconBackground }">
                  <img src="/social-icons/facebook.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full flex items-center justify-center" :style="{ backgroundColor: selectedIconBackground }">
                  <img src="/social-icons/instagram.svg" alt="" class="w-2.5 h-2.5" />
                </div>
              </div>
              Custom Color
            </button>
            <button 
              @click="selectedIconType = 'outline'"
              class="px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200"
              :class="selectedIconType === 'outline' 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400' 
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'"
            >
              <div class="flex items-center justify-center gap-1 mb-1.5">
                <div class="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                  <img src="/social-icons/linkedin.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                  <img src="/social-icons/facebook.svg" alt="" class="w-2.5 h-2.5" />
                </div>
                <div class="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                  <img src="/social-icons/instagram.svg" alt="" class="w-2.5 h-2.5" />
                </div>
              </div>
              Dark
            </button>
          </div>
        </div>

        <!-- Size & Shape -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Size</label>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <input 
                  type="range" 
                  min="16" 
                  max="48" 
                  v-model.number="selectedSize"
                  class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                >
                <span class="text-sm font-mono font-medium text-gray-600 dark:text-gray-400 w-12 text-right">{{ selectedSize }}px</span>
              </div>
            </div>
          </div>
          
          <!-- Shape -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Shape</label>
            <div class="flex gap-3">
              <button 
                @click="selectedShape = 'square'"
                class="w-10 h-10 border-2 cursor-pointer transition-all duration-200 flex items-center justify-center"
                :class="selectedShape === 'square' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'"
              >
                <div class="w-5 h-5 bg-gray-400 dark:bg-gray-500"></div>
              </button>
              <button 
                @click="selectedShape = 'circle'"
                class="w-10 h-10 border-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center"
                :class="selectedShape === 'circle' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'"
              >
                <div class="w-5 h-5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
              </button>
              <button 
                @click="selectedShape = 'rounded'"
                class="w-10 h-10 border-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center"
                :class="selectedShape === 'rounded' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'"
              >
                <div class="w-5 h-5 rounded bg-gray-400 dark:bg-gray-500"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Custom Background Color (only for colored/outline modes) -->
        <div v-if="selectedIconType !== 'branded'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Background Color</label>
          <div class="flex flex-wrap gap-2.5">
            <button 
              v-for="color in backgroundColors" 
              :key="`bg-${color}`"
              @click="selectedIconBackground = color"
              class="w-9 h-9 rounded-lg cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center"
              :class="selectedIconBackground === color ? 'border-gray-800 dark:border-white ring-2 ring-offset-2 ring-gray-400' : 'border-gray-200 dark:border-gray-600'"
              :style="{ backgroundColor: color }"
            >
              <svg v-if="selectedIconBackground === color" class="w-4 h-4" :class="isLightColor(color) ? 'text-gray-800' : 'text-white'" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Live Preview -->
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Live Preview</h4>
          <div class="flex items-center gap-2 flex-wrap">
            <div 
              v-for="platform in previewPlatforms" 
              :key="platform.id"
              class="flex items-center justify-center transition-all duration-200"
              :class="shapeClass"
              :style="{ 
                backgroundColor: getPreviewBgColor(platform.color),
                width: selectedSize + 'px', 
                height: selectedSize + 'px',
                padding: iconPadding + 'px'
              }"
            >
              <img 
                :src="`/social-icons/${platform.id}.svg`" 
                :alt="platform.label" 
                :style="{ width: imgSize + 'px', height: imgSize + 'px' }"
                class="block"
              />
            </div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            These icons are hosted on your domain and will display in all email clients
          </p>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="applySettings" 
          class="px-5 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
        >
          Apply Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialIconSettings } from '~/composables/useSignatureGenerator'

interface Props {
  isOpen: boolean
  socialIconSettings?: SocialIconSettings
}

const props = withDefaults(defineProps<Props>(), {
  socialIconSettings: () => ({
    iconType: 'branded' as const,
    size: 24,
    shape: 'circle' as const,
    backgroundColor: '#4f46e5',
    iconColor: '#ffffff'
  })
})

const emit = defineEmits<{
  'close': []
  'apply': [settings: SocialIconSettings]
}>()

const selectedIconType = ref<'branded' | 'colored' | 'outline'>(props.socialIconSettings?.iconType || 'branded')
const selectedSize = ref(props.socialIconSettings?.size || 24)
const selectedShape = ref<'square' | 'circle' | 'rounded'>(props.socialIconSettings?.shape || 'circle')
const selectedIconBackground = ref(props.socialIconSettings?.backgroundColor || '#4f46e5')
const selectedIconColor = ref(props.socialIconSettings?.iconColor || '#ffffff')

watch(() => props.socialIconSettings, (newVal) => {
  if (newVal) {
    selectedIconType.value = newVal.iconType || 'branded'
    selectedSize.value = newVal.size || 24
    selectedShape.value = newVal.shape || 'circle'
    selectedIconBackground.value = newVal.backgroundColor || '#4f46e5'
    selectedIconColor.value = newVal.iconColor || '#ffffff'
  }
})

const previewPlatforms = [
  { id: 'linkedin', label: 'LinkedIn', color: '#0077B5' },
  { id: 'twitter', label: 'X', color: '#000000' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'github', label: 'GitHub', color: '#181717' },
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  { id: 'telegram', label: 'Telegram', color: '#0088CC' },
  { id: 'tiktok', label: 'TikTok', color: '#000000' },
  { id: 'discord', label: 'Discord', color: '#5865F2' },
  { id: 'pinterest', label: 'Pinterest', color: '#BD081C' },
  { id: 'snapchat', label: 'Snapchat', color: '#FFFC00' }
]

const backgroundColors = [
  '#4f46e5', '#059669', '#dc2626', '#7c3aed', '#ea580c', 
  '#0891b2', '#be123c', '#374151', '#000000', '#1e40af',
  '#047857', '#9333ea'
]

const iconPadding = computed(() => Math.round(selectedSize.value * 0.2))
const imgSize = computed(() => selectedSize.value - (iconPadding.value * 2))

const shapeClass = computed(() => {
  if (selectedShape.value === 'circle') return 'rounded-full'
  if (selectedShape.value === 'rounded') return 'rounded'
  return 'rounded-none'
})

const getPreviewBgColor = (brandColor: string) => {
  if (selectedIconType.value === 'branded') return brandColor
  if (selectedIconType.value === 'outline') return '#374151'
  return selectedIconBackground.value
}

const isLightColor = (hex: string) => {
  if (hex === 'transparent') return true
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

const applySettings = () => {
  const settings: SocialIconSettings = {
    iconType: selectedIconType.value,
    size: selectedSize.value,
    shape: selectedShape.value,
    backgroundColor: selectedIconBackground.value,
    iconColor: selectedIconColor.value
  }
  
  emit('apply', settings)
  emit('close')
}
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.slider::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}
</style>
