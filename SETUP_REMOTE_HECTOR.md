# 🐱 Remote Hector Setup - Simple Steps

## What This Does:
You'll be able to trigger Hector's blessing from ANYWHERE by just putting a timestamp in cell N2 of your Google Sheet!

---

## Step-by-Step Setup (10 minutes):

### 1. Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM/edit

### 2. Open Apps Script
- Click: **Extensions** → **Apps Script**
- You'll see a code editor open in a new tab

### 3. Clear & Paste Code
- **Delete** any code that's already there
- Open the file `APPS_SCRIPT.js` in your project folder
- **Copy ALL the code** from that file
- **Paste** it into the Apps Script editor

### 4. Save It
- Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`

### 5. Deploy as Web App
- Click the blue **Deploy** button (top right)
- Choose: **New deployment**
- Click the gear icon (⚙️) next to "Select type"
- Choose: **Web app**

### 6. Configure Deployment
- **Description**: "Hector Blessing Control" (or anything you want)
- **Execute as**: **Me** (your account)
- **Who has access**: **Anyone**
- Click **Deploy**

### 7. Authorize
- You'll get a warning "Google hasn't verified this app"
- Click **Advanced** → **Go to [Your Project Name] (unsafe)**
- Click **Allow**
- This is normal! You're authorizing your own script.

### 8. Copy the Web App URL
- After deploying, you'll see a **Web app URL**
- It looks like: `https://script.google.com/macros/s/AKfycbx.../exec`
- **COPY THIS URL** (the whole thing!)

### 9. Update script.js
- Open `script.js` in your project
- Find line 10: `const APPS_SCRIPT_URL = '';`
- Paste your URL between the quotes:
  ```javascript
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
  ```
- **Save the file**

### 10. Push to GitHub
```bash
git add -A
git commit -m "Connect remote Hector blessing control"
git push
```

---

## 🎯 How to Use It:

### Method 1: Via Google Sheet (Remote Control!)
1. Open your Google Sheet
2. Go to cell **N2**
3. Type any timestamp (e.g., `1729612345678`) OR just put anything to trigger it
4. Within 5 seconds, Hector will appear on Ellie's phone! 🎉

**Pro Tip**: You can leave N2 empty normally. When you want to trigger it, just put ANY number in there!

### Method 2: Via Admin Panel
1. Open admin mode (3 taps on ⚙️, PIN 1234)
2. Click **"Summon Hector Now"**
3. If Apps Script is setup, it writes to N2 and appears on ALL devices!

### Method 3: Via PIN 9999
1. Tap ⚙️ three times
2. Enter PIN: **9999**
3. Hector appears immediately!

---

## ✅ Testing:

1. **Set it up** (follow steps above)
2. **Open the site on your phone**
3. **Open the site on another device** (or another tab)
4. **Put a timestamp in cell N2**: `1729612345678`
5. **Watch both devices** - Hector should appear within 5 seconds on both! 🎯

---

## 🚨 Troubleshooting:

**"Apps Script URL not set" in console?**
- Make sure you pasted the URL in script.js line 10
- Make sure you pushed to GitHub after updating

**Hector not appearing?**
- Check browser console (F12) for errors
- Make sure cell N2 has a valid number (timestamp format)
- Try a different number each time (must be > previous number)

**"Failed to fetch" error?**
- Make sure you deployed as "Anyone" can access
- Try redeploying and copying the NEW URL

---

## 📊 What Gets Written to N2:

When you trigger via PIN 9999 or admin panel, it writes a timestamp like:
```
1729612345678
```

This is just the current time in milliseconds. Each device checks N2 every 5 seconds, and if the number is NEWER than the last check, Hector appears! 🐱✨

---

## 🎉 Success!

Once setup, you can:
- ✅ Trigger from your phone → appears on her phone
- ✅ Trigger from your laptop → appears on her phone
- ✅ Trigger by editing the Google Sheet → appears everywhere!
- ✅ Ultimate remote blessing control! 👑

Hector's power knows no bounds! 😸

