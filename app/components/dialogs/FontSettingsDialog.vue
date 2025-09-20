<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Font Settings</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- Font Family -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Font Family</label>
          <select 
            v-model="selectedFontFamily"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
            <option v-for="font in fontOptions" :key="font.value" :value="font.value">
              {{ font.label }}
            </option>
          </select>
          
          <!-- Font Preview -->
          <div class="mt-3 p-3 bg-gray-50 rounded-md border">
            <p :style="{ fontFamily: selectedFontFamily }" class="text-gray-900">
              Preview: The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>

        <!-- Font Size -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-4">
              <input 
                type="range" 
                min="8" 
                max="20" 
                v-model="selectedFontSizeNumber"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              >
              <span class="text-sm font-medium text-gray-600 w-12">{{ selectedFontSizeNumber }}px</span>
            </div>
            
            <select 
              v-model="selectedFontSize"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            >
              <option v-for="size in fontSizeOptions" :key="size.value" :value="size.value">
                {{ size.label }}
              </option>
            </select>
          </div>
          
          <!-- Size Preview -->
          <div class="mt-3 p-3 bg-gray-50 rounded-md border">
            <p :style="{ fontFamily: selectedFontFamily, fontSize: selectedFontSize }" class="text-gray-900">
              Sample signature text at {{ selectedFontSize }}
            </p>
          </div>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="applySettings" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'

interface Props {
  isOpen: boolean
  fontFamily: string
  fontSize: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'update:fontFamily': [value: string]
  'update:fontSize': [value: string]
}>()

const { fontOptions, fontSizeOptions } = useSignatureGenerator()

const selectedFontFamily = ref(props.fontFamily)
const selectedFontSize = ref(props.fontSize)
const selectedFontSizeNumber = ref(parseInt(props.fontSize))

// Sync font size number with select
watch(selectedFontSizeNumber, (newValue) => {
  selectedFontSize.value = `${newValue}px`
})

watch(selectedFontSize, (newValue) => {
  selectedFontSizeNumber.value = parseInt(newValue)
})

const applySettings = () => {
  emit('update:fontFamily', selectedFontFamily.value)
  emit('update:fontSize', selectedFontSize.value)
  emit('close')
}

// Update local values when props change
watch(() => props.fontFamily, (newValue) => {
  selectedFontFamily.value = newValue
})

watch(() => props.fontSize, (newValue) => {
  selectedFontSize.value = newValue
  selectedFontSizeNumber.value = parseInt(newValue)
})
</script>

<style scoped>
/* Custom slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
