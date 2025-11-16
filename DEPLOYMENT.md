# Deployment Guide

This guide walks you through deploying RoamSteady to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- Project pushed to a GitHub repository

## Initial Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `roamsteady` (or your preferred name)
2. Do NOT initialize with README, .gitignore, or license (since you already have these files)

### 2. Connect Local Repository to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/roamsteady.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Migrate from Lovable to GitHub"

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions**

### 4. Set Up Environment Secrets

Your Supabase credentials need to be stored as GitHub Secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add each of these:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon/public key
   - `VITE_SUPABASE_PROJECT_ID` - Your Supabase project ID

**Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

## Deployment Methods

### Option 1: Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment.

**How it works**:
- Every push to the `main` branch automatically triggers a build and deployment
- The workflow builds your app and deploys it to GitHub Pages
- Your site will be available at: `https://YOUR_USERNAME.github.io/roamsteady/`

**To deploy**:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The deployment will start automatically. You can monitor progress in the **Actions** tab on GitHub.

### Option 2: Manual Deployment

If you prefer manual deployment using gh-pages:

```bash
# Build and deploy
npm run deploy
```

**Note**: For this method to work, you need to:
1. Add `"homepage": "https://YOUR_USERNAME.github.io/roamsteady"` to `package.json`
2. Configure GitHub Pages to deploy from the `gh-pages` branch

## Verify Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Watch the deployment workflow complete
4. Once done, visit: `https://YOUR_USERNAME.github.io/roamsteady/`

## Troubleshooting

### Blank Page After Deployment

If you see a blank page:
- Check browser console for errors
- Verify the `base` setting in `vite.config.ts` is correct
- Ensure environment variables are set in GitHub Secrets

### Build Failures

If the GitHub Action fails:
- Check the Actions tab for error logs
- Verify all dependencies are in `package.json`
- Ensure environment secrets are properly configured

### Supabase Connection Issues

If the app can't connect to Supabase:
- Verify GitHub Secrets are set correctly
- Check Supabase project is active
- Verify CORS settings in Supabase dashboard allow your GitHub Pages domain

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

3. In GitHub repository settings:
   - Go to **Settings** > **Pages**
   - Enter your custom domain
   - Enable **Enforce HTTPS**

## Updating Your Site

To make changes and redeploy:

```bash
# Make your changes to the code
# ...

# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push to trigger automatic deployment
git push origin main
```

## Local Testing Before Deployment

Always test your build locally before deploying:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test the production build locally.

## Performance Optimization

The build currently shows a warning about large chunks. Consider:

1. **Code splitting**: Use React lazy loading for routes
   ```typescript
   const Home = lazy(() => import('./pages/Home'));
   ```

2. **Image optimization**: Compress images in `public/assets/`

3. **Manual chunks**: Configure in `vite.config.ts`:
   ```typescript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           vendor: ['react', 'react-dom', 'react-router-dom'],
           ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
         }
       }
     }
   }
   ```

## Support

For issues with:
- **GitHub Pages**: Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- **Vite**: Check [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- **Supabase**: Check [Supabase documentation](https://supabase.com/docs)
