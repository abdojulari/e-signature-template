// Background script for SignaturePro extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('SignaturePro extension installed');
    
    // Open the dashboard to help users get started
    chrome.tabs.create({
      url: 'http://localhost:3000/dashboard'
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'ping') {
    // Respond to ping from popup to check if extension is installed
    sendResponse({ status: 'active' });
  }
  
  if (request.action === 'getSignature') {
    // Get signature from storage
    chrome.storage.local.get(['email_signature'], function(result) {
      sendResponse({ signature: result.email_signature });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'saveSignature') {
    // Save signature to storage
    chrome.storage.local.set({ email_signature: request.signature }, function() {
      sendResponse({ success: true });
    });
    return true; // Keep message channel open for async response
  }
});

// Handle tab updates to inject content script when needed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    const url = tab.url;
    if (url && (url.includes('mail.google.com') || 
                url.includes('outlook.live.com') || 
                url.includes('outlook.office.com'))) {
      // Inject content script if not already injected
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content-working.js']
      }).catch(error => {
        // Content script might already be injected, ignore error
        console.log('Content script injection:', error);
      });
    }
  }
});

console.log('SignaturePro background script loaded'); 