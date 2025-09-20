// Chrome extension types
declare global {
  interface Window {
    chrome?: {
      runtime: {
        sendMessage: (extensionId: string, message: any, callback?: (response: any) => void) => void
      }
    }
  }
}

export interface ExtensionInstallation {
  browser: 'chrome' | 'firefox' | 'safari' | 'edge'
  status: 'installed' | 'not_installed' | 'checking'
  signatureData?: string
}

export const useBrowserExtension = () => {
  const installationStatus = ref<ExtensionInstallation>({
    browser: 'chrome',
    status: 'checking'
  })

  const isExtensionInstalled = ref(false)
  const isLoading = ref(false)

  const detectBrowser = (): 'chrome' | 'firefox' | 'safari' | 'edge' => {
    if (typeof window === 'undefined') return 'chrome'
    
    const userAgent = navigator.userAgent.toLowerCase()
    
    if (userAgent.includes('firefox')) return 'firefox'
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'safari'
    if (userAgent.includes('edg')) return 'edge'
    return 'chrome'
  }

  const checkExtensionStatus = async () => {
    installationStatus.value.browser = detectBrowser()
    installationStatus.value.status = 'checking'
    
    try {
      // Check if our extension is installed
      const extensionId = 'campdejnhnkjjedfgfdmbmilmlccdohj' // Replace with your actual extension ID
      
      if (typeof window !== 'undefined' && window.chrome?.runtime) {
        // Try to communicate with the extension
        const response = await new Promise((resolve) => {
          window.chrome!.runtime.sendMessage(extensionId, { action: 'ping' }, (response: any) => {
            resolve(response)
          })
        })
        
        if (response) {
          installationStatus.value.status = 'installed'
          isExtensionInstalled.value = true
        } else {
          installationStatus.value.status = 'not_installed'
          isExtensionInstalled.value = false
        }
      } else {
        installationStatus.value.status = 'not_installed'
        isExtensionInstalled.value = false
      }
    } catch (error) {
      console.error('Extension check error:', error)
      installationStatus.value.status = 'not_installed'
      isExtensionInstalled.value = false
    }
  }

  const installExtension = async (signatureHtml: string) => {
    isLoading.value = true
    
    try {
      const browser = installationStatus.value.browser
      
      switch (browser) {
        case 'chrome':
          await installChromeExtension(signatureHtml)
          break
        case 'firefox':
          await installFirefoxExtension(signatureHtml)
          break
        case 'safari':
          await installSafariExtension(signatureHtml)
          break
        case 'edge':
          await installEdgeExtension(signatureHtml)
          break
      }
    } catch (error) {
      console.error('Extension installation error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const installChromeExtension = async (signatureHtml: string) => {
    // Store signature data for the extension
    if (typeof window !== 'undefined') {
      localStorage.setItem('email_signature', signatureHtml)
      
      // Also try to send the signature to the extension if it's installed
      try {
        const extensionId = 'campdejnhnkjjedfgfdmbmilmlccdohj'
        if (window.chrome?.runtime) {
          window.chrome.runtime.sendMessage(extensionId, {
            action: 'saveSignature',
            signature: signatureHtml
          }, function(response: any) {
            if (response && response.success) {
              console.log('Signature saved to extension successfully')
            }
          })
        }
      } catch (error) {
        console.log('Extension not available for direct communication')
      }
    }
    
    // Show success message
    alert(`
      ✅ Signature Saved Successfully!
      
      Your signature has been saved and is ready to use with the Chrome extension.
      
      To apply your signature:
      
      1. Go to Gmail or Outlook
      2. Click the "Signature Generator Pro" extension icon
      3. Click "Test Extension" to apply your signature
      
      The extension is now working and ready to use!
    `)
  }

  const installFirefoxExtension = async (signatureHtml: string) => {
    // Store signature data for the extension
    if (typeof window !== 'undefined') {
      localStorage.setItem('email_signature', signatureHtml)
    }
    
    // Show installation instructions since extension is not yet published
    alert(`
      📧 Email Signature Extension - Coming Soon!
      
      The browser extension is currently in development and will be available soon.
      
      For now, you can:
      
      1. 📋 Copy the HTML code using the "Copy HTML" button
      2. 📥 Download the signature file using the "Download" button
      3. 🔧 Manually add the signature to your email client settings
      
      Your signature has been saved locally and will be ready when the extension launches!
      
      Stay tuned for updates on the extension release.
    `)
  }

  const installSafariExtension = async (signatureHtml: string) => {
    // Store signature data for the extension
    if (typeof window !== 'undefined') {
      localStorage.setItem('email_signature', signatureHtml)
    }
    
    // Show installation instructions since extension is not yet published
    alert(`
      📧 Email Signature Extension - Coming Soon!
      
      The browser extension is currently in development and will be available soon.
      
      For now, you can:
      
      1. 📋 Copy the HTML code using the "Copy HTML" button
      2. 📥 Download the signature file using the "Download" button
      3. 🔧 Manually add the signature to your email client settings
      
      Your signature has been saved locally and will be ready when the extension launches!
      
      Stay tuned for updates on the extension release.
    `)
  }

  const installEdgeExtension = async (signatureHtml: string) => {
    // Store signature data for the extension
    if (typeof window !== 'undefined') {
      localStorage.setItem('email_signature', signatureHtml)
    }
    
    // Show installation instructions since extension is not yet published
    alert(`
      📧 Email Signature Extension - Coming Soon!
      
      The browser extension is currently in development and will be available soon.
      
      For now, you can:
      
      1. 📋 Copy the HTML code using the "Copy HTML" button
      2. 📥 Download the signature file using the "Download" button
      3. 🔧 Manually add the signature to your email client settings
      
      Your signature has been saved locally and will be ready when the extension launches!
      
      Stay tuned for updates on the extension release.
    `)
  }

  const copySignatureToClipboard = async (signatureHtml: string) => {
    try {
      // Create a temporary textarea to copy the HTML
      const textarea = document.createElement('textarea')
      textarea.value = signatureHtml
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      
      return true
    } catch (error) {
      console.error('Copy to clipboard error:', error)
      return false
    }
  }

  const downloadSignatureFile = (signatureHtml: string, fileName: string = 'email-signature.html') => {
    const blob = new Blob([signatureHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateInstallationInstructions = () => {
    const browser = installationStatus.value.browser
    
    const instructions = {
      chrome: {
        title: 'Email Signature Extension - Coming Soon!',
        steps: [
          'The browser extension is currently in development',
          'Use "Copy HTML" to copy your signature code',
          'Use "Download" to save your signature file',
          'Manually add the signature to your email client',
          'Stay tuned for the extension release!'
        ]
      },
      firefox: {
        title: 'Email Signature Extension - Coming Soon!',
        steps: [
          'The browser extension is currently in development',
          'Use "Copy HTML" to copy your signature code',
          'Use "Download" to save your signature file',
          'Manually add the signature to your email client',
          'Stay tuned for the extension release!'
        ]
      },
      safari: {
        title: 'Email Signature Extension - Coming Soon!',
        steps: [
          'The browser extension is currently in development',
          'Use "Copy HTML" to copy your signature code',
          'Use "Download" to save your signature file',
          'Manually add the signature to your email client',
          'Stay tuned for the extension release!'
        ]
      },
      edge: {
        title: 'Email Signature Extension - Coming Soon!',
        steps: [
          'The browser extension is currently in development',
          'Use "Copy HTML" to copy your signature code',
          'Use "Download" to save your signature file',
          'Manually add the signature to your email client',
          'Stay tuned for the extension release!'
        ]
      }
    }
    
    return instructions[browser]
  }

  // Check extension status on mount
  onMounted(() => {
    checkExtensionStatus()
  })

  return {
    installationStatus: readonly(installationStatus),
    isExtensionInstalled: readonly(isExtensionInstalled),
    isLoading: readonly(isLoading),
    installExtension,
    copySignatureToClipboard,
    downloadSignatureFile,
    generateInstallationInstructions,
    checkExtensionStatus
  }
} 