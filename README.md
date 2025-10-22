# Ellie's Choose Your Own Adventure Day 💕

A special interactive experience where Ellie can create her perfect day by making choices at each time slot, unlocking beautiful memories along the way!

## ✨ New Features!

- 🎨 **Beautiful Pink UI** - Designed with love in Ellie's colors
- ⏰ **Time-Based Unlocking** - Activities only unlock at their scheduled times (so the adventure unfolds throughout the day!)
- 🖼️ **Random Pictures** - Different pictures every time the page loads (currently using placeholders - add your own!)
- 💕 **Personalized Nicknames** - Featuring: Angel, Darling, Hello You, Trouble, and El
- 🔒 **Sweet Locked Messages** - When time slots aren't ready yet, she gets romantic messages

## 🎯 How It Works

The adventure is divided into 6 time slots throughout the day:
1. **Late Morning** (10:00 AM - 12:00 PM) - Unlocks at 10 AM
2. **Lunch** (12:00 PM - 1:30 PM) - Unlocks at noon
3. **Early Afternoon** (1:30 PM - 4:00 PM) - Unlocks at 1:30 PM
4. **Late Afternoon** (4:00 PM - 6:00 PM) - Unlocks at 4 PM
5. **Dinner** (6:00 PM - 8:00 PM) - Unlocks at 6 PM
6. **After Dinner** (8:00 PM onwards) - Unlocks at 8 PM

Ellie can only access activities during their time slot - creating anticipation throughout the day!

## 🚀 Getting Started

### Option 1: Use with Random Pictures (Easiest!)
1. **Open `index.html`** in any web browser - it works right away!
2. Pictures will randomly generate using placeholder images
3. **Customize the text** in `script.js` to make it personal (see CUSTOMIZATION_GUIDE.md)

### Option 2: Add Your Own Pictures
1. Add your photos to the `images` folder (though script currently uses random generation)
2. Modify `script.js` if you want to use your own pictures instead of random ones
3. See the images/README.txt for naming conventions

## ⏰ Time-Based Unlocking

The adventure syncs with real-time:
- **Before 10 AM**: Nothing unlocked yet (locked message appears)
- **At 10 AM**: Late Morning unlocks
- **At 12 PM**: Lunch unlocks (after completing Late Morning)
- **And so on...**

If Ellie tries to access a future time slot, she'll see a sweet message with one of your nicknames telling her to wait!

The page checks every minute to see if new time slots should unlock.

## ✏️ Customizing the Experience

### Quick Customizations (HIGHLY RECOMMENDED!)
See **CUSTOMIZATION_GUIDE.md** for detailed instructions, but here are the key spots:

1. **Personalize descriptions**: Each time slot has a `description` field - add inside jokes and references!
2. **Customize choices**: Make them specific to places you actually go together
3. **Update captions**: Reference real memories and moments you've shared
4. **Add more nicknames**: Sprinkle them throughout the experience

### In `script.js`, find `adventureData`:

```javascript
lateMorning: {
    description: "Good morning, Angel! ☀️ ..."  // ← Customize this!
    choices: [
        {
            text: "🎨 Visit an art gallery..."  // ← And this!
            caption: "Remember when..."          // ← And this!
        }
    ]
}
```

## 🎨 Customizing Colors

The current theme is pink, but you can change it in `styles.css`:
- **Main pink**: `#ff6b9d`
- **Darker pink**: `#c44569`
- **Accent yellow**: `#ffd93d`

Use Find & Replace to change these throughout the file.

## 📱 Mobile Friendly

The app is fully responsive and works great on:
- 📱 Phones
- 📋 Tablets  
- 💻 Computers

## 💡 Features

- ✨ Beautiful pink gradient UI with smooth animations
- ⏰ Real-time based unlocking system
- 📊 Progress bar showing journey completion
- 📝 Journey tracker showing all choices made
- 🖼️ Random picture generation (different each time!)
- 🔒 Sweet locked messages when time slots aren't ready
- 💕 Personalized with your nicknames for Ellie
- 🎁 Memory gallery at the end showing all unlocked pictures
- 🔄 Restart option to replay the adventure

## 🎁 Making It Extra Special

### Presentation Ideas:
1. **Morning Surprise**: Set it up on her device before she wakes up
2. **Scheduled Text**: Text her at 10 AM: "Your adventure awaits, Angel 💕 [link]"
3. **Actually Do It**: Plan to actually do whatever activity she chooses!
4. **Follow Along**: Be there with her as she makes each choice
5. **Mix Real & Digital**: Have real surprises ready for each choice she makes

### Customization Tips:
1. **Be Specific**: Reference actual places, dates, and memories
2. **Mix Tones**: Romantic, funny, nostalgic - variety is good!
3. **Inside Jokes**: These make it feel personal and special
4. **Real Plans**: Consider actually planning these activities!
5. **Test First**: Click through before showing her to make sure it works

## 🌐 Hosting Online (Optional)

Want Ellie to access it from her phone anywhere?

**Option 1: GitHub Pages (Free)**
1. Create a GitHub account
2. Create a repository called "ellie-adventure"
3. Upload all files
4. Enable GitHub Pages in settings
5. Share the link!

**Option 2: Netlify Drop (Super Easy)**
1. Go to drop.netlify.com
2. Drag the entire "EL DAY" folder
3. Get instant link to share!

## 🆘 Troubleshooting

**Time slots not unlocking?**
- Check your device's clock is correct
- The script uses 24-hour time (10 AM = 10, 2 PM = 14, etc.)

**Want to test without waiting?**
- In `script.js`, you can temporarily set all `timeStart` values to `0` to unlock everything

**Pictures not showing?**
- Current setup uses random picture generation from Picsum.photos
- Requires internet connection
- Each reload shows different pictures

**Want different times?**
- Edit the `timeStart` and `time` fields in `script.js`

## 📁 Files Structure

```
/Users/watson/EL DAY/
├── index.html                  ← Main page
├── styles.css                  ← Pink styling & animations
├── script.js                   ← Adventure logic & time-based unlocking
├── README.md                   ← This file
├── CUSTOMIZATION_GUIDE.md      ← Detailed personalization tips
├── QUICK_START.md              ← Quick setup instructions
└── images/                     ← Folder for your pictures (optional)
```

## 💝 The Most Important Part

The technology is cool, but what matters most is the thought and love you put into personalizing it. Spend time customizing the descriptions, choices, and captions with real memories and inside jokes. That's what will make Ellie's heart melt! 💕

---

Made with ❤️ for Ellie's Special Day

**Current Nicknames Used**: Angel, Darling, Hello You, Trouble, El
