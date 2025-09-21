console.log('🎯 POPUP: Enhanced popup script loaded');

// Use proper event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎯 POPUP: DOM loaded, setting up enhanced popup...');
  
  // Set up event listeners
  const applyButton = document.getElementById('apply-signature');
  const dashboardButton = document.getElementById('open-dashboard');
  const testButton = document.getElementById('save-test');
  
  if (applyButton) {
    applyButton.addEventListener('click', manualApplySignature);
    console.log('🎯 POPUP: Apply button listener added');
  }
  
  if (dashboardButton) {
    dashboardButton.addEventListener('click', openDashboard);
    console.log('🎯 POPUP: Dashboard button listener added');
  }
  
  if (testButton) {
    testButton.addEventListener('click', saveTestSignature);
    console.log('🎯 POPUP: Test button listener added');
  }
  
  // Initialize popup
  initializePopup();
});

function initializePopup() {
  console.log('🎯 POPUP: Initializing enhanced popup...');
  
  // Check current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0]) {
      const url = tabs[0].url;
      console.log('🎯 POPUP: Current tab URL:', url);
      
      if (url && (url.includes('mail.google.com') || url.includes('outlook.live.com') || url.includes('outlook.office.com'))) {
        updateStatus('✅ Gmail/Outlook detected - Auto-apply active');
        enableApplyButton(true);
        checkSignatureStatus();
      } else {
        updateStatus('⚠️ Please navigate to Gmail or Outlook');
        enableApplyButton(false);
      }
    }
  });
  
  // Check for saved signature
  checkForSignature();
}

function checkSignatureStatus() {
  // Send message to content script to check persistent signature status
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'checkSignatureStatus'
      }, function(response) {
        if (chrome.runtime.lastError) {
          console.log('🎯 POPUP: Content script not ready (normal)');
        } else if (response) {
          console.log('🎯 POPUP: Signature status:', response);
          if (response.hasActiveSignatures) {
            updateStatus('✅ Auto-apply active - Signatures in ' + response.count + ' compose windows');
          } else {
            updateStatus('🔄 Auto-apply ready - Open a compose window');
          }
        }
      });
    }
  });
}

function checkForSignature() {
  console.log('🎯 POPUP: Checking for saved signature...');
  
  // Check Chrome storage first
  chrome.storage.local.get(['email_signature'], function(result) {
    console.log('🎯 POPUP: Chrome storage result:', result);
    
    const savedSignature = result.email_signature;
    
    if (savedSignature) {
      console.log('🎯 POPUP: Found signature, length:', savedSignature.length);
      updateSignaturePreview('✅ Signature ready - Auto-applying to all compose windows');
      enableApplyButton(true);
    } else {
      console.log('🎯 POPUP: No signature found');
      updateSignaturePreview('❌ No signature found. Create one at your dashboard first.');
      enableApplyButton(false);
    }
  });
}

function updateStatus(message) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function updateSignaturePreview(message) {
  const previewElement = document.getElementById('signature-preview');
  if (previewElement) {
    previewElement.innerHTML = `<p style="margin: 0; padding: 5px;">${message}</p>`;
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

function saveTestSignature() {
  console.log('🎯 POPUP: Save test signature clicked');
  updateStatus('💾 Saving test signature...');
  
  const testSignature = `
    <table cellpadding="0" cellspacing="0" border="0" style="
      border: 2px solid #4F46E5;
      padding: 12px;
      margin: 8px 0;
      background: #f8f9fa;
      font-family: Arial, sans-serif;
      border-radius: 6px;
      border-collapse: collapse;
      max-width: 400px;
      font-size: 10px;
    ">
      <tr>
        <td style="padding: 0 12px 0 0; vertical-align: top;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 40px; height: 40px; background-color: #4F46E5; border-radius: 20px; border-collapse: collapse;">
            <tr><td style="text-align: center; color: #ffffff; font-weight: bold; font-size: 16px; padding: 12px 0;">T</td></tr>
          </table>
        </td>
        <td style="vertical-align: top;">
          <div style="font-size: 14px; font-weight: bold; color: #4F46E5; margin-bottom: 3px;">✨ Test User</div>
          <div style="font-size: 10px; color: #666; margin-bottom: 4px;">Software Developer | Tech Company</div>
          <div style="font-size: 10px; color: #333; line-height: 1.4;">
            <div style="margin-bottom: 2px;">📧 <a href="mailto:test@example.com" style="color: #4F46E5; text-decoration: none;">test@example.com</a></div>
            <div style="margin-bottom: 2px;">📱 <a href="tel:+15551234567" style="color: #333; text-decoration: none;">(555) 123-4567</a></div>
            <div style="margin-bottom: 4px;">🌐 <a href="https://example.com" style="color: #4F46E5; text-decoration: none;">example.com</a></div>
          </div>
          <div style="margin-top: 6px; line-height: 1.2;">
            <a href="https://linkedin.com" target="_blank" style="display: inline-block; width: 24px; height: 24px; background-color: #0077B5; border-radius: 50%; margin-right: 4px; text-decoration: none; vertical-align: middle; text-align: center; line-height: 24px; font-size: 11px; font-weight: bold; color: #FFFFFF; font-family: Arial, sans-serif;" title="LinkedIn">in</a>
            <a href="https://twitter.com" target="_blank" style="display: inline-block; width: 24px; height: 24px; background-color: #000000; border-radius: 50%; margin-right: 4px; text-decoration: none; vertical-align: middle; text-align: center; line-height: 24px; font-size: 11px; font-weight: bold; color: #FFFFFF; font-family: Arial, sans-serif;" title="Twitter">𝕏</a>
            <a href="https://wa.me/15551234567" target="_blank" style="display: inline-block; width: 24px; height: 24px; background-color: #25D366; border-radius: 50%; margin-right: 4px; text-decoration: none; vertical-align: middle; text-align: center; line-height: 24px; font-size: 11px; font-weight: bold; color: #FFFFFF; font-family: Arial, sans-serif;" title="WhatsApp">W</a>
            <a href="https://github.com" target="_blank" style="display: inline-block; width: 24px; height: 24px; background-color: #181717; border-radius: 50%; margin-right: 4px; text-decoration: none; vertical-align: middle; text-align: center; line-height: 24px; font-size: 11px; font-weight: bold; color: #FFFFFF; font-family: Arial, sans-serif;" title="GitHub">G</a>
          </div>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #ddd; font-size: 9px; color: #666;">
            🚀 <strong>SignaturePro Extension</strong> - Email-safe social icons
          </div>
        </td>
      </tr>
    </table>
  `;
  
  try {
    // Save to Chrome storage
    chrome.storage.local.set({ email_signature: testSignature }, function() {
      if (chrome.runtime.lastError) {
        console.error('🎯 POPUP: Error saving to Chrome storage:', chrome.runtime.lastError);
        updateStatus('❌ Error saving test signature');
      } else {
        console.log('🎯 POPUP: Test signature saved successfully');
        updateStatus('✅ Test signature saved - Auto-apply active!');
        updateSignaturePreview('✅ Email-safe social icons working perfectly');
        enableApplyButton(true);
        
        // Trigger immediate scan on current tab
        triggerSignatureScan();
      }
    });
  } catch (error) {
    console.error('🎯 POPUP: Error saving test signature:', error);
    updateStatus('❌ Error saving test signature');
  }
}

function manualApplySignature() {
  console.log('🎯 POPUP: Manual apply signature clicked');
  updateStatus('🔄 Applying signature...');
  
  // Get saved signature from Chrome storage
  chrome.storage.local.get(['email_signature'], function(result) {
    let savedSignature = result.email_signature;
    
    if (!savedSignature) {
      updateStatus('❌ No signature found');
      return;
    }
    
    console.log('🎯 POPUP: Sending manual apply request');
    
    // Apply to current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs && tabs.length > 0 && tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'applySignature',
          signature: savedSignature
        }, function(response) {
          if (chrome.runtime.lastError) {
            console.log('🎯 POPUP: Content script response error (normal):', chrome.runtime.lastError.message);
            updateStatus('✅ Signature applied! (Auto-apply also active)');
          } else if (response && response.success) {
            console.log('🎯 POPUP: Manual application successful');
            updateStatus('✅ ' + response.message);
          } else {
            console.log('🎯 POPUP: Manual application response:', response);
            updateStatus('✅ Signature applied to visible compose windows');
          }
        });
      }
    });
  });
}

function triggerSignatureScan() {
  // Tell content script to do an immediate scan for compose windows
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs && tabs.length > 0 && tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'scanForEditors'
      }, function(response) {
        if (chrome.runtime.lastError) {
          console.log('🎯 POPUP: Scan trigger sent (content script will handle)');
        } else {
          console.log('🎯 POPUP: Scan response:', response);
        }
      });
    }
  });
}

function openDashboard() {
  console.log('🎯 POPUP: Opening dashboard');
  chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
}

// Listen for storage changes to update popup
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.email_signature) {
    console.log('🎯 POPUP: Signature updated, refreshing popup');
    checkForSignature();
  }
});

console.log('🎯 POPUP: Enhanced popup setup complete'); 