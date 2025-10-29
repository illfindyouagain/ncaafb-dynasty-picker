# SEO & Analytics Setup Guide

## ✅ Completed Automatically
- ✅ Added comprehensive meta tags (SEO, Open Graph, Twitter)
- ✅ Created robots.txt
- ✅ Created sitemap.xml
- ✅ Added vercel.json for optimization
- ✅ Added Google Analytics placeholder

---

## 🔧 Manual Steps Required

### 1. **Google Analytics Setup**
1. Go to https://analytics.google.com
2. Create a new property for your site
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in `index.html` (line 38 & 42) with your actual ID

### 2. **Google Search Console**
1. Go to https://search.google.com/search-console
2. Add property: `https://liftoffgaming.com`
3. Verify ownership (use HTML tag method or DNS)
4. Submit sitemap: `https://liftoffgaming.com/sitemap.xml`
5. Request indexing for main pages

### 3. **Vercel Analytics (Recommended - Free)**
```bash
npm install @vercel/analytics
```

Then add to `src/main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> component inside root render
```

### 4. **Vercel Web Vitals (Optional)**
```bash
npm install @vercel/speed-insights
```

Then add to `src/main.jsx`:
```javascript
import { SpeedInsights } from '@vercel/speed-insights/react';
```

### 5. **Create OG Image**
- Create `public/og-image.png` (1200x630px recommended)
- Should showcase both Team Picker and Conference Builder
- Use brand colors (blue accent, neon green)
- Include text: "CFB Dynasty Tools"

### 6. **Create Favicon**
- Create `public/favicon.png` (32x32px or 512x512px)
- Use a football emoji or custom icon

---

## 📊 Vercel Dashboard Setup

### Environment Variables (if needed)
- `VITE_SUPABASE_URL` - Already set
- `VITE_SUPABASE_ANON_KEY` - Already set
- `VITE_GA_MEASUREMENT_ID` - Add your Google Analytics ID

### Analytics to Enable in Vercel:
1. **Vercel Analytics** - Free, built-in page views
2. **Speed Insights** - Free, Core Web Vitals tracking
3. **Audience** - See real-time visitors

---

## 🔍 SEO Checklist

### On-Page SEO (✅ Done)
- ✅ Title tags optimized
- ✅ Meta descriptions
- ✅ Canonical URLs
- ✅ Semantic HTML
- ✅ Mobile responsive
- ✅ Fast load times

### Technical SEO (✅ Done)
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Clean URLs
- ✅ HTTPS (via Vercel)
- ✅ Security headers

### Content SEO
- ✅ Unique, descriptive content
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Alt text for images (add football icon alts)
- ✅ Internal linking

### Off-Page SEO (Manual)
- Share on Reddit (r/NCAAFBseries, r/CFB)
- Post on Twitter/X with #CFB25 hashtag
- Submit to web directories
- Share on Discord servers

---

## 📈 Analytics You'll Track

### Google Analytics Will Show:
- Page views
- User sessions
- Bounce rate
- Traffic sources
- Popular pages
- User demographics

### Vercel Analytics Will Show:
- Real-time visitors
- Page load times
- Core Web Vitals scores
- Geographic distribution
- Device/browser breakdown

---

## 🚀 Post-Deployment Checklist

1. [ ] Deploy to Vercel
2. [ ] Set up Google Analytics (replace G-XXXXXXXXXX)
3. [ ] Add site to Google Search Console
4. [ ] Submit sitemap to Google
5. [ ] Install Vercel Analytics package
6. [ ] Create og-image.png
7. [ ] Create favicon.png
8. [ ] Test all meta tags with https://metatags.io
9. [ ] Test mobile responsiveness
10. [ ] Check page speed with PageSpeed Insights

---

## 📱 Social Sharing Preview

When someone shares your site, they'll see:
- **Title:** CFB Dynasty Tools - Team Picker & Conference Builder
- **Description:** Free CFB Dynasty toolkit with Team Picker and Conference Builder...
- **Image:** Your custom OG image (create this!)

Test with: https://www.opengraph.xyz/url/https%3A%2F%2Fliftoffgaming.com

---

## 💡 Quick Analytics Commands

### Install Vercel Analytics:
```bash
npm install @vercel/analytics
```

### Install Speed Insights:
```bash
npm install @vercel/speed-insights
```

### View Real-time Analytics:
Go to Vercel Dashboard → Your Project → Analytics

---

## 🎯 Keywords to Target

Primary:
- CFB dynasty mode
- college football team picker
- NCAA football dynasty
- CFB 25 dynasty
- custom conference builder

Long-tail:
- best teams for CFB dynasty mode
- how to pick dynasty team
- create custom CFB conference
- NCAA 14 dynasty team suggestions
- College Football 25 team picker

---

## Need Help?
- Google Analytics: https://support.google.com/analytics
- Search Console: https://support.google.com/webmasters
- Vercel Analytics: https://vercel.com/docs/analytics
