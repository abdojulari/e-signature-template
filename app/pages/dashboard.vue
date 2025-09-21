<template>
  <!-- Loading State -->
  <div v-if="isPageLoading" class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
    <div class="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-8 text-center">
      <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard...</h2>
      <p class="text-gray-600">Please wait while we verify your authentication</p>
    </div>
  </div>

  <!-- Main Dashboard -->
  <div v-else class="min-h-screen bg-gray-50">
    <!-- Clean Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 class="text-xl font-semibold text-gray-900">
              SignaturePro
            </h1>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <img :src="user?.picture || '/default-avatar.png'" alt="Profile" class="w-8 h-8 rounded-full">
              <span class="text-sm font-medium text-gray-700">{{ user?.name }}</span>
            </div>
            <button @click="signOut" class="text-sm text-gray-500 hover:text-gray-700">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>

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
      class="transition-all duration-300"
      :class="[
        'min-h-screen pt-16',
        isSidebarOpen ? 'lg:ml-72' : 'ml-0'
      ]"
    >
      <div class="container mx-auto px-6 py-8">
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Form Panel -->
          <YourInformation 
            :signatureData="signatureData"
            :selectedSocialNetworks="selectedSocialNetworks"
            @update:signatureData="updateSignatureData"
            @update:selectedSocialNetworks="updateSelectedSocialNetworks"
            @resetForm="resetForm"
            @generateSignature="generateSignature"
          />

          <!-- Preview Panel -->
          <div>
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
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSignatureGenerator } from '~/composables/useSignatureGenerator'
import { useBrowserExtension } from '~/composables/useBrowserExtension'


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

// Reactive data
const currentTemplate = ref('minimal')
const selectedSocialNetworks = ref(['linkedin', 'twitter'])
const signatureHtml = ref('<p>Your signature will appear here</p>')
const installationInstructions = ref(null as any)
const extensionSaveStatus = ref(null as any)
const isSidebarOpen = ref(false)

const signatureData = reactive({
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  mobilePhone: '',
  homePhone: '',
  officePhone: '',
  companyName: '',
  jobTitle: '',
  website: '',
  socialLinks: {} as Record<string, string>,
  profilePhoto: null as File | null,
  companyLogo: null as File | null,
  profilePhotoBase64: '' as string,
  companyLogoBase64: '' as string,
  profilePhotoUrl: '' as string,
  companyLogoUrl: '' as string,
  fontFamily: 'Arial, sans-serif',
  fontSize: '10px',
  primaryColor: '#4361ee',
  secondaryColor: '#3a0ca3',
  includeQRCode: false,
  qrCodeData: ''
})

// Methods
const updateCurrentTemplate = (template: string) => {
  currentTemplate.value = template
}

const updatePrimaryColor = (color: string) => {
  signatureData.primaryColor = color
}

const updateSecondaryColor = (color: string) => {
  signatureData.secondaryColor = color
}

const updateFontFamily = (fontFamily: string) => {
  signatureData.fontFamily = fontFamily
}

const updateFontSize = (fontSize: string) => {
  signatureData.fontSize = fontSize
}

const updateSidebarOpen = (isOpen: boolean) => {
  isSidebarOpen.value = isOpen
}

const updateSignatureData = (newData: any) => {
  Object.assign(signatureData, newData)
}

const updateSelectedSocialNetworks = (networks: string[]) => {
  selectedSocialNetworks.value = networks
}

const resetForm = () => {
  Object.assign(signatureData, {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    mobilePhone: '',
    homePhone: '',
    officePhone: '',
    companyName: '',
    jobTitle: '',
    website: '',
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

const generateSignature = async () => {
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
    
    // Auto-save to Chrome storage for extension if available
    saveSignatureToExtension(html)
  } catch (error) {
    console.error('Error generating signature:', error)
    signatureHtml.value = '<p>Error generating signature</p>'
  }
}

const saveSignatureToExtension = (signature: string) => {
  // Use the proper Chrome extension messaging
  saveToChromeStorageDirectly(signature)
}

const saveToChromeStorageDirectly = (signature: string) => {
  if (typeof window !== 'undefined') {
    // Method 1: Try chrome.storage.local directly (if available)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      try {
        chrome.storage.local.set({ email_signature: signature }, function() {
          if (chrome.runtime.lastError) {
            console.error('Chrome storage error:', chrome.runtime.lastError.message)
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
      if (!chrome?.storage?.local) {
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
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.remove(['email_signature'], function() {
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
