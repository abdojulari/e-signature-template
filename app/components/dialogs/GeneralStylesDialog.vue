<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">General Styles</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6">
        <p class="text-gray-600 mb-6">Choose a template style for your signature</p>
        
        <!-- Templates Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            v-for="template in templates" 
            :key="template.id"
            @click="selectTemplate(template.id)"
            class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            :class="selectedTemplate === template.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200'"
          >
            <div class="h-22 bg-gray-50 rounded-md mb-3 flex items-center justify-center overflow-hidden">
              <img :src="`/templates/${template.image}`" :alt="template.name" class="w-full h-full object-contain rounded-md">
            </div>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-900 mb-1">{{ template.name }}</div>
              <div class="text-xs text-gray-500">{{ template.description }}</div>
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
          @click="applyTemplate" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Style
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'

interface Props {
  isOpen: boolean
  currentTemplate: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'update:currentTemplate': [value: string]
}>()

const { templates } = useSignatureGenerator()

const selectedTemplate = ref(props.currentTemplate)

const selectTemplate = (templateId: string) => {
  selectedTemplate.value = templateId
}

const applyTemplate = () => {
  emit('update:currentTemplate', selectedTemplate.value)
  emit('close')
}

// Update selectedTemplate when prop changes
watch(() => props.currentTemplate, (newValue) => {
  selectedTemplate.value = newValue
})
</script>
