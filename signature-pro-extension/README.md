# SignaturePro Chrome Extension

A Chrome extension that automatically applies beautiful email signatures to Gmail and Yahoo.

## Installation

### Development Mode (Recommended for testing)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select the `chrome-extension` folder from this project
4. The extension will be installed and appear in your extensions list

### Production Mode (When published to Chrome Web Store)

1. The extension will be available on the Chrome Web Store
2. Click "Add to Chrome" to install
3. Follow the setup instructions

## Usage

1. **Create Your Signature**:
   - Open the SignaturePro dashboard at `http://localhost:3000/dashboard`
   - Design your signature with templates, colors, and your information
   - Click "Generate Signature" to create your signature

2. **Apply Signature**:
   - Go to Gmail or Yahoo
   - Compose a new email
   - Click the SignaturePro extension icon in your browser toolbar
   - Click "Apply Signature" to insert your signature into the email

3. **Features**:
   - Beautiful signature templates
   - Custom colors and fonts
   - Profile photo and company logo support
   - Social media links
   - Works with Gmail and Yahoo

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for email injection
├── background.js         # Background service worker
├── icons/                # Extension icons
└── README.md            # This file
```

## Development

### Testing the Extension

1. Start your Nuxt development server:
   ```bash
   npm run dev
   ```

2. Load the extension in Chrome as described above

3. Create a signature in the dashboard

4. Test the extension by:
   - Going to Gmail and composing a new email
   - Clicking the extension icon
   - Clicking "Apply Signature"

### Making Changes

- Edit the files in the `chrome-extension/` directory
- Reload the extension in `chrome://extensions/` by clicking the refresh icon
- Test your changes

### Publishing to Chrome Web Store

1. Create a production build of your web app
2. Update the extension URLs to point to your production domain
3. Package the extension
4. Submit to the Chrome Web Store

## Troubleshooting

- **Extension not working**: Make sure the extension is loaded and enabled
- **Signature not appearing**: Check that you're in compose mode in Gmail/Yahoo
- **Dashboard not loading**: Ensure your Nuxt development server is running

## Support

For issues or questions, check the console for error messages and ensure all files are properly loaded. 