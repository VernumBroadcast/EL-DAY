# 🧪 Test Your Google Sheets Connection

## Quick Diagnostic:

### Step 1: Open Your Browser Console
1. Open `index.html` in your browser
2. Press **F12** (Windows) or **Cmd+Option+I** (Mac)
3. Click the **Console** tab

### Step 2: Check What's Loading
When the page loads, you should see one of these messages:

**✅ GOOD:** `✅ Loaded data from Google Sheets!`
- Your sheet is connected and working!

**❌ BAD:** `❌ Error loading from Google Sheets:`
- Something is wrong with the connection

**⚠️ FALLBACK:** `📋 Using fallback data. Set up Google Sheets for live updates!`
- Sheet ID is still set to default

### Step 3: Test the Refresh Button
1. Click the **"↻ Refresh Choices"** button on the page
2. Watch the console for messages
3. Should see: `✅ Loaded data from Google Sheets!`

---

## Common Issues & Fixes:

### Issue: "Failed to fetch" Error
**Problem:** Sheet isn't published or isn't public

**Fix:**
1. In Google Sheet → **File** → **Share** → **Publish to web** → **Publish**
2. Click **Share** button (top right) → **Change to anyone with the link** → Set to **Viewer**

### Issue: "Using fallback data"
**Problem:** Sheet ID is wrong or not set

**Fix:**
1. Check your Sheet URL: `https://docs.google.com/spreadsheets/d/[YOUR_ID_HERE]/edit`
2. Copy the ID between `/d/` and `/edit`
3. Make sure it matches line 4 in `script.js`

Your current ID in script.js: `1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM`

### Issue: Sheet loads but data looks wrong
**Problem:** Sheet format is incorrect

**Fix:**
Make sure your sheet has these EXACT column headers in row 1:
- Stage
- Time
- TimeStart
- TimeEnd
- Title
- Description
- Choice1
- Caption1
- Choice2
- Caption2
- Choice3
- Caption3

And tab name is: **ELDAY**

---

## Test URLs:

Try opening this URL in your browser (replace with your actual Sheet ID):

**Public JSON endpoint:**
```
https://docs.google.com/spreadsheets/d/1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM/gviz/tq?tqx=out:json&sheet=ELDAY
```

**What you should see:**
- If it works: A bunch of JSON data starting with `/*O_o*/`
- If it doesn't: An error or login page

If you see a login page = sheet isn't public!

---

## Still Not Working?

### Check These:
1. ✅ Sheet published to web?
2. ✅ Sheet shared publicly (anyone with link can view)?
3. ✅ Tab name is "ELDAY"?
4. ✅ Sheet ID in script.js matches your sheet?
5. ✅ Clicked refresh button on website?
6. ✅ Checked browser console for errors?

### Last Resort:
1. Try opening the sheet in an incognito window
2. If you can't access it = not public
3. Make it public and try again!

