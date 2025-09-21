export interface SignatureData {
  firstName: string
  lastName: string
  middleName: string
  email: string
  mobilePhone: string
  homePhone: string
  officePhone: string
  companyName: string
  jobTitle: string
  website: string
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
  category: 'minimal' | 'professional' | 'creative' | 'glassmorphism' | 'modern' | 'elegant',
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
  const createEmailSafeImage = (base64Data: string | null, altText: string, styles: string, fallbackContent?: string) => {
    if (!base64Data) {
      return fallbackContent || ''
    }
    
    // Create image with email-compatible attributes
    return `<img src="${base64Data}" alt="${altText}" style="${styles}" border="0" style="display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;">`
  }

  const getFullName = (data: SignatureData) => {
    const parts = [data.firstName, data.middleName, data.lastName].filter(Boolean)
    return parts.join(' ') || 'Your Name'
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
    
    if (data.homePhone) {
      vCard += `TEL;TYPE=HOME:${data.homePhone}\n`
    }
    
    if (data.officePhone) {
      vCard += `TEL;TYPE=WORK:${data.officePhone}\n`
    }
    
    if (data.website) {
      vCard += `URL:${data.website}\n`
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
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodedData}&format=png&margin=10`
      
      console.log('QR Code URL generated:', qrCodeURL)
      return qrCodeURL
    } catch (error) {
      console.error('Error generating QR code URL:', error)
      return ''
    }
  }

  // Keep the original function for backward compatibility but use URL instead
  const generateQRCode = async (data: SignatureData): Promise<string> => {
    return generateQRCodeURL(data)
  }

  const generateMinimalTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; color: ${data.secondaryColor || '#333333'}; max-width: 400px; border-collapse: collapse; font-size: ${data.fontSize || '10px'};">
        <tr>
          <td style="vertical-align: top; padding-right: ${data.includeQRCode ? '15px' : '0'};">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${parseInt(data.fontSize || '10px') + 4}px; font-weight: bold; color: ${data.primaryColor || '#4361ee'};">${getFullName(data)}</td>
              </tr>
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${data.fontSize || '10px'}; color: ${data.secondaryColor || '#666666'};">${data.jobTitle || 'Your Job Title'}</td>
              </tr>
              <tr>
                <td style="padding: 0 0 6px 0; font-size: ${data.fontSize || '10px'}; color: ${data.secondaryColor || '#666666'};">
                  ${data.companyName || 'Your Company'}
                  ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 16px; margin-top: 3px; border: none; display: block; max-width: 100px;" onerror="this.style.display='none';">` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 0 0 4px 0; font-size: ${data.fontSize || '10px'};">
                  <a href="mailto:${data.email || 'your.email@example.com'}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
                  ${data.mobilePhone ? ` | <a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.mobilePhone}</a>` : ''}
                  ${data.homePhone ? ` | <a href="tel:${data.homePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.homePhone}</a>` : ''}
                  ${data.officePhone ? ` | <a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.officePhone}</a>` : ''}
                </td>
              </tr>
              ${data.website ? `<tr><td style="padding: 0 0 6px 0; font-size: ${data.fontSize || '10px'};"><a href="${data.website}" style="color: ${data.primaryColor || '#4361ee'}; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></td></tr>` : ''}
              <tr>
                <td style="padding: 6px 0 0 0; line-height: 1.2;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
              </tr>
            </table>
          </td>
          ${data.includeQRCode ? `
          <td style="vertical-align: top; text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 80px; height: 80px; border: none; display: block;">
            <div style="font-size: 8px; color: ${data.secondaryColor || '#666666'}; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateProfessionalTemplate = (data: SignatureData) => {
    // Prioritize URLs over base64 for better email compatibility
    const profileImage = data.profilePhotoUrl || data.profilePhotoBase64 || null
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    console.log('Professional template - Profile image available:', !!profileImage)
    console.log('Professional template - Logo image available:', !!logoImage)
    console.log('Professional template - Using profile URL:', !!data.profilePhotoUrl)
    console.log('Professional template - Using logo URL:', !!data.companyLogoUrl)
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${data.fontFamily || 'Arial, sans-serif'}; color: #333333; max-width: 500px; border-collapse: collapse; font-size: ${data.fontSize || '10px'};">
        <tr>
          <td style="padding: 0 5px 0 0; vertical-align: top; width: 70px;">
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
          <td style="vertical-align: top; border-left: 2px solid ${data.primaryColor || '#4361ee'}; padding: 0 0 0 15px; ${data.includeQRCode ? 'padding-right: 15px;' : ''}">
            <table cellpadding="0" cellspacing="0" border="0">
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
                  ${data.homePhone ? `<strong>Home:</strong> <a href="tel:${data.homePhone.replace(/[^\d+]/g, '')}" style="color: ${data.secondaryColor || '#333333'}; text-decoration: none;">${data.homePhone}</a><br>` : ''}
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
          <td style="vertical-align: top; text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 80px; height: 80px; border: none; display: block;">
            <div style="font-size: 8px; color: ${data.secondaryColor || '#666666'}; margin-top: 2px;">Scan for Contact</div>
          </td>
          ` : ''}
        </tr>
      </table>
    `
  }

  const generateCreativeTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || data.profilePhotoBase64 || null
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); padding: 25px 30px; border-radius: 12px; color: white; max-width: 450px; font-family: ${data.fontFamily || 'Arial, sans-serif'}; font-size: ${data.fontSize || '10px'}; border-collapse: collapse; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        <tr>
          <td style="padding: 0 0 18px 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding:18px; vertical-align: top; width: 70px;">
                  ${profileImage ? 
                    `<img src="${profileImage}" alt="Profile" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.3); display: block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                     <table cellpadding="0" cellspacing="0" border="0" style="width: 55px; height: 55px; background: rgba(255,255,255,0.2); border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); border-collapse: collapse; display: none;">
                      <tr><td style="text-align: center; font-size: 20px; font-weight: bold; color: white; padding: 17px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
                     </table>` :
                    `<table cellpadding="0" cellspacing="0" border="0" style="width: 55px; height: 55px; background: rgba(255,255,255,0.2); border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); border-collapse: collapse;">
                      <tr><td style="text-align: center; font-size: 20px; font-weight: bold; color: white; padding: 17px 0;">${getFullName(data).charAt(0).toUpperCase()}</td></tr>
                    </table>`
                  }
                </td>
                <td style="vertical-align: top; padding: 15px 15px 15px 0;">
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 8}px; font-weight: bold; margin-bottom: 6px; color: white; line-height: 1.2;">${getFullName(data)}</div>
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 2}px; opacity: 0.9; color: white; margin-bottom: 10px; line-height: 1.3;">${data.jobTitle || 'Your Job Title'}</div>
                  <div style="font-size: ${parseInt(data.fontSize || '10px') + 2}px; opacity: 0.9; color: white; line-height: 1.3;">
                    ${data.companyName || 'Your Company'}
                    ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 18px; margin-top: 5px; border: none; display: block; filter: brightness(0) invert(1);" onerror="this.style.display='none';">` : ''}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
            <div style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; line-height: 1.8;">
              <div style="margin-bottom: 8px; color: white; display: flex; align-items: center;">
                <span style="margin-right: 12px; font-size: 14px;">📧</span>
                <a href="mailto:${data.email || 'your.email@example.com'}" style="color: white; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
              </div>
              ${data.mobilePhone ? `<div style="margin-bottom: 8px; color: white; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 14px;">📱</span><a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: white; text-decoration: none;">${data.mobilePhone}</a></div>` : ''}
              ${data.homePhone ? `<div style="margin-bottom: 8px; color: white; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 14px;">🏠</span><a href="tel:${data.homePhone.replace(/[^\d+]/g, '')}" style="color: white; text-decoration: none;">${data.homePhone}</a></div>` : ''}
              ${data.officePhone ? `<div style="margin-bottom: 8px; color: white; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 14px;">🏢</span><a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: white; text-decoration: none;">${data.officePhone}</a></div>` : ''}
              ${data.website ? `<div style="margin-bottom: 8px; color: white; display: flex; align-items: center;"><span style="margin-right: 12px; font-size: 14px;">🌐</span><a href="${data.website}" style="color: white; text-decoration: none;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
              <tr>
                <td style="vertical-align: top;">
                  ${generateSocialIcons(data.socialLinks)}
                </td>
                ${data.includeQRCode ? `
                <td style="vertical-align: top; text-align: right;">
                  <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
                  <div style="font-size: 8px; color: rgba(255,255,255,0.8); margin-top: 2px; text-align: center;">Scan for Contact</div>
                </td>
                ` : ''}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
  }

  const generateGlassmorphismTemplate = (data: SignatureData) => {
    const profileImage = data.profilePhotoUrl || data.profilePhotoBase64 || null
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 18px; color: #333; max-width: 400px; font-family: ${data.fontFamily || 'Segoe UI, sans-serif'}; font-size: ${data.fontSize || '10px'}; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          ${profileImage ? 
            `<img src="${profileImage}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 15px; box-shadow: 0 3px 12px rgba(67, 97, 238, 0.3);" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
             <div style="width: 50px; height: 50px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); border-radius: 50%; display: none; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 3px 12px rgba(67, 97, 238, 0.3);">
              <span style="font-size: 18px; font-weight: bold; color: white;">${getFullName(data).charAt(0).toUpperCase()}</span>
             </div>` :
            `<div style="width: 50px; height: 50px; background: linear-gradient(135deg, ${data.primaryColor || '#4361ee'}, ${data.secondaryColor || '#3a0ca3'}); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; box-shadow: 0 3px 12px rgba(67, 97, 238, 0.3);">
              <span style="font-size: 18px; font-weight: bold; color: white;">${getFullName(data).charAt(0).toUpperCase()}</span>
            </div>`
          }
          <div>
            <div style="font-size: ${parseInt(data.fontSize || '10px') + 6}px; font-weight: 600; color: ${data.primaryColor || '#4361ee'}; margin-bottom: 3px;">${getFullName(data)}</div>
            <div style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; margin-bottom: 4px;">${data.jobTitle || 'Your Job Title'}</div>
            <div style="font-size: ${data.fontSize || '10px'}; color: #888; font-weight: 500;">
              ${data.companyName || 'Your Company'}
              ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 14px; margin-top: 2px;" onerror="this.style.display='none';">` : ''}
            </div>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding-top: 12px; font-size: ${data.fontSize || '10px'}; line-height: 1.6;">
          <div style="margin-bottom: 4px;">
            <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 600;">📧</span> 
            <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none; margin-left: 6px;">${data.email || 'your.email@example.com'}</a>
          </div>
          ${data.mobilePhone ? `<div style="margin-bottom: 4px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 600;">📱</span> <a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 6px;">${data.mobilePhone}</a></div>` : ''}
          ${data.officePhone ? `<div style="margin-bottom: 4px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 600;">🏢</span> <a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 6px;">${data.officePhone}</a></div>` : ''}
          ${data.website ? `<div style="margin-bottom: 4px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 600;">🌐</span> <a href="${data.website}" style="color: #333; text-decoration: none; margin-left: 6px;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
        </div>
        <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid rgba(0, 0, 0, 0.1); line-height: 1.2; display: flex; justify-content: space-between; align-items: center;">
          <div>
            ${generateSocialIcons(data.socialLinks)}
          </div>
          ${data.includeQRCode ? `
          <div style="text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </div>
          ` : ''}
        </div>
      </div>
    `
  }

  const generateModernTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <div style="border-left: 3px solid ${data.primaryColor || '#4361ee'}; padding-left: 15px; font-family: ${data.fontFamily || 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}; max-width: 400px; font-size: ${data.fontSize || '10px'};">
        <div style="font-size: ${parseInt(data.fontSize || '10px') + 6}px; font-weight: 600; color: ${data.primaryColor || '#4361ee'}; margin-bottom: 4px;">${getFullName(data)}</div>
        <div style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; margin-bottom: 6px; font-weight: 500;">${data.jobTitle || 'Your Job Title'}</div>
        <div style="font-size: ${data.fontSize || '10px'}; color: #888; margin-bottom: 8px;">
          ${data.companyName || 'Your Company'}
          ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 16px; margin-top: 3px;" onerror="this.style.display='none';">` : ''}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; font-size: ${data.fontSize || '10px'};">
          <div>
            <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Email:</span><br>
            <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none;">${data.email || 'your.email@example.com'}</a>
          </div>
          ${data.mobilePhone ? `<div><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Mobile:</span><br><a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.mobilePhone}</a></div>` : ''}
          ${data.homePhone ? `<div><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Home:</span><br><a href="tel:${data.homePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.homePhone}</a></div>` : ''}
          ${data.officePhone ? `<div><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Office:</span><br><a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none;">${data.officePhone}</a></div>` : ''}
        </div>
        
        <div style="margin-top: 8px; line-height: 1.2; display: flex; justify-content: space-between; align-items: center;">
          <div>
            ${generateSocialIcons(data.socialLinks)}
          </div>
          ${data.includeQRCode ? `
          <div style="text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </div>
          ` : ''}
        </div>
      </div>
    `
  }

  const generateElegantTemplate = (data: SignatureData) => {
    const logoImage = data.companyLogoUrl || data.companyLogoBase64 || null
    
    return `
      <div style="font-family: ${data.fontFamily || 'Georgia, serif'}; max-width: 400px; border: 1px solid #e0e0e0; padding: 18px; background: linear-gradient(to right, #fafafa, #f5f5f5); font-size: ${data.fontSize || '10px'};">
        <div style="text-align: center; margin-bottom: 15px;">
          <div style="font-size: ${parseInt(data.fontSize || '10px') + 8}px; font-weight: normal; color: ${data.primaryColor || '#4361ee'}; margin-bottom: 4px; font-style: italic;">${getFullName(data)}</div>
          <div style="font-size: ${parseInt(data.fontSize || '10px') + 1}px; color: #666; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">${data.jobTitle || 'Your Job Title'}</div>
          <div style="font-size: ${parseInt(data.fontSize || '10px') + 2}px; color: #333; font-weight: 500;">
            ${data.companyName || 'Your Company'}
            ${logoImage ? `<br><img src="${logoImage}" alt="Company Logo" style="height: 18px; margin-top: 4px;" onerror="this.style.display='none';">` : ''}
          </div>
        </div>
        <div style="border-top: 1px solid #ddd; padding-top: 12px; font-size: ${data.fontSize || '10px'}; line-height: 1.8;">
          <div style="margin-bottom: 6px;">
            <span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Email:</span>
            <a href="mailto:${data.email || 'your.email@example.com'}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.email || 'your.email@example.com'}</a>
          </div>
          ${data.mobilePhone ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Mobile:</span><a href="tel:${data.mobilePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.mobilePhone}</a></div>` : ''}
          ${data.homePhone ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Home:</span><a href="tel:${data.homePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.homePhone}</a></div>` : ''}
          ${data.officePhone ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Office:</span><a href="tel:${data.officePhone.replace(/[^\d+]/g, '')}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.officePhone}</a></div>` : ''}
          ${data.website ? `<div style="margin-bottom: 6px;"><span style="color: ${data.primaryColor || '#4361ee'}; font-weight: 500;">Website:</span><a href="${data.website}" style="color: #333; text-decoration: none; margin-left: 8px;">${data.website.replace(/^https?:\/\//, '')}</a></div>` : ''}
        </div>
        <div style="text-align: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; line-height: 1.2; display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            ${generateSocialIcons(data.socialLinks)}
          </div>
          ${data.includeQRCode ? `
          <div style="text-align: center;">
            <img src="${generateQRCodeURL(data)}" alt="Contact QR Code" style="width: 60px; height: 60px; border: none; display: block;">
            <div style="font-size: 8px; color: #666; margin-top: 2px;">Scan for Contact</div>
          </div>
          ` : ''}
        </div>
      </div>
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
    generateQRCode,
    generateQRCodeURL,
    generateVCardData
  }
} 