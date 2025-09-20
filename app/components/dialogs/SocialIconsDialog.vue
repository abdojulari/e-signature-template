<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Social Icons Settings</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- Icon Style -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Icon Style</label>
          <div class="flex space-x-4">
            <div class="flex items-center">
              <input 
                type="radio" 
                id="branded" 
                name="iconType" 
                value="branded" 
                v-model="selectedIconType"
                class="mr-2 w-4 h-4 text-blue-600"
              >
              <label for="branded" class="text-sm text-gray-700">Branded</label>
            </div>
            <div class="flex items-center">
              <input 
                type="radio" 
                id="colored" 
                name="iconType" 
                value="colored" 
                v-model="selectedIconType"
                class="mr-2 w-4 h-4 text-blue-600"
              >
              <label for="colored" class="text-sm text-gray-700">Colored</label>
            </div>
            <div class="flex items-center">
              <input 
                type="radio" 
                id="outline" 
                name="iconType" 
                value="outline" 
                v-model="selectedIconType"
                class="mr-2 w-4 h-4 text-blue-600"
              >
              <label for="outline" class="text-sm text-gray-700">Outline</label>
            </div>
          </div>
        </div>

        <!-- Icon Configuration Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Size</label>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <input 
                  type="range" 
                  min="16" 
                  max="48" 
                  v-model="selectedSize"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                >
                <span class="text-sm font-medium text-gray-600 w-12">{{ selectedSize }}px</span>
              </div>
              <div class="flex items-center justify-center p-3 bg-gray-50 rounded-md border">
                <div 
                  class="bg-blue-500 rounded-full"
                  :style="{ width: selectedSize + 'px', height: selectedSize + 'px' }"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- Shape -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Shape</label>
            <div class="space-y-3">
              <div class="flex space-x-3">
                <div 
                  @click="selectedShape = 'square'"
                  class="w-8 h-8 border-2 cursor-pointer transition-all duration-200"
                  :class="selectedShape === 'square' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
                ></div>
                <div 
                  @click="selectedShape = 'circle'"
                  class="w-8 h-8 border-2 rounded-full cursor-pointer transition-all duration-200"
                  :class="selectedShape === 'circle' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
                ></div>
                <div 
                  @click="selectedShape = 'rounded'"
                  class="w-8 h-8 border-2 rounded cursor-pointer transition-all duration-200"
                  :class="selectedShape === 'rounded' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
                ></div>
              </div>
              <div class="text-xs text-gray-500">
                <span v-if="selectedShape === 'square'">Square icons</span>
                <span v-else-if="selectedShape === 'circle'">Circular icons</span>
                <span v-else="selectedShape === 'rounded'">Rounded corners</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Icon Background -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Icon Background</label>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="color in backgroundColors" 
              :key="`bg-${color}`"
              @click="selectedIconBackground = color"
              class="w-10 h-10 rounded cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center"
              :class="selectedIconBackground === color ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'"
              :style="{ backgroundColor: color }"
            >
              <svg v-if="selectedIconBackground === color" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Icon Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Icon Color</label>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="color in iconColors" 
              :key="`icon-${color}`"
              @click="selectedIconColor = color"
              class="w-10 h-10 rounded cursor-pointer border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center"
              :class="selectedIconColor === color ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'"
              :style="{ backgroundColor: color }"
            >
              <svg v-if="selectedIconColor === color" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div class="bg-gray-50 rounded-lg p-4 border">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Preview</h4>
          <div class="flex items-center space-x-3">
            <div 
              v-for="platform in ['linkedin', 'twitter', 'instagram']" 
              :key="platform"
              class="flex items-center justify-center border-2 border-gray-300 transition-all duration-200"
              :class="{
                'rounded-full': selectedShape === 'circle',
                'rounded': selectedShape === 'rounded',
                'rounded-none': selectedShape === 'square'
              }"
              :style="{ 
                backgroundColor: selectedIconBackground,
                width: selectedSize + 'px', 
                height: selectedSize + 'px' 
              }"
            >
              <div 
                class="w-1/2 h-1/2 rounded"
                :style="{ backgroundColor: selectedIconColor }"
              ></div>
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
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'apply': [settings: any]
}>()

// Social icon settings
const selectedIconType = ref('branded')
const selectedSize = ref(24)
const selectedShape = ref('circle')
const selectedIconBackground = ref('#4f46e5')
const selectedIconColor = ref('#ffffff')

const backgroundColors = [
  '#4f46e5', '#059669', '#dc2626', '#7c3aed', '#ea580c', 
  '#0891b2', '#be123c', '#374151', '#000000', 'transparent'
]

const iconColors = [
  '#ffffff', '#000000', '#374151', '#6b7280', '#4f46e5', 
  '#059669', '#dc2626', '#7c3aed', '#ea580c', '#0891b2'
]

const applySettings = () => {
  const settings = {
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
