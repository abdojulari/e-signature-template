// Working content script for Gmail signature injection - wrapped in IIFE to avoid conflicts
(function() {
  'use strict';
  
  // Check if already initialized to prevent duplicate execution
  if (window.signatureExtensionWorking) {
    console.log('🎯 CONTENT: Script already initialized, skipping...');
    return;
  }
  window.signatureExtensionWorking = true;
  
  console.log('🎯 CONTENT: Script loaded on', window.location.href);

  // Visual debug indicators removed for clean UI

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('🎯 CONTENT: Message received:', request);
    
    // Handle different message types
    try {
      if (request.action === 'test') {
        console.log('🎯 CONTENT: Test message received');
        sendResponse({ 
          status: 'ready', 
          hostname: window.location.hostname,
          url: window.location.href
        });
        return true;
      }
      
      if (request.action === 'applySignature') {
        console.log('🎯 CONTENT: Apply signature request received');
        
        // Apply signature immediately
        const result = applySignatureToEmail(request.signature);
        
        console.log('🎯 CONTENT: Signature application result:', result);
        
        // Send response
        sendResponse({
          success: result.success,
          message: result.message,
          timestamp: new Date().toISOString()
        });
        
        return true;
      }
      
      if (request.action === 'checkSignatureStatus') {
        console.log('🎯 CONTENT: Checking signature status');
        
        // Count active signatures
        const signatures = document.querySelectorAll('[data-signature-extension="true"]');
        const editors = document.querySelectorAll('[contenteditable="true"][role="textbox"]');
        
        sendResponse({
          hasActiveSignatures: signatures.length > 0,
          count: signatures.length,
          totalEditors: editors.length,
          timestamp: new Date().toISOString()
        });
        
        return true;
      }
      
      if (request.action === 'scanForEditors') {
        console.log('🎯 CONTENT: Manual scan for editors requested');
        
        // Trigger immediate scan
        scanForUnsignedEditors();
        
        const signatures = document.querySelectorAll('[data-signature-extension="true"]');
        sendResponse({
          success: true,
          message: 'Scan completed',
          signaturesFound: signatures.length
        });
        
        return true;
      }
      
      // Unknown action
      console.log('🎯 CONTENT: Unknown action:', request.action);
      sendResponse({ 
        success: false, 
        message: 'Unknown action: ' + request.action 
      });
      return true;
      
    } catch (error) {
      console.error('🎯 CONTENT: Error handling message:', error);
      sendResponse({ 
        success: false, 
        message: 'Error: ' + error.message 
      });
      return true;
    }
  });

function applySignatureToEmail(signature) {
  console.log('🎯 CONTENT: Starting signature application...');
  console.log('🎯 CONTENT: Signature preview:', signature.substring(0, 200) + '...');
  
  try {
    // Gmail selectors in order of preference
    const selectors = [
      '[contenteditable="true"][role="textbox"]',
      '.Am.Al.editable',
      '[data-tooltip="Message Body"]',
      '[aria-label="Message Body"]',
      'div[contenteditable="true"]:not([aria-label*="Subject"])',
      '.editable'
    ];
    
    let editor = null;
    
    // Try each selector
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      console.log(`🎯 CONTENT: Trying selector "${selector}", found ${elements.length} elements`);
      
      for (const element of elements) {
        // Check if element is visible and actually editable
        if (element.offsetParent !== null && 
            element.contentEditable === 'true' &&
            !element.getAttribute('aria-label')?.toLowerCase().includes('subject')) {
          
          editor = element;
          console.log('🎯 CONTENT: Found suitable editor:', selector);
          break;
        }
      }
      
      if (editor) break;
    }
    
    if (!editor) {
      console.log('🎯 CONTENT: No Gmail editor found');
      return { 
        success: false, 
        message: 'Gmail compose area not found. Please open a compose window.' 
      };
    }
    
    // Remove any existing signature from this extension
    const existingSignature = editor.querySelector('[data-signature-extension="true"]');
    if (existingSignature) {
      existingSignature.remove();
      console.log('🎯 CONTENT: Removed existing signature');
    }
    
    // Create signature element with enhanced email compatibility
    const signatureWrapper = document.createElement('div');
    signatureWrapper.setAttribute('data-signature-extension', 'true');
    signatureWrapper.style.cssText = `
      margin-top: 20px;
      padding: 5px 0;
      font-family: Arial, sans-serif;
    `;
    
    // Process the signature to ensure images are properly formatted
    const processedSignature = signature.replace(
      /<img([^>]*?)style="([^"]*?)"([^>]*?)>/g,
      (match, before, styles, after) => {
        // Add email-specific image attributes
        const enhancedStyles = styles + '; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;';
        return `<img${before}style="${enhancedStyles}"${after} border="0">`;
      }
    );
    
    signatureWrapper.innerHTML = processedSignature;
    
    // Check for images and log potential issues
    const images = signatureWrapper.querySelectorAll('img');
    if (images.length > 0) {
      console.log(`🎯 CONTENT: Signature contains ${images.length} images`);
      let base64ImageCount = 0;
      images.forEach((img, index) => {
        if (img.src.startsWith('data:')) {
          base64ImageCount++;
          console.warn(`🎯 CONTENT: Image ${index + 1} is base64 - WILL BE BLOCKED by most email clients (Gmail, Outlook, etc.)`);
          // Replace base64 images with fallback text for better email compatibility
          const altText = img.alt || 'Image';
          const fallback = document.createElement('span');
          fallback.style.cssText = 'display: inline-block; padding: 4px 8px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px; font-size: 10px; color: #666; margin: 2px;';
          fallback.textContent = `[${altText}]`;
          img.parentNode.replaceChild(fallback, img);
        } else if (img.src.startsWith('http')) {
          console.log(`🎯 CONTENT: Image ${index + 1} is hosted URL - good for email compatibility`);
        }
      });
      
      if (base64ImageCount > 0) {
        console.warn(`🎯 CONTENT: IMPORTANT: ${base64ImageCount} base64 images were replaced with text fallbacks to ensure recipients can see your signature.`);
      }
    }
    
    // Insert signature at the end of the editor
    editor.appendChild(signatureWrapper);
    
    // Trigger events to notify Gmail of changes
    const events = ['input', 'change', 'keyup'];
    events.forEach(eventType => {
      const event = new Event(eventType, { bubbles: true });
      editor.dispatchEvent(event);
    });
    
    console.log('🎯 CONTENT: Signature applied successfully');
    
    return { 
      success: true, 
      message: 'Signature applied successfully to Gmail' 
    };
    
  } catch (error) {
    console.error('🎯 CONTENT: Error applying signature:', error);
    return { 
      success: false, 
      message: 'Error applying signature: ' + error.message 
    };
  }
}

// Enhanced auto-apply signature system
let signatureCache = null;
let lastAppliedSignature = '';

// Load signature from storage and cache it
function loadSignatureFromStorage() {
  chrome.storage.local.get(['email_signature', 'signaturepro_generated_signature'], function(result) {
    if (result.email_signature || result.signaturepro_generated_signature) {
      signatureCache = result.email_signature || result.signaturepro_generated_signature;
    } else {
      // Fallback to localStorage if chrome.storage.local is empty (check both old and new keys)
      const localStorageSignature = localStorage.getItem('email_signature') || 
                                   localStorage.getItem('signaturepro_generated_signature');
      if (localStorageSignature) {
        signatureCache = localStorageSignature;
        
        // Save to chrome.storage.local for future use
        chrome.storage.local.set({ email_signature: localStorageSignature });
      }
    }
  });
}

// Auto-apply signature when compose window is detected
function autoApplySignature(targetEditor = null) {
  if (!signatureCache) {
    chrome.storage.local.get(['email_signature', 'signaturepro_generated_signature'], function(result) {
      if (result.email_signature || result.signaturepro_generated_signature) {
        signatureCache = result.email_signature || result.signaturepro_generated_signature;
        applySignatureToSpecificEditor(targetEditor);
      } else {
        // Fallback to localStorage (check both old and new keys)
        const localStorageSignature = localStorage.getItem('email_signature') || 
                                     localStorage.getItem('signaturepro_generated_signature');
        if (localStorageSignature) {
          signatureCache = localStorageSignature;
          applySignatureToSpecificEditor(targetEditor);
        }
      }
    });
  } else {
    applySignatureToSpecificEditor(targetEditor);
  }
}

// Apply signature to a specific editor or find one
function applySignatureToSpecificEditor(targetEditor = null) {
  if (!signatureCache) return;

  let editor = targetEditor;
  
  if (!editor) {
    // Find all possible editors
    const selectors = [
      '[contenteditable="true"][role="textbox"]',
      '.Am.Al.editable',
      '[data-tooltip="Message Body"]',
      '[aria-label="Message Body"]',
      'div[contenteditable="true"]:not([aria-label*="Subject"])',
      '.editable'
    ];
    
    // Try each selector and find visible editors
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        if (element.offsetParent !== null && 
            element.contentEditable === 'true' &&
            !element.getAttribute('aria-label')?.toLowerCase().includes('subject') &&
            !element.querySelector('[data-signature-extension="true"]')) {
          
          editor = element;
          break;
        }
      }
      if (editor) break;
    }
  }

  if (editor && !editor.querySelector('[data-signature-extension="true"]')) {
    console.log('🎯 CONTENT: Applying signature to editor');
    
    // Create signature element with minimal styling for email compatibility
    const signatureWrapper = document.createElement('div');
    signatureWrapper.setAttribute('data-signature-extension', 'true');
    signatureWrapper.style.cssText = `
      margin-top: 20px;
      padding: 5px 0;
    `;
    
    signatureWrapper.innerHTML = signatureCache;
    
    // Insert signature at the end of the editor
    editor.appendChild(signatureWrapper);
    
    // Trigger events to notify Gmail of changes
    const events = ['input', 'change', 'keyup'];
    events.forEach(eventType => {
      const event = new Event(eventType, { bubbles: true });
      editor.dispatchEvent(event);
    });
    
    console.log('🎯 CONTENT: Signature applied successfully');
  }
}

// Enhanced compose window detection
function watchForComposeWindow() {
  const observer = new MutationObserver(function(mutations) {
    let foundNewCompose = false;
    
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element node
          // Multiple ways to detect compose windows
          const composeSelectors = [
            '[role="dialog"]',         // Gmail compose dialog
            '.nH.if',                  // Gmail compose interface
            '[contenteditable="true"][role="textbox"]', // Direct editor
            '.aO7',                    // Gmail compose container
            '.Ar.Au',                  // Gmail compose area
            '[gh="cm"]'                // Gmail compose marker
          ];
          
          for (const selector of composeSelectors) {
            const composeElements = node.querySelectorAll ? 
              node.querySelectorAll(selector) : [];
            
            if (composeElements.length > 0) {
              console.log('🎯 CONTENT: New compose detected via:', selector);
              foundNewCompose = true;
              
              // Apply to each new compose window found
              composeElements.forEach(compose => {
                const editor = compose.querySelector('[contenteditable="true"][role="textbox"]') || compose;
                if (editor && editor.contentEditable === 'true') {
                  setTimeout(() => {
                    autoApplySignature(editor);
                  }, 500); // Small delay for Gmail to finish loading
                }
              });
              break;
            }
          }
          
          // Also check if the node itself is a compose editor
          if (node.getAttribute && node.getAttribute('contenteditable') === 'true' && 
              node.getAttribute('role') === 'textbox' &&
              !node.querySelector('[data-signature-extension="true"]')) {
            console.log('🎯 CONTENT: Direct editor node detected');
            setTimeout(() => {
              autoApplySignature(node);
            }, 500);
            foundNewCompose = true;
          }
        }
      });
    });
    
    // If we found new compose windows, also do a general sweep
    if (foundNewCompose) {
      setTimeout(() => {
        scanForUnsignedEditors();
      }, 1000);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log('🎯 CONTENT: Enhanced compose window watcher active');
}

// Periodic scan for unsigned editors
function scanForUnsignedEditors() {
  const editors = document.querySelectorAll('[contenteditable="true"][role="textbox"]');
  console.log('🎯 CONTENT: Scanning for unsigned editors, found:', editors.length);
  
  editors.forEach(editor => {
    if (editor.offsetParent !== null && // Visible
        !editor.getAttribute('aria-label')?.toLowerCase().includes('subject') && // Not subject line
        !editor.querySelector('[data-signature-extension="true"]') && // No signature yet
        editor.innerHTML.trim().length < 100) { // Not too much content already
      
      console.log('🎯 CONTENT: Found unsigned editor, applying signature');
      autoApplySignature(editor);
    }
  });
}

// Listen for storage changes to update cached signature
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.email_signature) {
    console.log('🎯 CONTENT: Signature updated in storage, refreshing cache');
    signatureCache = changes.email_signature.newValue;
  }
});

// Initialize the enhanced system
loadSignatureFromStorage();
watchForComposeWindow();

// Initial scan after page load
setTimeout(() => {
  console.log('🎯 CONTENT: Initial scan for existing compose windows');
  scanForUnsignedEditors();
}, 2000);

// Periodic scan every 5 seconds for any missed compose windows
setInterval(() => {
  scanForUnsignedEditors();
}, 5000);

console.log('🎯 CONTENT: Working script setup complete');

})(); // End of IIFE 