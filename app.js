/* global variable */
let div = null;

/* load window function */
window.onload = function () {
  main();
};

function main() {
  const btn = document.querySelector("#btn");
  const container = document.querySelector("#root");
  const output = document.querySelector("#output");
  const copyBtn = document.querySelector("#copyBtn");

  //TODO: change bg color

  btn.addEventListener("click", function () {
    const bgColor = hexColor();
    container.style.background = bgColor;
    output.value = bgColor;
  });

  //TODO: copy color code
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(output.value);
    if (div !== null) {
      div.remove();
      div = null;
    }
    //test color code validity
    if (isValidHex(output.value)) {
      generatToastMsg(`${output.value} coppied`);
    } else {
      alert("Invalid Color Code");
    }
  });

  /* type custom color code */
  output.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color && isValidHex(color)) {
      container.style.background = color;
    }
  });
}

/* generate hex color */

function hexColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

/* generate toast message */
function generatToastMsg(msg) {
  div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message toast-message-slide-in";

  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");

    /* remove function */
    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });
  document.body.appendChild(div);
}

/**
 *@param { string } color: ;
 */

/* validate hax color */
function isValidHex(color) {
  if (color.length !== 7) return false;
  if (color[0] !== "#") return false;
  color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
