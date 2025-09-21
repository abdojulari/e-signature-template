export interface ValidationResult {
  isValid: boolean
  message: string
}

export const useValidation = () => {
  // Phone number validation - supports various international formats
  const validatePhoneNumber = (phone: string): ValidationResult => {
    if (!phone.trim()) {
      return { isValid: true, message: '' } // Empty is valid (optional field)
    }

    // Remove all non-digit characters except + for international prefix
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    
    // Check minimum and maximum length
    if (cleanPhone.length < 7) {
      return { isValid: false, message: 'Phone number is too short (minimum 7 digits)' }
    }
    
    if (cleanPhone.length > 15) {
      return { isValid: false, message: 'Phone number is too long (maximum 15 digits)' }
    }

    // Check for valid patterns
    const validPatterns = [
      /^\+?1[2-9]\d{2}[2-9]\d{2}\d{4}$/, // US/Canada format with country code
      /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, // US/Canada format without country code
      /^\+[1-9]\d{6,14}$/, // International format with country code
      /^[1-9]\d{6,14}$/, // International format without + (but not starting with 0)
    ]

    const isValidFormat = validPatterns.some(pattern => pattern.test(cleanPhone))
    
    if (!isValidFormat) {
      return { isValid: false, message: 'Please enter a valid phone number (e.g., +1 234-567-8900 or 234-567-8900)' }
    }

    return { isValid: true, message: '' }
  }

  // Email validation with comprehensive regex
  const validateEmail = (email: string): ValidationResult => {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' }
    }

    // RFC 5322 compliant email regex (simplified but comprehensive)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' }
    }

    // Additional checks
    if (email.length > 254) {
      return { isValid: false, message: 'Email address is too long' }
    }

    const [localPart, domain] = email.split('@')
    if (localPart.length > 64) {
      return { isValid: false, message: 'Email local part is too long' }
    }

    return { isValid: true, message: '' }
  }

  // Website URL validation
  const validateWebsite = (url: string): ValidationResult => {
    if (!url.trim()) {
      return { isValid: true, message: '' } // Empty is valid (optional field)
    }

    try {
      // Add protocol if missing
      let testUrl = url
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        testUrl = 'https://' + url
      }

      const urlObject = new URL(testUrl)
      
      // Check for valid protocols
      if (!['http:', 'https:'].includes(urlObject.protocol)) {
        return { isValid: false, message: 'Website must use http:// or https://' }
      }

      // Check for valid hostname
      if (!urlObject.hostname || urlObject.hostname.length < 3) {
        return { isValid: false, message: 'Please enter a valid website URL' }
      }

      // Check for valid TLD
      const tldRegex = /\.[a-zA-Z]{2,}$/
      if (!tldRegex.test(urlObject.hostname)) {
        return { isValid: false, message: 'Website must have a valid domain extension' }
      }

      return { isValid: true, message: '' }
    } catch (error) {
      return { isValid: false, message: 'Please enter a valid website URL (e.g., https://example.com)' }
    }
  }

  // Name validation
  const validateName = (name: string, fieldName: string, required: boolean = true): ValidationResult => {
    if (!name.trim() && required) {
      return { isValid: false, message: `${fieldName} is required` }
    }

    if (!name.trim() && !required) {
      return { isValid: true, message: '' }
    }

    // Check for minimum length
    if (name.trim().length < 2) {
      return { isValid: false, message: `${fieldName} must be at least 2 characters long` }
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/
    if (!nameRegex.test(name)) {
      return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` }
    }

    return { isValid: true, message: '' }
  }

  // Social media URL validation
  const validateSocialUrl = (url: string, platform: string): ValidationResult => {
    if (!url.trim()) {
      return { isValid: true, message: '' } // Empty is valid (optional field)
    }

    // Platform-specific validation
    const platformPatterns: Record<string, { pattern: RegExp; example: string }> = {
      linkedin: {
        pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9\-]+\/?$/,
        example: 'https://linkedin.com/in/username'
      },
      twitter: {
        pattern: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/,
        example: 'https://twitter.com/username'
      },
      facebook: {
        pattern: /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/?$/,
        example: 'https://facebook.com/username'
      },
      instagram: {
        pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
        example: 'https://instagram.com/username'
      },
      youtube: {
        pattern: /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|c\/|user\/)?[a-zA-Z0-9\-_]+\/?$/,
        example: 'https://youtube.com/c/channelname'
      },
      github: {
        pattern: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9\-_]+\/?$/,
        example: 'https://github.com/username'
      }
    }

    const platformConfig = platformPatterns[platform.toLowerCase()]
    if (platformConfig && !platformConfig.pattern.test(url)) {
      return { 
        isValid: false, 
        message: `Please enter a valid ${platform} URL (e.g., ${platformConfig.example})` 
      }
    }

    // Fallback to general URL validation for other platforms
    if (!platformConfig) {
      return validateWebsite(url)
    }

    return { isValid: true, message: '' }
  }

  // Format phone number for display
  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return phone

    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '')
    
    // US/Canada format
    if (cleaned.match(/^(\+?1)?(\d{10})$/)) {
      const match = cleaned.match(/^(\+?1)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        const [, country, area, exchange, number] = match
        return `${country || '+1'} (${area}) ${exchange}-${number}`
      }
    }

    // International format - just add spaces for readability
    if (cleaned.startsWith('+') && cleaned.length > 7) {
      return cleaned.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d+)/, '$1 $2 $3 $4')
    }

    return phone
  }

  // Normalize website URL
  const normalizeWebsiteUrl = (url: string): string => {
    if (!url.trim()) return url

    let normalized = url.trim()
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized
    }

    return normalized
  }

  return {
    validatePhoneNumber,
    validateEmail,
    validateWebsite,
    validateName,
    validateSocialUrl,
    formatPhoneNumber,
    normalizeWebsiteUrl
  }
}
