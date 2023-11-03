"use strict";
//Global const and variables definitions
const canvas = document.querySelector(".canvas");
const canvasText = document.querySelector(".canvasText");
const canvasPlayer = document.querySelector(".canvasPlayer");
const canvasPlayerEffect = document.querySelector(".canvasPlayerEffect");
// const canvasAnimation = document.querySelector(".canvasAnimation");
const ctx = canvas.getContext("2d");
const ctx2 = canvasText.getContext("2d");
const ctx3 = canvasPlayer.getContext("2d");
const ctx4 = canvasPlayerEffect.getContext("2d");
// const ctx5 = canvasAnimation.getContext("2d");
const pathImages = "./images/";
const typeImages = ".png";
let toggleColorText = 0;
let togglePlayerOpacity = 1;

//This array contains the layer information from the photoshop template
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

// Canvas functions definitions

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
    ctx4.globalAlpha = imObj.opacity;
    ctx4.drawImage(image, imObj.dx, imObj.dy);
  };
  image.src = imObj.path;
}

function loadText(txObj) {
  ctx2.font = txObj.font;
  if (toggleColorText == 1) {
    ctx2.fillStyle = "rgb(253, 204, 36)";
  } else {
    ctx2.fillStyle = "white";
  }
  ctx2.fillText(txObj.content, txObj.dx, txObj.dy);
}

function render() {
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

// First render on window load
window.onload = render();

// Handle functions for Form:
const bgSelector = document.querySelector(".bg");
const colorSelector = document.querySelector(".color");
const opacitySelector = document.querySelector(".opacity");
const animationSelector = document.querySelector(".animation");
// const containerAnimation = document.querySelector(".containerAnimation");
const containerBg = document.querySelector(".container");

function handleCheckboxBg() {
  containerBg.classList.toggle("altBg");
}
bgSelector.addEventListener("change", handleCheckboxBg);

function handleCheckboxColor() {
  if (colorSelector.checked) {
    toggleColorText = 1;
    //Clear first the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
    ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
    //render the canvas again
    render();
  } else {
    toggleColorText = 0;
    //Clear first the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
    ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
    //render the canvas again
    render();
  }
}
colorSelector.addEventListener("change", handleCheckboxColor);

function handleCheckboxOpacity() {
  if (opacitySelector.checked) {
    togglePlayerOpacity = 0.75;
    //Clear first the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
    ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
    //render the canvas again
    render();
  } else {
    togglePlayerOpacity = 1;
    //Clear first the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
    ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
    //render the canvas again
    render();
  }
}
opacitySelector.addEventListener("change", handleCheckboxOpacity);

// function handleCheckboxAnimation() {
//   animationSelector.classList.toggle("canvasAnimation");
//   let id = null;
//   const elem = document.getElementById("canvasAnimation");
//   let pos = 0;

//   if (animationSelector.checked) {
//     //   clearInterval(id);
//     //   id = setInterval(frame, 5);
//     //   function frame() {
//     //     if (pos == 350) {
//     //       clearInterval(id);
//     //     } else {
//     //       pos++;
//     //       elem.style.top = pos + "px";
//     //       elem.style.left = pos + "px";
//     //     }
//     //   }
//     //Clear first the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
//     ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
//     ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
//     //render the canvas again
//     render();
//   } else {
//     //Clear first the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx2.clearRect(0, 0, canvasText.width, canvasText.height);
//     ctx3.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
//     ctx4.clearRect(0, 0, canvasPlayerEffect.width, canvasPlayerEffect.height);
//     //render the canvas again
//     render();
//   }
// }
// animationSelector.addEventListener("change", handleCheckboxAnimation);
