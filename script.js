const question = document.getElementById("question");
const subline = document.getElementById("subline");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const music = document.getElementById("music");
const hearts = document.getElementById("hearts");

let noCount = 0;

function spawnHeart(extra = false) {
  const heart = document.createElement("div");
  heart.className = "heart";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";

  const size = (extra ? 12 : 10) + Math.random() * (extra ? 22 : 18);
  heart.style.width = size + "px";
  heart.style.height = size + "px";

  const colors = ["#ff2e63", "#ff4d6d", "#ff6b81", "#ff1f6a"];
  heart.style.background = colors[Math.floor(Math.random() * colors.length)];

  const duration = (extra ? 3 : 4) + Math.random() * 4;
  heart.style.animationDuration = duration + "s";

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// floating hearts in background
setInterval(() => spawnHeart(false), 250);

// start music ONLY when yes is pressed
async function startMusic() {
  try {
    await music.play();
  } catch (e) {}
}

function showYesEnding() {
  question.innerText = "Hehe… I knew it 😍💘";
  subline.innerText = "You just made my whole day.";
  result.classList.remove("hidden");

  resultTitle.innerText = "Happy Valentine’s Day 💕";
  resultText.innerText =
    "Now come here… I need one hug + 100 kisses. Non-negotiable 😏💖";

  yesBtn.classList.add("hidden");
  noBtn.classList.add("hidden");

  for (let i = 0; i < 35; i++) {
    setTimeout(() => spawnHeart(true), i * 40);
  }
}

function moveNoButton() {
  noBtn.classList.add("absolute");

  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// YES button → play music
yesBtn.addEventListener("click", async () => {
  await startMusic();
  showYesEnding();
});

// NO button → NO MUSIC
noBtn.addEventListener("click", () => {
  noCount++;

  const lines = [
    "No? 😳 Are you sure?",
    "Think one more time… please? 🥺👉👈",
    "Last chance… I’ll get extra cute if you say yes 😏",
    "Okay okay… the No button is getting suspicious 😂",
    "Enough! You’re my Valentine now 😌💘"
  ];

  subline.innerText = lines[Math.min(noCount - 1, lines.length - 1)];

  const scale = 1 + Math.min(noCount * 0.15, 1.2);
  yesBtn.style.transform = `scale(${scale})`;

  if (noCount >= 2) moveNoButton();

  if (noCount >= 5) showYesEnding();
});

// desktop hover escape
noBtn.addEventListener("mouseenter", () => {
  if (noCount >= 2) moveNoButton();
});
