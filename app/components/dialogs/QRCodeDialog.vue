<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200/50">
        <h2 class="text-xl font-semibold text-gray-800 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm0 10h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zM17 8h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1z"></path>
          </svg>
          QR Code Settings
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100/50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6 space-y-6">
        <!-- QR Code Description -->
        <div class="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="text-sm font-semibold text-blue-800 mb-1">What is a Contact QR Code?</h3>
              <p class="text-sm text-blue-700">A QR code containing your contact information that recipients can scan with their phone to automatically save your details to their contacts.</p>
            </div>
          </div>
        </div>

        <!-- Contact Information Selection -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4">Select information to include in QR Code</label>
          <div class="space-y-3">
            <label v-for="field in contactFields" :key="field.key" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200">
              <input 
                type="checkbox" 
                :checked="localSelectedFields.includes(field.key)"
                @change="toggleField(field.key)"
                class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              >
              <div class="flex items-center flex-1">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="field.icon"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ field.label }}</span>
                <span v-if="getFieldValue(field.key)" class="ml-auto text-xs text-gray-500 truncate max-w-48">
                  {{ getFieldValue(field.key) }}
                </span>
                <span v-else class="ml-auto text-xs text-gray-400 italic">Not provided</span>
              </div>
            </label>
          </div>
        </div>

        <!-- QR Code Size -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-3">QR Code Size</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-4">
              <input 
                type="range" 
                min="80" 
                max="150" 
                v-model="localQRSize"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              >
              <span class="text-sm font-medium text-gray-600 w-16">{{ localQRSize }}px</span>
            </div>
            <div class="flex justify-center p-4 bg-gray-50 rounded-lg border">
              <div 
                class="bg-gray-300 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg"
                :style="{ width: localQRSize + 'px', height: localQRSize + 'px' }"
              >
                <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm0 10h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zM17 8h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div v-if="localSelectedFields.length > 0">
          <label class="block text-sm font-semibold text-gray-700 mb-3">QR Code Preview</label>
          <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-center space-x-6">
              <div v-if="previewQRCode" class="flex flex-col items-center">
                <img :src="previewQRCode" :alt="'Contact QR Code'" class="border border-gray-300 rounded-lg shadow-sm" :style="{ width: localQRSize + 'px', height: localQRSize + 'px' }">
                <p class="text-xs text-gray-600 mt-2 font-medium">Scan to save contact</p>
              </div>
              <div v-else class="flex flex-col items-center">
                <div 
                  class="bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center"
                  :style="{ width: localQRSize + 'px', height: localQRSize + 'px' }"
                >
                  <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <p class="text-xs text-gray-500 mt-2">Generating...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="localSelectedFields.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zm0 10h2a1 1 0 001-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a1 1 0 001 1zM17 8h2a1 1 0 001-1V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1z"></path>
          </svg>
          <p class="text-gray-500 text-sm">Select contact information above to generate QR code</p>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="flex items-center justify-between p-6 border-t border-gray-200/50 bg-gray-50/50">
        <div class="text-sm text-gray-600">
          {{ localSelectedFields.length }} field{{ localSelectedFields.length !== 1 ? 's' : '' }} selected
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="saveSettings" 
            :disabled="localSelectedFields.length === 0"
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-colors',
              localSelectedFields.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'

interface Props {
  isOpen: boolean
  includeQRCode: boolean
  qrCodeFields: string[]
  qrCodeSize: number
  signatureData: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'save': [data: { includeQRCode: boolean, qrCodeFields: string[], qrCodeSize: number, qrCodeData: string }]
}>()

// Local state
const localSelectedFields = ref([...props.qrCodeFields])
const localQRSize = ref(props.qrCodeSize || 100)
const previewQRCode = ref('')

// Contact fields that can be included in QR code
const contactFields = [
  { key: 'firstName', label: 'First Name', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key: 'lastName', label: 'Last Name', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key: 'email', label: 'Email Address', icon: 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'mobilePhone', label: 'Mobile Phone', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { key: 'officePhone', label: 'Office Phone', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { key: 'companyName', label: 'Company Name', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { key: 'jobTitle', label: 'Job Title', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8' },
  { key: 'website', label: 'Website', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }
]

// Watch for props changes
watch(() => props.qrCodeFields, (newVal) => {
  localSelectedFields.value = [...newVal]
})

watch(() => props.qrCodeSize, (newVal) => {
  localQRSize.value = newVal || 100
})

// Watch for changes and regenerate QR code
watch([localSelectedFields, localQRSize], () => {
  if (localSelectedFields.value.length > 0) {
    generatePreviewQRCode()
  } else {
    previewQRCode.value = ''
  }
}, { deep: true })

// Generate QR code when component mounts if fields are selected
onMounted(() => {
  if (localSelectedFields.value.length > 0) {
    generatePreviewQRCode()
  }
})

const toggleField = (fieldKey: string) => {
  if (localSelectedFields.value.includes(fieldKey)) {
    localSelectedFields.value = localSelectedFields.value.filter(key => key !== fieldKey)
  } else {
    localSelectedFields.value.push(fieldKey)
  }
}

const getFieldValue = (fieldKey: string): string => {
  const value = props.signatureData[fieldKey]
  if (!value) return ''
  
  // Truncate long values for display
  return value.length > 30 ? value.substring(0, 30) + '...' : value
}

const generatePreviewQRCode = async () => {
  try {
    const vCardData = generateVCardData()
    const qrCodeDataURL = await QRCode.toDataURL(vCardData, {
      width: localQRSize.value,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    previewQRCode.value = qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    previewQRCode.value = ''
  }
}

const generateVCardData = (): string => {
  const data = props.signatureData
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'
  
  // Name
  if (localSelectedFields.value.includes('firstName') || localSelectedFields.value.includes('lastName')) {
    const firstName = localSelectedFields.value.includes('firstName') ? data.firstName || '' : ''
    const lastName = localSelectedFields.value.includes('lastName') ? data.lastName || '' : ''
    vcard += `N:${lastName};${firstName};;;\n`
    vcard += `FN:${firstName} ${lastName}\n`.trim()
  }
  
  // Organization and title
  if (localSelectedFields.value.includes('companyName') && data.companyName) {
    vcard += `ORG:${data.companyName}\n`
  }
  
  if (localSelectedFields.value.includes('jobTitle') && data.jobTitle) {
    vcard += `TITLE:${data.jobTitle}\n`
  }
  
  // Email
  if (localSelectedFields.value.includes('email') && data.email) {
    vcard += `EMAIL:${data.email}\n`
  }
  
  // Phone numbers
  if (localSelectedFields.value.includes('mobilePhone') && data.mobilePhone) {
    vcard += `TEL;TYPE=CELL:${data.mobilePhone}\n`
  }
  
  
  if (localSelectedFields.value.includes('officePhone') && data.officePhone) {
    vcard += `TEL;TYPE=WORK:${data.officePhone}\n`
  }
  
  // Website
  if (localSelectedFields.value.includes('website') && data.website) {
    vcard += `URL:${data.website}\n`
  }
  
  vcard += 'END:VCARD'
  return vcard
}

const saveSettings = async () => {
  let qrCodeData = ''
  
  if (localSelectedFields.value.length > 0) {
    try {
      const vCardData = generateVCardData()
      qrCodeData = await QRCode.toDataURL(vCardData, {
        width: localQRSize.value,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }
  
  emit('save', {
    includeQRCode: localSelectedFields.value.length > 0,
    qrCodeFields: localSelectedFields.value,
    qrCodeSize: localQRSize.value,
    qrCodeData
  })
  emit('close')
}
</script>

<style scoped>
/* Custom slider styling */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
