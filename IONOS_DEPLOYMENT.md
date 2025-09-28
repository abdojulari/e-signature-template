# Deploying SignaturePro to signature-pro.ca with IONOS

This guide covers deploying your SignaturePro application to your custom domain `signature-pro.ca` using IONOS.

## Option 1: IONOS Deploy Now (Recommended)

### Prerequisites
- IONOS account with `signature-pro.ca` domain
- GitHub repository with your code
- Repository pushed to GitHub

### Step-by-Step Deployment

1. **Access IONOS Deploy Now**
   - Log into your IONOS account
   - Navigate to "Websites & Shops" → "Deploy Now"
   - Click "Create new project"

2. **Connect GitHub Repository**
   - Click "Deploy from GitHub"
   - Authorize IONOS GitHub app
   - Select your SignaturePro repository
   - Choose the `main` branch

3. **Configure Build Settings**
   ```
   Framework: Static Site
   Build command: pnpm run generate
   Output directory: .output/public
   Node.js version: 18
   ```

4. **Deploy**
   - Click "Deploy project"
   - Wait for the build to complete
   - Your site will be available at a temporary URL

5. **Connect Your Domain**
   - In the project dashboard, click "Connect domain"
   - Select `signature-pro.ca` from your domains
   - IONOS will automatically configure DNS
   - SSL certificate will be provisioned automatically

### Build Configuration
Your project is already configured with the correct build settings in `package.json` and `nuxt.config.ts`.

---

## Option 2: Netlify + IONOS DNS

### Step 1: Deploy to Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Site**
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build settings (auto-detected from netlify.toml):
     - Build command: `pnpm run generate`
     - Publish directory: `.output/public`
   - Click "Deploy site"

3. **Note Your Netlify URL**
   - After deployment, note your site URL (e.g., `amazing-app-123456.netlify.app`)

### Step 2: Configure IONOS DNS

1. **Access DNS Settings**
   - Log into IONOS account
   - Go to "Domains & SSL" → "signature-pro.ca"
   - Click "DNS" settings

2. **Add DNS Records**
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: [your-netlify-site].netlify.app
   TTL: 3600
   ```

   **For root domain:**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 3600
   ```

   **Additional A records for redundancy:**
   ```
   Type: A
   Name: @
   Value: 99.83.190.102
   TTL: 3600
   ```

3. **Save DNS Changes**
   - DNS propagation can take 24-48 hours

### Step 3: Configure Netlify Domain

1. **Add Custom Domain**
   - In Netlify dashboard → Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `signature-pro.ca`
   - Click "Verify"

2. **Configure HTTPS**
   - Netlify will automatically provision SSL certificate
   - Enable "Force HTTPS redirect"

3. **Set Primary Domain**
   - Choose whether `signature-pro.ca` or `www.signature-pro.ca` is primary
   - Set up redirect from the other

---

## Comparison: IONOS Deploy Now vs Netlify

### IONOS Deploy Now
✅ **Pros:**
- Integrated with your domain registrar
- Automatic DNS configuration
- No need to manage DNS records
- Direct billing integration

❌ **Cons:**
- Fewer deployment features
- Less advanced build pipeline
- Limited analytics and monitoring

### Netlify + IONOS DNS
✅ **Pros:**
- Advanced deployment features
- Branch previews
- Form handling
- Edge functions
- Better analytics
- Faster global CDN

❌ **Cons:**
- Manual DNS configuration required
- Separate platform to manage

---

## Recommended Approach

**For simplicity**: Use IONOS Deploy Now
**For advanced features**: Use Netlify + IONOS DNS

Both options will work perfectly with your SignaturePro application!

## Post-Deployment Checklist

After deployment:
- [ ] Test `https://signature-pro.ca`
- [ ] Test `https://www.signature-pro.ca`
- [ ] Verify all signature templates load
- [ ] Test signature generation and copy functionality
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate is active
- [ ] Test all dialog components (QR code, social media, etc.)

## Troubleshooting

### DNS Issues
- Use [DNS Checker](https://dnschecker.org) to verify propagation
- Wait 24-48 hours for full DNS propagation
- Clear browser cache

### Build Issues
- Check build logs in deployment platform
- Verify Node.js version is 18
- Ensure all dependencies are in package.json

### SSL Issues
- Wait for automatic SSL provisioning (can take up to 24 hours)
- Verify DNS is pointing correctly
- Contact support if SSL doesn't provision automatically

Your SignaturePro application is ready for production deployment! 🚀
