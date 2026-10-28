const SECRET_PASSWORD = "monu";

// ---------- SCREEN NAVIGATION ----------
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(screenId);
  if (nextScreen) {
    nextScreen.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- PASSWORD ----------
document.getElementById("passwordForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredPassword = document
    .getElementById("passwordInput")
    .value
    .trim()
    .toLowerCase();

  if (enteredPassword === SECRET_PASSWORD) {
    document.getElementById("passwordError").textContent = "";
    showScreen("introScreen");
    createHeartBurst();
  } else {
    document.getElementById("passwordError").textContent =
      "Wrong password, madam! 😂 Hint chaduvu properly!";
  }
});

// ---------- FLOATING HEARTS ----------
const heartsContainer = document.getElementById("hearts");

function createFloatingHeart() {
  const heart = document.createElement("span");
  const symbols = ["💗", "💕", "💖", "💞", "✨", "🌸"];

  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 20) + "px";

  const duration = 5 + Math.random() * 5;
  heart.style.animationDuration = duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createFloatingHeart, 650);

function createHeartBurst() {
  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 80);
  }
}

// ---------- LITTLE CONFESSIONS ----------
const memories = [
  "I miss your random talks that somehow turn into the funniest conversations. 😂",
  "I miss telling you the smallest things because somehow they become interesting with you.",
  "I miss the way you make me laugh even when I don't feel like smiling. 🥹",
  "Sometimes something funny happens and my first thought is: I HAVE TO TELL HER!",
  "And then I remember you're far away... distance, I have personal issues with you. 😭💗"
];

let memoryIndex = 0;

function nextMemory() {
  const text = document.getElementById("memoryText");
  const count = document.getElementById("memoryCount");
  const button = document.getElementById("memoryButton");

  if (memoryIndex < memories.length) {
    text.textContent = memories[memoryIndex];
    count.textContent =
      `Little confession ${memoryIndex + 1} of ${memories.length}`;

    memoryIndex++;
    createHeartBurst();

    if (memoryIndex === memories.length) {
      button.textContent = "Okay, now answer me 👀";
      button.onclick = () => showScreen("questionScreen");
    } else {
      button.textContent = "And another thing... 🥹";
    }
  } else {
    showScreen("questionScreen");
  }
}

// ---------- THE RUNAWAY NO BUTTON ----------
const noButton = document.getElementById("noButton");
const noMessage = document.getElementById("noMessage");

let noAttempts = 0;

const funnyMessages = [
  "AYO! Why are you trying to press NO?! 😭",
  "Wrong answer, madam. Try again. 😂",
  "The NO button has trust issues now. 🏃‍♀️",
  "STOP CHASING IT AND JUST MISS ME! 😭💗",
  "Even the button knows you miss me. 🤡",
  "Fine, you can catch me... but answer honestly! 👀"
];

function moveNoButton(event) {
  if (event) {
    event.preventDefault();
  }

  noAttempts++;

  // Move the button into a random visible position.
  noButton.classList.add("running");

  const margin = 12;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const maxX = Math.max(margin, window.innerWidth - buttonWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - buttonHeight - margin);

  const x = margin + Math.random() * (maxX - margin);
  const y = margin + Math.random() * (maxY - margin);

  noButton.style.left = x + "px";
  noButton.style.top = y + "px";

  const messageIndex = Math.min(noAttempts - 1, funnyMessages.length - 1);
  noMessage.textContent = funnyMessages[messageIndex];

  // After a few attempts, make the button give in.
  if (noAttempts >= 6) {
    noButton.textContent = "OKAY FINE, I MISS YOU 😭💗";
  }
}

// On computers, run away as the pointer approaches.
noButton.addEventListener("pointerenter", function (event) {
  if (event.pointerType === "mouse") {
    moveNoButton(event);
  }
});

// On phones, move away when touched.
noButton.addEventListener("touchstart", moveNoButton, {
  passive: false
});

// If she manages to click it, show a funny message anyway.
noButton.addEventListener("click", function () {
  noMessage.textContent =
    "NICE TRY 😂 You really chased that button instead of admitting you miss me!";
  noButton.textContent = "OKAY, I MISS YOU TOO 💗";
  noButton.classList.remove("running");
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.position = "";
});

// YES button surprise.
function sayYes() {
  noButton.classList.remove("running");
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.position = "";

  showScreen("yesScreen");
  createHeartBurst();
}

// ---------- RESTART ----------
function restartWebsite() {
  memoryIndex = 0;
  noAttempts = 0;

  document.getElementById("memoryText").textContent =
    "Tap below. I have a few things to confess.";

  document.getElementById("memoryCount").textContent =
    "Little confession 1 of 5";

  const memoryButton = document.getElementById("memoryButton");
  memoryButton.textContent = "Tell me 🥹";
  memoryButton.onclick = nextMemory;

  noButton.textContent = "NO 😈";
  noButton.classList.remove("running");
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.position = "";

  noMessage.textContent = "Try being honest for once. 😂";

  document.getElementById("passwordInput").value = "";
  showScreen("lockScreen");
}
