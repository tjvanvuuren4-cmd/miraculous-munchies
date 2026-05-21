# Email & WhatsApp Setup Guide

## 🚀 Quick Start

### 1. Install Nodemailer (when you have disk space)
```bash
npm install nodemailer
```

### 2. Get a Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to **App passwords** (bottom of security page)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password

### 3. Configure Environment Variables

Update `.env.local` with:
```
GMAIL_USER=miraculousmunchies1@gmail.com
GMAIL_PASSWORD=your_16_char_app_password_here
VITE_WHATSAPP_NUMBER=+27637114972
```

### 4. Set Up Vercel Deployment

When you're ready to deploy to Vercel:

```bash
npm install -g vercel
vercel link
```

Then set environment variables in Vercel dashboard:
- Go to Settings → Environment Variables
- Add:
  - `GMAIL_USER` = `miraculousmunchies1@gmail.com`
  - `GMAIL_PASSWORD` = `your_16_char_app_password`
  - `VITE_WHATSAPP_NUMBER` = `+27637114972`

### 5. Deploy

```bash
npm run build
vercel deploy
```

## 📧 Email Features

✅ **Order Notifications**: Automatic email to `miraculousmunchies1@gmail.com` when customers order
✅ **Order Confirmations**: Email sent to customer with payment details
✅ **Formatted Order Details**: Includes items, totals, delivery info

## 💬 WhatsApp Features

✅ **Floating Button**: Green WhatsApp button visible on all pages
✅ **Hero Section Button**: Quick WhatsApp link on home page
✅ **Pre-filled Message**: Opens WhatsApp with "Hi Miraculous Munchies! I'd like to place an order."
✅ **Mobile Friendly**: Works on all devices

## 🔧 Files Created/Modified

- `api/send-email.js` - Vercel serverless function for sending emails
- `src/api/emailService.js` - Frontend email integration
- `src/components/WhatsAppButton.jsx` - WhatsApp button component
- `src/components/FloatingWhatsApp.jsx` - Floating WhatsApp widget
- `.env.local` - Environment variables
- `vercel.json` - Vercel configuration

## ✨ Testing Locally

Emails will log to the browser console in development mode. They'll send for real once deployed to Vercel.

## 🆘 Troubleshooting

**Emails not sending?**
- Check `.env.local` has correct Gmail credentials
- Verify 2FA and App Password are set up correctly
- Check browser console for error messages

**WhatsApp button not working?**
- Ensure `VITE_WHATSAPP_NUMBER` is set correctly
- Open link on mobile to test WhatsApp integration

**Need to change WhatsApp number?**
- Update `.env.local` with new `VITE_WHATSAPP_NUMBER`
- Restart dev server with `npm run dev`
