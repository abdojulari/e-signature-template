<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Your Information</h2>
    
    <!-- Personal Information -->
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input 
            :value="signatureData.firstName"
            @input="updateField('firstName', $event)"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="John"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
          <input 
            :value="signatureData.middleName"
            @input="updateField('middleName', $event)"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="Michael"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input 
            :value="signatureData.lastName"
            @input="updateField('lastName', $event)"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="Doe"
          >
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
        <input 
          :value="signatureData.jobTitle"
          @input="updateField('jobTitle', $event)"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          placeholder="Marketing Director"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input 
          :value="signatureData.companyName"
          @input="updateField('companyName', $event)"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          placeholder="Acme Inc."
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
        <input 
          :value="signatureData.email"
          @input="updateField('email', $event)"
          type="email" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          placeholder="john@example.com"
        >
      </div>
      
      <!-- Phone Numbers -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
          <input 
            :value="signatureData.mobilePhone"
            @input="updateField('mobilePhone', $event)"
            type="tel" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="+1 (555) 123-4567"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Home Phone</label>
          <input 
            :value="signatureData.homePhone"
            @input="updateField('homePhone', $event)"
            type="tel" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="+1 (555) 987-6543"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Office Phone</label>
          <input 
            :value="signatureData.officePhone"
            @input="updateField('officePhone', $event)"
            type="tel" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
            placeholder="+1 (555) 456-7890"
          >
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input 
          :value="signatureData.website"
          @input="updateField('website', $event)"
          type="url" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          placeholder="https://example.com"
        >
      </div>
      
      <!-- Social Media -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Social Media</label>
        <div class="grid grid-cols-4 gap-2 mb-4">
          <div 
            v-for="network in socialNetworks" 
            :key="network.id"
            @click="toggleSocialNetwork(network.id)"
            class="flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 border relative"
            :class="selectedSocialNetworks.includes(network.id) ? 'bg-blue-50 border-blue-500' : 'border-gray-200'"
          >
            <!-- Social Media Icon -->
            <div class="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                 :style="{ backgroundColor: getSocialNetworkColor(network.id) }">
              <i :class="getSocialNetworkIcon(network.id)" 
                 :style="{ color: getSocialNetworkTextColor(network.id) }" 
                 class="text-sm"></i>
            </div>
            
            <!-- Selection Checkmark -->
            <div v-if="selectedSocialNetworks.includes(network.id)" 
                 class="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <span class="text-xs text-center font-medium">{{ network.name }}</span>
          </div>
        </div>
        
        <div v-if="selectedSocialNetworks.length > 0" class="space-y-2">
          <input 
            v-for="network in selectedSocialNetworks" 
            :key="network"
            :value="signatureData.socialLinks[network] || ''"
            @input="updateSocialLink(network, $event)"
            type="text" 
            :placeholder="`${getSocialNetworkName(network)} URL`"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
        </div>
      </div>
      
      <!-- QR Code Option -->
      <div>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            :checked="signatureData.includeQRCode"
            @change="toggleQRCode"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          >
          <span class="text-sm font-medium text-gray-700">Include QR Code for Contact Info</span>
        </label>
        <p class="text-xs text-gray-500 mt-1 ml-6">Add a scannable QR code containing your contact information to your signature</p>
        
        <!-- QR Code Preview -->
        <div v-if="signatureData.includeQRCode && signatureData.qrCodeData" class="mt-3 ml-6">
          <div class="flex items-center space-x-3">
            <img :src="signatureData.qrCodeData" alt="Contact QR Code" class="w-16 h-16 border border-gray-200 rounded">
            <div class="text-xs text-gray-600">
              <p class="font-medium">QR Code Preview</p>
              <p>Scan to save contact info</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- File Uploads -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
          <input 
            type="url" 
            :value="signatureData.profilePhotoUrl"
            @input="handleProfilePhotoUrlInput"
            placeholder="https://example.com/profile.jpg"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm mb-2"
          >
          <input 
            type="file" 
            accept="image/*" 
            @change="handleProfilePhoto"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
          <div v-if="getProfileImageSrc()" class="mt-2">
            <img :src="getProfileImageSrc()" alt="Profile Preview" class="w-12 h-12 rounded-full object-cover">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
          <input 
            type="url" 
            :value="signatureData.companyLogoUrl"
            @input="handleCompanyLogoUrlInput"
            placeholder="https://example.com/logo.png"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm mb-2"
          >
          <input 
            type="file" 
            accept="image/*" 
            @change="handleCompanyLogo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
          <div v-if="getCompanyLogoSrc()" class="mt-2">
            <img :src="getCompanyLogoSrc()" alt="Logo Preview" class="h-8 object-contain">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex gap-3 mt-6 pt-4 border-t border-gray-200">
      <button 
        @click="resetForm" 
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        Reset
      </button>
      <button 
        @click="generateSignature" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
      >
        Generate Signature
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useSignatureGenerator, type SignatureData } from '~/composables/useSignatureGenerator'

interface Props {
  signatureData: SignatureData
  selectedSocialNetworks: string[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:signatureData': [value: SignatureData]
  'update:selectedSocialNetworks': [value: string[]]
  'resetForm': []
  'generateSignature': []
}>()

// Use composables
const { socialNetworks, generateQRCode } = useSignatureGenerator()

// Methods
const updateField = (field: keyof SignatureData, event: Event) => {
  const target = event.target as HTMLInputElement
  const updatedData = { ...props.signatureData, [field]: target.value }
  emit('update:signatureData', updatedData)
}

const updateSocialLink = (network: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const updatedSocialLinks = { ...props.signatureData.socialLinks, [network]: target.value }
  const updatedData = { ...props.signatureData, socialLinks: updatedSocialLinks }
  emit('update:signatureData', updatedData)
}

const toggleSocialNetwork = (networkId: string) => {
  const index = props.selectedSocialNetworks.indexOf(networkId)
  let updatedNetworks: string[]
  let updatedSocialLinks = { ...props.signatureData.socialLinks }
  
  if (index > -1) {
    updatedNetworks = props.selectedSocialNetworks.filter(id => id !== networkId)
    delete updatedSocialLinks[networkId]
  } else {
    updatedNetworks = [...props.selectedSocialNetworks, networkId]
  }
  
  emit('update:selectedSocialNetworks', updatedNetworks)
  const updatedData = { ...props.signatureData, socialLinks: updatedSocialLinks }
  emit('update:signatureData', updatedData)
}

const getSocialNetworkName = (networkId: string) => {
  const network = socialNetworks.find(n => n.id === networkId)
  return network?.name || networkId
}

const getSocialNetworkIcon = (id: string) => {
  const iconMap: Record<string, string> = {
    linkedin: 'fab fa-linkedin-in',
    twitter: 'fab fa-x-twitter',
    facebook: 'fab fa-facebook-f',
    instagram: 'fab fa-instagram',
    youtube: 'fab fa-youtube',
    tiktok: 'fab fa-tiktok',
    whatsapp: 'fab fa-whatsapp',
    telegram: 'fab fa-telegram-plane',
    snapchat: 'fab fa-snapchat-ghost',
    pinterest: 'fab fa-pinterest-p',
    github: 'fab fa-github',
    discord: 'fab fa-discord'
  }
  return iconMap[id] || 'fas fa-link'
}

const getSocialNetworkColor = (id: string) => {
  const colorMap: Record<string, string> = {
    linkedin: '#0077B5',
    twitter: '#000000',
    facebook: '#1877F2',
    instagram: '#E4405F',
    youtube: '#FF0000',
    tiktok: '#000000',
    whatsapp: '#25D366',
    telegram: '#0088CC',
    snapchat: '#FFFC00',
    pinterest: '#BD081C',
    github: '#181717',
    discord: '#5865F2'
  }
  return colorMap[id] || '#6B7280'
}

const getSocialNetworkTextColor = (id: string) => {
  // Use black text for light backgrounds, white for dark
  const lightBackgrounds = ['snapchat']
  return lightBackgrounds.includes(id) ? '#000000' : '#FFFFFF'
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'))
      return
    }
    
    // Validate file size (max 2MB for email compatibility)
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Image file must be smaller than 2MB for email compatibility'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Ensure we have a valid base64 data URL
      if (result && result.startsWith('data:image/')) {
        resolve(result)
      } else {
        reject(new Error('Failed to convert image to base64'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.readAsDataURL(file)
  })
}

const handleProfilePhoto = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    try {
      const base64 = await convertFileToBase64(target.files[0])
      const updatedData = {
        ...props.signatureData,
        profilePhoto: target.files[0],
        profilePhotoBase64: base64,
        profilePhotoUrl: '' // Clear URL when file is uploaded
      }
      emit('update:signatureData', updatedData)
      emit('generateSignature')
    } catch (error) {
      console.error('Error converting profile photo:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error uploading profile photo: ${errorMessage}`)
      // Clear the input
      target.value = ''
    }
  }
}

const handleCompanyLogo = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    try {
      const base64 = await convertFileToBase64(target.files[0])
      const updatedData = {
        ...props.signatureData,
        companyLogo: target.files[0],
        companyLogoBase64: base64,
        companyLogoUrl: '' // Clear URL when file is uploaded
      }
      emit('update:signatureData', updatedData)
      emit('generateSignature')
    } catch (error) {
      console.error('Error converting company logo:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error uploading company logo: ${errorMessage}`)
      // Clear the input
      target.value = ''
    }
  }
}

// Handle profile photo URL input
const handleProfilePhotoUrlInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const updatedData = {
    ...props.signatureData,
    profilePhotoUrl: value,
    profilePhoto: null, // Clear file upload when URL is used
    profilePhotoBase64: ''
  }
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

// Handle company logo URL input
const handleCompanyLogoUrlInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const updatedData = {
    ...props.signatureData,
    companyLogoUrl: value,
    companyLogo: null, // Clear file upload when URL is used
    companyLogoBase64: ''
  }
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}

// Get the appropriate image source (URL takes priority over base64)
const getProfileImageSrc = () => {
  return props.signatureData.profilePhotoUrl || props.signatureData.profilePhotoBase64 || undefined
}

const getCompanyLogoSrc = () => {
  return props.signatureData.companyLogoUrl || props.signatureData.companyLogoBase64 || undefined
}

const resetForm = () => {
  emit('resetForm')
}

const generateSignature = () => {
  emit('generateSignature')
}

const toggleQRCode = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const includeQRCode = target.checked
  
  let qrCodeData = ''
  if (includeQRCode) {
    // Generate QR code when enabled
    qrCodeData = await generateQRCode(props.signatureData)
  }
  
  const updatedData = {
    ...props.signatureData,
    includeQRCode,
    qrCodeData
  }
  
  emit('update:signatureData', updatedData)
  emit('generateSignature')
}
</script>
