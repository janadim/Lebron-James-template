"use strict";
// Global const and variables
const canvas = document.querySelector(".canvas");
const canvasText = document.querySelector(".canvasText");
const canvasPlayer = document.querySelector(".canvasPlayer");
const canvasPlayerEffect = document.querySelector(".canvasPlayerEffect");
const ctx = canvas.getContext("2d");
const ctx2 = canvasText.getContext("2d");
const ctx3 = canvasPlayer.getContext("2d");
const ctx4 = canvasPlayerEffect.getContext("2d");
const pathImages = "./images/";
const typeImages = ".png";

let toggleColorText = 0;
let togglePlayerOpacity = 1;
let animationRunning = false;
let sparkles = [];
let sparkleCache = [];
let playerEffectCache = [];

const bgSelector = document.querySelector(".bg");
const colorSelector = document.querySelector(".color");
const opacitySelector = document.querySelector(".opacity");
const animationSelector = document.querySelector(".animation");
const containerBg = document.querySelector(".container");

const contentTemplate = [
  {
    type: "text",
    content: "I think team first.",
    font: "45px GlossAndBloom",
    dx: 110,
    dy: 200,
  },
  {
    type: "text",
    content: "It allows me",
    font: "60px FjallaOneRegular",
    dx: 130,
    dy: 265,
  },
  {
    type: "text",
    content: "to succeed",
    font: "60px BoxedHeavy",
    dx: 210,
    dy: 310,
  },
  {
    type: "text",
    content: "- Lebron James -",
    font: "30px Finition",
    dx: 260,
    dy: 350,
  },
  {
    type: "image",
    path: pathImages + "shine" + typeImages,
    dx: 317,
    dy: 0,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "cristals" + typeImages,
    dx: 200,
    dy: 300,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "outline" + typeImages,
    dx: 47,
    dy: 33,
    opacity: 0.2,
  },
  {
    type: "image",
    path: pathImages + "outline1" + typeImages,
    dx: 47,
    dy: 33,
    opacity: 0.2,
  },
  {
    type: "image",
    path: pathImages + "blueshade" + typeImages,
    dx: 205,
    dy: 0,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "smallfigure" + typeImages,
    dx: 510,
    dy: 90,
    opacity: 1,
  },
  {
    type: "image_player",
    path: pathImages + "playercontrast" + typeImages,
    dx: 102,
    dy: 0,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "bigfigure" + typeImages,
    dx: 713,
    dy: 42,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "quotes" + typeImages,
    dx: 230,
    dy: 90,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "smoke" + typeImages,
    dx: 92,
    dy: -10,
    opacity: 0.2,
  },
  {
    type: "image",
    path: pathImages + "cristals" + typeImages,
    dx: 225,
    dy: 160,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "cristals1" + typeImages,
    dx: 225,
    dy: 160,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "yellowcristals" + typeImages,
    dx: 420,
    dy: 200,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "yellowcristals1" + typeImages,
    dx: 418,
    dy: 200,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "bluesmoke" + typeImages,
    dx: 270,
    dy: 90,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "stars1" + typeImages,
    dx: 420,
    dy: 290,
    opacity: 1,
  },
  {
    type: "image",
    path: pathImages + "stars" + typeImages,
    dx: 786,
    dy: 230,
    opacity: 1,
  },

  {
    type: "image",
    path: pathImages + "shineblue" + typeImages,
    dx: 618,
    dy: 0,
    opacity: 1,
  },
  {
    type: "image_player_effect",
    path: pathImages + "yellowstars1" + typeImages,
    dx: 513,
    dy: 249,
    opacity: 1,
  },

  {
    type: "image_player_effect",
    path: pathImages + "yellowstars" + typeImages,
    dx: 844,
    dy: 246,
    opacity: 1,
  },

  {
    type: "image",
    path: pathImages + "frameshadow" + typeImages,
    dx: 0,
    dy: 0,
    opacity: 1,
  },
];

// Load functions
function loadImage(imObj) {
  var image = new Image();
  image.onload = function () {
    ctx.globalAlpha = imObj.opacity;
    ctx.drawImage(image, imObj.dx, imObj.dy);
  };
  image.src = imObj.path;
}

function loadImagePlayer(imObj) {
  var image = new Image();
  image.onload = function () {
    ctx3.globalAlpha = togglePlayerOpacity;
    ctx3.drawImage(image, imObj.dx, imObj.dy);
  };
  image.src = imObj.path;
}

function loadImagePlayerEffect(imObj) {
  var image = new Image();
  image.onload = function () {
    playerEffectCache.push({
      image: image,
      dx: imObj.dx,
      dy: imObj.dy,
      opacity: imObj.opacity,
    });
    // Draw immediately if not animating
    if (!animationRunning) {
      ctx4.globalAlpha = imObj.opacity;
      ctx4.drawImage(image, imObj.dx, imObj.dy);
    }
  };
  image.src = imObj.path;
}

function loadText(txObj) {
  ctx2.font = txObj.font;
  ctx2.fillStyle = toggleColorText ? "rgb(253, 204, 36)" : "white";
  ctx2.fillText(txObj.content, txObj.dx, txObj.dy);
}

function render() {
  playerEffectCache = [];
  ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
  for (let i = 0; i < contentTemplate.length; i++) {
    if (contentTemplate[i].type == "image") {
      loadImage(contentTemplate[i]);
    } else if (contentTemplate[i].type == "image_player_effect") {
      loadImagePlayerEffect(contentTemplate[i]);
    } else if (contentTemplate[i].type == "image_player") {
      loadImagePlayer(contentTemplate[i]);
    } else {
      loadText(contentTemplate[i]);
    }
  }
}

function reRender() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
  ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
  ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
  render();
  drawPlayerEffects();
}

function createSparkle() {
  return {
    x: Math.random() * canvasPlayerEffect.width,
    y: Math.random() * canvasPlayerEffect.height,
    radius: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5,
    speedY: Math.random() * 0.5 + 0.2,
  };
}

function animateSparkles() {
  if (!animationRunning) return;

  ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
  drawPlayerEffects();

  sparkles.forEach((sparkle) => {
    ctx4.beginPath();
    ctx4.globalAlpha = sparkle.opacity;
    ctx4.arc(sparkle.x, sparkle.y, sparkle.radius, 0, Math.PI * 2);
    ctx4.fillStyle = "yellow";
    ctx4.fill();

    sparkle.y += sparkle.speedY;
    if (sparkle.y > canvasPlayerEffect.height) {
      sparkle.y = 0;
      sparkle.x = Math.random() * canvasPlayerEffect.width;
    }
  });

  ctx4.globalAlpha = 1;
  requestAnimationFrame(animateSparkles);
}

function drawPlayerEffects() {
  for (let obj of playerEffectCache) {
    ctx4.globalAlpha = obj.opacity;
    ctx4.drawImage(obj.image, obj.dx, obj.dy);
  }
  ctx4.globalAlpha = 1;
}

// State persistence
function persistCheckboxState(selector, key, callback) {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    selector.checked = saved === "true";
    callback();
  }

  selector.addEventListener("change", () => {
    localStorage.setItem(key, selector.checked);
    callback();
  });
}

persistCheckboxState(bgSelector, "bgSelector", () => {
  containerBg.classList.toggle("altBg", bgSelector.checked);
  reRender();
});

persistCheckboxState(colorSelector, "colorSelector", () => {
  toggleColorText = colorSelector.checked ? 1 : 0;
  reRender();
});

persistCheckboxState(opacitySelector, "opacitySelector", () => {
  togglePlayerOpacity = opacitySelector.checked ? 0.75 : 1;
  reRender();
});

persistCheckboxState(animationSelector, "animationSelector", () => {
  if (animationSelector.checked) {
    startAnimation();
  } else {
    stopAnimation();
  }
});

// Animation control
function startAnimation() {
  animationRunning = true;
  sparkles = Array.from({ length: 100 }, createSparkle);
  animateSparkles();
}

function stopAnimation() {
  animationRunning = false;
  ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
  drawPlayerEffects();
}

// Initial render
window.onload = () => {
  render();
  if (bgSelector.checked) containerBg.classList.add("altBg");
  if (colorSelector.checked) toggleColorText = 1;
  if (opacitySelector.checked) togglePlayerOpacity = 0.75;
  if (animationSelector.checked) startAnimation();
};
