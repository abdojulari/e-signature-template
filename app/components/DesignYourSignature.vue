<template>
  <!-- Sidebar overlay (mobile) -->
  <div 
    v-if="isSidebarOpen" 
    @click="closeSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
  ></div>

  <!-- Sidebar -->
  <div 
    class="fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-200 transition-transform duration-300 z-50"
    :class="[
      isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full',
      'w-80 lg:w-72'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Design Settings</h2>
      <button 
        @click="closeSidebar"
        class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-4 space-y-3">
        
        <!-- General Styles Menu Item -->
        <div 
          @click="openGeneralStylesDialog"
          class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">General Styles</div>
              <div class="text-xs text-gray-500">Choose template</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Font Settings Menu Item -->
        <div 
          @click="openFontSettingsDialog"
          class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">Font Settings</div>
              <div class="text-xs text-gray-500">Family & size</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Color Settings Menu Item -->
        <div 
          @click="openColorSettingsDialog"
          class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"></path>
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">Color Settings</div>
              <div class="text-xs text-gray-500">Template & text colors</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <!-- Social Icons Menu Item -->
        <div 
          @click="openSocialIconsDialog"
          class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </div>
            <div>
              <div class="font-medium text-gray-900">Social Icons</div>
              <div class="text-xs text-gray-500">Style & appearance</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-gray-200">
      <div class="text-xs text-gray-500 text-center">
        Click any setting to customize
      </div>
    </div>
  </div>

  <!-- Toggle Button (when sidebar is closed) -->
  <button 
    v-if="!isSidebarOpen"
    @click="openSidebar"
    class="fixed top-24 left-4 z-40 bg-white border border-gray-200 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
  >
    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  isSidebarOpen.value = false
}

// Dialog methods
const openGeneralStylesDialog = () => {
  isGeneralStylesDialogOpen.value = true
}

const closeGeneralStylesDialog = () => {
  isGeneralStylesDialogOpen.value = false
}

const openFontSettingsDialog = () => {
  isFontSettingsDialogOpen.value = true
}

const closeFontSettingsDialog = () => {
  isFontSettingsDialogOpen.value = false
}

const openColorSettingsDialog = () => {
  isColorSettingsDialogOpen.value = true
}

const closeColorSettingsDialog = () => {
  isColorSettingsDialogOpen.value = false
}

const openSocialIconsDialog = () => {
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
