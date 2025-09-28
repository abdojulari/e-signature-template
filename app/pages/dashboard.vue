<template>
  <!-- Loading State -->
  <div v-if="isPageLoading" class="min-h-screen bg-gradient-to-br from-gray-300 via-slate-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
    
    <div class="bg-slate-200 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center relative z-10 max-w-md mx-4">
      <div class="w-20 h-20 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
        <svg class="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white mb-3 tracking-wide">Loading Dashboard...</h2>
      <p class="text-white/80 text-lg">Creating your signature experience</p>
    </div>
  </div>

  <!-- Main Dashboard -->
  <div v-else class="min-h-screen bg-white relative overflow-hidden">
    <!-- Animated Background Elements -->
    <!-- <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/3 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div class="absolute bottom-1/3 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div> -->
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
            <h1 class="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
              Create Your Perfect 
              <span class="bg-gradient-to-r from-gray-600 to-slate-700 bg-clip-text text-transparent">
                Email Signature
              </span>
            </h1>
            <p class="text-gray-700 text-lg leading-relaxed">
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
