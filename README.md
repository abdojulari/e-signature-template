# SignaturePro - Beautiful Email Signature Generator

A modern, responsive email signature generator built with Nuxt 4, Reka UI, and Tailwind CSS. Create stunning professional email signatures with glassmorphism effects and install them directly in your email clients.

## ✨ Features

- **Beautiful Templates**: 12 professionally designed templates including glassmorphism effects and premium executive designs
- **OAuth Authentication**: Sign in with Gmail or Yahoo accounts
- **Real-time Preview**: See your signature as you design it
- **Customization Options**: 
  - Multiple color schemes
  - Font family and size selection
  - Primary and secondary colors for gradients
- **Comprehensive Form Fields**:
  - Personal information (name, job title, company)
  - Multiple phone numbers (mobile, home, office)
  - Website and email addresses
  - Social media links (LinkedIn, Twitter/X, Facebook, Instagram, YouTube, TikTok, WhatsApp, and more)
  - Profile photo and company logo uploads
  - **QR Code Integration**: Generate scannable vCard QR codes for instant contact sharing
- **Browser Extension Support**: Install extensions for Chrome, Firefox, Safari, and Edge
- **Export Options**: Copy HTML to clipboard or download as file
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Glassmorphism UI**: Modern, elegant interface with glass effects

## 🛠️ Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Reka UI
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon (Heroicons)
- **Authentication**: OAuth 2.0 (Gmail & Yahoo)
- **QR Code Generation**: qrcode library for vCard contact sharing
- **State Management**: Pinia
- **TypeScript**: Full type safety
- **PWA Support**: Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-signature-template
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GMAIL_CLIENT_ID=your_gmail_client_id
   Yahoo_CLIENT_ID=your_Yahoo_client_id
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 OAuth Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set up OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
7. Copy the Client ID to your `.env` file

### Microsoft OAuth Setup

1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application
3. Add redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
4. Copy the Application (client) ID to your `.env` file

## 🌐 Browser Extension Setup

### Chrome Extension

1. Create a new directory for your extension
2. Create `manifest.json`:
   ```json
   {
     "manifest_version": 3,
     "name": "SignaturePro",
     "version": "1.0",
     "description": "Email signature manager",
     "permissions": ["activeTab", "storage"],
     "action": {
       "default_popup": "popup.html"
     },
     "content_scripts": [
       {
         "matches": ["*://mail.google.com/*", "*://Yahoo.live.com/*"],
         "js": ["content.js"]
       }
     ]
   }
   ```

3. Create `popup.html` and `content.js` for extension functionality
4. Load the extension in Chrome Developer Mode

### Firefox Extension

1. Create `manifest.json` with Firefox-specific permissions
2. Package the extension for Firefox Add-ons

### Safari Extension

1. Create an Xcode project for Safari App Extension
2. Implement the extension using Swift/Objective-C
3. Submit to Mac App Store

## 📁 Project Structure

```
e-signature-template/
├── app/                            # Main application directory
│   ├── app.vue                     # Root Vue component
│   ├── assets/
│   │   └── css/
│   │       └── styles.css          # Main styles with Tailwind
│   ├── components/                 # Vue components
│   │   ├── DesignYourSignature.vue # Template & style customization
│   │   ├── Footer.vue              # Footer component
│   │   ├── Header.vue              # Header component
│   │   ├── SignaturePreviewDialog.vue # Signature preview & export
│   │   ├── YourInformation.vue     # Contact info form with QR code
│   │   └── dialogs/                # Modal dialogs
│   │       ├── ColorSettingsDialog.vue
│   │       ├── FontSettingsDialog.vue
│   │       ├── GeneralStylesDialog.vue
│   │       └── SocialIconsDialog.vue
│   ├── composables/                # Vue composables
│   │   ├── useAuth.ts              # Authentication logic
│   │   ├── useBrowserExtension.ts  # Chrome extension integration
│   │   └── useSignatureGenerator.ts # Signature & QR code generation
│   ├── layouts/
│   │   └── default.vue             # Default page layout
│   ├── pages/                      # Application pages
│   │   ├── index.vue               # Landing page
│   │   ├── dashboard.vue           # Main signature builder
│   │   └── auth/
│   │       └── callback.vue        # OAuth callback handler
│   ├── services/                   # API services (empty)
│   └── utils/                      # Utility functions (empty)
├── chrome-extension/               # Chrome extension files
│   ├── background.js               # Service worker
│   ├── content-dashboard.js        # Content script for dashboard
│   ├── content-working.js          # Content script for email clients
│   ├── manifest.json               # Extension manifest
│   ├── popup.js                    # Extension popup logic
│   ├── popup-vue-compatible.html   # Extension popup UI
│   ├── icons/                      # Extension icons
│   └── README.md                   # Extension documentation
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── templates/                  # Template assets
│       ├── creative-preview.svg
│       ├── generate-previews.html
│       └── README.md
├── modules/                        # Nuxt modules
│   └── @nuxt/
│       └── ui.ts                   # Nuxt UI module configuration
├── CHROME_EXTENSION_SETUP.md       # Extension setup guide
├── extension-manifest-example.json # Example manifest
├── LICENSE                         # MIT License
├── nuxt.config.ts                  # Nuxt configuration
├── package.json                    # Dependencies & scripts
├── pnpm-lock.yaml                  # Package lock file
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 🎨 Available Templates

1. **Minimal**: Clean and simple design
2. **Professional**: Corporate and business-ready
3. **Creative**: Bold and artistic design
4. **Glassmorphism**: Modern glass effect design
5. **Modern**: Contemporary and sleek
6. **Elegant**: Sophisticated and refined

## 📱 QR Code Integration

### Features
- **vCard QR Codes**: Generate scannable QR codes containing your contact information
- **Universal Compatibility**: Works with any smartphone camera or QR code scanner
- **Automatic Generation**: QR codes update automatically when contact info changes
- **Email-Safe**: Embedded as base64 data URLs for maximum email client compatibility

### What's Included in QR Code
- Full name (first, middle, last)
- Job title and company name
- Email address
- Phone numbers (mobile, home, office)
- Website URL

### How to Use
1. Fill in your contact information in the form
2. Check "Include QR Code for Contact Info" checkbox
3. QR code appears in the signature preview
4. Recipients can scan to instantly save your contact details

### Technical Implementation
- Uses industry-standard vCard format
- Generated with `qrcode` library
- Optimally sized (60-80px) for email signatures
- Positioned strategically in each template design

## 🔧 Customization

### Adding New Templates

1. Add template data to `useSignatureGenerator.ts`
2. Create template generation function
3. Add to the `generateSignature` switch statement

### Adding Social Networks

1. Add network data to `socialNetworks` array
2. Update icon mapping in `getSocialIcon` function

### Styling Customization

- Modify `app/assets/css/styles.css` for global styles
- Update Tailwind classes in components
- Customize glassmorphism effects

## 📱 Usage Guide

### Creating a Signature

1. **Sign In**: Use Gmail or Yahoo account
2. **Choose Template**: Select from available designs
3. **Customize Colors**: Pick primary and secondary colors
4. **Fill Information**: Enter personal and company details
5. **Add Social Media**: Select and link social networks
6. **Upload Images**: Add profile photo and company logo
7. **Preview**: See real-time signature preview
8. **Export**: Copy HTML or download file
9. **Install**: Use browser extension for automatic application

### Installing Browser Extension

1. Click "Install Extension" button
2. Follow browser-specific instructions
3. Grant necessary permissions
4. Navigate to your email client
5. Click extension icon to apply signature

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify Deployment

1. Connect repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `.output/public`
4. Configure environment variables

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security Considerations

- **OAuth Tokens**: Store securely, never expose in client-side code
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure properly for cross-origin requests
- **Input Validation**: Validate all user inputs
- **File Uploads**: Implement proper file type and size validation
- **Rate Limiting**: Implement API rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Vue 3 Composition API
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt 4](https://nuxt.com/) - The Vue framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Reka UI](https://reka-ui.com/) - Beautiful UI components
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@signaturepro.com
- Documentation: [docs.signaturepro.com](https://docs.signaturepro.com)

---

Made with ❤️ by the SignaturePro team | Abdul Ojulari
