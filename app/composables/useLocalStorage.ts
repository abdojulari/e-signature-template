import { ref, watch, type Ref, type UnwrapRef } from 'vue'

export interface StorageOptions {
  serializer?: {
    read: (value: string) => any
    write: (value: any) => string
  }
  defaultValue?: any
}

export const useLocalStorage = <T>(
  key: string, 
  defaultValue?: T,
  options: StorageOptions = {}
): [Ref<T>, (value: T) => void, () => void] => {
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify
    }
  } = options

  // Check if we're in a browser environment
  const isClient = typeof window !== 'undefined'

  // Read initial value from localStorage
  const read = (): T => {
    if (!isClient) return defaultValue as T

    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return defaultValue as T
      return serializer.read(item)
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue as T
    }
  }

  // Write value to localStorage
  const write = (value: T): void => {
    if (!isClient) return

    try {
      if (value === null || value === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, serializer.write(value))
      }
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error)
    }
  }

  // Remove value from localStorage
  const remove = (): void => {
    if (!isClient) return
    
    try {
      window.localStorage.removeItem(key)
      storedValue.value = defaultValue as T
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Create reactive ref
  const storedValue = ref<T>(read())

  // Watch for changes and update localStorage
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )

  // Listen for storage events (when localStorage is changed in another tab)
  if (isClient) {
    window.addEventListener('storage', (e) => {
      if (e.key === key && e.newValue !== serializer.write(storedValue.value)) {
        try {
          storedValue.value = e.newValue ? serializer.read(e.newValue) : defaultValue as T
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error)
        }
      }
    })
  }

  const setValue = (value: T) => { storedValue.value = value as UnwrapRef<T> }
  return [storedValue as Ref<T>, setValue, remove]
}

// Specific composables for signature data
export const useSignatureStorage = () => {
  const STORAGE_KEYS = {
    SIGNATURE_DATA: 'signaturepro_signature_data',
    DESIGN_SETTINGS: 'signaturepro_design_settings',
    SELECTED_SOCIAL_NETWORKS: 'signaturepro_social_networks',
    GENERATED_SIGNATURE: 'signaturepro_generated_signature'
  }

  // Default signature data
  const defaultSignatureData = {
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
    socialLinks: {} as Record<string, string>,
    profilePhoto: null as File | null,
    companyLogo: null as File | null,
    profilePhotoBase64: '',
    companyLogoBase64: '',
    profilePhotoUrl: '',
    companyLogoUrl: '',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    primaryColor: '#4361ee',
    secondaryColor: '#333333',
    includeQRCode: false,
    qrCodeData: '',
    socialIconSettings: {
      iconType: 'branded' as const,
      size: 24,
      shape: 'circle' as const,
      backgroundColor: '#4f46e5',
      iconColor: '#ffffff'
    }
  }

  // Default design settings
  const defaultDesignSettings = {
    currentTemplate: 'minimal',
    primaryColor: '#4361ee',
    secondaryColor: '#333333',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  }

  // Create storage refs
  const [signatureData, setSignatureData, clearSignatureData] = useLocalStorage(
    STORAGE_KEYS.SIGNATURE_DATA,
    defaultSignatureData
  )

  const [designSettings, setDesignSettings, clearDesignSettings] = useLocalStorage(
    STORAGE_KEYS.DESIGN_SETTINGS,
    defaultDesignSettings
  )

  const [selectedSocialNetworks, setSelectedSocialNetworks, clearSocialNetworks] = useLocalStorage(
    STORAGE_KEYS.SELECTED_SOCIAL_NETWORKS,
    [] as string[]
  )

  const [generatedSignature, setGeneratedSignature, clearGeneratedSignature] = useLocalStorage(
    STORAGE_KEYS.GENERATED_SIGNATURE,
    ''
  )

  // Helper functions
  const saveSignatureData = (data: any) => {
    // Don't save File objects, only base64 data
    const dataToSave = {
      ...data,
      profilePhoto: null,
      companyLogo: null
    }
    setSignatureData(dataToSave)
  }

  const saveDesignSettings = (settings: any) => {
    setDesignSettings(settings)
  }

  const loadSignatureData = () => {
    return signatureData.value
  }

  const loadDesignSettings = () => {
    return designSettings.value
  }

  const clearAllData = () => {
    clearSignatureData()
    clearDesignSettings()
    clearSocialNetworks()
    clearGeneratedSignature()
  }

  // Export data for Chrome extension
  const exportForExtension = () => {
    return {
      signatureData: signatureData.value,
      designSettings: designSettings.value,
      selectedSocialNetworks: selectedSocialNetworks.value,
      generatedSignature: generatedSignature.value,
      timestamp: new Date().toISOString()
    }
  }

  return {
    // Storage refs
    signatureData,
    designSettings,
    selectedSocialNetworks,
    generatedSignature,
    
    // Helper functions
    saveSignatureData,
    saveDesignSettings,
    setSelectedSocialNetworks,
    setGeneratedSignature,
    loadSignatureData,
    loadDesignSettings,
    clearAllData,
    exportForExtension,
    
    // Storage keys for extension
    STORAGE_KEYS
  }
}
