import { v4 as uuidv4 } from "uuid";

export const insertId = (array) => {
  const lastElements = array.slice(-5);
  return [...lastElements, ...array].map((item) => {
    return { ...item, scrollId: uuidv4() };
  });
};

export const sideScroll = (element, direction, from, to) => {
  const speed = 1;
  const step = 1;
  console.log(element, direction, from, "<>", to);
  if (direction === "left") {
    const timer = setInterval(() => {
      element.scrollLeft -= step;
      // console.log("l", from, "<=", to, from <= to);
      from -= step;
      if (from <= to) window.clearInterval(timer);
    }, speed);
  } else if (direction === "right") {
    const timer = setInterval(() => {
      element.scrollLeft += step;
      // console.log("r", from, ">=", to, from >= to);
      from += step;
      if (from >= to) window.clearInterval(timer);
    }, speed);
  }
};
