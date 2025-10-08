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
      @update:currentTemplate="updateCurrentTemplate"
      @update:primaryColor="updatePrimaryColor"
      @update:secondaryColor="updateSecondaryColor"
      @update:fontFamily="updateFontFamily"
      @update:fontSize="updateFontSize"
      @update:isSidebarOpen="updateSidebarOpen"
    />

    <!-- Main Content -->
    <main 
      class="transition-all duration-500 ease-in-out relative z-10 min-h-screen pt-16"
    >
      <div class="container mx-auto px-6 py-8">
        
        <!-- Welcome Header -->
        <div class="mb-8 text-center">
          <div class=" p-8 max-w-2xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
              Create Your Perfect 
              <span class="bg-gradient-to-r from-gray-600 to-slate-700 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                Email Signature
              </span>
            </h1>
            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Design professional signatures that make lasting impressions
            </p>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Form Panel -->
          <div class=" p-1 hover:shadow-3xl transition-all duration-500 group">
            <div class=" p-8 h-full">
              <YourInformation 
                :signatureData="signatureData"
                :selectedSocialNetworks="selectedSocialNetworks"
                @update:signatureData="updateSignatureData"
                @update:selectedSocialNetworks="updateSelectedSocialNetworks"
                @resetForm="resetForm"
                @generateSignature="generateSignature"
              />
            </div>
          </div>

          <!-- Preview Panel -->
          
          <SignaturePreviewDialog 
            :signatureHtml="signatureHtml"
            :extensionSaveStatus="extensionSaveStatus"
            :installationInstructions="installationInstructions"
            @copyHtml="copyHtml"
            @downloadSignature="downloadSignature"
            @testInGmail="testInGmail"
          />
           
        </div>
        <div class="mt-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-lg">
        <p class="text-gray-700 dark:text-gray-300">If you love this, please consider leaving a review on the Chrome Web Store. It helps us grow and improve the extension.</p>
        <div class="mt-4">
          <a href="https://chromewebstore.google.com/detail/signature-generator-pro/pjmcfpndnehpblkgckmjmmapejfjoeic?authuser=0&hl=en" target="_blank" class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Leave a Review</a>
        </div>
        <div class="mt-4">
          <p class="mb-4 text-gray-700 dark:text-gray-300">If you have any questions, please feel free to contact us at <a href="mailto:abdulkabirojulari@gmail.com" class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">abdulkabirojulari@gmail.com</a>.</p>
          <div class="flex  space-x-3 group">
            <div class="relative">
              <!-- Animated Coffee Cup -->
              <div class="relative group-hover:scale-110 transition-transform duration-300">
                <!-- Coffee Cup -->
                <svg class="w-8 h-8 text-gray-600 dark:text-gray-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <!-- Cup body -->
                  <path d="M3 4h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor"/>
                  <!-- Coffee liquid -->
                  <path d="M3 6h14v6H3V6z" fill="url(#coffeeGradient)" opacity="0.8"/>
                  <!-- Cup handle -->
                  <path d="M17 8h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2V8z" fill="currentColor"/>
                  <!-- Saucer -->
                  <ellipse cx="12" cy="18" rx="8" ry="1" fill="currentColor" opacity="0.3"/>
                  <!-- Gradient definition -->
                  <defs>
                    <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#fefefe;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <!-- Animated Steam -->
                <div class="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div class="steam-container">
                    <div class="steam steam-1"></div>
                    <div class="steam steam-2"></div>
                    <div class="steam steam-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300">You can buy me a coffee <a href="https://www.buymeacoffee.com/abdulkabirojulari" target="_blank" class="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200">here</a>.</p>
          </div>
          <p class="py-5 text-gray-700 dark:text-gray-300">Thank you for using Signature Generator Pro!</p>
        </div>
      </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'
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
    qrCodeData: ''
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
/* Coffee Steam Animation */
.steam-container {
  position: relative;
  width: 20px;
  height: 20px;
}

.steam {
  position: absolute;
  width: 2px;
  height: 8px;
  background: linear-gradient(to top, rgba(107, 114, 128, 0.8), rgba(107, 114, 128, 0.2));
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: steam-rise 2.5s infinite ease-in-out;
}

.steam-1 {
  left: 6px;
  animation-delay: 0s;
  animation-duration: 2.2s;
}

.steam-2 {
  left: 10px;
  animation-delay: 0.7s;
  animation-duration: 2.8s;
}

.steam-3 {
  left: 14px;
  animation-delay: 1.4s;
  animation-duration: 2.5s;
}

@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6) rotate(0deg);
  }
  20% {
    opacity: 0.8;
    transform: translateY(-4px) scale(0.8) rotate(2deg);
  }
  50% {
    opacity: 1;
    transform: translateY(-8px) scale(1) rotate(-1deg);
  }
  80% {
    opacity: 0.6;
    transform: translateY(-12px) scale(0.9) rotate(1deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-16px) scale(0.6) rotate(0deg);
  }
}

/* Dark mode steam */
.dark .steam {
  background: linear-gradient(to top, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1));
}

/* Hover effect for steam */
.group:hover .steam {
  animation-duration: 1.8s;
}
</style>
