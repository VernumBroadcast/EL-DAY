# 📊 Google Sheets Setup Guide

## Why Google Sheets?

Update your adventure choices **in real-time** throughout the day! Change options, descriptions, or add inside jokes on the fly while Ellie is using it!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Name it **"Ellie's Adventure Day"** (or whatever you want)

### Step 2: Set Up the Columns

**IMPORTANT:** The first row MUST have these exact column headers:

| Stage | Time | TimeStart | TimeEnd | Title | Description | Choice1 | Caption1 | Choice2 | Caption2 | Choice3 | Caption3 |
|-------|------|-----------|---------|-------|-------------|---------|----------|---------|----------|---------|----------|

### Step 3: Add Your Data

Copy this template into your sheet (or use the data below):

**Row 2 (Late Morning):**
- Stage: `lateMorning`
- Time: `10:00 AM - 12:00 PM`
- TimeStart: `10`
- TimeEnd: `12`
- Title: `Late Morning Shenanigans`
- Description: `Wakey wakey, Angel! ☀️ It's 10 AM and we're about to make some CHOICES. What's the vibe?`
- Choice1: `🎨 Art gallery but make it pretentious (we'll rate everything dramatically)`
- Caption1: `POV: You're cultured now, Darling. The vibes were immaculate. 10/10 no notes.`
- Choice2: `🌳 Touch grass (literally, main character walk in nature)`
- Caption2: `We really said 'mental health era' and went outside, El. Icons only.`
- Choice3: `☕ Cozy café for iced coffee and existential conversations`
- Caption3: `Not us getting philosophical over oat milk lattes, Hello You 💅`

**Row 3 (Lunch):**
- Stage: `lunch`
- Time: `12:00 PM - 1:30 PM`
- TimeStart: `12`
- TimeEnd: `13.5`
- Title: `Lunch O'Clock`
- Description: `Okay Trouble, we're HONGRY. Where are we eating? 🍽️`
- Choice1: `🍕 Carbs. Just carbs. Pasta/pizza/breadsticks. Yes.`
- Caption1: `We said no to diet culture and YES to garlic bread, Angel 🙌`
- Choice2: `🥗 Healthy girl era (salad that costs $17)`
- Caption2: `Paying $17 for leaves but feeling SO sophisticated about it, Darling`
- Choice3: `🌮 Something spicy and chaotic (like us)`
- Caption3: `Risk-takers only, Trouble. We're living on the EDGE.`

**Continue for other stages:** earlyAfternoon, lateAfternoon, dinner, afterDinner

(Use the same format - see the fallback data in script.js for full examples)

### Step 4: Publish Your Sheet

1. Click **File** → **Share** → **Publish to web**
2. Click **Publish** (leave all default settings)
3. Important: Also click **Share** button (top right) → **Change to anyone with the link can VIEW**

### Step 5: Get Your Sheet ID

1. Look at your sheet's URL in the browser
2. It looks like: `https://docs.google.com/spreadsheets/d/`**`1ABC123xyz...`**`/edit`
3. Copy the part between `/d/` and `/edit` - that's your Sheet ID!
4. Example: If URL is `https://docs.google.com/spreadsheets/d/1xYz123ABC456/edit`
   - Your Sheet ID is: `1xYz123ABC456`

### Step 6: Update script.js

1. Open `script.js`
2. Find line 3: `const GOOGLE_SHEET_ID = 'YOUR_SHEET_ID_HERE';`
3. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID
4. Make sure the `GOOGLE_SHEET_NAME = 'Adventures'` matches your sheet tab name (default is usually "Sheet1" - rename it to "Adventures" or change the code)
5. Save the file!

---

## 📋 Column Reference

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| **Stage** | Text | Stage identifier (DON'T CHANGE) | `lateMorning`, `lunch`, etc. |
| **Time** | Text | Display time range | `10:00 AM - 12:00 PM` |
| **TimeStart** | Number | Hour to unlock (24hr format) | `10` (for 10 AM), `14` (for 2 PM) |
| **TimeEnd** | Number | Hour stage ends | `12`, `16`, etc. |
| **Title** | Text | Section title | `Late Morning Shenanigans` |
| **Description** | Text | Main description with Ellie's name/nickname | `Wakey wakey, Angel! What's the vibe?` |
| **Choice1** | Text | First choice option | `🎨 Art gallery visit` |
| **Caption1** | Text | Caption for choice 1 photo | `Remember when...` |
| **Choice2** | Text | Second choice option | `🌳 Nature walk` |
| **Caption2** | Text | Caption for choice 2 photo | `That time we...` |
| **Choice3** | Text | Third choice option (OPTIONAL) | `☕ Coffee date` |
| **Caption3** | Text | Caption for choice 3 photo (OPTIONAL) | `Our favorite spot...` |

---

## 🎨 Customization Tips

### Live Updates During the Day!

**The POWER of Google Sheets:**
- Change choices while Ellie is using the app!
- She clicks "↻ Refresh Choices" and gets the new options
- Perfect for adapting to weather, mood, or spontaneous plans

**Example Scenarios:**

**10 AM - Before she chooses:**
- You notice it's raining
- Change "Nature walk" to "Cozy bookstore"
- Text her: "Hey, refresh the page!"
- She sees the updated options!

**Between lunch and afternoon:**
- She mentions wanting dessert
- Add "🍰 Dessert stop first!" as a choice
- Ultimate boyfriend points!

### Personalization Ideas:

**Use her nicknames in descriptions:**
- Angel, Darling, Hello You, Trouble, El
- Mix them up for variety!

**Reference inside jokes:**
- "That place where you [inside joke]"
- "Remember when we [funny moment]"

**Be specific about locations:**
- "Tony's Pizza on Main (where you always get extra cheese)"
- "That coffee shop with the weird art"

**Adjust to real plans:**
- Have actual restaurants/activities lined up
- Make the choices reflect real options for the day

---

## 🔧 Troubleshooting

### "Data not loading" / Using fallback data

**Check these:**
1. ✅ Sheet is published to web (File → Publish to web)
2. ✅ Sheet is shared as "Anyone with link can view"
3. ✅ Sheet ID is correct in script.js
4. ✅ Sheet tab name matches `GOOGLE_SHEET_NAME` variable
5. ✅ First row has the exact column headers listed above
6. ✅ Stage names are exactly: `lateMorning`, `lunch`, `earlyAfternoon`, `lateAfternoon`, `dinner`, `afterDinner`

### "Refresh button not working"

- Check browser console (F12) for errors
- Make sure sheet is public
- Try opening the sheet URL directly to test access

### "Wrong data showing"

- Column headers must be EXACT (case sensitive!)
- Stage names must match exactly
- Check for extra spaces in cells

### "Some choices missing"

- You need at least Choice1 and Choice2
- Choice3 is optional (leave blank if only 2 choices)
- Make sure corresponding Caption cells aren't empty

---

## 📱 Testing

1. Update your Google Sheet
2. Open index.html on your phone
3. Click "↻ Refresh Choices"
4. Changes should appear immediately!
5. Test before giving to Ellie!

---

## 💡 Pro Tips

### Pre-schedule changes:
- Have multiple versions ready in different tabs
- Copy-paste between tabs to "update" the adventure

### Add surprise choices:
- Randomly add a fourth "surprise" option mid-day
- Make it something extra special or funny

### Coordinate with friends:
- Give a friend edit access to the sheet
- They can add funny choices while you're both with Ellie
- Next-level coordination!

### Keep a backup:
- Duplicate your sheet before making changes
- If something breaks, you can restore quickly

### Use emoji strategically:
- They make options scannable and fun
- 🎨 🌳 ☕ 🍕 🥗 🌮 🎬 🛍️ 🎮 etc.

---

## 📊 Full Example Sheet Setup

Here's what a complete row looks like:

```
Stage: lunch
Time: 12:00 PM - 1:30 PM
TimeStart: 12
TimeEnd: 13.5
Title: Lunch O'Clock
Description: Okay Trouble, we're HONGRY. Where are we eating? 🍽️
Choice1: 🍕 That amazing pizza place you love
Caption1: Remember our first date here, Angel? Still the best pizza in town 💕
Choice2: 🥗 The healthy spot (we're being good today)
Caption2: Look at us, making adult choices, Darling. Growth! 🌱
Choice3: 🌮 Taco Tuesday! Even though it's not Tuesday.
Caption3: Rules are suggestions when you're this hungry, El 🌮
```

---

## 🎯 Final Checklist

Before going live:

- [ ] Google Sheet created and set up
- [ ] All 6 stages filled out with data
- [ ] Sheet published to web
- [ ] Sheet shared publicly (View access)
- [ ] Sheet ID copied
- [ ] Sheet ID pasted into script.js
- [ ] Sheet tab name matches code ("Adventures")
- [ ] Tested refresh button
- [ ] Tested on phone
- [ ] Ready to blow Ellie's mind! 🎉

---

## 🆘 Still Stuck?

**No worries!** The app works perfectly with fallback data. You can:
1. Skip Google Sheets entirely
2. Edit choices directly in script.js (look for `fallbackData`)
3. Update and refresh the page manually

Google Sheets is just for the ✨ live update magic ✨ but not required!

---

**You've got this! Time to make the most dynamic, personalized adventure day ever! 💕**

