# Chrome Extension Setup Guide

## 🚀 Quick Start

### Step 1: Generate Icons
1. Open the `chrome-extension/icon-generator.html` file in your browser
2. Right-click each icon and save as PNG with the correct names:
   - `icon16.png` (16x16)
   - `icon32.png` (32x32) 
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)
3. Place all PNG files in the `chrome-extension/icons/` directory

### Step 2: Load the Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from this project
5. The extension should now appear in your extensions list

### Step 3: Test the Extension
1. Start your Nuxt development server:
   ```bash
   npm run dev
   ```
2. Go to `http://localhost:3000/dashboard`
3. Create a signature
4. Go to Gmail and compose a new email
5. Click the SignaturePro extension icon
6. Click "Apply Signature"

## 📁 Extension Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for email injection
├── background.js         # Background service worker
├── icons/                # Extension icons (PNG files)
├── icon-generator.html   # Icon generator tool
├── generate-icons.js     # Icon generation script
└── README.md            # Extension documentation
```

## 🔧 How It Works

### 1. Signature Creation
- Users create signatures in the web dashboard
- Signatures are stored in Chrome's local storage
- Extension reads signatures from storage

### 2. Signature Application
- Extension injects content script into Gmail/Yahoo
- Content script detects email composition areas
- Signature is inserted at cursor position or end of email

### 3. Communication Flow
```
Dashboard → Chrome Storage → Extension Popup → Content Script → Email Editor
```

## 🛠️ Development

### Making Changes
1. Edit files in `chrome-extension/`
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test changes

### Debugging
- Open Chrome DevTools on the extension popup
- Check console for content script messages
- Use `chrome://extensions/` to see extension errors

### Common Issues
- **Extension not loading**: Check manifest.json syntax
- **Icons not showing**: Ensure PNG files are in icons/ directory
- **Signature not applying**: Check if you're in compose mode in Gmail/Yahoo

## 📦 Publishing to Chrome Web Store

### 1. Prepare for Production
- Update URLs in extension to point to production domain
- Create production build of web app
- Test thoroughly

### 2. Package Extension
- Create a ZIP file of the `chrome-extension/` folder
- Ensure all files are included

### 3. Submit to Chrome Web Store
- Create developer account at Chrome Web Store
- Upload extension package
- Provide description, screenshots, and details
- Wait for review and approval

## 🔒 Security Considerations

- Extension only requests necessary permissions
- Content scripts only run on email domains
- No data is sent to external servers
- All signature data is stored locally

## 🎯 Features

- ✅ Beautiful signature templates
- ✅ Custom colors and fonts
- ✅ Profile photo and company logo support
- ✅ Social media links
- ✅ Gmail and Yahoo support
- ✅ Real-time signature preview
- ✅ Easy one-click application

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all files are properly loaded
3. Verify extension permissions are granted
4. Test on supported email clients only

## 🚀 Next Steps

1. **Test thoroughly** with different signature templates
2. **Add more email clients** (Yahoo Mail, etc.)
3. **Improve signature injection** for better compatibility
4. **Add signature management** (multiple signatures)
5. **Create Firefox/Safari versions** 