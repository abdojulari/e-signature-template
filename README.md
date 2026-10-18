# SignaturePro - Beautiful Email Signature Generator

A modern, responsive email signature generator built with Nuxt 4, Reka UI, and Tailwind CSS. Create stunning professional email signatures with glassmorphism effects and install them directly in your email clients.

## Features

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
- **Browser Extension Support**: Chrome extension for applying a signature in Gmail and Yahoo Mail
- **Export Options**: Copy HTML to clipboard or download as file
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Glassmorphism UI**: Modern, elegant interface with glass effects

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Reka UI
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon (Heroicons)
- **Authentication**: OAuth 2.0 (Gmail and Yahoo). Client secrets stay on the server.
- **QR Code Generation**: qrcode library for vCard contact sharing
- **State**: Vue composables and localStorage
- **TypeScript**: Full type safety

## Getting Started

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
   ```bash
   cp .env.example .env
   ```
   Fill in the OAuth values in `.env`. That file is gitignored. See `.env.example` for the variable names.

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Testing

There is no `pnpm test` script. Use these commands to install, run, and check the app.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

With the dev server running:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/dashboard
curl -s -X POST http://localhost:3000/api/auth/token \
  -H 'content-type: application/json' \
  -d '{}'
```

The home page and dashboard return `200`. The token route returns `400` with `Missing OAuth parameters` when the body is empty.

Production build and local preview:

```bash
pnpm build
pnpm preview
```

Static output used by the Netlify config:

```bash
pnpm generate
```

Regenerate Nuxt types (also runs after install):

```bash
pnpm exec nuxi prepare
```

The same scripts work with npm: `npm install`, `npm run dev`, `npm run build`, `npm run preview`, and `npm run generate`.

## OAuth Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set up OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
7. Copy the Client ID and Client Secret to your `.env` file

### Yahoo OAuth Setup

1. Create an app in the Yahoo Developer Network
2. Add the redirect URI used by the app (`https://signature-pro.ca/auth/callback` today)
3. Copy the Client ID and Client Secret to your `.env` file

## Browser Extension Setup

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

## Project Structure

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
│   ├── icons/                      # Extension icons
│   └── popup-vue-compatible.html   # Extension popup UI
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── templates/                  # Template assets
│       ├── creative-preview.svg
│       └── generate-previews.html
├── modules/                        # Nuxt modules
│   └── @nuxt/
│       └── ui.ts                   # Nuxt UI module configuration
├── server/
│   └── api/auth/token.post.ts      # Server-side OAuth code exchange
├── .env.example                    # Environment variable template
├── LICENSE                         # MIT License
├── nuxt.config.ts                  # Nuxt configuration
├── package.json                    # Dependencies & scripts
├── pnpm-lock.yaml                  # Package lock file
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Available Templates

1. **Minimal**: Clean and simple design
2. **Professional**: Corporate and business-ready
3. **Creative**: Bold and artistic design
4. **Glassmorphism**: Modern glass effect design
5. **Modern**: Contemporary and sleek
6. **Elegant**: Sophisticated and refined

## QR Code Integration

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

## Customization

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

## Usage Guide

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

## Deployment

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

## Security Considerations

- **OAuth Tokens**: Store securely, never expose in client-side code
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure properly for cross-origin requests
- **Input Validation**: Validate all user inputs
- **File Uploads**: Implement proper file type and size validation
- **Rate Limiting**: Implement API rate limiting

## Contributing

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

## Acknowledgments

- [Nuxt 4](https://nuxt.com/) - The Vue framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Reka UI](https://reka-ui.com/) - Beautiful UI components
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## Support

For support and questions, open an issue in the project repository.

## TODO

Missing or incomplete behavior in the current app:

- [ ] Firefox, Safari, and Edge extensions. Those install paths only show a coming-soon message.
- [ ] Chrome extension wiring. The app checks a hardcoded extension ID that does not match the Chrome Web Store listing, and the in-app instructions still say the extension is in development.
- [ ] One extension package. `chrome-extension` and `signature-pro-extension` duplicate each other.
- [ ] OAuth on the static Netlify deploy. Token exchange now runs in `server/api/auth/token.post.ts` so client secrets are not shipped to the browser. The Netlify build uses a static Nitro preset, so that route is not available in production until the host runs a server or a function.
- [ ] Yahoo local sign-in. The Yahoo redirect URI is fixed to `https://signature-pro.ca/auth/callback`.
- [ ] A real error when OAuth fails. The callback still signs in a demo user.
- [ ] Microsoft / Outlook sign-in.
- [ ] Terms of Service and Privacy Policy pages. The landing-page links are placeholders.
- [ ] Account storage for signatures. Data is kept in `localStorage` only.
- [ ] Home phone field. The form has mobile and office numbers only.
- [ ] Automated tests. There is no test runner and no `pnpm test` script.
- [ ] Pinia and PWA support. Earlier docs listed both; neither is installed.

## Test coverage

Nothing in the app is covered by automated tests. Add a runner, then cover these paths:

- [ ] `useValidation`: required email, invalid email, email length limits, optional empty phone, phone too short, phone too long, valid phone, optional empty website, and invalid website URL.
- [ ] `useSignatureGenerator`: each template renders the entered name, email, and phones; empty fields fall back to `example.com` placeholders; the vCard QR payload includes name, email, phones, and website.
- [ ] `useSignatureStorage`: save and reload signature data, and discard corrupt `localStorage` JSON.
- [ ] `useAuth`: Gmail and Yahoo sign-in URLs, a successful callback, and a failed callback. The client bundle must not contain the client secret.
- [ ] `server/api/auth/token.post.ts`: empty body returns 400, an unknown provider returns 400, missing OAuth env returns 500, and a successful exchange returns only an access token.
- [ ] Landing page: Gmail and Yahoo buttons render, and Terms and Privacy links are present.
- [ ] Dashboard: signed-out visitors go home; the form blocks a missing name or email; copy and download use the generated HTML.
- [ ] `useBrowserExtension`: Chrome reports its install state; Firefox, Safari, and Edge show the coming-soon path.
- [ ] `useDarkMode`: the saved theme is applied on load and toggles persist.

## License

MIT License

Copyright (c) 2026 SignaturePro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
