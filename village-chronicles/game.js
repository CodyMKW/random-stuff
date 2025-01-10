const playerNameElement = document.getElementById('player-name');
const bellsElement = document.getElementById('bells');
const outputElement = document.getElementById('output');

let gameState = {
    playerName: '',
    bells: 100,
    inventory: {},
    fishingRod: null,
    bugNet: null,
    lastSave: Date.now(),
    currentEvent: null // To track ongoing events
};

const rodTypes = {
    'Basic Rod': { durability: 10, price: 100 },
    'Sturdy Rod': { durability: 25, price: 250 },
    'Pro Rod': { durability: 50, price: 500 }
};

const netTypes = {
    'Basic Net': { durability: 10, price: 80 },
    'Sturdy Net': { durability: 25, price: 200 },
    'Pro Net': { durability: 40, price: 400 }
};

const shopInventory = {
    'Basic Rod': 100, 'Sturdy Rod': 250, 'Pro Rod': 500,
    'Basic Net': 80, 'Sturdy Net': 200, 'Pro Net': 400,
    'Medicine': 150 // Added Medicine
};

const possibleVillagers = ['Bob', 'Alice', 'Charlie', 'Daisy', 'Patches', 'Poppy', 'Rosie', 'Tom', 'Goldie', 'Sheldon'];
const possibleGiftItems = ['Berry', 'Flower', 'Shell'];

// Function to save the game state to local storage
function saveGame() {
    localStorage.setItem('villageChroniclesSave', JSON.stringify(gameState));
    gameState.lastSave = Date.now();
    outputMessage("Game saved!", 'positive');
}

// Function to load the game state from local storage
function loadGame() {
    const savedGame = localStorage.getItem('villageChroniclesSave');
    if (savedGame) {
        gameState = JSON.parse(savedGame);
        outputMessage("Game loaded.", 'info');
    } else {
        const name = prompt("Welcome to Village Chronicles! What's your name?");
        gameState.playerName = name || 'Traveler';
        outputMessage(`Welcome, ${gameState.playerName}!`, 'positive');
        saveGame();
    }
    updateDisplay();
}

// Function to update the displayed game status
function updateDisplay() {
    playerNameElement.textContent = gameState.playerName;
    bellsElement.textContent = gameState.bells;
}

// Function to display a message in the output area
function outputMessage(message, type = '') {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    if (type) {
        messageElement.classList.add(type);
    }
    outputElement.appendChild(messageElement);
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Game actions
function forage() {
    const possibleItems = ['Berry', 'Twig', 'Stone', 'Flower', 'Mushroom', 'Shell', 'Feather'];
    const randomItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
    gameState.inventory[randomItem] = (gameState.inventory[randomItem] || 0) + 1;
    outputMessage(`You found a ${randomItem}!`, 'positive');
    updateDisplay();
}

function fish() {
    if (!gameState.fishingRod) {
        outputMessage("You need a fishing rod! Visit the shop to buy one.", 'negative');
        return;
    }

    gameState.fishingRod.durability--;
    if (gameState.fishingRod.durability <= 0) {
        outputMessage(`Your ${gameState.fishingRod.type} broke!`, 'negative');
        gameState.fishingRod = null;
        updateDisplay();
        return;
    }

    const rarityChance = Math.random();
    let caughtFish = 'Tiny Fish';
    if (gameState.fishingRod.type === 'Basic Rod' && rarityChance > 0.7) caughtFish = 'Small Fish';
    if (gameState.fishingRod.type === 'Sturdy Rod' && rarityChance > 0.5) caughtFish = 'Medium Fish';
    if (gameState.fishingRod.type === 'Pro Rod' && rarityChance > 0.3) caughtFish = 'Large Fish';
    if (gameState.fishingRod.type === 'Pro Rod' && rarityChance > 0.85) caughtFish = 'Rare Fish!';

    outputMessage(`You caught a ${caughtFish}!`, 'positive');
    gameState.inventory[caughtFish] = (gameState.inventory[caughtFish] || 0) + 1;
    updateDisplay();
}

function catchBugs() {
    if (!gameState.bugNet) {
        outputMessage("You need a bug net! Visit the shop to buy one.", 'negative');
        return;
    }

    gameState.bugNet.durability--;
    if (gameState.bugNet.durability <= 0) {
        outputMessage(`Your ${gameState.bugNet.type} broke!`, 'negative');
        gameState.bugNet = null;
        updateDisplay();
        return;
    }

    const rarityChance = Math.random();
    let caughtBug = 'Common Butterfly';
    if (gameState.bugNet.type === 'Basic Net' && rarityChance > 0.7) caughtBug = 'Grasshopper';
    if (gameState.bugNet.type === 'Sturdy Net' && rarityChance > 0.5) caughtBug = 'Monarch Butterfly';
    if (gameState.bugNet.type === 'Pro Net' && rarityChance > 0.3) caughtBug = 'Mantis';
    if (gameState.bugNet.type === 'Pro Net' && rarityChance > 0.85) caughtBug = 'Rare Beetle!';

    outputMessage(`You caught a ${caughtBug}!`, 'positive');
    gameState.inventory[caughtBug] = (gameState.inventory[caughtBug] || 0) + 1;
    updateDisplay();
}

function checkInventory() {
    outputMessage("Inventory:", 'info');
    for (const item in gameState.inventory) {
        outputMessage(`- ${item}: ${gameState.inventory[item]}`, 'info');
    }
    if (gameState.fishingRod) {
        outputMessage(`- Equipped Fishing Rod: ${gameState.fishingRod.type} (Durability: ${gameState.fishingRod.durability})`, 'info');
    } else {
        outputMessage("- No fishing rod equipped.", 'info');
    }
    if (gameState.bugNet) {
        outputMessage(`- Equipped Bug Net: ${gameState.bugNet.type} (Durability: ${gameState.bugNet.durability})`, 'info');
    } else {
        outputMessage("- No bug net equipped.", 'info');
    }
    if (Object.keys(gameState.inventory).length === 0 && !gameState.fishingRod && !gameState.bugNet) {
        outputMessage("Your inventory is empty.", 'info');
    }
}

function sellItem() {
    const inventoryItems = Object.keys(gameState.inventory);
    if (inventoryItems.length === 0) {
        outputMessage("Your inventory is empty. Nothing to sell.", 'negative');
        return;
    }

    const itemToSell = prompt(`What item do you want to sell? (Available: ${inventoryItems.join(', ')})`);
    if (!itemToSell) return;

    if (!gameState.inventory.hasOwnProperty(itemToSell)) {
        outputMessage(`You don't have any ${itemToSell} to sell.`, 'negative');
        return;
    }

    const quantityToSell = parseInt(prompt(`How many ${itemToSell} do you want to sell?`), 10);
    if (isNaN(quantityToSell) || quantityToSell <= 0) {
        outputMessage("Invalid quantity.", 'negative');
        return;
    }

    if (quantityToSell > gameState.inventory[itemToSell]) {
        outputMessage(`You only have ${gameState.inventory[itemToSell]} ${itemToSell}.`, 'negative');
        return;
    }

    const sellPrice = 25;
    const totalPrice = sellPrice * quantityToSell;

    gameState.inventory[itemToSell] -= quantityToSell;
    if (gameState.inventory[itemToSell] === 0) {
        delete gameState.inventory[itemToSell];
    }
    gameState.bells += totalPrice;
    outputMessage(`Sold ${quantityToSell} ${itemToSell} for ${totalPrice} Bells.`, 'positive');
    updateDisplay();
}

function giftItemPrompt() {
    const inventoryItems = Object.keys(gameState.inventory);
    if (inventoryItems.length === 0) {
        outputMessage("Your inventory is empty. Nothing to gift.", 'info');
        return;
    }
    const itemToGift = prompt(`What item do you want to gift? (Available: ${inventoryItems.join(', ')})`);
    if (!itemToGift || !gameState.inventory.hasOwnProperty(itemToGift)) {
        outputMessage("Invalid item.", 'negative');
        return;
    }
    const quantityToGift = parseInt(prompt(`How many ${itemToGift}(s) do you want to gift?`), 10);
    if (isNaN(quantityToGift) || quantityToGift <= 0 || quantityToGift > gameState.inventory[itemToGift]) {
        outputMessage("Invalid quantity.", 'negative');
        return;
    }
    const villagerToGift = prompt(`Which villager do you want to gift ${quantityToGift} ${itemToGift}(s) to? (${possibleVillagers.join(', ')})`);
    if (!villagerToGift || !possibleVillagers.includes(villagerToGift)) {
        outputMessage("Invalid villager.", 'negative');
        return;
    }
    gameState.inventory[itemToGift] -= quantityToGift;
    if (gameState.inventory[itemToGift] === 0) delete gameState.inventory[itemToGift];
    outputMessage(`You gifted ${quantityToGift} ${itemToGift}(s) to ${villagerToGift}.`, 'positive');
    updateDisplay();
}

function talkToVillager() {
    const randomVillager = possibleVillagers[Math.floor(Math.random() * possibleVillagers.length)];
    const playerName = gameState.playerName; // For easier use in dialogue

    const genericDialogues = [
        `Nice weather today, isn't it, ${playerName}?`,
        "Have you found any good items lately?",
        "I heard there's a rare bug around here somewhere.",
        `Welcome to the village, ${playerName}!`,
        "Hello there!",
        "What brings you to this part of the village?",
        "I'm just enjoying the peace and quiet.",
        "Did you see that shooting star last night?",
        "The flowers are blooming beautifully this season.",
        "Have you been fishing recently?"
    ];

    const villagerDialogues = {
        'Bob': [
            `Hey there, buddy, ${playerName}!`,
            "Catch any good fish lately, pal?",
            "This village is the best, you know?",
            "Need any tips on relaxing?",
            "Keep it cool!"
        ],
        'Alice': [
            `Oh, hello dear, ${playerName}!`,
            "Have you seen my watering can anywhere?",
            "The garden needs tending to, you know.",
            "Would you like some tea sometime?",
            "Take care, sweetie."
        ],
        'Charlie': [
            `Greetings, ${playerName}.`,
            "I'm contemplating the mysteries of the universe.",
            "Have you observed the migratory patterns of the local birds?",
            "Knowledge is a powerful tool.",
            "Farewell."
        ],
        'Daisy': [
            "Woof woof!",
            `Did you bring any treats, ${playerName}?`,
            "Let's play fetch!",
            "I love belly rubs!",
            "*happy tail wags*"
        ],
        'Patches': [
            "Mrow?",
            "Have you seen any yarn balls around?",
            "A nap sounds wonderful right now.",
            "*purrs*",
            "Don't touch my favorite spot!"
        ],
        'Poppy': [
            "Cheep cheep!",
            `Look at the pretty flowers, ${playerName}!`,
            "I love to sing!",
            "Let's build a nest!",
            "Seeds are yummy!"
        ],
        'Rosie': [
            `Hello, ${playerName}! How are you today?`,
            "Isn't this village lovely?",
            "I enjoy chatting with everyone.",
            "What have you been up to?",
            "Have a wonderful day!"
        ],
        'Tom': [
            "Yo.",
            "Anything interesting happening?",
            "Leave me alone, I'm trying to think.",
            "Whatever.",
            "See ya."
        ],
        'Goldie': [
            `Bow-wow! Hi there, ${playerName}!`,
            "Let's go for a walk!",
            "Have you seen any squirrels?",
            "I love making new friends!",
            "Come visit me anytime!"
        ],
        'Sheldon': [
            `Greetings, citizen, ${playerName}!`,
            "Have you completed your daily exercises?",
            "Physical fitness is important!",
            "One must always strive for peak performance!",
            "Stay strong!"
        ]
    };

    let dialogue;
    if (villagerDialogues.hasOwnProperty(randomVillager)) {
        dialogue = villagerDialogues[randomVillager][Math.floor(Math.random() * villagerDialogues[randomVillager].length)];
    } else {
        dialogue = genericDialogues[Math.floor(Math.random() * genericDialogues.length)];
    }

    // Chance to receive an item
    if (Math.random() < 0.2) {
        const giftedItem = possibleGiftItems[Math.floor(Math.random() * possibleGiftItems.length)];
        gameState.inventory[giftedItem] = (gameState.inventory[giftedItem] || 0) + 1;
        outputMessage(`${randomVillager} gave you a ${giftedItem}!`, 'positive');
        updateDisplay();
    }

    // Random events
    if (Math.random() < 0.1) {
        if (Math.random() < 0.5) {
            gameState.currentEvent = { type: 'sick', villager: randomVillager };
            dialogue += `\n${randomVillager} doesn't look too good. "Oh dear, I think I'm feeling a bit unwell."`;
        }
        // Add more event types here
    } else if (gameState.currentEvent && gameState.currentEvent.type === 'sick' && gameState.currentEvent.villager === randomVillager) {
        dialogue += `\n${randomVillager} says, "Oh, I still feel a bit under the weather..."`;
    }

    outputMessage(`${randomVillager} says: "${dialogue}"`, 'info');
}

function visitShopPrompt() {
    const itemToBuy = prompt("What would you like to buy? (Type 'check' to see shop inventory)");
    if (!itemToBuy) return;

    if (itemToBuy.toLowerCase() === 'check') {
        checkShop();
        return;
    }

    if (shopInventory.hasOwnProperty(itemToBuy)) {
        const quantityToBuy = parseInt(prompt(`How many ${itemToBuy}(s) would you like to buy?`), 10);
        if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
            outputMessage("Invalid quantity.", 'negative');
            return;
        }

        const pricePerItem = shopInventory[itemToBuy];
        const totalPrice = pricePerItem * quantityToBuy;

        if (gameState.bells >= totalPrice) {
            gameState.bells -= totalPrice;
            if (itemToBuy.includes('Rod')) {
                gameState.fishingRod = { type: itemToBuy, durability: rodTypes[itemToBuy].durability };
                outputMessage(`You bought a ${itemToBuy}!`, 'positive');
            } else if (itemToBuy.includes('Net')) {
                gameState.bugNet = { type: itemToBuy, durability: netTypes[itemToBuy].durability };
                outputMessage(`You bought a ${itemToBuy}!`, 'positive');
            } else {
                gameState.inventory[itemToBuy] = (gameState.inventory[itemToBuy] || 0) + quantityToBuy;
                outputMessage(`You bought ${quantityToBuy} ${itemToBuy}(s)!`, 'positive');
            }
            updateDisplay();
        } else {
            outputMessage("Not enough Bells!", 'negative');
        }
    } else {
        outputMessage("Sorry, we don't have that item in stock.", 'negative');
    }
}

function checkShop() {
    outputMessage("Welcome to the Shop!", 'info');
    outputMessage("Available items for purchase:", 'info');
    for (const item in shopInventory) {
        outputMessage(`- ${item}: ${shopInventory[item]} Bells`, 'info');
    }
}

function showHelp() {
    outputMessage("Welcome to Village Chronicles!", 'info');
    outputMessage("Explore your village, collect items, fish, catch bugs, and chat with villagers.", 'info');
    outputMessage("Available actions:", 'info');
    outputMessage("- **Forage:** Find random items in the village.", 'info');
    outputMessage("- **Fish:** Try to catch fish using a fishing rod.", 'info');
    outputMessage("- **Catch Bugs:** Try to catch bugs using a bug net.", 'info');
    outputMessage("- **Inventory:** Check the items you have collected and your tools.", 'info');
    outputMessage("- **Sell Item(s):** Sell your collected items for Bells.", 'info');
    outputMessage("- **Talk to Villager:** Interact with the residents of the village.", 'info');
    outputMessage("- **Gift Item:** Give an item to a villager.", 'info');
    outputMessage("- **Visit Shop:** Buy tools and other items.", 'info');
    outputMessage("- **Check Shop:** See what items are available for purchase.", 'info');
    outputMessage("- **Save Game:** Manually save your current progress.", 'info');
    outputMessage("Your progress is saved to your browser's local storage.", 'info');
}

// Load the game when the page loads
window.onload = loadGame;