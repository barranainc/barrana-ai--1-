# Privacy Policy Deployment Instructions

**Date:** October 9, 2026  
**Status:** Ready for deployment to barrana.ai  
**PR:** https://github.com/barranainc/barrana-ai--1-/pull/34 (merged to main)

## What Was Completed

✅ Privacy Policy page created at `/privacy-policy`  
✅ `/privacy` redirect route added (redirects to `/privacy-policy`)  
✅ Privacy Policy link added to footer navigation  
✅ Page included in sitemap (170 URLs total)  
✅ All validation checks passed (TypeScript, build, SSG prerender)  
✅ Production build completed successfully (228 pages prerendered)  
✅ Changes merged to main branch  
✅ Deployment package created: `privacy-policy-deployment.tar.gz` (27 MB)

## Privacy Policy Content Summary

The privacy policy includes:
- **Business Details:** Barrana.ai, 50 Corstate Avenue Unit 01, Vaughan, ON L4K 4X2
- **Contact:** help@barrana.ai, +1 647 367 6771
- **PIPEDA Compliance:** Full compliance with Canadian privacy law
- **Data Collection:** Accurate documentation of contact form and automation planner data
- **Meta Pixel Disclosure:** Facebook Pixel ID 1757222568845282 and advertising practices
- **Cross-Border Storage:** Service providers outside Canada disclosure
- **User Rights:** Access, correction, deletion, withdrawal of consent
- **Last Updated:** October 8, 2026

## What Needs to Be Done (Manual Deployment to Hostinger)

### Option 1: Upload via Hostinger File Manager

1. Log in to Hostinger hPanel at https://hpanel.hostinger.com/
2. Navigate to Files → File Manager
3. Go to the public_html directory (or wherever barrana.ai is served from)
4. **IMPORTANT:** Create a backup of the current site before uploading
5. Upload the contents of `/workspace/dist/public/` to the web root:
   - Upload all files and directories from `dist/public/`
   - **Preserve the existing `.htaccess` file** (do not overwrite)
   - The new `privacy-policy/` directory should appear in the web root
   - The updated `sitemap.xml` should replace the existing one

### Option 2: Upload via FTP/SFTP

1. Connect to Hostinger via FTP/SFTP using your credentials:
   - Host: (available in Hostinger hPanel under FTP Accounts)
   - Username: (your FTP username)
   - Password: (your FTP password)
   - Port: 21 (FTP) or 22 (SFTP)
2. Navigate to the public_html directory (or the web root for barrana.ai)
3. **IMPORTANT:** Download and save a backup of the current site
4. Upload all files from `/workspace/dist/public/` to the web root
5. **Preserve the existing `.htaccess` file** (do not overwrite unless you want to update it)
6. Ensure the new `privacy-policy/` directory is uploaded

### Option 3: Extract the Deployment Archive

The deployment archive `privacy-policy-deployment.tar.gz` contains the complete built site.

1. Download the archive from this repository
2. Log in to Hostinger hPanel
3. Navigate to Files → File Manager → public_html
4. **IMPORTANT:** Back up the current site first
5. Extract the archive to the web root
6. **Check that `.htaccess` is preserved** (the archive includes it, but verify it matches your live config)

## Verification Steps (After Deployment)

After uploading the files, verify the deployment:

1. **Direct Load Test:** Visit https://barrana.ai/privacy-policy in an incognito/private browser window
   - Expected: HTTP 200 status
   - Expected: Page displays "Privacy Policy" heading
   - Expected: Contact details show help@barrana.ai, phone, and address

2. **Redirect Test:** Visit https://barrana.ai/privacy
   - Expected: Redirects to https://barrana.ai/privacy-policy

3. **Footer Link Test:** Visit https://barrana.ai
   - Expected: Footer shows "Privacy Policy" link between "Governance" and "Contact"
   - Expected: Clicking the link navigates to /privacy-policy

4. **Sitemap Test:** Visit https://barrana.ai/sitemap.xml
   - Expected: Contains `<loc>https://barrana.ai/privacy-policy</loc>`

5. **Homepage Test:** Visit https://barrana.ai
   - Expected: Homepage still works correctly
   - Expected: No console errors

## Important Notes

### Files to Preserve
- `.htaccess` - Contains important rewrite rules and security headers
- `meta-pixel.js` - Meta Pixel tracking script
- `robots.txt` - Search engine directives
- Any files not in the dist/public build (verification files, etc.)

### Cache Clearing
After deployment, you may need to clear Hostinger's cache:
1. In hPanel, go to Advanced → Clear Cache
2. Or use Cloudflare if configured (Purge Everything)
3. Clear your browser cache and test in incognito mode

### .htaccess Configuration
The built site includes the `.htaccess` file from `client/public/.htaccess`. It contains:
- HTTPS and non-www redirect
- Static route handling (each route is a directory with index.html)
- 404 error document configuration
- Security headers
- Cache control
- File protection rules

If your live site has custom `.htaccess` rules, merge them carefully.

## For Meta Ads Setup

Once the privacy policy is live at https://barrana.ai/privacy-policy:

1. Go to Meta Business Suite (business.facebook.com)
2. Navigate to Ad Account Settings
3. Add the Privacy Policy URL: `https://barrana.ai/privacy-policy`
4. For Lead Forms, add the Privacy Policy URL in the form settings
5. The policy complies with Meta's requirements for:
   - Data collection disclosure
   - Facebook Pixel usage
   - User rights information
   - Contact information

## Technical Details

- **Total Pages:** 228 prerendered HTML pages
- **Sitemap URLs:** 170 indexed URLs
- **Build Size:** ~27 MB compressed
- **New Route Priority:** 0.5 (standard for legal pages)
- **Change Frequency:** yearly (privacy policies change infrequently)

## Rollback Procedure

If there are any issues after deployment:

1. Restore the backup you created before deployment
2. Clear Hostinger cache
3. Verify the old site is working
4. Report the issue to the development team

## Support

If you encounter any issues during deployment:
- Review the deployment guide: `WEBSITE_CHANGES_AND_LIVE_DEPLOYMENT_GUIDE.md`
- Check Hostinger documentation: https://support.hostinger.com
- Contact: help@barrana.ai

---

**Deployment Status:** ⏳ Awaiting manual upload to Hostinger  
**Files Ready:** ✅ All production files built and verified  
**Next Action:** Upload dist/public/ contents to Hostinger web root
