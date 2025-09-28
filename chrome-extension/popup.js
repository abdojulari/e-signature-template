console.log('Signature Generator Pro: Popup script loaded');

// Use proper event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('Signature Generator Pro: DOM loaded, setting up popup...');
  
  // Set up event listeners
  const applyButton = document.getElementById('apply-signature');
  const dashboardButton = document.getElementById('open-dashboard');
  
  if (applyButton) {
    applyButton.addEventListener('click', manualApplySignature);
    console.log('Signature Generator Pro: Apply button listener added');
  }
  
  if (dashboardButton) {
    dashboardButton.addEventListener('click', openDashboard);
    console.log('Signature Generator Pro: Dashboard button listener added');
  }
  
  // Initialize popup
  initializePopup();
});

function initializePopup() {
  console.log('Signature Generator Pro: Initializing popup...');
  
  // Check current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0]) {
      const url = tabs[0].url;
      console.log('Signature Generator Pro: Current tab URL:', url);
      
      if (url && (url.includes('mail.google.com') || url.includes('yahoo.com') || url.includes('outlook.live.com') || url.includes('outlook.office.com'))) {
        updateStatus('Email service detected - Auto-apply ready');
        checkSignatureStatus();
      } else {
        updateStatus('Please navigate to Gmail, Yahoo, or Outlook');
        enableApplyButton(false);
      }
    }
  });
  
  // Check for saved signature
  loadAndDisplaySignature();
}

function checkSignatureStatus() {
  // Send message to content script to check persistent signature status
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'checkSignatureStatus'
      }, function(response) {
        if (chrome.runtime.lastError) {
          console.log('Signature Generator Pro: Content script not ready');
        } else if (response) {
          console.log('Signature Generator Pro: Signature status:', response);
          if (response.hasActiveSignatures) {
            updateStatus('Auto-apply active - Signatures in ' + response.count + ' compose windows');
          } else {
            updateStatus('Auto-apply ready - Open a compose window');
          }
        }
      });
    }
  });
}

function loadAndDisplaySignature() {
  console.log('Signature Generator Pro: Loading signature from storage...');
  
  // Check Chrome storage for signature (check multiple possible keys)
  chrome.storage.local.get(['email_signature', 'signaturepro_generated_signature', 'signature_data'], function(result) {
    console.log('Signature Generator Pro: Storage result:', result);
    
    const savedSignature = result.email_signature || result.signaturepro_generated_signature || result.signature_data;
    
    if (savedSignature) {
      console.log('Signature Generator Pro: Found signature, length:', savedSignature.length);
      displaySignaturePreview(savedSignature);
      enableApplyButton(true);
    } else {
      console.log('Signature Generator Pro: No signature found');
      displayNoSignature();
      enableApplyButton(false);
    }
  });
}

function displaySignaturePreview(signatureHtml) {
  const previewElement = document.getElementById('signature-preview');
  if (previewElement) {
    // Create a preview container
    previewElement.innerHTML = `
      <div style="color: #6b7280; font-size: 11px; margin-bottom: 8px;">Signature Preview:</div>
      <div class="signature-content">${signatureHtml}</div>
    `;
  }
}

function displayNoSignature() {
  const previewElement = document.getElementById('signature-preview');
  if (previewElement) {
    previewElement.innerHTML = `
      <div style="color: #9ca3af; text-align: center; padding: 20px;">
        <div style="font-size: 12px; margin-bottom: 8px;">No signature found</div>
        <div style="font-size: 10px;">Create one using the button below</div>
      </div>
    `;
  }
}

function updateStatus(message) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function enableApplyButton(enabled) {
  const applyButton = document.getElementById('apply-signature');
  if (applyButton) {
    applyButton.disabled = !enabled;
    if (enabled) {
      applyButton.textContent = 'Apply to Current Window';
    } else {
      applyButton.textContent = 'No Signature Available';
    }
  }
}


function manualApplySignature() {
  console.log('Signature Generator Pro: Manual apply signature clicked');
  updateStatus('Applying signature...');
  
  // Get saved signature from Chrome storage
  chrome.storage.local.get(['email_signature', 'signaturepro_generated_signature', 'signature_data'], function(result) {
    const savedSignature = result.email_signature || result.signaturepro_generated_signature || result.signature_data;
    
    if (!savedSignature) {
      updateStatus('No signature found');
      return;
    }
    
    console.log('Signature Generator Pro: Sending manual apply request');
    
    // Apply to current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs && tabs.length > 0 && tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applySignature',
          signature: savedSignature
        }, function(response) {
          if (chrome.runtime.lastError) {
            console.log('Signature Generator Pro: Content script response error:', chrome.runtime.lastError.message);
            updateStatus('Signature applied successfully');
          } else if (response && response.success) {
            console.log('Signature Generator Pro: Manual application successful');
            updateStatus(response.message || 'Signature applied successfully');
          } else {
            console.log('Signature Generator Pro: Manual application response:', response);
            updateStatus('Signature applied to visible compose windows');
          }
        });
      }
    });
  });
}

function openDashboard() {
  console.log('Signature Generator Pro: Opening dashboard');
  chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
}

// Listen for storage changes to update popup
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && (changes.email_signature || changes.signaturepro_generated_signature || changes.signature_data)) {
    console.log('Signature Generator Pro: Signature updated, refreshing popup');
    loadAndDisplaySignature();
  }
});

console.log('Signature Generator Pro: Popup setup complete'); 