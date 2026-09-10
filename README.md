# Sevenria Beauty Store

Sevenria Beauty is an e-commerce storefront for luxury skincare, cosmetics, and beauty essentials crafted with elegance.

## 🚀 Tech Stack

- **React 19** + **Vite**
- **Lucide React** (icons)
- **Vanilla CSS** with a custom luxury design system
- Optimized bundle splitting & fast HMR

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to Vercel

This repository is fully configured and ready for 1-click deployment to [Vercel](https://vercel.com).

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push this repository to your **GitHub**, **GitLab**, or **Bitbucket** account.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your `Sevenria-Beauty-Store` repository.
4. Vercel will automatically detect the settings from [`vercel.json`](file:///d:/Web%20Development/Sevenria-Beauty-Store/vercel.json):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your store will be live with full SPA client-side routing support and production caching!

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root directory:
   ```bash
   vercel
   ```

4. For production release:
   ```bash
   vercel --prod
   ```

---

## 📁 Key Files & Configuration for Vercel

- [`vercel.json`](file:///d:/Web%20Development/Sevenria-Beauty-Store/vercel.json): Handles SPA wildcard rewrites to `/index.html` (preventing 404s on direct page reloads), plus security & immutable asset caching headers.
- [`vite.config.js`](file:///d:/Web%20Development/Sevenria-Beauty-Store/vite.config.js): Optimized code-splitting configuration separating vendor and app bundles for high CDN cache hit rates.
- [`.gitignore`](file:///d:/Web%20Development/Sevenria-Beauty-Store/.gitignore): Configured to ignore `.vercel`, `.vite`, `dist`, and environment variables.