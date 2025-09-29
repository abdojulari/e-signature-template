export interface SignatureData {
  firstName: string
  lastName: string
  middleName: string
  email: string
  mobilePhone: string
  officePhone: string
  companyName: string
  jobTitle: string
  website: string
  companyAddress: string
  companyCity: string
  companyState: string
  companyZipCode: string
  companyCountry: string
  socialLinks: Record<string, string>
  profilePhoto: File | null
  companyLogo: File | null
  profilePhotoBase64: string
  companyLogoBase64: string
  profilePhotoUrl: string
  companyLogoUrl: string
  fontFamily: string
  fontSize: string
  primaryColor: string
  secondaryColor: string
  includeQRCode: boolean
  qrCodeData: string
}

export interface Template {
  id: string
  name: string
  description: string
  preview: string
  category: 'minimal' | 'professional' | 'creative' | 'glassmorphism' | 'modern' | 'elegant' | 'social-first' | 'compact-pro' | 'vibrant' | 'executive' | 'handwritten' | 'corporate-elite',
  image?: string
}

import QRCode from 'qrcode'

export const useSignatureGenerator = () => {
  const templates: Template[] = [
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Clean and simple design',
      preview: 'minimal-preview',
      category: 'minimal',
      image: 'minimal-preview.png'
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Corporate and business-ready',
      preview: 'professional-preview',
      category: 'professional',
      image: 'professional-preview.png'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Bold and artistic design',
      preview: 'creative-preview',
      category: 'creative',
      image: 'creative-preview.png'
    },
    { 
      id: 'glassmorphism', 
      name: 'Glassmorphism', 
      description: 'Modern glass effect design',
      preview: 'glassmorphism-preview',
      category: 'glassmorphism',
      image: 'glassmorphism-preview.png'
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Contemporary and sleek',
      preview: 'modern-preview',
      category: 'modern',
      image: 'modern-preview.png'
    },
    { 
      id: 'elegant', 
      name: 'Elegant', 
      description: 'Sophisticated and refined',
      preview: 'elegant-preview',
      category: 'elegant',
      image: 'elegant-preview.png'
    },
    { 
      id: 'social-first', 
      name: 'Social First', 
      description: 'Profile-focused with prominent social links',
      preview: 'social-first-preview',
      category: 'social-first',
      image: 'social-first-preview.png'
    },
    { 
      id: 'compact-pro', 
      name: 'Compact Pro', 
      description: 'Compact professional layout',
      preview: 'compact-pro-preview',
      category: 'compact-pro',
      image: 'compact-pro-preview.png'
    },
    { 
      id: 'vibrant', 
      name: 'Vibrant', 
      description: 'Colorful and energetic design',
      preview: 'vibrant-preview',
      category: 'vibrant',
      image: 'vibrant-preview.png'
    },
    { 
      id: 'executive', 
      name: 'Executive', 
      description: 'Classic business leadership style',
      preview: 'executive-preview',
      category: 'executive',
      image: 'executive-preview.png'
    },
    { 
      id: 'handwritten', 
      name: 'Handwritten', 
      description: 'Personal script signature style',
      preview: 'handwritten-preview',
      category: 'handwritten',
      image: 'handwritten-preview.png'
    },
    { 
      id: 'corporate-elite', 
      name: 'Corporate Elite', 
      description: 'Premium executive design with gold accents',
      preview: 'corporate-elite-preview',
      category: 'corporate-elite',
      image: 'corporate-elite-preview.png'
    }
  ]

  const colorOptions = [
    '#000000', '#333333', '#666666', '#999999', '#cccccc',
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', '#4895ef',
    '#06ffa5', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84'
  ]

  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Impact, sans-serif', label: 'Impact' },
      { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' }
  ]

  const fontSizeOptions = [
    { value: '10px', label: 'Extra Small (10px)' },
    { value: '12px', label: 'Small (12px)' },
    { value: '14px', label: 'Medium (14px)' },
    { value: '16px', label: 'Large (16px)' },
    { value: '18px', label: 'Extra Large (18px)' }
  ]

  const socialNetworks = [
    { id: 'linkedin', icon: 'fab fa-linkedin-in', name: 'LinkedIn' },
    { id: 'twitter', icon: 'fab fa-twitter', name: 'Twitter/X' },
    { id: 'facebook', icon: 'fab fa-facebook-f', name: 'Facebook' },
    { id: 'instagram', icon: 'fab fa-instagram', name: 'Instagram' },
    { id: 'youtube', icon: 'fab fa-youtube', name: 'YouTube' },
    { id: 'tiktok', icon: 'fab fa-tiktok', name: 'TikTok' },
    { id: 'whatsapp', icon: 'fab fa-whatsapp', name: 'WhatsApp' },
    { id: 'telegram', icon: 'fab fa-telegram', name: 'Telegram' },
    { id: 'snapchat', icon: 'fab fa-snapchat', name: 'Snapchat' },
    { id: 'pinterest', icon: 'fab fa-pinterest', name: 'Pinterest' },
    { id: 'github', icon: 'fab fa-github', name: 'GitHub' },
    { id: 'discord', icon: 'fab fa-discord', name: 'Discord' }
  ]

  const generateSocialIcons = (socialLinks: Record<string, string>) => {
    let iconsHtml = ''
    const socialPlatforms: Record<string, { text: string, color: string }> = {
      linkedin: { text: 'in', color: '#0077B5' },
      twitter: { text: '𝕏', color: '#000000' },
      facebook: { text: 'f', color: '#1877F2' },
      instagram: { text: 'ig', color: '#E4405F' },
      youtube: { text: '▶', color: '#FF0000' },
      whatsapp: { text: 'W', color: '#25D366' },
      telegram: { text: 'T', color: '#0088CC' },
      github: { text: 'G', color: '#181717' },
      discord: { text: 'D', color: '#5865F2' },
      snapchat: { text: 'S', color: '#FFFC00' },
      pinterest: { text: 'P', color: '#BD081C' },
      tiktok: { text: 'TT', color: '#000000' }
    }
    
    Object.keys(socialLinks).forEach(network => {
      if (socialLinks[network]) {
        const platform = socialPlatforms[network]
        if (platform) {
          // Simple text-based icons that work reliably in all email clients
          const textColor = platform.color === '#FFFC00' ? '#000000' : '#FFFFFF' // Black text for yellow background
          iconsHtml += `<a href="${socialLinks[network]}" target="_blank" style="display: inline-block; width: 24px; height: 24px; background-color: ${platform.color}; border-radius: 50%; margin-right: 4px; text-decoration: none; vertical-align: middle; text-align: center; line-height: 24px; font-size: 11px; font-weight: bold; color: ${textColor}; font-family: Arial, sans-serif;" title="${network.charAt(0).toUpperCase() + network.slice(1)}">${platform.text}</a>`
        }
      }
    })
    return iconsHtml
  }

  // Utility function to create email-compatible image HTML
  const createEmailSafeImage = (imageData: string | null, altText: string, styles: string, fallbackContent?: string) => {
    if (!imageData) {
      return fallbackContent || ''
    }
    
    // Warn about base64 images and provide fallback
    if (imageData.startsWith('data:')) {
      console.warn('Base64 images may be blocked by email clients. Consider using hosted URLs instead.')
      // Return fallback content instead of base64 image for better email compatibility
      return fallbackContent || `<span style="display: inline-block; width: 40px; height: 40px; background: #f0f0f0; border: 1px solid #ddd; text-align: center; line-height: 40px; font-size: 12px; color: #999;">${altText}</span>`
    }
    
    // Create image with email-compatible attributes for hosted URLs
    return `<img src="${imageData}" alt="${altText}" style="${styles}" border="0" style="display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;">`
  }

  const getFullName = (data: SignatureData) => {
    const parts = [data.firstName, data.middleName, data.lastName].filter(Boolean)
    return parts.join(' ') || 'Your Name'
  }

  const getFormattedAddress = (data: SignatureData) => {
    const addressParts = []
    
    if (data.companyAddress) {
      addressParts.push(data.companyAddress)
    }
    
    // Format city, state, zip
    const cityStateParts = []
    if (data.companyCity) {
      cityStateParts.push(data.companyCity)
    }
    if (data.companyState) {
      cityStateParts.push(data.companyState)
    }
    if (data.companyZipCode) {
      cityStateParts.push(data.companyZipCode)
    }
    
    if (cityStateParts.length > 0) {
      if (data.companyCity && data.companyState) {
        // Format as "City, State ZIP"
        addressParts.push(`${data.companyCity}, ${data.companyState}${data.companyZipCode ? ' ' + data.companyZipCode : ''}`)
      } else {
        // Just join with commas if missing city or state
        addressParts.push(cityStateParts.join(' '))
      }
    }
    
    if (data.companyCountry) {
      addressParts.push(data.companyCountry)
    }
    
    return addressParts.length > 0 ? addressParts.join(', ') : ''
  }

  // Generate vCard data for QR code
  const generateVCardData = (data: SignatureData) => {
    const fullName = getFullName(data)
    let vCard = 'BEGIN:VCARD\n'
    vCard += 'VERSION:3.0\n'
    vCard += `FN:${fullName}\n`
    
    if (data.firstName || data.lastName) {
      vCard += `N:${data.lastName || ''};${data.firstName || ''};${data.middleName || ''};;;\n`
    }
    
    if (data.jobTitle) {
      vCard += `TITLE:${data.jobTitle}\n`
    }
    
    if (data.companyName) {
      vCard += `ORG:${data.companyName}\n`
    }
    
    if (data.email) {
      vCard += `EMAIL:${data.email}\n`
    }
    
    if (data.mobilePhone) {
      vCard += `TEL;TYPE=CELL:${data.mobilePhone}\n`
    }
    
    
    if (data.officePhone) {
      vCard += `TEL;TYPE=WORK:${data.officePhone}\n`
    }
    
    if (data.website) {
      vCard += `URL:${data.website}\n`
    }
    
    // Add address if available
    const formattedAddress = getFormattedAddress(data)
    if (formattedAddress) {
      vCard += `ADR:;;${data.companyAddress || ''};${data.companyCity || ''};${data.companyState || ''};${data.companyZipCode || ''};${data.companyCountry || ''}\n`
    }
    
    vCard += 'END:VCARD'
    return vCard
  }

  // Generate QR code URL using online service (email-compatible)
  const generateQRCodeURL = (data: SignatureData): string => {
    try {
      const vCardData = generateVCardData(data)
      console.log('Generating QR code URL with vCard data')
      
      // Use QR Server API - reliable and email-compatible
      const encodedData = encodeURIComponent(vCardData)
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodedData}&format=png&margin=10`
      
      console.log('QR Code URL generated:', qrCodeURL)
      return qrCodeURL
    } catch (error) {
      console.error('Error generating QR code URL:', error)
      return ''
    }
  }

  // Create email-client-specific image handling
  const getEmailSafeImageSrc = (urlSrc: string | null, base64Src: string | null, fallbackText: string = 'Image'): string => {
    // Priority: URL > fallback text (skip base64 for Gmail compatibility)
    if (urlSrc) {
      return urlSrc
    }
    
    // For base64 images, provide a text fallback that works in all clients
    if (base64Src) {
      console.warn(`⚠️ ${fallbackText}: Using base64 image. This may not display in Gmail. Consider using a hosted URL.`)
      return base64Src // Still include for Outlook compatibility
    }
    
    return ''
  }

  // Keep the original function for backward compatibility but use URL instead
  const generateQRCode = async (data: SignatureData): Promise<string> => {
    return generateQRCodeURL(data)
  }

  const generateMinimalTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; color: ${data.secondaryColor || '#333333'}; width: 100%; max-width: 420px; border-collapse: collapse; font-size: ${data.fontSize || '10px'};">
        <tr>
          <td style="vertical-align: top; padding-right: ${data.includeQRCode ? '10px' : '0'}; width: ${data.includeQRCode ? '70%' : '100%'};">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${parseInt(data.fontSize || '10px') + 4}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'};">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="padding: 0 0 6px 0; font-size: ${data.fontSize || '10px'}; color: ${data.secondaryColor || '#666666'};">
                  ${data.jobTitle || 'Your Job Title'} | ${data.companyName || 'Your Company'}
                </td>
              </tr>
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${data.fontSize || '10px'};">
                  <a href="mailto:${data.email || 'your.email@example.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                </td>
              </tr>
              ${(data.mobilePhone || data.officePhone) ? `
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${data.fontSize || '8px'};">
                  ${[
                    data.mobilePhone ? `<a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.mobilePhone}</a>` : '',
                    data.officePhone ? `<a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.officePhone}</a>` : ''
                  ].filter(Boolean).join(' | ')}
                </td>
              </tr>
              ` : ''}
              ${data.website ? `<tr><td style="padding: 0 0 6px 0; font-size: ${data.fontSize || '10px'};"><a href="${data.website}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
              <tr>
                <td style="padding: 6px 0 0 0; line-height: 1.2;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
              ${!data.includeQRCode && logoImage ? `
              <tr>
                <td style="padding: 4px 0 0 0;">
                  <img src="${logoImage}" alt="Company Logo" style="height: 20px; border: none; display: block; max-width: 100px;" onerror="this.style.display='none';">
                </td>
              </tr>
              ` : ''}
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; width: 30%;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; max-width: 100%; border: none; display: block; object-fit: contain; margin: 0 auto;">
            <div style="font-size: 8px; color: ${data.secondaryColor || '#666666'}; margin-top: 2px;">Scan for Contact</div>
            ${logoImage ? `<img src="${logoImage}" alt="Company Logo" style="height: 16px; margin-top: 4px; border: none; display: block; max-width: 60px; margin-left: auto; margin-right: auto;" onerror="this.style.display='none';">` : ''}
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateProfessionalTemplate = (data: SignatureData) => {
    // For Gmail compatibility: prioritize hosted URLs, skip heavy base64 images
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null // Keep logo logic as-is since it's working
    
    console.log('Professional template - Profile image available:', !!profileImage)
    console.log('Professional template - Logo image available:', !!logoImage)
    console.log('Professional template - Using profile URL:', !!data.profilePhotoUrl)
    console.log('Professional template - Using logo URL:', !!data.companyLogoUrl)
    
    // Warn if profile picture is only available as base64
    if (!data.profilePhotoUrl && data.profilePhotoBase64) {
      console.warn('⚠️ Profile picture: Only base64 available. Gmail will show fallback. Use hosted URL for best results.')
    }
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; color: #333333; width: 100%; max-width: 500px; border-collapse: collapse; font-size: ${data.fontSize || '10px'};">
        <tr>
          <td style="padding: 0 5px 0 0; vertical-align: top; width: 15%;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 60px; height: 60px; border-radius: 30px; border: none; display: block; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; background-color: ${data.primaryColor || '#4361ee'}; border-radius: 30px; display: none;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 18px; padding: 21px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; background-color: ${data.primaryColor || '#4361ee'}; border-radius: 30px;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 18px; padding: 21px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top; border-left: 2px solid ${data.primaryColor || '#4361ee'}; padding: 0 0 0 10px; ${data.includeQRCode ? 'padding-right: 10px;' : ''} width: ${data.includeQRCode ? '60%' : '85%'};">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '10px') + 4}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'}; padding: 0 0 3px 0;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '10px'}; color: ${data.secondaryColor || '#666666'}; padding: 0 0 6px 0;">
                  ${data.jobTitle || 'Your Job Title'} | ${data.companyName || 'Your Company'}
                  ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 16px; margin-top: 3px; border: none; display: block;" onerror="this.style.display='none';">` : ''}
                </td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '10px'}; color: ${data.secondaryColor || '#333333'}; padding: 0 0 6px 0; line-height: 1.4;">
                  <strong>Email:</strong> <a href="mailto:${data.email || 'your.email@example.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.email || 'your.email@example.com'}</a><br>
                  ${data.mobilePhone ? `<strong>Mobile:</strong> <a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.mobilePhone}</a><br>` : ''}
                  ${data.officePhone ? `<strong>Office:</strong> <a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.officePhone}</a><br>` : ''}
                  ${data.website ? `<strong>Web:</strong> <a href="${data.website}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a><br>` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0 0 0; line-height: 1.2;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; width: 25%;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; max-width: 100%; border: none; display: block; margin: 0 auto;">
            <div style="font-size: 8px; color: ${data.secondaryColor || '#666666'}; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateCreativeTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); padding: 15px 20px; border-radius: 12px; color: white; width: 100%; max-width: 450px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-size: ${data.fontSize || '10px'}; border-collapse: collapse; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        <tr>
          <td style="padding: 0 0 8px 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 10px; vertical-align: top; width: 25%;">
                  ${profileImage ? 
                    `<div style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1);">
                       <img src="${profileImage}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'text-align: center; font-size: 24px; font-weight: bold; color: white; line-height: 74px;\\'>${getFullName(data).charAt(0).toUpperCase()}</div>';">
                     </div>` :
                    `<table cellpadding="0" cellspacing="0" border="0" style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); border-collapse: collapse;">
                      <tr><td style="text-align: center; font-size: 24px; font-weight: bold; color: white; padding: 28px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
                    </table>`
                  }
                </td>
                <td style="vertical-align: top; padding: 10px 15px 10px 0; width: 75%;">
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 8}px; font-weight: bold; margin-bottom: 6px; margin-top: 10px; color: white; line-height: 1.2;">${getFullName(data)}</div>
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 2}px; opacity: 0.9; color: white; margin-bottom: 10px; line-height: 1.3;">
                    ${data.jobTitle || 'Your Job Title'} | ${data.companyName || 'Your Company'}
                  </div>
                  ${logoImage ? `<div style="margin-bottom: 10px;"><img src="${logoImage}" alt="Company Logo" style="height: 24px; max-width: 120px; border: none; display: block; object-fit: contain;" onerror="this.style.display='none'; console.log('Logo failed to load:', '${logoImage}');"></div>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border-top: 1px solid rgba(255,255,255,0.2);">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: top; width: 70%;">
                  <div style="color: white; font-size: ${parseInt(data.fontSize || '10px') + 1}px; line-height: 1.8;">
                    <div style="margin-bottom: 8px;">
                      <span style="font-size: ${parseInt(data.fontSize || '10px') - 1}px; opacity: 0.8; margin-right: 6px;">Email:</span>
                      <a href="mailto:${data.email || 'your.email@example.com'}" style="color: white; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                    </div>
                    ${data.mobilePhone ? `<div style="margin-bottom: 4px;"><span style="font-size: ${parseInt(data.fontSize || '10px') - 1}px; opacity: 0.8; margin-right: 6px;">Mobile Phone:</span><a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: white; text-decoration: none;">${data.mobilePhone}</a></div>` : ''}
                    ${data.officePhone ? `<div style="margin-bottom: 4px;"><span style="font-size: ${parseInt(data.fontSize || '10px') - 1}px; opacity: 0.8; margin-right: 6px;">Office Phone:</span><a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: white; text-decoration: none;">${data.officePhone}</a></div>` : ''}
                    ${data.website ? `<div style="margin-bottom: 8px;"><span style="font-size: ${parseInt(data.fontSize || '10px') - 1}px; opacity: 0.8; margin-right: 6px;">Website:</span><a href="${data.website}" style="color: white; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                  </div>
                </td>
                <td style="vertical-align: top; text-align: right; width: 30%;">
                  <div style="margin-bottom: 12px;">
                    ${generateSocialIcons(data.socialLinks)}
                  </div>
                  ${data.includeQRCode ? `
                  <div style="text-align: center;">
                    <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block; margin: 0 auto;">
                    <div style="font-size: 8px; color: rgba(255,255,255,0.8); margin-top: 2px; text-align: center;">Scan for Contact</div>
                  </div>
                  ` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
  }

  const generateGlassmorphismTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    // Convert to table-based layout for better email client support
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="background: #f8f9ff; border: 1px solid #e0e5ff; border-radius: 8px; padding: 12px; color: #333; width: 100%; max-width: 400px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-size: ${data.fontSize || '10px'}; border-collapse: collapse;">
        <tr>
          <td style="padding: 0 10px 0 0; vertical-align: top; width: 15%;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 50px; height: 50px; border-radius: 25px; object-fit: cover; border: none; display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 50px; height: 50px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); border-radius: 25px; display: none;">
                <tr><td style="text-align: center; font-size: 18px; font-weight: bold; color: white; padding: 16px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 50px; height: 50px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); border-radius: 25px;">
                <tr><td style="text-align: center; font-size: 18px; font-weight: bold; color: white; padding: 16px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top; ${data.includeQRCode ? 'padding-right: 10px;' : ''} width: ${data.includeQRCode ? '65%' : '85%'};">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '10px') + 6}px; font-weight: 600; color: ${data.primaryColor || '#4361ee'}; padding: 0 0 3px 0;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; padding: 0 0 4px 0;">${data.jobTitle || 'Your Job Title'}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '10px'}; color: #888; font-weight: 500; padding: 0 0 8px 0;">
                  ${data.companyName || 'Your Company'}
                  ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 14px; margin-top: 2px; border: none; display: block;" onerror="this.style.display='none';">` : ''}
                </td>
              </tr>
              <tr>
                <td style="border-top: 1px solid #e0e5ff; padding: 8px 0 0 0; font-size: ${data.fontSize || '10px'}; line-height: 1.6;">
                  <div style="margin-bottom: 4px;">
                    📧 <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                  </div>
                  ${data.mobilePhone ? `<div style="margin-bottom: 4px;">📱 <a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone}</a></div>` : ''}
                  ${data.officePhone ? `<div style="margin-bottom: 4px;">🏢 <a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.officePhone}</a></div>` : ''}
                  ${data.website ? `<div style="margin-bottom: 4px;">🌐 <a href="${data.website}" style="color: #333; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0 0 0; border-top: 1px solid #e0e5ff;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateModernTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="border-left: 3px solid ${data.primaryColor || '#4361ee'}; font-family: ${data.fontFamily || 'Arial, sans-serif'}; width: 100%; max-width: 400px; font-size: ${data.fontSize || '10px'}; border-collapse: collapse;">
        <tr>
          <td style="padding: 0 0 0 10px; vertical-align: top; ${data.includeQRCode ? 'padding-right: 10px;' : ''} width: ${data.includeQRCode ? '75%' : '100%'};">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '10px') + 6}px; font-weight: 600; color: ${data.primaryColor || '#4361ee'}; padding: 0 0 4px 0;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; padding: 0 0 8px 0; font-weight: 500;">
                  ${data.jobTitle || 'Your Job Title'} | ${data.companyName || 'Your Company'}
                  ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 16px; margin-top: 3px; border: none; display: block;" onerror="this.style.display='none';">` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 0 0 8px 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                    <tr>
                      <td style="vertical-align: top; width: 50%; padding-right: 8px; font-size: ${data.fontSize || '10px'};">
                        <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Email:</span><br>
                        <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                      </td>
                      ${data.mobilePhone ? `
                      <td style="vertical-align: top; width: 50%; padding-left: 8px; font-size: ${data.fontSize || '10px'};">
                        <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Mobile:</span><br>
                        <a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone}</a>
                      </td>
                      ` : '<td style="width: 50%;"></td>'}
                    </tr>
                    ${data.officePhone ? `
                    <tr>
                      <td colspan="2" style="padding-top: 4px; font-size: ${data.fontSize || '10px'};">
                        <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Office:</span>
                        <a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 6px;">${data.officePhone}</a>
                      </td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0 0 0;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; width: 25%;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 50px; height: 50px; max-width: 100%; border: none; display: block; margin: 0 auto;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateElegantTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Georgia, serif'}; max-width: 400px; border: 1px solid #e0e0e0; background: #fafafa; font-size: ${data.fontSize || '10px'}; border-collapse: collapse;">
        <tr>
          <td style="padding: 18px;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="text-align: center; padding: 0 0 15px 0;">
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 8}px; font-weight: normal; color: ${data.primaryColor || '#4361ee'}; margin-bottom: 4px; font-style: italic;">${getFullName(data)}</div>
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">${data.jobTitle || 'Your Job Title'}</div>
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 2}px; color: #333; font-weight: 500;">
                    ${data.companyName || 'Your Company'}
                    ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 18px; margin-top: 4px; border: none; display: block;" onerror="this.style.display='none';">` : ''}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="border-top: 1px solid #ddd; padding: 12px 0 0 0; font-size: ${data.fontSize || '10px'}; line-height: 1.8;">
                  <div style="margin-bottom: 6px;">
                    <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Email:</span>
                    <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.email || 'your.email@example.com'}</a>
                  </div>
                  ${data.mobilePhone ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Mobile:</span><a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.mobilePhone}</a></div>` : ''}
                  ${data.officePhone ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Office:</span><a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.officePhone}</a></div>` : ''}
                  ${data.website ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Website:</span><a href="${data.website}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
                </td>
              </tr>
              <tr>
                <td style="text-align: center; padding: 12px 0 0 0; border-top: 1px solid #ddd;">
                  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                    <tr>
                      <td style="text-align: left; vertical-align: middle;">
                        ${generateSocialIcons(data.socialLinks)}
                      </td>
                      ${data.includeQRCode ? `
                      <td style="text-align: center; vertical-align: middle;">
                        <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block; margin: 0 auto;">
                        <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
                      </td>
                      ` : ''}
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
  }

  // Social First Template (based on Layla McCawley style)
  const generateSocialFirstTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; max-width: 450px; border-collapse: collapse; font-size: ${data.fontSize || '12px'};">
        <tr>
          <td style="vertical-align: top; padding-right: 20px;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; border: none; display: block; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 80px; height: 80px; background-color: ${data.primaryColor || '#4361ee'}; border-radius: 50%; display: none;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 24px; padding: 28px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 80px; height: 80px; background-color: ${data.primaryColor || '#4361ee'}; border-radius: 50%;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 24px; padding: 28px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '12px') + 6}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'}; padding: 0 0 4px 0;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '12px') + 1}px; color: #666; padding: 0 0 2px 0;">${data.jobTitle || 'Your Job Title'} at <strong style="color: ${data.primaryColor || '#4361ee'};">${data.companyName || 'Your Company'}</strong></td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '12px'}; padding: 6px 0;">
                  <div style="margin-bottom: 3px;">
                    <strong>Phone:</strong> <a href="tel:${(data.mobilePhone || data.officePhone || '555-123-4567').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone || data.officePhone || '555-123-4567'}</a>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <strong>Email:</strong> <a href="mailto:${data.email || 'your.email@example.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <strong>Website:</strong> <a href="${data.website || 'www.yoursite.com'}" style="color: #333; text-decoration: none;">${(data.website || 'www.yoursite.com').replace(/^https?:\/\//, '')}</a>
                  </div>
                  <div style="margin-bottom: 3px;">
                    <strong>Skype:</strong> ${getFullName(data).toLowerCase().replace(/\s+/g, '')}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0 0 0;">
                  ${generateSocialIcons(data.socialLinks)}
                  <div style="font-size: 10px; color: #666; margin-top: 4px;">
                    <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: bold;">Book a meeting</span> | 
                    <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: bold;">Request a demo</span>
                  </div>
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; padding-left: 20px;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 70px; height: 70px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  // Compact Pro Template (based on Michael Woodward style)
  const generateCompactProTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; max-width: 400px; border-collapse: collapse; font-size: ${data.fontSize || '11px'};">
        <tr>
          <td style="vertical-align: top; padding-right: 15px;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 60px; height: 60px; border-radius: 4px; border: none; display: block; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; background-color: ${data.primaryColor || '#333'}; border-radius: 4px; display: none;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 18px; padding: 21px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 60px; height: 60px; background-color: ${data.primaryColor || '#333'}; border-radius: 4px;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 18px; padding: 21px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '11px') + 4}px; font-weight: bold; color: #333; padding: 0 0 2px 0; text-transform: uppercase;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '11px'}; color: #666; padding: 0 0 6px 0;">${data.jobTitle || 'Professional Title'}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '11px'}; color: #333; padding: 0 0 4px 0;">
                  <div style="margin-bottom: 2px;"><strong>p:</strong> <a href="tel:${(data.mobilePhone || data.officePhone || '555.123.4567').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone || data.officePhone || '555.123.4567'}</a></div>
                  <div style="margin-bottom: 2px;"><strong>e:</strong> <a href="mailto:${data.email || 'mi.woodward@gmail.com'}" style="color: #333; text-decoration: none;">${data.email || 'mi.woodward@gmail.com'}</a></div>
                  ${getFormattedAddress(data) ? `<div style="margin-bottom: 2px;"><strong>a:</strong> ${getFormattedAddress(data)}</div>` : ''}
                  <div><strong style="color: ${data.primaryColor || '#333'};">${data.website || 'www.yourwebsite.com'}</strong></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0 0 0;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; padding-left: 15px;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  // Vibrant Template (based on Aaron Davis style)
  const generateVibrantTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; max-width: 420px; border-collapse: collapse; font-size: ${data.fontSize || '12px'};">
        <tr>
          <td style="vertical-align: top; padding-right: 20px;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 90px; height: 90px; border-radius: 50%; border: none; display: block; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 90px; height: 90px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#f72585'}); border-radius: 50%; display: none;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 28px; padding: 31px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 90px; height: 90px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#f72585'}); border-radius: 50%;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 28px; padding: 31px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top; border-left: 2px solid #ddd; padding-left: 20px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '12px') + 6}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'}; padding: 0 0 4px 0;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${parseInt(data.fontSize || '12px') + 1}px; color: #666; padding: 0 0 8px 0;">${data.jobTitle || 'Professional Title'}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '12px'}; color: #333; padding: 0 0 8px 0; line-height: 1.4;">
                  <div style="margin-bottom: 3px;"><a href="tel:${(data.mobilePhone || '+123-456-7890').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone || '+123-456-7890'}</a></div>
                  <div style="margin-bottom: 3px;"><a href="mailto:${data.email || 'youremail@email.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.email || 'youremail@email.com'}</a></div>
                  <div><a href="${data.website || 'www.yourwebsite.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${(data.website || 'www.yourwebsite.com').replace(/^https?:\/\//, '')}</a></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0 0 0;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center; padding-left: 20px;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 80px; height: 80px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  // Executive Template (based on John Doe style)
  const generateExecutiveTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; max-width: 500px; border-collapse: collapse; font-size: ${data.fontSize || '11px'}; color: #333;">
        <tr>
          <td colspan="2" style="padding: 0 0 8px 0;">
            <div style="font-size: ${parseInt(data.fontSize || '11px') + 8}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'}; margin-bottom: 4px;">${getFullName(data)}</div>
            <div style="font-size: ${parseInt(data.fontSize || '11px') + 2}px; color: #666; margin-bottom: 8px;">${data.jobTitle || 'Sales & Marketing Director'}</div>
            <div style="border-bottom: 2px solid ${data.primaryColor || '#4361ee'}; margin-bottom: 8px;"></div>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top; width: 70%; padding-right: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size: ${data.fontSize || '11px'}; line-height: 1.6;">
              <tr>
                <td style="padding: 0 0 4px 0;">
                  <strong>Mobile:</strong> <a href="tel:${(data.mobilePhone || '+48 75 64 61 001').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone || '+48 75 64 61 001'}</a> | 
                  <strong>Phone:</strong> <a href="tel:${(data.officePhone || '+48 75 64 61 001').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.officePhone || '+48 75 64 61 001'}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 0 4px 0;">
                  <strong>Email:</strong> <a href="mailto:${data.email || 'john.doe@codetwo.com'}" style="color: #333; text-decoration: none;">${data.email || 'john.doe@codetwo.com'}</a>
                </td>
              </tr>
              ${getFormattedAddress(data) ? `
              <tr>
                <td style="padding: 0 0 4px 0;">
                  <strong>${data.companyName || 'Your Company'}</strong>${getFormattedAddress(data) ? ', ' + getFormattedAddress(data) : ''}
                </td>
              </tr>
              ` : (data.companyName ? `
              <tr>
                <td style="padding: 0 0 4px 0;">
                  <strong>${data.companyName}</strong>
                </td>
              </tr>
              ` : '')}
              <tr>
                <td style="padding: 4px 0 0 0;">
                  <a href="${data.website || 'www.codetwo.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none; font-weight: bold;">${(data.website || 'www.codetwo.com').replace(/^https?:\/\//, '')}</a>
                </td>
              </tr>
            </table>
          </td>
          <td style="vertical-align: top; text-align: right;">
            <div style="margin-bottom: 12px;">
              ${generateSocialIcons(data.socialLinks)}
            </div>
            ${data.includeQRCode ? `
            <div style="text-align: center;">
              <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 70px; height: 70px; border: none; display: block; margin: 0 auto;">
              <div style="font-size: 8px; color: #666; margin-top: 2px;">Contact</div>
            </div>
            ` : ''}
            ${logoImage ? `<div style="margin-top: 10px;"><img src="${logoImage}" alt="Company Logo" style="height: 24px; max-width: 100px; border: none; display: block; margin-left: auto;" onerror="this.style.display='none';"></div>` : ''}
          </td>
        </tr>
      </table>
    `
  }

  // Handwritten Template (based on Juliana Silva style)
  const generateHandwrittenTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; max-width: 350px; border-collapse: collapse; font-size: ${data.fontSize || '12px'};">
        <tr>
          <td style="vertical-align: top; padding-right: 15px;">
            ${profileImage ? 
              `<img src="${profileImage}" alt="Profile" style="width: 70px; height: 70px; border-radius: 50%; border: none; display: block; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <table cellpadding="0" cellspacing="0" border="0" style="width: 70px; height: 70px; background: linear-gradient(135deg, ${data.primaryColor || '#d4a574'}, ${data.secondaryColor || '#c49b7a'}); border-radius: 50%; display: none;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 20px; padding: 25px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
               </table>` :
              `<table cellpadding="0" cellspacing="0" border="0" style="width: 70px; height: 70px; background: linear-gradient(135deg, ${data.primaryColor || '#d4a574'}, ${data.secondaryColor || '#c49b7a'}); border-radius: 50%;">
                <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 20px; padding: 25px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
              </table>`
            }
          </td>
          <td style="vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td colspan="2" style="font-size: ${parseInt(data.fontSize || '12px') + 8}px; font-weight: normal; color: ${data.primaryColor || '#d4a574'}; padding: 0 0 6px 0; font-family: ' cursive;">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="font-size: ${data.fontSize || '12px'}; color: #333; padding: 0 0 8px 0; line-height: 1.5; font-family: ${data.fontFamily || 'Arial, sans-serif'}; vertical-align: top; ${data.includeQRCode ? 'padding-right: 10px;' : ''}">
                  <div style="margin-bottom: 3px; display: flex; align-items: center;">
                    <img src="https://img.icons8.com/material-outlined/16/000000/phone.png" alt="Phone" style="width: 12px; height: 12px; margin-right: 6px; vertical-align: middle;">
                    <a href="tel:${(data.mobilePhone || '123-456-7890').replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone || '123-456-7890'}</a>
                  </div>
                  <div style="margin-bottom: 3px; display: flex; align-items: center;">
                    <img src="https://img.icons8.com/material-outlined/16/000000/email.png" alt="Email" style="width: 12px; height: 12px; margin-right: 6px; vertical-align: middle;">
                    <a href="mailto:${data.email || 'hello@reallygreatsite.com'}" style="color: #333; text-decoration: none;">${data.email || 'hello@reallygreatsite.com'}</a>
                  </div>
                  ${getFormattedAddress(data) ? `
                  <div style="margin-bottom: 3px; display: flex; align-items: center;">
                    <img src="https://img.icons8.com/material-outlined/16/000000/marker.png" alt="Location" style="width: 12px; height: 12px; margin-right: 6px; vertical-align: middle;">
                    <span>${getFormattedAddress(data)}</span>
                  </div>
                  ` : ''}
                  <div style="display: flex; align-items: center;">
                    <img src="https://img.icons8.com/material-outlined/16/000000/domain.png" alt="Website" style="width: 12px; height: 12px; margin-right: 6px; vertical-align: middle;">
                    <a href="${data.website || 'reallygreatsite.com'}" style="color: ${data.primaryColor || '#d4a574'}; text-decoration: none;">${(data.website || 'reallygreatsite.com').replace(/^https?:\/\//, '')}</a>
                  </div>
                </td>
                ${data.includeQRCode ? `
                <td style="vertical-align: top; text-align: center; padding-left: 10px;">
                  <div style="text-align: center;">
                    <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 50px; height: 50px; border: none; display: block; margin: 0 auto;">
                    <div style="font-size: 8px; color: #666; margin-top: 2px; text-align: center;">Contact</div>
                  </div>
                </td>
                ` : ''}
              </tr>
              <tr>
                <td colspan="2" style="padding: 6px 0 0 0;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
  }


const generateCorporateEliteTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || null // Skip base64 for Gmail compatibility
    const primaryColor = data.primaryColor || '#4a90e2' // Default sky blue color
    const secondaryColor = data.secondaryColor || '#333333' // Dark gray
    const baseFontSize = parseInt(data.fontSize || '11') // Parse fontSize to number
    
    // Build full name
    const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' ') || 'Your Name'
    
    // Build phone string with pipes
    let phoneString = ''
    const phones = [data.mobilePhone, data.officePhone].filter(Boolean)
    if (phones.length > 0) {
      phoneString = phones.join(' | ')
    }
    
    // Build full address
    const addressParts = [data.companyAddress, data.companyCity, data.companyState, data.companyZipCode, data.companyCountry].filter(Boolean)
    const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : ''
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; width: 500px; border-collapse: collapse; font-size: ${baseFontSize}px;">
        <tr>
          <td style="vertical-align: top; width: 90px; padding: 0 10px 0 0; position: relative;">
            ${profileImage ? `
            <img src="${profileImage}" style="position: absolute; top: 0; left: 0; width: 80px; height: 80px; border-radius: 50px; object-fit: cover; margin-bottom: 10px; display: block; border: 2px solid #f0f0f0;  z-index: 50;" alt="Profile">
            ` : `
            <div style="width: 80px; height: 80px; border-radius: 8px; background: #f0f0f0; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; font-size: ${baseFontSize - 1}px; color: #999; font-family: ${data.fontFamily || 'Arial, sans-serif'}; border: 2px solid #e0e0e0;">Photo</div>
            `}
            <!-- Removed problematic external image that could cause email clipping -->
          </td>
          <td style="vertical-align: top; padding: 0 15px 0 0; border-right: 2px solid #e0e0e0; width: 180px;">
            <div style="font-size: ${baseFontSize + 8}px; font-weight: 700; color: ${secondaryColor}; margin-bottom: 4px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; letter-spacing: 0.5px;">${fullName}</div>
            <div style="font-size: ${baseFontSize + 2}px; color: ${primaryColor}; margin-bottom: 5px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-weight: 600;">${data.jobTitle || 'Software Developer'}</div>
            
            ${data.companyName ? `<div style="font-size: ${baseFontSize + 1}px; color: ${secondaryColor}; font-weight: 600; margin-bottom: 8px; font-family: ${data.fontFamily || 'Arial, sans-serif'};">${data.companyName}</div>` : ''}
            ${fullAddress ? `<div style="font-size: ${baseFontSize}px; color: #666; margin-bottom: 12px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; line-height: 1.4;">${fullAddress}</div>` : ''}
            
            <div style="margin-top: 15px;">
              ${generateSocialIcons(data.socialLinks)}
            </div>
          </td>
          <td style="vertical-align: top; padding: 0 0 0 15px; width: 205px;">
            ${phoneString ? `<div style="font-size: ${baseFontSize}px; color: ${secondaryColor}; margin-bottom: 8px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-weight: 600;">${phoneString}</div>` : ''}
            ${data.email ? `<div style="font-size: ${baseFontSize}px; color: ${primaryColor}; margin-bottom: 10px; font-family: ${data.fontFamily || 'Arial, sans-serif'};"><a href="mailto:${data.email}" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">${data.email}</a></div>` : ''}
            ${data.website ? `<div style="font-size: ${baseFontSize}px; color: ${primaryColor}; margin-bottom: 15px; font-family: ${data.fontFamily || 'Arial, sans-serif'};"><a href="${data.website}" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">${(data.website || '').replace(/^https?:\/\//, '')}</a></div>` : ''}
            
            
            ${data.includeQRCode ? `
            <div style="display: flex; align-items: flex-start; gap: 15px; margin-top: 10px;">
              ${data.companyLogoUrl || data.companyLogoBase64 ? `
              <img src="${data.companyLogoUrl || data.companyLogoBase64}" style="width: 45px; height: 30px; object-fit: contain;" alt="Company Logo">
              ` : `
              <div style="width: 45px; height: 30px; background: #f0f0f0; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: ${baseFontSize - 3}px; color: #999; font-family: ${data.fontFamily || 'Arial, sans-serif'};">LOGO</div>
              `}
              <div style="text-align: center;">
                <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 65px; height: 65px; border: none; display: block; margin-bottom: 4px;">
                <div style="font-size: ${baseFontSize - 1}px; color: ${secondaryColor}; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-weight: 600;">Scan to Connect</div>
              </div>
            </div>
            ` : `
            ${data.companyLogoUrl || data.companyLogoBase64 ? `
            <img src="${data.companyLogoUrl || data.companyLogoBase64}" style="width: 45px; height: 30px; object-fit: contain; display: block; margin-top: 10px;" alt="Company Logo">
            ` : `
            <div style="width: 45px; height: 30px; background: #f0f0f0; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: ${baseFontSize - 3}px; color: #999; font-family: ${data.fontFamily || 'Arial, sans-serif'}; margin-top: 10px;">LOGO</div>
            `}
            `}
          </td>
        </tr>
      </table>
    `
  }

  const generateSignature = (data: SignatureData, template: string) => {
    let html = ''
    
    switch(template) {
      case 'professional':
        html = generateProfessionalTemplate(data)
        break
      case 'creative':
        html = generateCreativeTemplate(data)
        break
      case 'glassmorphism':
        html = generateGlassmorphismTemplate(data)
        break
      case 'modern':
        html = generateModernTemplate(data)
        break
      case 'elegant':
        html = generateElegantTemplate(data)
        break
      case 'social-first':
        html = generateSocialFirstTemplate(data)
        break
      case 'compact-pro':
        html = generateCompactProTemplate(data)
        break
      case 'vibrant':
        html = generateVibrantTemplate(data)
        break
      case 'executive':
        html = generateExecutiveTemplate(data)
        break
      case 'handwritten':
        html = generateHandwrittenTemplate(data)
        break
      case 'corporate-elite':
        html = generateCorporateEliteTemplate(data)
        break
      default: // minimal
        html = generateMinimalTemplate(data)
    }
    
    return html
  }

  return {
    templates,
    colorOptions,
    fontOptions,
    fontSizeOptions,
    socialNetworks,
    generateSignature,
    getFullName,
    getFormattedAddress,
    generateQRCode,
    generateQRCodeURL,
    generateVCardData
  }
} 