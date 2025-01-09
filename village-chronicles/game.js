let gameState = {
    day: 1,
    time: "Morning",
    currency: 0,
    inventory: [],
    villagers: ["Peanut", "Marshall", "Isabelle", "Tom", "Rosie", "Goldie", "Fauna", "Bob", "K.K.", "Blathers", "Lily", "Celia", "Muffy", "Jay", "Skye"],
    upgrades: { fishingRod: false },
    location: "Home",
    fishTypes: [
      { name: "Bass", rarity: 0.6 },
      { name: "Salmon", rarity: 0.4 },
      { name: "Trout", rarity: 0.3 },
      { name: "Carp", rarity: 0.5 },
      { name: "Catfish", rarity: 0.2 },
      { name: "Golden Carp", rarity: 0.1 }
    ],
    bugTypes: [
      { name: "Butterfly", rarity: 0.6 },
      { name: "Beetle", rarity: 0.4 },
      { name: "Dragonfly", rarity: 0.3 },
      { name: "Moth", rarity: 0.5 },
      { name: "Firefly", rarity: 0.2 },
      { name: "Golden Beetle", rarity: 0.1 }
    ]
  };

  function updateStatus() {
    document.getElementById("day").innerText = gameState.day;
    document.getElementById("time").innerText = gameState.time;
    document.getElementById("player-currency").innerText = gameState.currency;
  }

  function fish() {
    if (gameState.location !== "River") {
      document.getElementById("output").innerText = "You need to go to the River to fish.";
      return;
    }

    const catchChance = Math.random();
    const fish = gameState.fishTypes.find(f => catchChance <= f.rarity) || { name: "nothing" };

    if (fish.name !== "nothing") {
      gameState.inventory.push(fish.name);
      document.getElementById("output").innerText = `You caught a ${fish.name}!`;
      if (!gameState.upgrades.fishingRod && gameState.inventory.length >= 3) {
        unlockFishingRod();
      }
    } else {
      document.getElementById("output").innerText = "You didn't catch anything.";
    }
  }

  function catchBug() {
    if (gameState.location !== "Forest") {
      document.getElementById("output").innerText = "You need to go to the Forest to catch bugs.";
      return;
    }

    const catchChance = Math.random();
    const bug = gameState.bugTypes.find(b => catchChance <= b.rarity) || { name: "nothing" };

    if (bug.name !== "nothing") {
      gameState.inventory.push(bug.name);
      document.getElementById("output").innerText = `You caught a ${bug.name}!`;
    } else {
      document.getElementById("output").innerText = "You didn't catch anything.";
    }
  }

  function talkToVillager() {
    if (gameState.location !== "Village Square") {
      document.getElementById("output").innerText = "You need to go to the Village Square to talk to villagers.";
      return;
    }

    const villager = gameState.villagers[Math.floor(Math.random() * gameState.villagers.length)];
    const dialogues = [
      "Hi there! Nice day, isn't it?",
      "I've been working on my garden. Want to see it sometime?",
      "I just caught a huge fish! It was this big!",
      "Do you like music? I've been learning the guitar lately.",
      "You should visit the shop. They've got some cool stuff today!",
      "I heard there's a rare bug in the forest!",
      "Have you been fishing lately? The river's teeming with life!",
      "I baked some cookies earlier. Maybe I'll share next time!"
    ];
    const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)];

    document.getElementById("output").innerText = `${villager}: "${dialogue}"`;
  }

  function checkInventory() {
    const inventoryText = gameState.inventory.length ? gameState.inventory.join(", ") : "Your inventory is empty.";
    document.getElementById("output").innerText = `Inventory: ${inventoryText}`;
  }

  function visitShop() {
    if (gameState.location !== "Village Square") {
      document.getElementById("output").innerText = "You need to be in the Village Square to visit the shop.";
      return;
    }

    if (gameState.inventory.length === 0) {
      document.getElementById("output").innerText = "You have nothing to sell.";
      return;
    }

    let earnings = 0;
    gameState.inventory.forEach(item => {
      earnings += item.includes("Golden") ? 50 : 10; // Golden items are worth more
    });
    gameState.currency += earnings;
    gameState.inventory = [];

    document.getElementById("output").innerText = `You sold your items for ${earnings} currency!`;
    updateStatus();
  }

  function visitLocation(location) {
    gameState.location = location;
    document.getElementById("output").innerText = `You are now at the ${location}.`;
  }

  function unlockFishingRod() {
    gameState.upgrades.fishingRod = true;
    document.getElementById("output").innerText += "\nYou unlocked a new Fishing Rod! Your chances of catching fish have improved.";
  }

  function relaxAtHome() {
    if (gameState.location !== "Home") {
      document.getElementById("output").innerText = "You need to be at home to relax.";
      return;
    }

    gameState.time = "Morning";
    gameState.day += 1;
    document.getElementById("output").innerText = "You feel refreshed! A new day begins.";
    updateStatus();
  }

  function saveGame() {
    localStorage.setItem("VillageChroniclesSave", JSON.stringify(gameState));
    document.getElementById("output").innerText = "Game saved successfully!";
  }

  function loadGame() {
    const savedData = localStorage.getItem("VillageChroniclesSave");
    if (savedData) {
      gameState = JSON.parse(savedData);
      updateStatus();
      document.getElementById("output").innerText = "Game loaded successfully!";
    } else {
      document.getElementById("output").innerText = "No saved game found.";
    }
  }

  window.onload = loadGame;