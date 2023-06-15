import { v4 as uuidv4 } from "uuid";

export const insertLastElementsToBeginning = (array, count) => {
  const lastElements = array.slice(-[count]);
  return [...lastElements, ...array];
};

export const insertScrollId = (array) => {
  return array.map((item) => {
    return { ...item, scrollId: uuidv4() };
  });
};

export const sideScroll = (element, from, to) => {
  animate({ duration: 250, timing: timingEaseOut, draw: draw });

  function draw(progress) {
    const result = from + (to - from) * progress;
    element.scrollLeft = result;
    if (progress === 1) {
    }
  }
};

function animate({ duration, draw, timing }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    let progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) requestAnimationFrame(animate);
  });
}
// Варинты анимации
function timingEaseIn(timeFraction) {
  return timeFraction;
}
function timingEaseOut(timeFraction) {
  return 1 - timingEaseIn(1 - timeFraction);
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}
