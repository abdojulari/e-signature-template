# Netlify Deployment Guide

This guide will walk you through deploying your SignaturePro application to Netlify.

## Prerequisites

- A Netlify account (free at [netlify.com](https://netlify.com))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to your Netlify dashboard
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure build settings**
   - Build command: `pnpm run generate`
   - Publish directory: `.output/public`
   - Node version: `18` (set in Environment Variables)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at a random Netlify URL

### Option 2: Manual Deploy

1. **Build the project locally**
   ```bash
   pnpm install
   pnpm run generate
   ```

2. **Deploy to Netlify**
   - Go to your Netlify dashboard
   - Drag and drop the `.output/public` folder to the deploy area
   - Your site will be deployed instantly

## Environment Variables (Optional)

If you plan to use OAuth features in the future, you can set these in Netlify:

1. Go to Site settings → Environment variables
2. Add the following variables:
   - `GMAIL_CLIENT_ID`: Your Gmail OAuth client ID
   - `GMAIL_CLIENT_SECRET`: Your Gmail OAuth client secret
   - `YAHOO_CLIENT_ID`: Your Yahoo OAuth client ID
   - `YAHOO_CLIENT_SECRET`: Your Yahoo OAuth client secret

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

## Build Configuration

The project includes a `netlify.toml` file with the following configuration:

```toml
[build]
  publish = ".output/public"
  command = "pnpm run generate"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `pnpm install`
- Verify the build works locally: `pnpm run generate`
- Check Netlify build logs for specific error messages

### 404 Errors on Page Refresh
- The `netlify.toml` file includes redirects to handle SPA routing
- Make sure the file is in your repository root

### Slow Build Times
- Consider using Netlify's build cache
- Optimize your dependencies and remove unused packages

## Performance Optimization

Your site is already optimized for static hosting with:
- ✅ Static site generation enabled
- ✅ Client-side rendering for dynamic features
- ✅ Optimized build output
- ✅ Automatic code splitting
- ✅ Asset optimization

## Post-Deployment

After deployment:
1. Test all features of your signature generator
2. Verify that all templates load correctly
3. Test the signature preview and copy functionality
4. Check that all styling and animations work properly

## Continuous Deployment

With Git-based deployment, Netlify will automatically:
- Build and deploy when you push to your main branch
- Provide deploy previews for pull requests
- Show build status and logs

Your SignaturePro application is now ready for production use! 🎉
