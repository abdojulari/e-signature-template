<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Signature Preview</h2>
      <div v-if="extensionSaveStatus" class="flex items-center gap-2 px-4 py-2 rounded-lg" :class="extensionSaveStatus.success ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
        <svg v-if="extensionSaveStatus.success" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-sm font-medium">{{ extensionSaveStatus.message }}</span>
      </div>
    </div>
    
    <div class="border border-gray-200 rounded-lg p-6 min-h-[300px] bg-gray-50">
      <div v-if="!signatureHtml || signatureHtml === '<p>Your signature will appear here</p>'" class="text-gray-500 text-center">
        <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <p class="text-base font-medium">Your signature will appear here</p>
        <p class="text-sm text-gray-400">Fill in your details and generate your signature</p>
      </div>
      <div v-else v-html="signatureHtml" class="signature-preview"></div>
    </div>
    
    <div class="mt-6 space-y-4">
      <div class="flex flex-wrap gap-3">
        <button 
          @click="copyHtml" 
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy HTML
        </button>
        <button 
          @click="downloadSignature" 
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download
        </button>
        <button 
          @click="testInGmail" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Test in Gmail
        </button>
      </div>
      
      <div v-if="installationInstructions" class="bg-green-50 border border-green-200 rounded-md p-3">
        <h3 class="text-sm font-medium text-green-800 mb-2">{{ installationInstructions.title }}</h3>
        <div class="space-y-1">
          <div v-for="step in installationInstructions.steps" :key="step" class="text-xs text-green-700">
            {{ step }}
          </div>
        </div>
      </div>
      
      <!-- Default Instructions -->
      <div v-else class="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h3 class="text-sm font-medium text-blue-800 mb-2">How it works</h3>
        <p class="text-xs text-blue-700">Your signature will automatically appear when composing emails. Click "Test in Gmail" to try it out!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  signatureHtml: string
  extensionSaveStatus: {
    success: boolean
    message: string
  } | null
  installationInstructions: {
    title: string
    steps: string[]
  } | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'copyHtml': []
  'downloadSignature': []
  'testInGmail': []
}>()

// Methods
const copyHtml = () => {
  emit('copyHtml')
}

const downloadSignature = () => {
  emit('downloadSignature')
}

const testInGmail = () => {
  emit('testInGmail')
}
</script>

<style scoped>
.signature-preview {
  font-family: Arial, sans-serif;
}

.signature-preview table {
  border-collapse: collapse;
}

.signature-preview a {
  text-decoration: none;
}

.signature-preview img {
  vertical-align: middle;
}
</style>
