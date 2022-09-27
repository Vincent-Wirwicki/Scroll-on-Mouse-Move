const reset = document.querySelector("button");
const space = document.querySelector(".space");
const spaceWrap = document.querySelector(".space__wrap");
const progressBar = [...document.querySelectorAll(".progress__bar__inner")];
const { height, width } = space.getBoundingClientRect();
const x = width / 2;
const y = height / 2;
// white: #f2f2f2, green: #88bf9b, red: #f23535 yellow: #f2db66
const colors = ["#f2f2f2", "#88bf9b", "#f23535", "#f2db66"];
const maxStars = 300;
const speed = 15;
const ease = 0.075;

let frame = 0,
  mouseX = x,
  mouseY = y,
  cursorX = 0,
  cursorY = 0,
  scrollProgressX = 0,
  scrollProgressY = 0;

//utils
const getRandomInteger = (min, max) =>
  ~~(Math.random() * (max - min + 1) + min);

const getMousePos = e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
};

const lerp = (start, end, ease) => (1 - ease) * start + ease * end;

//star part
const starCreation = () => {
  const star = document.createElement("div");
  const randomColor = colors[~~(Math.random() * colors.length)];
  star.classList.add("star");
  star.style.background = `${randomColor}`;
  star.style.boxShadow = `0 0 3px 2px ${randomColor}`;
  space.append(star);
};

const starPosition = elements => {
  elements.forEach(element => {
    element.style.transform = `translate3d(
      ${getRandomInteger(-x, x)}px,
      ${getRandomInteger(-y, y)}px,0)
      scale(${(Math.random() * 1.2).toFixed(2)})`;
    element.style.opacity = 1;
  });
};

const starSpeedCreation = () => {
  if (frame % speed && frame < maxStars) {
    starCreation();
    starPosition([...document.querySelectorAll(".star")]);
  } else {
    isCompleted = true;
  }
};

const getScrollProgress = () => {
  scrollProgressX =
    ((spaceWrap.scrollLeft / (spaceWrap.scrollWidth - spaceWrap.clientWidth)) *
      100) |
    0;
  scrollProgressY =
    ((spaceWrap.scrollTop / (spaceWrap.scrollHeight - spaceWrap.clientHeight)) *
      100) |
    0;
};

const displayProgress = () => {
  getScrollProgress();
  if (frame > maxStars) {
    progressBar[0].style.width = `${scrollProgressX}%`;
    progressBar[1].style.width = `${scrollProgressY}%`;
  }
};

const moveSpace = () => {
  cursorX = lerp(cursorX, mouseX, ease) | 0;
  cursorY = lerp(cursorY, mouseY, ease) | 0;
  spaceWrap.scrollTo(cursorX, cursorY);
};

const onReset = () => {
  if (frame > maxStars) {
    [...document.querySelectorAll(".star")].forEach(star => {
      star.style.transform = "scale(0)";
      star.style.opacity = 0;
    });
    setTimeout(() => {
      space.innerHTML = "";
      frame = 0;
    }, 500);
  }
};

const addEvents = () => {
  window.addEventListener("mousemove", getMousePos);
  reset.addEventListener("click", onReset);
};

const raf = () => {
  frame++;
  displayProgress();
  moveSpace();
  starSpeedCreation();
  requestAnimationFrame(raf);
};

const app = () => {
  addEvents();
  raf();
};

app();
