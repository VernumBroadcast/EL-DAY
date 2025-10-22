# 💕 Customization Guide for Ellie's Adventure

## Adding Your Personal Touch

The adventure is set up with nicknames (Angel, Darling, Hello You, Trouble, El), but you should personalize EVERYTHING to make it uniquely yours!

## 🎯 Quick Customization Checklist

### 1. Add Sweet Quotes (RECOMMENDED!)
Open `script.js` and find the `adventureData` object. Each section has a `description` field - add personal quotes here!

**Example:**
```javascript
description: "Good morning, Angel! ☀️ Remember that time we stayed up all night talking? Let's make more memories today!"
```

**Ideas for quotes:**
- Inside jokes between you two
- References to special dates
- Song lyrics that mean something to you
- Funny moments you've shared
- Sweet memories from your relationship

### 2. Customize the Choice Options

Make the choices reflect REAL places you could go or things you love doing together:

**Example - Instead of generic:**
```javascript
text: "🍕 That cozy Italian place with amazing pasta"
```

**Make it specific:**
```javascript
text: "🍕 Tony's on Main Street - where we had our third date"
```

### 3. Personalize the Captions

Each choice has a caption that appears with the picture. Make these super personal!

**Current example:**
```javascript
caption: "Remember when we got lost in the world of art together, Darling?"
```

**Make it more specific:**
```javascript
caption: "Remember the MoMA? You spent 20 minutes staring at that Monet, Angel, and I spent 20 minutes staring at you 💕"
```

### 4. Add More Nicknames

Current nicknames used: Angel, Darling, Hello You, Trouble, El

**Where to use them:**
- In descriptions (start of each time slot)
- In captions (end of each picture reveal)
- In the locked messages
- In the final end screen message

### 5. Customize Time Slots (Optional)

If your day starts differently, change the times in `script.js`:

```javascript
lateMorning: {
    time: "10:00 AM - 12:00 PM",  // ← Display time
    timeStart: 10,                 // ← Actual unlock time (24-hour format)
    timeEnd: 12,
```

## 📝 Sample Personalizations

### Romantic Quotes to Add:
```javascript
"Every adventure is better with you, Darling"
"Angel, you make ordinary moments extraordinary"
"Hello You... ready for another chapter in our story?"
"Life with you is the greatest adventure, El"
"Trouble, let's make today unforgettable"
```

### Playful Options:
```javascript
"Remember when you beat me at mini golf? Rematch time, Trouble!"
"That bookstore where you always find the weirdest books, El?"
"The place where you order the same thing every time (and it's always perfect)"
```

### Sweet Memory References:
```javascript
"Like that rainy Tuesday when we danced in the kitchen"
"Remember our first coffee date? I was so nervous, Angel"
"That sunset when you fell asleep on my shoulder"
```

## 🎨 Location-Specific Ideas

### For Morning Activities:
- "The farmers market where you always stop at every booth"
- "That trail where we saw the deer family"
- "The coffee shop where you tried that awful experimental latte"

### For Lunch:
- "The place with the best tacos in town (your opinion, not mine 😉)"
- "Where we went after that concert"
- "The spot with the view you love"

### For Afternoon:
- "The theater where we saw [specific movie]"
- "That vintage shop where you found the perfect [item]"
- "The arcade where I finally beat you at [game]"

### For Evening:
- "The restaurant where we celebrated [occasion]"
- "Our usual spot - they know our order by heart"
- "That place we've been meaning to try for months"

## 🔧 Advanced Customization

### Change the Color Scheme
In `styles.css`, find and replace these pink colors:
- Main pink: `#ff6b9d`
- Dark pink: `#c44569`
- Accent yellow: `#ffd93d`

### Add More Stages
You can add afternoon snack, pre-dinner drinks, or any other time slot by:
1. Adding a new object to `adventureData` in `script.js`
2. Adding the stage name to `stageOrder` array
3. Setting appropriate `timeStart` and `timeEnd`

### Modify Locked Messages
In `script.js`, find the `lockedQuotes` array and add your own:
```javascript
const lockedQuotes = [
    "Good things come to those who wait, Angel 💕",
    "Patience, Darling... your next surprise awaits",
    // Add more here!
];
```

## 💡 Pro Tips

1. **Be Specific**: The more specific your references, the more special it feels
2. **Mix Tones**: Combine romantic, funny, and nostalgic moments
3. **Use Emojis**: They add visual interest and emotion
4. **Test It**: Click through the whole experience to make sure it flows
5. **Balance**: Not every caption needs to be deeply romantic - mix in some light and fun ones
6. **Timing**: Consider when she'll actually see this and adjust the tone accordingly

## 🎁 Presentation Ideas

- **Morning Surprise**: Set it up on her laptop/tablet before she wakes up
- **QR Code**: Generate a QR code linking to the page (if hosted online)
- **Scheduled Text**: Text her the link at 10 AM with "Your adventure awaits, Angel"
- **In Person**: Open it together and let her make the choices while you're there

---

Remember: This is YOUR story together. The more personal you make it, the more meaningful it will be! 💕

