import { v4 as uuidv4 } from "uuid";

export const insertId = (array) => {
  return array.map((item) => {
    return { ...item, scrollId: uuidv4() };
  });
};

export const sideScroll = (element, direction, speed, distance, step) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    if (direction === "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
};
