<template>
  <div class="p-8 relative overflow-hidden">
    <!-- Subtle glass shine effect -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-gray-600 flex items-center tracking-wide">
        <div class="w-8 h-8 bg-gradient-to-r from-gray-400/30 to-gray-200 rounded-lg mr-3 flex items-center justify-center backdrop-blur-sm border border-gray-200/30">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        Signature Preview
      </h2>
      <div v-if="extensionSaveStatus" class="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm border shadow-lg" :class="extensionSaveStatus.success ? 'bg-white border-gray-600/50 text-green-700' : 'bg-yellow-500/20 border-yellow-400/50 text-yellow-100'">
        <svg v-if="extensionSaveStatus.success" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-sm font-semibold">{{ extensionSaveStatus.message }}</span>
      </div>
    </div>
    
    <div class="border border-gray-300 rounded-xl p-8 min-h-[300px] bg-white/10 backdrop-blur-sm shadow-lg">
      <div v-if="!signatureHtml || signatureHtml === '<p>Your signature will appear here</p>'" class="text-gray-600/70 text-center">
        <svg class="w-16 h-16 mx-auto mb-6 text-gray-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <p class="text-xl font-bold mb-3 text-gray-600">Your signature will appear here</p>
        <p class="text-sm text-gray-600/60">Fill in your details and generate your signature</p>
      </div>
      <div v-else v-html="signatureHtml" class="signature-preview"></div>
    </div>
    
    <div class="mt-8 space-y-6">
      <div class="flex flex-wrap gap-4">
        <button 
          @click="copyHtml" 
          class="px-6 py-3 border border-gray-300 text-gray-600/90 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy HTML
        </button>
        <button 
          @click="downloadSignature" 
          class="px-6 py-3 border border-gray-300 text-gray-600/90 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download
        </button>
        <button 
          @click="testInGmail" 
          class="px-8 py-3 bg-gradient-to-r from-slate-500/80 to-gray-600/80 text-white rounded-xl hover:from-slate-500 hover:to-gray-600 backdrop-blur-sm transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 border border-gray-300"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Test in Gmail
        </button>
      </div>
      
      <div v-if="installationInstructions" class="bg-green-500/20 border border-green-400/50 rounded-xl p-4 backdrop-blur-sm">
        <h3 class="text-sm font-semibold text-green-100 mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ installationInstructions.title }}
        </h3>
        <div class="space-y-2">
          <div v-for="step in installationInstructions.steps" :key="step" class="text-sm text-green-200">
            {{ step }}
          </div>
        </div>
      </div>
      
      <!-- Default Instructions -->
      <div v-else class="bg-white/20 border border-gray-400/50 rounded-xl p-4 backdrop-blur-sm">
        <h3 class="text-sm font-semibold text-gray-600 mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          How it works
        </h3>
        <p class="text-sm text-gray-500">Your signature will automatically appear when composing emails. Click "Test in Gmail" to try it out!</p>
        <div class="mt-4 p-4 bg-gray-50/50 border border-gray-200/50 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
             Installation Guide
          </h4>
          <div class="space-y-2 text-xs text-gray-600">
            <p><strong>Step 1:</strong> Visit the <a href="https://chromewebstore.google.com/detail/signature-generator-pro/pjmcfpndnehpblkgckmjmmapejfjoeic?authuser=0&hl=en" target="_blank" class="underline hover:text-blue-800">Chrome Web Store</a> and click "Add to Chrome"</p>
            <p><strong>Step 2:</strong> Pin the extension to your toolbar by clicking the puzzle piece icon (🧩) and pinning Signature Generator Pro</p>
            <p><strong>Step 3:</strong> Go to Gmail or Yahoo, compose a new email, and click the extension icon to apply your signature</p>
            <p><strong>Step 4:</strong> Your signature will be automatically inserted into the email compose area - ready to send!</p>
          </div>
          <div class="mt-3 text-xs text-gray-500">
            <p><strong>Pro Tip:</strong></p>
            <ul class="list-disc list-inside">
              <li>Create different signatures for different purposes and switch between them using the extension popup.</li>
              <li>While uploaded images now show in the preview, use hosted image URLs for best email delivery. 
                Uploaded images (base64) may be blocked by some email clients like Gmail and Outlook.</li>
                <li> <strong> How to use hosted images:</strong> Upload your images to a service like Imgur, Cloudinary, or your website, then use the URL instead of file upload.</li>
            </ul>
          </div>
        </div>
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
