const changeTheme = (theme) => {
  if (theme === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }

  localStorage.setItem("data-theme", theme);
};

document.addEventListener("DOMContentLoaded", () => {
  const saveTheme = localStorage.getItem("selectTheme");
  if (saveTheme) {
    changeTheme(saveTheme);
  }
});

/*===================================================================================================*/

const diceAmountInput = document.getElementById("diceAmountInput");
const diceAmountDisplay = document.getElementById("diceAmountDisplay");
const rollBtn = document.getElementById("rollBtn");
const loopBtn = document.getElementById("loopBtn");
const resetBtn = document.getElementById("resetBtn");
const diceContainer = document.getElementById("diceContainer");
const rollsDisplay = document.getElementById("rollsDisplay");
const probabilityDisplay = document.getElementById("probabilityDisplay");

const dices = ["one", "two", "three", "four", "five", "six"];

let rolls = 1;
let diceAmount = 1;
let loopInterval = null;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const dicesAmount = () => {
  diceAmount = diceAmountInput.value;
  diceAmountDisplay.textContent = diceAmount;
  probabilityDisplay.textContent = diceAmount
};

const rollDice = () => {
  diceContainer.innerHTML = "";

  for (i = 0; i < diceAmount; i++) {
    const div = document.createElement("div");
    div.innerHTML = `<i class="fa-solid fa-dice-${dices[randomNumber(1, 6) - 1]} fa-2x"  style="color: var(--color-primary);"></i>`;

    diceContainer.appendChild(div);
  }

  rollsDisplay.textContent = rolls;
  rolls++;
};

diceAmountInput.addEventListener("input", () => {
  dicesAmount();
});

rollBtn.addEventListener("click", () => {
  diceContainer.innerHTML = "";
  rollDice();
});

loopBtn.addEventListener("click", () => {
  if (loopInterval === null) {
    loopInterval = setInterval(rollDice, 100);
    loopBtn.textContent = "[STOP]";
  } else {
    clearInterval(loopInterval);
    loopInterval = null;
    loopBtn.textContent = "[LOOP]";
  }
});

resetBtn.addEventListener("click", () => {
  rolls = 1;
  rollsDisplay.innerHTML = "0";
});

/*===================================================================================================*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bwBtn = document.getElementById("bwBtn");
const grayBtn = document.getElementById("grayBtn");
const rgbBtn = document.getElementById("rgbBtn");

const palleteDisplay = document.getElementById("palleteDisplay");
const imageAmount = document.getElementById("imageAmount");
const probabilityImageDisplay = document.getElementById(
  "probabilityImageDisplay",
);

const generateBtn = document.getElementById("generateBtn");
const loopImageBtn = document.getElementById("loopImageBtn");

let totalClicks = 0;
let loopImageInterval = null;
let selectMode = ["bw", "preto e branco"];
const probability = ["2^10.000", "256^10.000", "16.777.216^10.000"];

const pallete = {
  bw: () => {
    const value = Math.random() < 0.5 ? 0 : 255;
    return [value, value, value];
  },

  gray: () => {
    const value = getRandom(0, 255);
    return [value, value, value];
  },

  rgb: () => {
    const value1 = getRandom(0, 255);
    const value2 = getRandom(0, 255);
    const value3 = getRandom(0, 255);
    return [value1, value2, value3];
  },
};

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const genNoise = (mode) => {
  const imgData = ctx.createImageData(100, 100);
  const data = imgData.data;
  const getColor = pallete[mode];

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = getColor();
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;
  }

  totalClicks++;
  imageAmount.textContent = totalClicks;
  ctx.putImageData(imgData, 0, 0);
};

generateBtn.addEventListener("click", () => {
  genNoise(selectMode[0]);
});

genNoise(selectMode[0]);

bwBtn.addEventListener("click", () => {
  totalClicks = 0;
  imageAmount.textContent = totalClicks;
  selectMode = ["bw", "black_or_white"];
  palleteDisplay.textContent = selectMode[1];
  probabilityImageDisplay.textContent = probability[0];
  genNoise(selectMode[0]);
});

grayBtn.addEventListener("click", () => {
  totalClicks = 0;
  imageAmount.textContent = totalClicks;
  selectMode = ["gray", "gray_scale"];
  palleteDisplay.textContent = selectMode[1];
  probabilityImageDisplay.textContent = probability[1];
  genNoise(selectMode[0]);
});

rgbBtn.addEventListener("click", () => {
  totalClicks = 0;
  imageAmount.textContent = totalClicks;
  selectMode = ["rgb", "RGB"];
  palleteDisplay.textContent = selectMode[1];
  probabilityImageDisplay.textContent = probability[2];
  genNoise(selectMode[0]);
});

loopImageBtn.addEventListener("click", () => {
  if (loopImageInterval === null) {
    loopImageInterval = setInterval(() => genNoise(selectMode[0]), 100);
    loopImageBtn.textContent = "[STOP]";
  } else {
    clearInterval(loopImageInterval);
    loopImageInterval = null;
    loopImageBtn.textContent = "[LOOP]";
  }
});

/*===================================================================================================*/

const textDisplay = document.getElementById("textDisplay");
const generateTextBtn = document.getElementById("generateTextBtn");
const loopWordBtn = document.getElementById("loopWordBtn");

const sizeDisplay = document.getElementById("sizeDisplay");
const probDisplay = document.getElementById("probDisplay");

const alphabet = "abcdefghijklmnopqrstuvwxyz ";
const lenght = 86;

let loopWordInterval = null;

const genRandomText = (lenght) => {
  let result = "";

  for (let i = 0; i < lenght; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    result += alphabet[randomIndex];
  }

  textDisplay.textContent = result;
};

generateTextBtn.addEventListener("click", () => {
  genRandomText(lenght);
});

loopWordBtn.addEventListener("click", () => {
  if (loopWordInterval === null) {
    loopWordInterval = setInterval(() => genRandomText(lenght), 300);
    loopWordBtn.textContent = "[STOP]";
  } else {
    clearInterval(loopWordInterval);
    loopWordInterval = null;
    loopWordBtn.textContent = "[LOOP]";
  }
});
