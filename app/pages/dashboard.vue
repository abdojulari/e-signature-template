<template>
  <!-- Loading State -->
  <div v-if="isPageLoading" class="min-h-screen bg-gradient-to-br from-gray-300 via-slate-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    
    <div class="bg-slate-200 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-12 text-center relative z-10 max-w-md mx-4">
      <div class="w-20 h-20 bg-gradient-to-r from-white/20 to-white/10 dark:from-gray-700/50 dark:to-gray-600/50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30 dark:border-gray-600/50">
        <svg class="w-10 h-10 text-white dark:text-gray-200 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white dark:text-gray-100 mb-3 tracking-wide">Loading Dashboard...</h2>
      <p class="text-white/80 dark:text-gray-300/80 text-lg">Creating your signature experience</p>
    </div>
  </div>

  <!-- Main Dashboard -->
  <div v-else class="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
    <!-- Clean Header -->
    <Header />

    <!-- Design Sidebar -->
    <DesignYourSignature 
      :currentTemplate="currentTemplate"
      :primaryColor="signatureData.primaryColor"
      :secondaryColor="signatureData.secondaryColor"
      :fontFamily="signatureData.fontFamily"
      :fontSize="signatureData.fontSize"
      :isSidebarOpen="isSidebarOpen"
      :socialIconSettings="signatureData.socialIconSettings"
      @update:currentTemplate="updateCurrentTemplate"
      @update:primaryColor="updatePrimaryColor"
      @update:secondaryColor="updateSecondaryColor"
      @update:fontFamily="updateFontFamily"
      @update:fontSize="updateFontSize"
      @update:isSidebarOpen="updateSidebarOpen"
      @update:socialIconSettings="updateSocialIconSettings"
    />

    <!-- Main Content -->
    <main class="transition-all duration-500 ease-in-out relative z-10 min-h-screen pt-16">
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-8">

        <!-- Welcome Header -->
        <div class="mb-6 sm:mb-8 text-center">
          <div class="max-w-2xl mx-auto">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              Create Your Perfect
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Email Signature
              </span>
            </h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Design professional signatures that make lasting impressions
            </p>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <!-- Form Panel -->
          <div>
            <YourInformation
              :signatureData="signatureData"
              :selectedSocialNetworks="selectedSocialNetworks"
              @update:signatureData="updateSignatureData"
              @update:selectedSocialNetworks="updateSelectedSocialNetworks"
              @resetForm="resetForm"
              @generateSignature="generateSignature"
            />
          </div>

          <!-- Preview Panel -->
          <div class="lg:sticky lg:top-24 lg:self-start">
            <SignaturePreviewDialog
              :signatureHtml="signatureHtml"
              :extensionSaveStatus="extensionSaveStatus"
              :installationInstructions="installationInstructions"
              @copyHtml="copyHtml"
              @downloadSignature="downloadSignature"
              @testInGmail="testInGmail"
            />
          </div>
        </div>

        <!-- Footer Card -->
        <div class="mt-8 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/40 shadow-sm overflow-hidden">
          <div class="p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p class="text-sm text-gray-700 dark:text-gray-300">Love this tool? A review helps us grow.</p>
              <a href="https://chromewebstore.google.com/detail/signature-generator-pro/pjmcfpndnehpblkgckmjmmapejfjoeic" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors w-fit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                Leave a Review
              </a>
            </div>
            <div class="pt-3 border-t border-gray-200/50 dark:border-gray-700/30">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Questions? Open an issue in the project repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSignatureGenerator, type SocialIconSettings } from '~/composables/useSignatureGenerator'
import { useBrowserExtension } from '~/composables/useBrowserExtension'
import { useSignatureStorage } from '~/composables/useLocalStorage'
import Header from '~/components/Header.vue'


// Check authentication
const { user, isAuthenticated, signOut, isLoading } = useAuth()

// Show loading state while checking auth
const isPageLoading = ref(true)

// Use composables
const { 
  generateSignature: generateSignatureFromComposable,
  getFullName,
  generateQRCode
} = useSignatureGenerator()

const { 
  installExtension, 
  copySignatureToClipboard, 
  downloadSignatureFile, 
  generateInstallationInstructions 
} = useBrowserExtension()

// Use localStorage for persistence
const {
  signatureData: storedSignatureData,
  designSettings: storedDesignSettings,
  selectedSocialNetworks: storedSocialNetworks,
  generatedSignature: storedGeneratedSignature,
  saveSignatureData,
  saveDesignSettings,
  setSelectedSocialNetworks,
  setGeneratedSignature,
  exportForExtension
} = useSignatureStorage()

// Reactive data with localStorage backing
const currentTemplate = ref(storedDesignSettings.value.currentTemplate)
const selectedSocialNetworks = ref(storedSocialNetworks.value.length > 0 ? storedSocialNetworks.value : ['linkedin', 'twitter'])
const signatureHtml = ref(storedGeneratedSignature.value || '<p>Your signature will appear here</p>')
const installationInstructions = ref(null as any)
const extensionSaveStatus = ref(null as any)
const isSidebarOpen = ref(false)

// Create reactive signature data from stored data
const signatureData = reactive({ ...storedSignatureData.value })

// Methods with localStorage persistence
const updateCurrentTemplate = (template: string) => {
  currentTemplate.value = template
  saveDesignSettings({
    ...storedDesignSettings.value,
    currentTemplate: template
  })
}

const updatePrimaryColor = (color: string) => {
  signatureData.primaryColor = color
  saveSignatureData(signatureData)
  saveDesignSettings({
    ...storedDesignSettings.value,
    primaryColor: color
  })
}

const updateSecondaryColor = (color: string) => {
  signatureData.secondaryColor = color
  saveSignatureData(signatureData)
  saveDesignSettings({
    ...storedDesignSettings.value,
    secondaryColor: color
  })
}

const updateFontFamily = (fontFamily: string) => {
  signatureData.fontFamily = fontFamily
  saveSignatureData(signatureData)
  saveDesignSettings({
    ...storedDesignSettings.value,
    fontFamily: fontFamily
  })
}

const updateFontSize = (fontSize: string) => {
  signatureData.fontSize = fontSize
  saveSignatureData(signatureData)
  saveDesignSettings({
    ...storedDesignSettings.value,
    fontSize: fontSize
  })
}

const updateSidebarOpen = (isOpen: boolean) => {
  isSidebarOpen.value = isOpen
}

const updateSocialIconSettings = (settings: SocialIconSettings) => {
  signatureData.socialIconSettings = settings
  saveSignatureData(signatureData)
  generateSignature()
}

const updateSignatureData = (newData: any) => {
  Object.assign(signatureData, newData)
  saveSignatureData(signatureData)
}

const updateSelectedSocialNetworks = (networks: string[]) => {
  selectedSocialNetworks.value = networks
  setSelectedSocialNetworks(networks)
}

const resetForm = () => {
  Object.assign(signatureData, {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    mobilePhone: '',
    officePhone: '',
    companyName: '',
    jobTitle: '',
    website: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZipCode: '',
    companyCountry: '',
    socialLinks: {},
    profilePhoto: null,
    companyLogo: null,
    profilePhotoBase64: '',
    companyLogoBase64: '',
    profilePhotoUrl: '',
    companyLogoUrl: '',
    fontFamily: 'Arial, sans-serif',
    fontSize: '10px',
    primaryColor: '#4361ee',
    secondaryColor: '#3a0ca3',
    includeQRCode: false,
    qrCodeData: '',
    socialIconSettings: {
      iconType: 'branded',
      size: 24,
      shape: 'circle',
      backgroundColor: '#4f46e5',
      iconColor: '#ffffff'
    }
  })
  currentTemplate.value = 'minimal'
  selectedSocialNetworks.value = ['linkedin', 'twitter']
  generateSignature()
}

// Debounced signature generation to prevent excessive calls
let generateSignatureTimeout: ReturnType<typeof setTimeout> | null = null

const generateSignature = async () => {
  // Clear any existing timeout
  if (generateSignatureTimeout) {
    clearTimeout(generateSignatureTimeout)
  }
  
  // Debounce the signature generation
  generateSignatureTimeout = setTimeout(async () => {
    try {
      // Generate QR code if enabled and contact info is available
      if (signatureData.includeQRCode && (signatureData.firstName || signatureData.lastName || signatureData.email)) {
        console.log('Generating QR code for signature...')
        signatureData.qrCodeData = await generateQRCode(signatureData)
        console.log('QR code data set:', signatureData.qrCodeData ? 'Success' : 'Failed')
      } else if (signatureData.includeQRCode) {
        console.log('QR code enabled but missing required data (name or email)')
      } else {
        signatureData.qrCodeData = ''
        console.log('QR code disabled')
      }
      
      const html = generateSignatureFromComposable(signatureData, currentTemplate.value)
      signatureHtml.value = html
      
      // Save to localStorage for persistence
      setGeneratedSignature(html)
      saveSignatureData(signatureData)
      
      // Auto-save to Chrome storage for extension if available
      saveSignatureToExtension(html)
    } catch (error) {
      console.error('Error generating signature:', error)
      signatureHtml.value = '<p>Error generating signature</p>'
    }
  }, 150) // 150ms debounce for better performance
}

const saveSignatureToExtension = (signature: string) => {
  // Use the proper Chrome extension messaging
  saveToChromeStorageDirectly(signature)
}

const saveToChromeStorageDirectly = (signature: string) => {
  if (typeof window !== 'undefined') {
    // Method 1: Try chrome.storage.local directly (if available)
    const chromeApi = (window as any).chrome
    if (typeof chromeApi !== 'undefined' && chromeApi.storage && chromeApi.storage.local) {
      try {
        chromeApi.storage.local.set({ email_signature: signature }, function() {
          if (chromeApi.runtime.lastError) {
            console.error('Chrome storage error:', chromeApi.runtime.lastError.message)
          } else {
            extensionSaveStatus.value = {
              success: true,
              message: 'Signature saved to Chrome extension!'
            }
            
            setTimeout(() => {
              extensionSaveStatus.value = null
            }, 5000)
          }
        })
      } catch (error) {
        console.error('Chrome storage error:', error)
      }
    } else {
      // Method 2: Try postMessage to extension content script
      try {
        window.postMessage({
          type: 'SIGNATURE_SAVE_REQUEST',
          signature: signature,
          source: 'dashboard'
        }, '*')
      } catch (error) {
        console.log('PostMessage failed:', error)
      }
    }
    
    // Method 3: Always save to localStorage as backup
    try {
      localStorage.setItem('email_signature', signature)
      
      // Show success status if chrome storage didn't work
      if (!chromeApi?.storage?.local) {
        extensionSaveStatus.value = {
          success: true,
          message: 'Signature saved - Extension ready'
        }
        
        setTimeout(() => {
          extensionSaveStatus.value = null
        }, 5000)
      }
      
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      extensionSaveStatus.value = {
        success: false,
        message: 'Error saving signature'
      }
      setTimeout(() => {
        extensionSaveStatus.value = null
      }, 5000)
    }
  }
}



const copyHtml = async () => {
  const success = await copySignatureToClipboard(signatureHtml.value)
  if (success) {
    alert('Signature HTML copied to clipboard!')
  } else {
    alert('Failed to copy signature HTML')
  }
}

const downloadSignature = () => {
  const fileName = `${getFullName(signatureData)}-signature.html`
  downloadSignatureFile(signatureHtml.value, fileName)
}

const clearExtensionCache = () => {
  // Clear localStorage
  try {
    localStorage.removeItem('email_signature')
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
  
  // Clear chrome.storage.local if available
  const chromeApi = (window as any).chrome
  if (typeof chromeApi !== 'undefined' && chromeApi.storage && chromeApi.storage.local) {
    chromeApi.storage.local.remove(['email_signature'], function() {
      // Re-save current signature
      setTimeout(() => {
        saveSignatureToExtension(signatureHtml.value)
      }, 500)
    })
  }
}

const testInGmail = () => {
  // First, make sure we have the latest signature generated
  generateSignature()
  
  // Clear extension cache and force update
  clearExtensionCache()
  
  // Give time for cache clear and re-save
  setTimeout(() => {
    // Open Gmail in a new tab for testing
    const gmailUrl = 'https://mail.google.com/mail/u/0/#inbox?compose=new'
    window.open(gmailUrl, '_blank')
    
    // Show helpful instructions
    installationInstructions.value = {
      title: 'How to Use Your Signature in Gmail',
      steps: [
        '✅ Your signature is saved and ready!',
        '📧 A new Gmail compose window just opened',
        '🎯 Your signature will auto-apply when you start composing',
        '⚡ You can also click the extension icon and click "Apply Signature"',
        '🔄 Refresh Gmail if needed'
      ]
    }
  }, 1500)
}

// Watch for changes in signature data to auto-update
watch(signatureData, () => {
  generateSignature()
}, { deep: true })

// Watch for template changes
watch(currentTemplate, () => {
  generateSignature()
})

// Listen for extension responses
const setupExtensionListener = () => {
  if (typeof window !== 'undefined') {
    // Listen for responses from content script
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return
      
      if (event.data && event.data.type === 'SIGNATURE_SAVE_RESPONSE') {
        extensionSaveStatus.value = {
          success: event.data.success,
          message: event.data.success ? 'Saved to Chrome extension!' : 'Extension save failed'
        }
        
        setTimeout(() => {
          extensionSaveStatus.value = null
        }, 5000)
      }
    })
  }
}

// Initialize
onMounted(async () => {
  // Wait a moment for auth to be checked from localStorage
  await nextTick()
  
  // Check authentication after auth status is loaded
  if (!isAuthenticated.value) {
    await navigateTo('/')
    return
  }
  
  // Set page as loaded
  isPageLoading.value = false
  
  generateSignature()
  setupExtensionListener()
})

useSeoMeta({
  title: 'Dashboard - SignaturePro',
  description: 'Design and customize your email signature with beautiful templates and glassmorphism effects.'
})
</script>

<style scoped>
</style>
