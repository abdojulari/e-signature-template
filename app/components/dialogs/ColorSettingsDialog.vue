<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Color Settings</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- Template Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Template Color</label>
          <p class="text-xs text-gray-500 mb-3">Choose the primary accent color for your signature</p>
          
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="color in colorOptions" 
              :key="`primary-${color}`"
              @click="selectedPrimaryColor = color"
              class="w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center"
              :class="selectedPrimaryColor === color ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'"
              :style="{ backgroundColor: color }"
            >
              <svg v-if="selectedPrimaryColor === color" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <!-- Custom Color Picker -->
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Or choose custom color:</label>
            <div class="flex items-center space-x-2">
              <input 
                type="color" 
                v-model="selectedPrimaryColor"
                class="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              >
              <input 
                type="text" 
                v-model="selectedPrimaryColor"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="#000000"
              >
            </div>
          </div>
        </div>

        <!-- Text Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Text Color</label>
          <p class="text-xs text-gray-500 mb-3">Choose the secondary text color for your signature</p>
          
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="color in colorOptions" 
              :key="`secondary-${color}`"
              @click="selectedSecondaryColor = color"
              class="w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center"
              :class="selectedSecondaryColor === color ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'"
              :style="{ backgroundColor: color }"
            >
              <svg v-if="selectedSecondaryColor === color" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <!-- Custom Color Picker -->
          <div class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Or choose custom color:</label>
            <div class="flex items-center space-x-2">
              <input 
                type="color" 
                v-model="selectedSecondaryColor"
                class="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              >
              <input 
                type="text" 
                v-model="selectedSecondaryColor"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="#000000"
              >
            </div>
          </div>
        </div>

        <!-- Color Preview -->
        <div class="bg-gray-50 rounded-lg p-4 border">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div class="space-y-2">
            <div 
              :style="{ color: selectedPrimaryColor }" 
              class="font-semibold"
            >
              John Doe
            </div>
            <div 
              :style="{ color: selectedSecondaryColor }" 
              class="text-sm"
            >
              Senior Developer at Your Company
            </div>
            <div 
              :style="{ color: selectedSecondaryColor }" 
              class="text-sm"
            >
              john.doe@company.com | +1 (555) 123-4567
            </div>
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
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Apply Colors
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'

interface Props {
  isOpen: boolean
  primaryColor: string
  secondaryColor: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'update:primaryColor': [value: string]
  'update:secondaryColor': [value: string]
}>()

const { colorOptions } = useSignatureGenerator()

const selectedPrimaryColor = ref(props.primaryColor)
const selectedSecondaryColor = ref(props.secondaryColor)

const applySettings = () => {
  emit('update:primaryColor', selectedPrimaryColor.value)
  emit('update:secondaryColor', selectedSecondaryColor.value)
  emit('close')
}

// Update local values when props change
watch(() => props.primaryColor, (newValue) => {
  selectedPrimaryColor.value = newValue
})

watch(() => props.secondaryColor, (newValue) => {
  selectedSecondaryColor.value = newValue
})
</script>
