<template>
  <div class="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/60 dark:border-gray-700/40 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
    <!-- Decorative top accent -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/30 dark:via-gray-500/20 to-transparent"></div>

    <div class="p-6 sm:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200/40 dark:border-indigo-700/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Live Preview</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">Real-time signature output</p>
          </div>
        </div>
        <div v-if="extensionSaveStatus" class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border" :class="extensionSaveStatus.success ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'">
          <span class="w-1.5 h-1.5 rounded-full" :class="extensionSaveStatus.success ? 'bg-emerald-500' : 'bg-amber-500'"></span>
          {{ extensionSaveStatus.message }}
        </div>
      </div>

      <!-- Preview Area -->
      <div class="rounded-xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 sm:p-8 min-h-[240px] transition-all duration-300">
        <div v-if="!signatureHtml || signatureHtml === '<p>Your signature will appear here</p>'" class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Your signature will appear here</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">Fill in your details to generate a preview</p>
        </div>
        <div v-else v-html="signatureHtml" class="signature-preview"></div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex flex-wrap gap-3">
        <button
          @click="copyHtml"
          class="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          Copy HTML
        </button>
        <button
          @click="downloadSignature"
          class="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download
        </button>
        <button
          @click="testInGmail"
          class="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Test in Gmail
        </button>
      </div>

      <!-- Instructions -->
      <div v-if="installationInstructions" class="mt-5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 p-4">
        <h3 class="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2.5 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ installationInstructions.title }}
        </h3>
        <div class="space-y-1.5">
          <p v-for="step in installationInstructions.steps" :key="step" class="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
            {{ step }}
          </p>
        </div>
      </div>

      <!-- Default guide -->
      <div v-else class="mt-5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-700/40 p-4">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          Quick Setup
        </h3>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>Your signature auto-applies when composing emails. Click <strong class="text-gray-800 dark:text-gray-200">Test in Gmail</strong> to try it.</p>
          <div class="mt-3 p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/30">
            <p class="font-medium text-gray-700 dark:text-gray-300 text-xs mb-2">Installation Steps</p>
            <ol class="text-xs text-gray-500 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Install from the <a href="https://chromewebstore.google.com/detail/signature-generator-pro/pjmcfpndnehpblkgckmjmmapejfjoeic?authuser=0&hl=en" target="_blank" class="text-indigo-600 dark:text-indigo-400 hover:underline">Chrome Web Store</a></li>
              <li>Pin the extension to your toolbar</li>
              <li>Compose a new email and click the extension icon</li>
            </ol>
            <div class="mt-2.5 pt-2.5 border-t border-gray-200/50 dark:border-gray-700/30">
              <p class="text-xs text-gray-500 dark:text-gray-400"><strong>Tip:</strong> Use hosted image URLs (Imgur, Cloudinary) instead of file uploads for best email delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const emit = defineEmits<{
  'copyHtml': []
  'downloadSignature': []
  'testInGmail': []
}>()

const copyHtml = () => emit('copyHtml')
const downloadSignature = () => emit('downloadSignature')
const testInGmail = () => emit('testInGmail')
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
