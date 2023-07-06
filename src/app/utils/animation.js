/* eslint-disable no-unused-vars */
export function animate({ duration, draw, timing }) {
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
export function timingEaseOut(timeFraction) {
  return 1 - timingEaseIn(1 - timeFraction);
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}
