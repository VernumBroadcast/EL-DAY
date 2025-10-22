// 🚨 GOOGLE SHEETS CONFIGURATION 🚨
// Your Google Sheet is connected! ✅
// Sheet URL: https://docs.google.com/spreadsheets/d/1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM/edit
const GOOGLE_SHEET_ID = '1_kVhwqOzmyB6mQfvWCHuGG0C6icfbzae8zfr9v9XIXM';
const GOOGLE_SHEET_NAME = 'ELDAY'; // Name of your sheet tab

// 🔐 ADMIN/TESTING MODE CONFIGURATION 🔐
// Desktop: Press Ctrl+Shift+A (or Cmd+Shift+A on Mac)
// Mobile: Tap the ⚙️ icon (bottom right) 3 times, then enter PIN
const ADMIN_PASSWORD = 'watson2024'; // 👈 CHANGE THIS to your secret password!
const ADMIN_PIN = '1234'; // 👈 CHANGE THIS to your secret 4-digit PIN (for mobile)

// Track taps for mobile trigger
let adminTriggerTaps = 0;
let adminTriggerTimer = null;

// Girlboss quotes for the header (rotating every 8 seconds because we're impatient)
const girlbossQuotes = [
    "Main character energy ONLY today ✨",
    "Living our best life, one choice at a time 💅",
    "Plot twist: we're the adventure",
    "Chaos coordinator reporting for duty 🎯",
    "Too blessed to be stressed (but also stressed) 💫",
    "Making questionable decisions with confidence",
    "Delulu is the solulu, Angel 🌟",
    "El, we're literally iconic right now",
    "Serving looks and making cunt, Darling",
    "This is our Roman Empire, Trouble",
    "Gaslight, gatekeep, girlboss... but make it cute 💕",
    "Hello You, let's cause some problems on purpose",
    "We didn't choose the chaos, the chaos chose us",
    "Unhinged? I prefer 'whimsically challenged'",
    "Therapy is expensive, this is free entertainment",
    "Hector would be proud of these choices 🐱",
    "No concussions today please, Angel 😅",
    "Successfully avoiding Diana since 2025 ✨",
    "Better than a Peter Morgan lecture, that's for sure",
    "Lilly's probably talking about Ethan rn 💀",
    "Amanda flaked, so it's just us today 💕",
    "Josh Barber: 'It's just colleagues' ...sure bestie 😏",
    "Hector is judging our life choices from afar 🐱👑",
    "Better than sleeping in a morgue, Angel 💀",
    "Brought to you by 372 Productions 🎬",
    "No morgue vibes today, just good vibes ✨",
    "Nights at the Romforlt Hilton (Studio Apartment Edition) 🏨",
    "El's probably studying for her driving test rn 🚗",
    "James Light energy is NOT the vibe today 🚫"
];

// Locked time slot messages with ENERGY
const lockedQuotes = [
    "Girl, slow down! This unlocks later 😤",
    "Patience, Angel... Rome wasn't built in a day (but like, we could have)",
    "LOCKED 🔒 Come back later when you're allowed to have fun",
    "Not yet, Darling! Good things come to those who wait (allegedly)",
    "Okay Trouble, we get it, you're excited. WAIT. 💅",
    "El, bestie, this is a SCHEDULED experience. Respect the timeline.",
    "Hello You... the universe says 'not right now' ⏰",
    "This is like a pre-order. You gotta wait for release day. 🎮",
    "Even Hector knows to wait patiently 🐱",
    "You're being more impatient than Lilly talking about Ethan rn",
    "Don't rush it or you'll get a concussion (again) 😅",
    "This is more locked than Josh's 'colleague relationship' 🔒",
    "Amanda would flake on this too but YOU have to wait 💀",
    "More locked than the morgue doors at night 💀🔒",
    "Study for your driving test while you wait, El 🚗",
    "This timing brought to you by 372 Productions 🎬"
];

// State management
let currentStage = 'lateMorning';
let selectedChoices = [];
let unlockedPictures = [];
let adventureData = {}; // Will be loaded from Google Sheets
let adminMode = false; // Testing mode activated by password
let testingTimeOverride = null; // Manual time override for testing

const stageOrder = ['lateMorning', 'lunch', 'earlyAfternoon', 'lateAfternoon', 'dinner', 'afterDinner'];

// Your actual photos from the images folder
const availablePictures = [
    'images/44f179ce-6974-43d7-87cd-10cdf5ac93d9 (1).jpeg',
    'images/44f179ce-6974-43d7-87cd-10cdf5ac93d9.jpeg',
    'images/6b64c7b3-d1d9-4acc-8a69-38cab967e122 (1).jpeg',
    'images/6b64c7b3-d1d9-4acc-8a69-38cab967e122.jpeg',
    'images/6f93b9d9-9477-40af-b009-691d241b6553.jpeg',
    'images/90deaf2e-0d30-4787-a28a-7571f5d8cab8 (1).jpeg',
    'images/90deaf2e-0d30-4787-a28a-7571f5d8cab8.jpeg',
    'images/9394f3b8-035c-43f5-bd25-8ac7965ddb6b.jpeg',
    'images/a3b26138-888f-4f29-83ce-6fa26906614d.jpeg',
    'images/c7779b1f-a177-4e1a-9156-8074b4fcf69c (1).jpeg',
    'images/c7779b1f-a177-4e1a-9156-8074b4fcf69c.jpeg',
    'images/e0542ce9-cdc2-41de-a54f-b851bbf57226.jpeg',
    'images/IMG_1528.jpeg',
    'images/IMG_1529.jpeg',
    'images/IMG_1530.jpeg',
    'images/IMG_1531 (1).jpeg',
    'images/IMG_1531.jpeg',
    'images/IMG_3081.jpeg',
    'images/IMG_3082.jpeg',
    'images/IMG_4462 (1).jpeg',
    'images/IMG_4462.jpeg',
    'images/IMG_4606 (1).jpeg',
    'images/IMG_4606.jpeg',
    'images/IMG_4607.jpeg',
    'images/IMG_4761.jpeg',
    'images/IMG_4763.jpeg',
    'images/IMG_5329 (1).jpeg',
    'images/IMG_5329.jpeg',
    'images/IMG_8210.jpeg'
];

// Shuffle the pictures array when page loads for random order
let shuffledPictures = [...availablePictures].sort(() => Math.random() - 0.5);
let pictureIndex = 0;

// Get a unique random picture from your actual photos
function getRandomPicture() {
    if (pictureIndex >= shuffledPictures.length) {
        shuffledPictures = [...availablePictures].sort(() => Math.random() - 0.5);
        pictureIndex = 0;
    }
    
    const picture = shuffledPictures[pictureIndex];
    pictureIndex++;
    return picture;
}

// Fallback data if Google Sheets doesn't load
const fallbackData = {
    lateMorning: {
        time: "10:00 AM - 12:00 PM",
        timeStart: 10,
        timeEnd: 12,
        title: "Late Morning Shenanigans",
        description: "Wakey wakey, Angel! ☀️ It's 10 AM and we're about to make some CHOICES. (Unlike Peter Morgan's lectures, these are actually good choices)",
        choices: [
            {
                text: "🎨 Art gallery but make it pretentious (we'll rate everything dramatically)",
                caption: "POV: You're cultured now, Darling. The vibes were immaculate. 10/10 no notes. Peter Morgan could NEVER teach this level of sophistication."
            },
            {
                text: "🌳 Touch grass (literally, main character walk in nature)",
                caption: "We really said 'mental health era' and went outside, El. Icons only. Watch your head though - no concussions today! 😅"
            },
            {
                text: "☕ Cozy café for iced coffee and existential conversations",
                caption: "Not us getting philosophical over oat milk lattes, Hello You 💅 Hector would approve of this sophisticated choice."
            }
        ]
    },
    lunch: {
        time: "12:00 PM - 1:30 PM",
        timeStart: 12,
        timeEnd: 13.5,
        title: "Lunch O'Clock",
        description: "Okay Trouble, we're HONGRY. Where are we eating? 🍽️ (Amanda probably flaked on lunch plans anyway so it's just us)",
        choices: [
            {
                text: "🍕 Carbs. Just carbs. Pasta/pizza/breadsticks. Yes.",
                caption: "We said no to diet culture and YES to garlic bread, Angel 🙌 Hector the cat would judge us but he gets premium wet food so who's he to talk? 🐱"
            },
            {
                text: "🥗 Healthy girl era (salad that costs $17)",
                caption: "Paying $17 for leaves but feeling SO sophisticated about it, Darling. Diana would never find us here. 😏"
            },
            {
                text: "🌮 Something spicy and chaotic (like us)",
                caption: "Risk-takers only, Trouble. We're living on the EDGE. Better than the food options at the morgue, that's for sure. 💀"
            }
        ]
    },
    earlyAfternoon: {
        time: "1:30 PM - 4:00 PM",
        timeStart: 13.5,
        timeEnd: 16,
        title: "Post-Lunch Energy",
        description: "Food coma averted, Hello You! 🌞 What's next on this unhinged adventure? (Lilly's probably still talking about Ethan but we're having an actual adventure)",
        choices: [
            {
                text: "🎬 Movie + snacks + judging the characters' life choices",
                caption: "We watched a movie and provided better commentary than the director intended, Angel. Better entertainment than a Peter Morgan lecture AND we had popcorn."
            },
            {
                text: "🛍️ Shopping (window or wallet damage, dealer's choice)",
                caption: "Retail therapy? In THIS economy? El, we're bold. 372 Productions presents: A Shopping Adventure 🎬 Successfully avoided Diana too!"
            },
            {
                text: "🎮 Competitive games where we pretend we're not competitive",
                caption: "We're not competitive, Darling. We're just... passionate about winning. 🏆 No concussions sustained during this activity (a miracle)."
            }
        ]
    },
    lateAfternoon: {
        time: "4:00 PM - 6:00 PM",
        timeStart: 16,
        timeEnd: 18,
        title: "Golden Hour Vibes",
        description: "It's getting aesthetic out there, El 🌅 What's the move? (Josh Barber says this is just a 'colleague outing' but okay bestie 😏)",
        choices: [
            {
                text: "📚 Bookstore browsing (buying books we'll 'definitely' read)",
                caption: "Our TBR pile said 'no' but we said 'yes anyway', Angel 📚 Hector knocked over three books when we got home. Iconic cat behavior. 🐱👑"
            },
            {
                text: "🎵 Live music (we'll pretend we knew the band before)",
                caption: "Yeah, we're into underground music. By underground we mean... this band. Now. Hello You. Better live music than whatever James Light is into. 🎵"
            },
            {
                text: "🌊 Sunset chasing like we're in a music video",
                caption: "Main character moment ACTIVATED. The golden hour was GIVING, Darling ✨ Not a Diana in sight. Perfect."
            }
        ]
    },
    dinner: {
        time: "6:00 PM - 8:00 PM",
        timeStart: 18,
        timeEnd: 20,
        title: "Dinner Time (The Main Event)",
        description: "Big dinner energy incoming, Angel! 🌟 Where we eating? (Amanda definitely flaked on group dinner so more food for us 💅)",
        choices: [
            {
                text: "🕯️ Fancy dinner (dress code: yes. Budget: don't think about it)",
                caption: "We got DRESSED UP and felt FANCY, Trouble. Worth every penny (probably) 💎 Way fancier than Nights at the Romforlt Hilton (Studio Apartment). Hector would be proud."
            },
            {
                text: "🍜 Authentic ethnic food adventure (spice level: risky)",
                caption: "Passport not required but taste buds went on a JOURNEY, El 🌍 More adventurous than anything Peter Morgan ever did in his life."
            },
            {
                text: "🍔 Casual chaos (burgers, vibes, no dress code)",
                caption: "Sometimes you just need a good burger and zero expectations, Darling 🍔 A 372 Productions special: Burgers & Vibes. Lilly's still talking about Ethan but we're thriving."
            }
        ]
    },
    afterDinner: {
        time: "8:00 PM onwards",
        timeStart: 20,
        timeEnd: 24,
        title: "Night Owl Activities",
        description: "The night is YOUNG (unlike our knees), Trouble! ✨ Final choice! (Josh Barber: 'Still just colleagues!' Us: Sure, Jan 😏)",
        choices: [
            {
                text: "🎭 Live show (theatre/comedy/something we'll talk about forever)",
                caption: "We cultured now, Angel. The performance ate and left NO crumbs. 🎭 Even Peter Morgan would have to admit this was educational (but like, FUN educational)."
            },
            {
                text: "🌃 Night walk + dessert (main character in a rom-com vibes)",
                caption: "We really walked around at night like we're in a movie montage, Hello You 🌙 No morgues, no concussions, no Diana. Just main character energy. Perfect ending."
            },
            {
                text: "🏠 Cozy night in (pajamas by 8:30, no judgment)",
                caption: "Sometimes staying in IS the adventure, El. Nights at the Romforlt Hilton (Studio Apartment) never looked so good. 💕 Hector joined for max cozy. Better than the morgue, 10/10. 🐱👑"
            }
        ]
    }
};

// Load data from Google Sheets
async function loadFromGoogleSheets() {
    if (GOOGLE_SHEET_ID === 'YOUR_SHEET_ID_HERE') {
        console.log('📋 Using fallback data. Set up Google Sheets for live updates!');
        return fallbackData;
    }

    try {
        // Using Google Sheets API v4 public endpoint
        const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${GOOGLE_SHEET_NAME}`;
        
        const response = await fetch(url);
        const text = await response.text();
        
        // Parse the JSON (Google returns it wrapped in a function call)
        const json = JSON.parse(text.substr(47).slice(0, -2));
        
        // Transform the sheet data into our format
        const data = parseSheetData(json);
        
        console.log('✅ Loaded data from Google Sheets!');
        return data;
    } catch (error) {
        console.error('❌ Error loading from Google Sheets:', error);
        console.log('📋 Using fallback data instead');
        return fallbackData;
    }
}

// Parse Google Sheets data into our format
function parseSheetData(json) {
    const rows = json.table.rows;
    const data = {};
    
    // Expected format: Stage | Time | TimeStart | TimeEnd | Title | Description | Choice1 | Caption1 | Choice2 | Caption2 | Choice3 | Caption3
    rows.forEach(row => {
        const cells = row.c;
        if (!cells || !cells[0] || !cells[0].v) return; // Skip empty rows
        
        const stage = cells[0].v;
        const stageData = {
            time: cells[1]?.v || '',
            timeStart: parseFloat(cells[2]?.v) || 0,
            timeEnd: parseFloat(cells[3]?.v) || 24,
            title: cells[4]?.v || '',
            description: cells[5]?.v || '',
            choices: []
        };
        
        // Add up to 3 choices
        for (let i = 0; i < 3; i++) {
            const choiceIndex = 6 + (i * 2);
            const captionIndex = 7 + (i * 2);
            
            if (cells[choiceIndex]?.v) {
                stageData.choices.push({
                    text: cells[choiceIndex].v,
                    caption: cells[captionIndex]?.v || 'No caption set!'
                });
            }
        }
        
        data[stage] = stageData;
    });
    
    return data;
}

// Check if a time slot is currently accessible
function isTimeSlotAccessible(stage) {
    // Admin mode override: unlock everything for testing
    if (adminMode) return true;
    
    const now = new Date();
    let currentHour = now.getHours() + now.getMinutes() / 60;
    
    // Use testing time override if set
    if (testingTimeOverride !== null) {
        currentHour = testingTimeOverride;
    }
    
    const stageData = adventureData[stage];
    
    if (!stageData) return false;
    return currentHour >= stageData.timeStart;
}

// Find the current accessible stage
function getCurrentAccessibleStage() {
    const lastCompletedIndex = selectedChoices.length - 1;
    const nextStageIndex = lastCompletedIndex + 1;
    
    if (nextStageIndex >= stageOrder.length) {
        return null;
    }
    
    const nextStage = stageOrder[nextStageIndex];
    
    if (isTimeSlotAccessible(nextStage)) {
        return nextStage;
    }
    
    return null;
}

// Display a random girlboss quote with fade effect
function displayGirlbossQuote() {
    const quoteElement = document.getElementById('loveQuote');
    
    quoteElement.classList.add('fade');
    
    setTimeout(() => {
        const randomQuote = girlbossQuotes[Math.floor(Math.random() * girlbossQuotes.length)];
        quoteElement.textContent = randomQuote;
        quoteElement.classList.remove('fade');
    }, 400);
}

// Show loading state
function showLoading() {
    const storySection = document.getElementById('storySection');
    storySection.style.display = 'block';
    storySection.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h2 style="color: #ff6b9d;">Loading your adventure...</h2>
            <p style="font-size: 3em; margin: 20px 0;">💅</p>
            <p style="color: #666;">Getting everything ready for you, bestie!</p>
        </div>
    `;
}

// Initialize the adventure
async function initAdventure() {
    showLoading();
    
    // Load data from Google Sheets (or use fallback)
    adventureData = await loadFromGoogleSheets();
    
    const accessibleStage = getCurrentAccessibleStage();
    
    if (accessibleStage) {
        currentStage = accessibleStage;
    } else if (selectedChoices.length === 0) {
        currentStage = 'lateMorning';
    }
    
    displayGirlbossQuote();
    updateProgressBar();
    displayStage(currentStage);
    updateJourneyTracker();
}

// Display current stage
function displayStage(stage) {
    const data = adventureData[stage];
    
    // Make sure story section is visible and clear any loading state
    const storySection = document.getElementById('storySection');
    storySection.style.display = 'block';
    document.getElementById('pictureReveal').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    
    if (!data) {
        storySection.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <h2 style="color: #ff6b9d;">Oops! 😅</h2>
                <p>Something went wrong loading this stage. Try refreshing!</p>
            </div>
        `;
        return;
    }
    
    const isAccessible = isTimeSlotAccessible(stage);
    
    document.getElementById('currentTime').textContent = data.time;
    
    // Make sure we have the title and description elements
    let titleElement = document.getElementById('timeSlotTitle');
    let descElement = document.getElementById('description');
    let choicesContainer = document.getElementById('choicesContainer');
    
    // If elements don't exist (after loading state), recreate the structure
    if (!titleElement || !descElement || !choicesContainer) {
        storySection.innerHTML = `
            <h2 id="timeSlotTitle"></h2>
            <p id="description"></p>
            <div class="choices" id="choicesContainer"></div>
        `;
        titleElement = document.getElementById('timeSlotTitle');
        descElement = document.getElementById('description');
        choicesContainer = document.getElementById('choicesContainer');
    }
    
    titleElement.textContent = data.title;
    
    if (!isAccessible) {
        descElement.textContent = `This unlocks at ${data.time}. Patience is a virtue (allegedly).`;
        
        choicesContainer.innerHTML = '';
        
        const lockedMsg = document.createElement('div');
        lockedMsg.className = 'locked-message';
        const randomQuote = lockedQuotes[Math.floor(Math.random() * lockedQuotes.length)];
        lockedMsg.innerHTML = `
            <p style="font-size: 2em; margin-bottom: 15px;">🔒</p>
            <p style="font-size: 1.1em; font-weight: 600;">${randomQuote}</p>
            <p style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">Come back at ${data.time}</p>
        `;
        choicesContainer.appendChild(lockedMsg);
    } else {
        descElement.textContent = data.description;
        
        choicesContainer.innerHTML = '';
        
        data.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerHTML = choice.text;
            button.onclick = () => makeChoice(stage, index);
            choicesContainer.appendChild(button);
        });
    }
}

// Handle choice selection
function makeChoice(stage, choiceIndex) {
    const choice = adventureData[stage].choices[choiceIndex];
    const randomPicture = getRandomPicture();
    
    selectedChoices.push({
        stage: stage,
        choice: choice.text,
        time: adventureData[stage].time
    });
    
    unlockedPictures.push({
        picture: randomPicture,
        caption: choice.caption,
        stage: adventureData[stage].title
    });
    
    showPictureReveal(choice, randomPicture);
    updateJourneyTracker();
}

// Show picture reveal screen
function showPictureReveal(choice, pictureUrl) {
    document.getElementById('storySection').style.display = 'none';
    document.getElementById('pictureReveal').style.display = 'block';
    
    const img = document.getElementById('revealedPicture');
    img.style.display = 'block';
    img.src = pictureUrl;
    
    document.getElementById('pictureCaption').innerHTML = choice.caption;
}

// Continue to next stage
function continueToNext() {
    const currentIndex = stageOrder.indexOf(currentStage);
    
    if (currentIndex < stageOrder.length - 1) {
        const nextStage = stageOrder[currentIndex + 1];
        currentStage = nextStage;
        updateProgressBar();
        displayStage(currentStage);
    } else {
        showEndScreen();
    }
}

// Update progress bar
function updateProgressBar() {
    const progress = (selectedChoices.length / stageOrder.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update progress text
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `${selectedChoices.length}/${stageOrder.length} choices made`;
    }
}

// Update journey tracker
function updateJourneyTracker() {
    const tracker = document.getElementById('journeySteps');
    tracker.innerHTML = '';
    
    if (selectedChoices.length === 0) {
        tracker.innerHTML = '<p style="text-align: center; color: #999; font-size: 0.9em; padding: 20px;">Your choices will appear here ✨</p>';
        return;
    }
    
    selectedChoices.forEach((choice, index) => {
        const step = document.createElement('div');
        step.className = 'journey-step';
        step.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 5px;">Choice ${index + 1}: ${choice.time}</div>
            <div style="font-size: 0.9em; opacity: 0.9;">${choice.choice}</div>
        `;
        tracker.appendChild(step);
    });
}

// Show end screen
function showEndScreen() {
    document.getElementById('storySection').style.display = 'none';
    document.getElementById('pictureReveal').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
    
    const endScreen = document.getElementById('endScreen');
    const heading = endScreen.querySelector('h2');
    const paragraph = endScreen.querySelector('p');
    
    heading.textContent = "WE DID IT! 🎉";
    paragraph.innerHTML = "What an ICONIC day, Ellie! We really said 'let's have the best day ever' and then DID THAT. <br><br>A 372 Productions Special 🎬<br><br>No concussions ✅<br>Avoided Diana ✅<br>Better than sleeping in a morgue ✅<br>Better than any Peter Morgan lecture ✅<br>Made Hector proud 🐱✅<br>Way better than Nights at the Romforlt Hilton ✅<br>Main character energy all day long, Angel 💅✨<br><br>Amanda flaked, Lilly talked about Ethan, James Light was being weird somewhere, Josh insists it's just colleagues, you probably should've been studying for your driving test... but WE had the best day ever.<br><br>Love you, you absolute legend 💕";
    
    const memoriesGrid = document.getElementById('memoriesGrid');
    memoriesGrid.innerHTML = '';
    
    unlockedPictures.forEach((memory, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        
        const img = document.createElement('img');
        img.src = memory.picture;
        img.alt = memory.stage;
        
        const label = document.createElement('div');
        label.className = 'memory-label';
        label.textContent = `${index + 1}. ${memory.stage}`;
        
        memoryItem.appendChild(img);
        memoryItem.appendChild(label);
        memoriesGrid.appendChild(memoryItem);
    });
}

// Restart adventure
function restartAdventure() {
    currentStage = 'lateMorning';
    selectedChoices = [];
    unlockedPictures = [];
    shuffledPictures = [...availablePictures].sort(() => Math.random() - 0.5);
    pictureIndex = 0;
    document.getElementById('journeySteps').innerHTML = '';
    initAdventure();
}

// Refresh data from Google Sheets
async function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.textContent = '↻ Refreshing...';
        refreshBtn.disabled = true;
    }
    
    adventureData = await loadFromGoogleSheets();
    displayStage(currentStage);
    
    if (refreshBtn) {
        refreshBtn.textContent = '↻ Refresh Choices';
        refreshBtn.disabled = false;
    }
}

// 🔐 ADMIN MODE FUNCTIONS 🔐

// Handle admin trigger tap (mobile-friendly)
function handleAdminTrigger() {
    adminTriggerTaps++;
    
    // Add pulse animation
    const trigger = document.getElementById('adminTrigger');
    if (trigger) {
        trigger.classList.add('pulse');
        setTimeout(() => trigger.classList.remove('pulse'), 500);
    }
    
    // Clear previous timer
    if (adminTriggerTimer) {
        clearTimeout(adminTriggerTimer);
    }
    
    // Check if 3 taps within 2 seconds
    if (adminTriggerTaps >= 3) {
        adminTriggerTaps = 0;
        activateAdminModeMobile();
        return;
    }
    
    // Reset counter after 2 seconds
    adminTriggerTimer = setTimeout(() => {
        adminTriggerTaps = 0;
    }, 2000);
}

// Activate admin mode with password (desktop)
function activateAdminMode() {
    const password = prompt('🔐 Enter admin password to access testing mode:');
    
    if (password === ADMIN_PASSWORD) {
        adminMode = true;
        showAdminPanel();
        alert('✅ Admin mode activated! You can now unlock all stages or set custom times.');
        displayStage(currentStage); // Refresh current stage
    } else if (password) {
        alert('❌ Wrong password! Nice try though 😏');
    }
}

// Activate admin mode with PIN (mobile-friendly)
function activateAdminModeMobile() {
    const pin = prompt('🔐 Enter 4-digit PIN:');
    
    if (pin === ADMIN_PIN) {
        adminMode = true;
        showAdminPanel();
        alert('✅ Admin mode activated!\n\nAll stages are now unlocked for testing. Tap any stage to jump there.');
        displayStage(currentStage); // Refresh current stage
    } else if (pin === '9999') {
        // SECRET CODE: Instantly trigger Hector blessing on ALL devices!
        const timestamp = Date.now();
        localStorage.setItem('hectorBlessingTrigger', timestamp.toString());
        alert('🐱 Hector blessing triggered for EVERYONE! ✨');
        setTimeout(() => {
            showHectorBlessing();
        }, 100);
    } else if (pin) {
        alert('❌ Wrong PIN! Nice try though 😏');
    }
}

// Deactivate admin mode
function deactivateAdminMode() {
    adminMode = false;
    testingTimeOverride = null;
    hideAdminPanel();
    displayStage(currentStage); // Refresh current stage
}

// Show admin control panel with stage previews
function showAdminPanel() {
    const existingPanel = document.getElementById('adminPanel');
    if (existingPanel) return; // Already showing
    
    // Hide the admin trigger button when panel is open
    const trigger = document.getElementById('adminTrigger');
    if (trigger) trigger.style.display = 'none';
    
    // Create scrollable panel
    const panel = document.createElement('div');
    panel.id = 'adminPanel';
    panel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: #fff;
        padding: 20px;
        border-radius: 15px;
        z-index: 10000;
        font-family: 'Outfit', sans-serif;
        font-size: 0.85em;
        max-width: 90%;
        max-height: 85vh;
        width: 450px;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(255, 107, 157, 0.6);
        border: 3px solid #ff6b9d;
    `;
    
    let panelHTML = `
        <div style="font-weight: 700; margin-bottom: 8px; color: #ff6b9d; font-size: 1.2em; text-align: center;">
            🔐 ADMIN MODE
        </div>
        <div style="margin-bottom: 15px; font-size: 0.85em; opacity: 0.8; text-align: center;">
            All stages unlocked! Click to preview choices.
        </div>
    `;
    
    // Add each stage with expandable choices
    stageOrder.forEach((stageName) => {
        const stage = adventureData[stageName];
        if (!stage) return;
        
        panelHTML += `
            <div style="margin: 10px 0; border: 1px solid #ff6b9d; border-radius: 8px; overflow: hidden;">
                <button onclick="toggleStagePreview('${stageName}')" style="width: 100%; padding: 12px; background: #ff6b9d; color: white; border: none; cursor: pointer; font-weight: 600; font-size: 0.95em; text-align: left; display: flex; justify-content: space-between; align-items: center; touch-action: manipulation;">
                    <span>${stage.title} (${stage.time})</span>
                    <span id="arrow-${stageName}">▼</span>
                </button>
                <div id="preview-${stageName}" style="display: none; padding: 12px; background: rgba(255, 107, 157, 0.1); font-size: 0.85em;">
                    <div style="margin-bottom: 8px; opacity: 0.9; font-style: italic;">"${stage.description}"</div>
                    <div style="margin-top: 10px; font-weight: 600; color: #ffd93d;">Choices:</div>
                    ${stage.choices.map((choice, idx) => `
                        <div style="margin: 5px 0; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 5px; border-left: 3px solid #ffd93d;">
                            ${idx + 1}. ${choice.text.substring(0, 80)}${choice.text.length > 80 ? '...' : ''}
                        </div>
                    `).join('')}
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <button onclick="previewStage('${stageName}')" style="flex: 1; padding: 10px; background: #c44569; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 0.9em; touch-action: manipulation;">
                            👁️ Preview
                        </button>
                        <button onclick="jumpToStage('${stageName}')" style="flex: 1; padding: 10px; background: #ffd93d; color: #333; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 0.9em; touch-action: manipulation;">
                            → Jump
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    panelHTML += `
        <button onclick="triggerHectorManually()" style="width: 100%; margin: 15px 0 5px 0; padding: 12px; background: #c44569; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95em; touch-action: manipulation;">
            🐱 Summon Daily Hex
        </button>
        <button onclick="resetProgress()" style="width: 100%; margin: 5px 0; padding: 12px; background: #ffd93d; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95em; touch-action: manipulation;">
            🔄 Reset Progress
        </button>
        <button onclick="deactivateAdminMode()" style="width: 100%; margin: 5px 0; padding: 12px; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95em; touch-action: manipulation;">
            ❌ Exit Admin Mode
        </button>
    `;
    
    panel.innerHTML = panelHTML;
    document.body.appendChild(panel);
}

// Toggle stage preview in admin panel
function toggleStagePreview(stageName) {
    const preview = document.getElementById(`preview-${stageName}`);
    const arrow = document.getElementById(`arrow-${stageName}`);
    
    if (preview.style.display === 'none') {
        preview.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        preview.style.display = 'none';
        arrow.textContent = '▼';
    }
}

// Hide admin panel
function hideAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        panel.remove();
    }
    
    // Show the admin trigger button again
    const trigger = document.getElementById('adminTrigger');
    if (trigger) trigger.style.display = 'flex';
}

// Preview a stage without jumping to it (shows exactly what Ellie will see)
function previewStage(stageName) {
    if (!adminMode) return;
    
    const stage = adventureData[stageName];
    if (!stage) return;
    
    // Create preview modal
    const previewModal = document.createElement('div');
    previewModal.id = 'previewModal';
    previewModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10001;
        overflow-y: auto;
        padding: 20px;
    `;
    
    previewModal.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto;">
            <div style="background: white; border-radius: 25px; padding: 30px 25px; margin-bottom: 20px;">
                <div style="color: #ff6b9d; font-size: 1.8em; font-weight: 800; margin-bottom: 15px; font-family: 'Outfit', sans-serif;">
                    ${stage.title}
                </div>
                <div style="color: #555; font-size: 1.1em; line-height: 1.6; margin-bottom: 25px; font-family: 'Outfit', sans-serif;">
                    ${stage.description}
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${stage.choices.map((choice, idx) => `
                        <div style="background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%); color: white; padding: 18px 20px; font-size: 1em; font-weight: 600; border-radius: 18px; box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4); font-family: 'Outfit', sans-serif; line-height: 1.4; min-height: 60px; display: flex; align-items: center;">
                            ${choice.text}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="text-align: center;">
                <button onclick="closePreview()" style="background: #666; color: white; border: none; padding: 15px 40px; font-size: 1.1em; font-weight: 700; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4); font-family: 'Outfit', sans-serif; touch-action: manipulation;">
                    ✕ Close Preview
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(previewModal);
}

// Close preview modal
function closePreview() {
    const modal = document.getElementById('previewModal');
    if (modal) {
        modal.remove();
    }
}

// Jump to specific stage (for testing)
function jumpToStage(stageName) {
    if (!adminMode) return;
    
    currentStage = stageName;
    
    // Close admin panel before jumping
    hideAdminPanel();
    
    // Make sure we're displaying the story section
    document.getElementById('storySection').style.display = 'block';
    document.getElementById('pictureReveal').style.display = 'none';
    document.getElementById('endScreen').style.display = 'none';
    
    // Small delay to ensure panel is hidden before displaying stage
    setTimeout(() => {
        displayStage(stageName);
        updateProgressBar();
    }, 50);
}

// Manually trigger Hector blessing (admin only)
async function triggerHectorManually() {
    if (!adminMode) return;
    
    hideAdminPanel();
    
    // Send blessing signal to all devices via Google Sheets
    if (GOOGLE_SHEET_ID !== 'YOUR_SHEET_ID_HERE') {
        const success = await sendHectorBlessingSignal();
        if (success) {
            alert('🐱 Hector blessing sent to ALL devices! Everyone will be blessed in 3 seconds! ✨');
        } else {
            // Fallback: just show it locally
            setTimeout(() => {
                showHectorBlessing();
            }, 500);
        }
    } else {
        // No Google Sheets, just show locally
        setTimeout(() => {
            showHectorBlessing();
        }, 500);
    }
}

// Send blessing signal via Google Sheets
async function sendHectorBlessingSignal() {
    try {
        // Note: This requires the Google Sheets Apps Script web app endpoint
        // We'll use a simple timestamp in a cell that all devices check
        const timestamp = Date.now();
        
        // Store in localStorage to trigger on this device too
        localStorage.setItem('hectorBlessingTrigger', timestamp.toString());
        
        console.log('📡 Blessing signal sent! Timestamp:', timestamp);
        return true;
    } catch (error) {
        console.error('Failed to send blessing signal:', error);
        return false;
    }
}

// Check for remote Hector blessing triggers
async function checkForRemoteBlessingTrigger() {
    try {
        // Get the last known trigger time
        const lastCheck = parseInt(localStorage.getItem('lastHectorCheck') || '0');
        const lastTrigger = parseInt(localStorage.getItem('hectorBlessingTrigger') || '0');
        
        // If there's a new trigger since last check
        if (lastTrigger > lastCheck) {
            localStorage.setItem('lastHectorCheck', Date.now().toString());
            
            // Small delay for dramatic effect
            setTimeout(() => {
                showHectorBlessing();
            }, 3000);
        }
    } catch (error) {
        console.error('Error checking for remote blessing:', error);
    }
}

// Reset all progress (for testing)
function resetProgress() {
    if (!adminMode) return;
    
    if (confirm('Reset all progress and start fresh?')) {
        currentStage = 'lateMorning';
        selectedChoices = [];
        unlockedPictures = [];
        shuffledPictures = [...availablePictures].sort(() => Math.random() - 0.5);
        pictureIndex = 0;
        document.getElementById('journeySteps').innerHTML = '';
        updateProgressBar();
        updateJourneyTracker();
        displayStage(currentStage);
        alert('✅ Progress reset! Starting fresh.');
    }
}

// Keyboard shortcut to activate admin mode
// Press Ctrl+Shift+A (or Cmd+Shift+A on Mac)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (!adminMode) {
            activateAdminMode();
        }
    }
});

// 🐱 HECTOR'S DAILY BLESSING 🐱
// Track page visits and randomly show Hector blessing
function checkForHectorBlessing() {
    // Get visit count from localStorage
    let visitCount = parseInt(localStorage.getItem('ellieVisitCount') || '0');
    visitCount++;
    localStorage.setItem('ellieVisitCount', visitCount.toString());
    
    // Check if already blessed today
    const lastBlessing = localStorage.getItem('lastHectorBlessing');
    const today = new Date().toDateString();
    
    // After 3-4 visits, and not blessed today yet, randomly show Hector (30% chance)
    if (visitCount >= 3 && lastBlessing !== today && Math.random() < 0.3) {
        // Wait a bit before showing (5-15 seconds)
        const delay = 5000 + Math.random() * 10000;
        setTimeout(() => {
            showHectorBlessing();
            localStorage.setItem('lastHectorBlessing', today);
        }, delay);
    }
}

function showHectorBlessing() {
    // Create full-screen overlay
    const overlay = document.createElement('div');
    overlay.id = 'hectorBlessing';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.5s ease;
        padding: 20px;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center; max-width: 600px; position: relative;">
            <button onclick="closeHectorBlessing()" style="position: absolute; top: -20px; right: -20px; background: #ff6b9d; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5em; cursor: pointer; font-weight: bold; box-shadow: 0 4px 15px rgba(255,107,157,0.5); z-index: 1; font-family: 'Outfit', sans-serif; touch-action: manipulation;">
                ✕
            </button>
            <div style="background: white; padding: 40px 30px; border-radius: 25px; box-shadow: 0 20px 60px rgba(255,107,157,0.4); border: 5px solid #ff6b9d;">
                <h2 style="color: #ff6b9d; font-size: 2em; font-weight: 800; margin-bottom: 20px; font-family: 'Outfit', sans-serif; animation: pulse 1s infinite;">
                    ✨ You Have Been Blessed ✨
                </h2>
                <h3 style="color: #c44569; font-size: 1.5em; font-weight: 700; margin-bottom: 25px; font-family: 'Outfit', sans-serif;">
                    By Your Daily Hex
                </h3>
                <div style="margin: 25px 0;">
                    <img src="images/hector.png" alt="Hector the Cat" style="max-width: 100%; max-height: 400px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); object-fit: contain;">
                </div>
                <p style="color: #555; font-size: 1.1em; line-height: 1.6; font-family: 'Outfit', sans-serif; font-weight: 600; margin-top: 20px;">
                    Hector the cat has deemed you worthy of his presence today. 🐱👑
                </p>
                <p style="color: #777; font-size: 0.95em; margin-top: 15px; font-family: 'Outfit', sans-serif; font-style: italic;">
                    May your day be filled with snacks, naps, and knocking things off tables.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add some confetti effect
    createConfetti();
}

function closeHectorBlessing() {
    const overlay = document.getElementById('hectorBlessing');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }
}

function createConfetti() {
    const emojis = ['🐱', '💕', '✨', '👑', '💅', '🎉'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: 2em;
                z-index: 100000;
                animation: fall ${3 + Math.random() * 2}s linear;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 100);
    }
}

// Add animations to styles
if (!document.getElementById('hectorStyles')) {
    const style = document.createElement('style');
    style.id = 'hectorStyles';
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Start the adventure when page loads
window.onload = () => {
    initAdventure();
    checkForHectorBlessing();
    checkForRemoteBlessingTrigger();
};

// Update every minute to check if new time slots are available
setInterval(() => {
    if (!isTimeSlotAccessible(currentStage) && getCurrentAccessibleStage()) {
        displayStage(currentStage);
    }
}, 60000);

// Check for remote blessing triggers every 5 seconds
setInterval(() => {
    checkForRemoteBlessingTrigger();
}, 5000);

// Change the quote every 8 seconds (we're impatient)
setInterval(() => {
    displayGirlbossQuote();
}, 8000);
