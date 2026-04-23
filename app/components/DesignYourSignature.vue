<template>
  <!-- Sidebar overlay -->
  <div 
    v-if="isSidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
  ></div>

  <!-- Sidebar -->
  <div 
    class="fixed top-28 left-0 h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out z-[60] flex flex-col"
    :class="[
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'w-80 lg:w-[310px]'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
          <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/>
          </svg>
        </div>
        <div>
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">Design Studio</h2>
          <p class="text-[11px] text-gray-500 dark:text-gray-400">Customize your signature</p>
        </div>
      </div>
      <button 
        @click="closeSidebar"
        class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
        title="Close Design Settings"
      >
        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="flex-1 overflow-y-auto py-3 px-3">
      <div class="space-y-1.5">
        
        <!-- General Styles -->
        <button 
          @click="openGeneralStylesDialog"
          class="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 cursor-pointer transition-all duration-200 group text-left"
        >
          <div class="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/60 transition-colors">
            <svg class="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 dark:text-white">Templates</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Choose a layout style</div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Font Settings -->
        <button 
          @click="openFontSettingsDialog"
          class="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 group text-left"
        >
          <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <svg class="w-4.5 h-4.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 dark:text-white">Typography</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Font family & size</div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Color Settings -->
        <button 
          @click="openColorSettingsDialog"
          class="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer transition-all duration-200 group text-left"
        >
          <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/60 transition-colors">
            <svg class="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 dark:text-white">Colors</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Primary & accent colors</div>
          </div>
          <div class="flex items-center gap-1 mr-1">
            <div class="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-600" :style="{ backgroundColor: primaryColor }"></div>
            <div class="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-600" :style="{ backgroundColor: secondaryColor }"></div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Divider -->
        <div class="border-t border-gray-100 dark:border-gray-800 mx-2 my-2"></div>

        <!-- Social Icons -->
        <button 
          @click="openSocialIconsDialog"
          class="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer transition-all duration-200 group text-left"
        >
          <div class="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/60 transition-colors">
            <svg class="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 dark:text-white">Social Icons</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Style, shape & size</div>
          </div>
          <!-- Mini icon preview -->
          <div class="flex items-center gap-0.5 mr-1">
            <div class="w-4 h-4 rounded-full bg-[#0077B5] flex items-center justify-center">
              <span class="text-white text-[7px] font-bold leading-none">in</span>
            </div>
            <div class="w-4 h-4 rounded-full bg-black flex items-center justify-center">
              <span class="text-white text-[7px] font-bold leading-none">X</span>
            </div>
            <div class="w-4 h-4 rounded-full bg-[#E4405F] flex items-center justify-center">
              <span class="text-white text-[7px] font-bold leading-none">ig</span>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-800">
      <p class="text-[11px] text-gray-400 dark:text-gray-500 text-center">
        Real social icons that persist in email clients
      </p>
    </div>
  </div>

  <!-- Toggle Button -->
  <button 
    v-if="!isSidebarOpen"
    @click="openSidebar"
    class="fixed top-28 left-4 z-[60] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    title="Open Design Settings"
  >
    <svg class="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:rotate-45 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/>
    </svg>
  </button>

  <!-- Dialogs -->
  <GeneralStylesDialog 
    :isOpen="isGeneralStylesDialogOpen"
    :currentTemplate="currentTemplate"
    @close="closeGeneralStylesDialog"
    @update:currentTemplate="updateCurrentTemplate"
  />

  <FontSettingsDialog 
    :isOpen="isFontSettingsDialogOpen"
    :fontFamily="fontFamily"
    :fontSize="fontSize"
    @close="closeFontSettingsDialog"
    @update:fontFamily="updateFontFamily"
    @update:fontSize="updateFontSize"
  />

  <ColorSettingsDialog 
    :isOpen="isColorSettingsDialogOpen"
    :primaryColor="primaryColor"
    :secondaryColor="secondaryColor"
    @close="closeColorSettingsDialog"
    @update:primaryColor="updatePrimaryColor"
    @update:secondaryColor="updateSecondaryColor"
  />

  <SocialIconsDialog 
    :isOpen="isSocialIconsDialogOpen"
    :socialIconSettings="socialIconSettings"
    @close="closeSocialIconsDialog"
    @apply="handleSocialIconsSettings"
  />
</template>

<script setup lang="ts">
import type { SocialIconSettings } from '~/composables/useSignatureGenerator'
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'
import GeneralStylesDialog from '~/components/dialogs/GeneralStylesDialog.vue'
import FontSettingsDialog from '~/components/dialogs/FontSettingsDialog.vue'
import ColorSettingsDialog from '~/components/dialogs/ColorSettingsDialog.vue'
import SocialIconsDialog from '~/components/dialogs/SocialIconsDialog.vue'

interface Props {
  currentTemplate: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: string
  isSidebarOpen?: boolean
  socialIconSettings?: SocialIconSettings
}

const props = withDefaults(defineProps<Props>(), {
  isSidebarOpen: false
})

const emit = defineEmits<{
  'update:currentTemplate': [value: string]
  'update:primaryColor': [value: string]
  'update:secondaryColor': [value: string]
  'update:fontFamily': [value: string]
  'update:fontSize': [value: string]
  'update:isSidebarOpen': [value: boolean]
  'update:socialIconSettings': [value: SocialIconSettings]
}>()

const { 
  templates, 
  colorOptions, 
  fontOptions, 
  fontSizeOptions
} = useSignatureGenerator()

const isSidebarOpen = computed({
  get: () => props.isSidebarOpen,
  set: (value) => emit('update:isSidebarOpen', value)
})

const socialIconSettings = computed(() => props.socialIconSettings || {
  iconType: 'branded' as const,
  size: 24,
  shape: 'circle' as const,
  backgroundColor: '#4f46e5',
  iconColor: '#ffffff'
})

const isGeneralStylesDialogOpen = ref(false)
const isFontSettingsDialogOpen = ref(false)
const isColorSettingsDialogOpen = ref(false)
const isSocialIconsDialogOpen = ref(false)

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  closeAllDialogs()
  isSidebarOpen.value = false
}

const closeAllDialogs = () => {
  isGeneralStylesDialogOpen.value = false
  isFontSettingsDialogOpen.value = false
  isColorSettingsDialogOpen.value = false
  isSocialIconsDialogOpen.value = false
}

const openGeneralStylesDialog = () => {
  closeAllDialogs()
  isGeneralStylesDialogOpen.value = true
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const closeGeneralStylesDialog = () => {
  isGeneralStylesDialogOpen.value = false
}

const openFontSettingsDialog = () => {
  closeAllDialogs()
  isFontSettingsDialogOpen.value = true
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const closeFontSettingsDialog = () => {
  isFontSettingsDialogOpen.value = false
}

const openColorSettingsDialog = () => {
  closeAllDialogs()
  isColorSettingsDialogOpen.value = true
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const closeColorSettingsDialog = () => {
  isColorSettingsDialogOpen.value = false
}

const openSocialIconsDialog = () => {
  closeAllDialogs()
  isSocialIconsDialogOpen.value = true
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const closeSocialIconsDialog = () => {
  isSocialIconsDialogOpen.value = false
}

const updateCurrentTemplate = (templateId: string) => {
  emit('update:currentTemplate', templateId)
}

const updatePrimaryColor = (color: string) => {
  emit('update:primaryColor', color)
}

const updateSecondaryColor = (color: string) => {
  emit('update:secondaryColor', color)
}

const updateFontFamily = (fontFamily: string) => {
  emit('update:fontFamily', fontFamily)
}

const updateFontSize = (fontSize: string) => {
  emit('update:fontSize', fontSize)
}

const handleSocialIconsSettings = (settings: SocialIconSettings) => {
  emit('update:socialIconSettings', settings)
}
</script>
