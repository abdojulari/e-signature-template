// Content script for localhost dashboard communication
console.log('🏠 LOCALHOST: Dashboard bridge content script loaded');

// Extension connection indicator removed for clean UI

// Listen for postMessage from dashboard
window.addEventListener('message', function(event) {
  // Only accept messages from same origin
  if (event.origin !== window.location.origin) {
    return;
  }
  
  console.log('🏠 LOCALHOST: Received message:', event.data);
  
  if (event.data && event.data.type === 'SIGNATURE_SAVE_REQUEST') {
    console.log('🏠 LOCALHOST: Processing signature save request...');
    
    // Forward to background script via Chrome runtime
    chrome.runtime.sendMessage({
      action: 'saveSignature',
      signature: event.data.signature
    }, function(response) {
      if (chrome.runtime.lastError) {
        console.error('🏠 LOCALHOST: Extension error:', chrome.runtime.lastError.message);
        
        // Post error response back to dashboard
        window.postMessage({
          type: 'SIGNATURE_SAVE_RESPONSE',
          success: false,
          message: 'Extension error: ' + chrome.runtime.lastError.message
        }, '*');
      } else {
        console.log('🏠 LOCALHOST: Extension response:', response);
        
        // Post response back to dashboard
        window.postMessage({
          type: 'SIGNATURE_SAVE_RESPONSE',
          success: response?.success || false,
          message: response?.success ? 'Signature saved to Chrome extension!' : (response?.message || 'Unknown response')
        }, '*');
      }
    });
  }
});

// Test extension connectivity
chrome.runtime.sendMessage({ action: 'ping' }, function(response) {
  if (chrome.runtime.lastError) {
    console.error('🏠 LOCALHOST: Extension not responding:', chrome.runtime.lastError.message);
  } else {
    console.log('🏠 LOCALHOST: Extension ping successful:', response);
  }
});

console.log('🏠 LOCALHOST: Dashboard bridge ready');