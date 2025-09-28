<template>
  <!-- Sidebar overlay -->
  <div 
    v-if="isSidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 bg-black bg-opacity-75 z-40"
  ></div>

  <!-- Sidebar -->
  <div 
    class="fixed top-28 left-0 h-[calc(100vh-5rem)] bg-white/50 backdrop-blur-xl shadow-2xl border-r border-white/20 transition-all duration-500 z-[60]"
    :class="[
      isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full',
      'w-80 lg:w-72'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-400">
      <h2 class="text-md font-bold text-gray-600 flex items-center tracking-wide">
        <div class="w-8 h-8 bg-gradient-to-r from-white/50 to-gray-200 rounded-lg mr-3 flex items-center justify-center backdrop-blur-sm border border-gray-100/80">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
          </svg>
        </div>
        Design Settings
      </h2>
      <button 
        @click="closeSidebar"
        class="p-2 text-gray-500 hover:text-gray-600 hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-gray-200/80"
        title="Close Design Settings"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-6 space-y-4">
        
        <!-- General Styles Menu Item -->
        <div 
          @click="openGeneralStylesDialog"
          class="flex items-center justify-between p-4 bg-white/10 rounded-xl border hover:border-blue-400/60 hover:bg-white/15 cursor-pointer transition-all duration-300 backdrop-blur-sm  hover:shadow-xl hover:scale-[1.02] group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-400/30 to-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30 shadow-glass-sm group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-600 text-sm">General Styles</div>
              <div class="text-xs text-gray-500">Choose template</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Font Settings Menu Item -->
        <div 
          @click="openFontSettingsDialog"
          class="flex items-center justify-between p-4 bg-white/10 rounded-xl border  hover:border-gray-400/60 hover:bg-white/15 cursor-pointer transition-all duration-300 backdrop-blur-3xl  hover:shadow-xl hover:scale-[1.02] group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-gray-400/30 to-slate-500/20 rounded-xl flex items-center justify-center border border-gray-400/30 shadow-glass-sm group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-600 text-sm">Font Settings</div>
              <div class="text-xs text-gray-500">Family & size</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Color Settings Menu Item -->
        <div 
          @click="openColorSettingsDialog"
          class="flex items-center justify-between p-4 bg-white/10 rounded-xl border  hover:border-green-400/60 hover:bg-white/15 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-green-400/30 to-green-500/20 rounded-xl flex items-center justify-center border border-green-400/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"></path>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-600 text-sm">Color Settings</div>
              <div class="text-xs text-gray-500">Template & text colors</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Social Icons Menu Item -->
        <div 
          @click="openSocialIconsDialog"
          class="flex items-center justify-between p-4 bg-white/10 rounded-xl border   hover:border-orange-400/60 hover:bg-white/15 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] group"
        >
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-orange-400/30 to-orange-500/20 rounded-xl flex items-center justify-center border border-orange-400/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </div>
            <div>
              <div class="font-semibold text-gray-600 text-sm">Social Icons</div>
              <div class="text-xs text-gray-500">Style & appearance</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-6 border-t border-white/80">
      <div class="text-xs text-gray-500 text-center font-medium tracking-wide">
        ✨ Click any setting to customize
      </div>
    </div>
  </div>

  <!-- Toggle Button (when sidebar is closed) -->
  <button 
    v-if="!isSidebarOpen"
    @click="openSidebar"
    class="fixed top-28 left-4 z-[60] bg-white/50 backdrop-blur-xl border border-white/80 rounded-xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/25 hover:scale-110 group"
    title="Open Design Settings"
  >
    <svg class="w-6 h-6 text-gray-500 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
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
    @close="closeSocialIconsDialog"
    @apply="handleSocialIconsSettings"
  />
</template>

<script setup lang="ts">
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'
import GeneralStylesDialog from '~/components/dialogs/GeneralStylesDialog.vue'
import FontSettingsDialog from '~/components/dialogs/FontSettingsDialog.vue'
import ColorSettingsDialog from '~/components/dialogs/ColorSettingsDialog.vue'
import SocialIconsDialog from '~/components/dialogs/SocialIconsDialog.vue'

// Props
interface Props {
  currentTemplate: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: string
  isSidebarOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSidebarOpen: false
})

// Emits
const emit = defineEmits<{
  'update:currentTemplate': [value: string]
  'update:primaryColor': [value: string]
  'update:secondaryColor': [value: string]
  'update:fontFamily': [value: string]
  'update:fontSize': [value: string]
  'update:isSidebarOpen': [value: boolean]
}>()

// Use composables
const { 
  templates, 
  colorOptions, 
  fontOptions, 
  fontSizeOptions
} = useSignatureGenerator()

// Sidebar state
const isSidebarOpen = computed({
  get: () => props.isSidebarOpen,
  set: (value) => emit('update:isSidebarOpen', value)
})


// Dialog states
const isGeneralStylesDialogOpen = ref(false)
const isFontSettingsDialogOpen = ref(false)
const isColorSettingsDialogOpen = ref(false)
const isSocialIconsDialogOpen = ref(false)

// Sidebar methods
const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  closeAllDialogs() // Close any open dialogs when sidebar is closed
  isSidebarOpen.value = false
}

// Dialog methods
const closeAllDialogs = () => {
  isGeneralStylesDialogOpen.value = false
  isFontSettingsDialogOpen.value = false
  isColorSettingsDialogOpen.value = false
  isSocialIconsDialogOpen.value = false
}

const openGeneralStylesDialog = () => {
  closeAllDialogs()
  isGeneralStylesDialogOpen.value = true
}

const closeGeneralStylesDialog = () => {
  isGeneralStylesDialogOpen.value = false
}

const openFontSettingsDialog = () => {
  closeAllDialogs()
  isFontSettingsDialogOpen.value = true
}

const closeFontSettingsDialog = () => {
  isFontSettingsDialogOpen.value = false
}

const openColorSettingsDialog = () => {
  closeAllDialogs()
  isColorSettingsDialogOpen.value = true
}

const closeColorSettingsDialog = () => {
  isColorSettingsDialogOpen.value = false
}

const openSocialIconsDialog = () => {
  closeAllDialogs()
  isSocialIconsDialogOpen.value = true
}

const closeSocialIconsDialog = () => {
  isSocialIconsDialogOpen.value = false
}

// Update methods
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

const handleSocialIconsSettings = (settings: any) => {
  // Here you would typically emit the social icon settings or store them
}
</script>
