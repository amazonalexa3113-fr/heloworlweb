const bro = document.getElementById("32bit");
const secretfile = document.getElementById("secret32bitfile");

bro.style.display = "none";
secretfile.style.display = "none";

let value = Number(localStorage.getItem("32bitValue")) || 0;
// let value = 4294967294;
let gameRunning = false;
let gamePaused = false;
let gameTimer = null;

function getSigned32Bit(val) {
  return val | 0;
}

function saveValue() {
  localStorage.setItem("32bitValue", String(value >>> 0));
}

function draw32Bit() {
  bro.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent =
    "32 bits, every millisecond it increments by 1, reach 0xFFFFFFFF to win.";
  bro.appendChild(title);

  const valDisplay = document.createElement("div");
  valDisplay.id = "valDisplay";
  valDisplay.style.cssText =
    "font-family: monospace; font-size: 1.2rem; margin-bottom: 15px;";
  bro.appendChild(valDisplay);

  const bitDisplay = document.createElement("div");
  bitDisplay.id = "bitDisplay";

  for (let i = 0; i < 32; i++) {
    const bitIndex = 31 - i;
    const bitBox = document.createElement("span");

    bitBox.className = "bit";
    bitBox.dataset.bit = bitIndex;

    bitBox.addEventListener("click", () => {
      if (gamePaused) return;

      value = (value ^ (1 << bitIndex)) >>> 0;
      saveValue();
      updateDisplay();
    });

    bitDisplay.appendChild(bitBox);
  }

  bro.appendChild(bitDisplay);

  const status = document.createElement("p");
  status.id = "bitStatus";
  bro.appendChild(status);

  const pauseButton = document.createElement("button");
  pauseButton.id = "pauseButton";
  pauseButton.addEventListener("click", togglePause);
  bro.appendChild(pauseButton);

  updateDisplay();
}

function updateDisplay() {
  const valDisplay = document.getElementById("valDisplay");
  const status = document.getElementById("bitStatus");
  const pauseButton = document.getElementById("pauseButton");
  const bitBoxes = document.querySelectorAll("#bitDisplay .bit");

  if (!valDisplay || !status || !pauseButton) return;

  valDisplay.innerHTML = `
    <strong>unsigned int:</strong> ${value >>> 0}<br>
    <strong>signed int (2's complement):</strong> ${getSigned32Bit(value)}<br>
    <strong>hex:</strong> 0x${(value >>> 0).toString(16).padStart(8, "0").toUpperCase()}
  `;

  const binaryStr = (value >>> 0).toString(2).padStart(32, "0");
  const onesCount = (binaryStr.match(/1/g) || []).length;

  status.textContent = gamePaused
    ? `${onesCount} / 32 bits are set (1) — PAUSED`
    : `${onesCount} / 32 bits are set (1)`;

  pauseButton.textContent = gamePaused ? "resume" : "pause";

  bitBoxes.forEach((bitBox) => {
    const bitIndex = Number(bitBox.dataset.bit);
    const bitVal = (value >>> bitIndex) & 1;

    bitBox.className = `bit ${bitVal ? "one" : "zero"}`;
    bitBox.textContent = bitVal;
  });
}

function flipbit() {
  if (!gameRunning || gamePaused) return;

  value = (value + 1) >>> 0;

  saveValue();
  updateDisplay();

  if (value === 4294967295) {
    gameRunning = false;
    gamePaused = false;

    clearInterval(gameTimer);
    gameTimer = null;

    document.getElementById("bitStatus").textContent =
      "you won, are you this unemployed?";
    
    // the rest goes here
    secretfile.style.display = "block";
  }
}

function togglePause() {
  if (!gameRunning) return;

  if (gamePaused) {
    gamePaused = false;
    updateDisplay();

    setTimeout(() => {
      if (gameRunning && !gamePaused) {
        gameTimer = setInterval(flipbit, 1);
      }
    }, 500);
  } else {
    gamePaused = true;

    clearInterval(gameTimer);
    gameTimer = null;

    updateDisplay();
  }
}

function start32Bit() {
  if (gameRunning) return;

  value = Number(localStorage.getItem("32bitValue")) || 0;

  bro.style.display = "block";

  if (value === 4294967295) {
    gameRunning = false;
    gamePaused = false;

    draw32Bit();

    document.getElementById("bitStatus").textContent =
      "you already won, what now";

    return;
  }

  gameRunning = true;
  gamePaused = false;

  draw32Bit();

  gameTimer = setInterval(flipbit, 1);
}

/*
// the win screen test
function start32Bit() {
  if (gameRunning) return;

  value = 4294967294;

  bro.style.display = "block";

  if (value === 4294967295) {
    gameRunning = false;
    gamePaused = false;

    draw32Bit();

    document.getElementById("bitStatus").textContent =
      "you already won, what now";

    return;
  }

  gameRunning = true;
  gamePaused = false;

  draw32Bit();

  gameTimer = setInterval(flipbit, 1);
}
*/

window.start32Bit = start32Bit;