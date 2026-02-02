const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");
const photoOrbit = document.getElementById("photoOrbit");

const messages = [
  "Wow. That button must be broken, because 'no' isn't allowed for you. 😌",
  "System error: You're too cute to say no. Please try again with 'Yes'. 💻❤️",
  "Nice try. But the universe has already shipped us together. 📦✨",
  "Warning: Clicking 'no' may result in unlimited cuddles as punishment. 🥺",
  "Plot twist: Every time you chase 'no', you just get closer to 'yes'. 😉",
];

const photoSources = [
  "Images/1.jpg",
  "Images/2.jpg",
  "Images/3.jpg",
  "Images/4.jpg",
  "Images/5.jpg",
  "Images/6.jpg",
  "Images/7.jpg",
  "Images/8.jpg",
  "Images/9.jpg",
  "Images/10.jpg",
  "Images/12.jpg",
  "Images/13.jpg",
  "Images/14.jpg",
  "Images/15.jpg",
];

let attempts = 0;

function updateSubtitle() {
  const index = attempts % messages.length;
  subtitle.textContent = messages[index];
}

function showFloatingPhotos() {
  if (!photoOrbit) return;

  // Clear any previous photos
  photoOrbit.innerHTML = "";

  // Decide how many photos (5 or 6)
  const count = 5 + Math.floor(Math.random() * 2);

  // Create a shuffled copy so we don't repeat images
  const shuffled = [...photoSources].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  selected.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "One of my favorite memories with you 💞";

    // Slight random scale tweak so they don't all look identical
    const scale = 0.92 + Math.random() * 0.16;
    img.style.transform = `scale(${scale})`;

    photoOrbit.appendChild(img);
  });

  photoOrbit.classList.remove("hidden");
}

function playfulNoEscape(event) {
  attempts += 1;
  updateSubtitle();

  // Shrink the "No" button gradually
  const shrinkFactor = Math.max(0.3, 1 - attempts * 0.12);
  noBtn.style.transform = `scale(${shrinkFactor})`;
  noBtn.style.opacity = shrinkFactor < 0.5 ? "0.5" : "0.8";

  // Randomly move the "No" button a bit within the container
  const maxOffset = 40;
  const offsetX = (Math.random() - 0.5) * maxOffset;
  const offsetY = (Math.random() - 0.5) * maxOffset;
  noBtn.style.position = "relative";
  noBtn.style.left = `${offsetX}px`;
  noBtn.style.top = `${offsetY}px`;

  // Grow the "Yes" button to make it more tempting
  const growFactor = 1 + attempts * 0.08;
  yesBtn.style.transform = `scale(${Math.min(growFactor, 1.6)})`;

  // Make text on yes progressively more dramatic
  if (attempts === 1) {
    yesBtn.textContent = "Just say yes 😏";
  } else if (attempts === 2) {
    yesBtn.textContent = "YES is the only correct answer 💘";
  } else if (attempts >= 3) {
    yesBtn.textContent = "YES YES YES! 💞";
  }

  // Prevent actual click on "No"
  event.preventDefault();
  event.stopPropagation();
}

if (noBtn) {
  noBtn.addEventListener("mouseenter", playfulNoEscape);
  noBtn.addEventListener("click", playfulNoEscape);
  noBtn.addEventListener("touchstart", playfulNoEscape, { passive: false });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    showFloatingPhotos();
  });
}

if (closeOverlay) {
  closeOverlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
}

