const question = document.getElementById("question");
const subline = document.getElementById("subline");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const music = document.getElementById("music");
const hearts = document.getElementById("hearts");

let noCount = 0;

/* Hearts animation */
function spawnHeart(extra = false) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";

  const colors = ["#ff2e63", "#ff4d6d", "#ff6b81"];
  heart.style.background = colors[Math.floor(Math.random() * colors.length)];

  const duration = (extra ? 3 : 5) + Math.random() * 3;
  heart.style.animationDuration = duration + "s";

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(() => spawnHeart(false), 300);

/* YES */
yesBtn.addEventListener("click", () => {
  music.play();
  question.innerText = "Hehe… I knew it 😍💘";
  subline.innerText = "You just made my whole day.";
  result.classList.remove("hidden");

  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  for (let i = 0; i < 30; i++) {
    setTimeout(() => spawnHeart(true), i * 40);
  }
});

/* NO */
noBtn.addEventListener("click", () => {
  noCount++;

  const lines = [
    "No? 😳 Are you sure?",
    "Think again… please? 🥺",
    "Last chance 😏",
    "The No button is acting strange 😂",
    "Okay fine… you are my Valentine now 💘"
  ];

  subline.innerText = lines[Math.min(noCount - 1, lines.length - 1)];

  yesBtn.style.transform = `scale(${1 + noCount * 0.2})`;

  if (noCount >= 2) {
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * 80 + "%";
    noBtn.style.top = Math.random() * 80 + "%";
  }

  if (noCount >= 5) {
    yesBtn.click();
  }
});
