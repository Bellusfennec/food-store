import { v4 as uuidv4 } from "uuid";
import { animate, timingEaseOut } from "./animation";

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
