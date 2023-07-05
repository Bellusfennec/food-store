import React, { Children, useEffect, useRef, useState } from "react";
import style from "./HorizontalScroller.module.scss";
import { sideScroll } from "../../../../utils/scroller";
import { Loading } from "../loading";

const HorizontalScroller = (props) => {
  const { children, className, selected, direction, classSelected } = props;
  const childrenRef = useRef(children);
  const scrollerRef = useRef(null);
  const [scroll, setScroll] = useState({});
  const [select, setSelect] = useState();

  const handlerSelected = (id) => {
    id === select ? selected() : selected(id);
    id === select ? setSelect() : setSelect(id);
  };

  const dragStart = (event) => {
    setScroll((scroll) => ({ ...scroll, drag: true, dragX: event.pageX }));
  };

  const dragStop = () => {
    const scrolling = 0; // scroll.scrolling ? 1 : 1;
    setScroll((scroll) => ({ ...scroll, drag: false, scrolling }));
    correctByIndex();
  };

  const dragMove = (event) => {
    if (scroll?.drag) {
      event.preventDefault();
      const element = scrollerRef.current;
      const { pageX } = event;
      const { endIndex, list, startJumpOffsetLeft, endJumpOffsetLeft } = scroll;
      let { dragX, index } = scroll;
      let scrolled = pageX - dragX;
      // console.log("---");
      // console.log(pageX, "-", dragX, "=", pageX - dragX);
      // console.log("scrolled", scrolled);
      // console.log("element.scrollLeft ", element.scrollLeft);
      scrolled = element.scrollLeft + scrolled;

      const arrow = pageX < dragX ? "left" : "right";

      // console.log(arrow);
      if (arrow === "left") {
        const isStart = scrolled < startJumpOffsetLeft;
        const prevIndex = index - 1;
        const currentOL = list[index].offsetLeft;
        const prevOL = list[prevIndex].offsetLeft;
        const prevSW = list[prevIndex].scrollWidth;
        const prev = prevSW / 2 + prevOL;

        // console.log("prevSW", prevSW);
        // console.log("prevSW / 2", prevSW / 2);
        // console.log("prevOL", prevOL);
        // console.log("prev", prev);
        // console.log("index", index, "prevIndex", prevIndex);
        // console.log(`prevOL ${prevOL} > ${scrolled} < ${currentOL} currentOL`);
        // console.log(prevOL > scrolled, "&&", scrolled < currentOL);
        // console.log(`prev ${prev} > ${scrolled} < ${currentOL} currentOL`);
        // console.log(prev > scrolled, "&&", scrolled < currentOL);

        scrolled = isStart ? endJumpOffsetLeft : scrolled;
        index = prev > scrolled && scrolled < currentOL ? prevIndex : index;
        index = isStart ? endIndex : index;
      } else if (arrow === "right") {
        const isEnd = scrolled > endJumpOffsetLeft;
        const nextIndex = index + 1;
        const currentOL = list[index].offsetLeft;
        const nextOL = list[nextIndex].offsetLeft;
        const nextSW = list[nextIndex].scrollWidth;
        const next = nextSW / 2 + currentOL;

        // console.log("nextSW", nextSW);
        // console.log("nextSW / 2", nextSW / 2);
        // console.log("currentOL", currentOL);
        // console.log("next", next);
        // console.log("index", index, "nextIndex", nextIndex);
        // console.log(`currentOL ${currentOL} < ${scrolled} > ${nextOL} nextOL`);
        // console.log(currentOL < scrolled, "&&", scrolled > nextOL);
        // console.log(`currentOL ${currentOL} < ${scrolled} > ${next} next`);
        // console.log(currentOL < scrolled, "&&", scrolled > next);

        scrolled = isEnd ? startJumpOffsetLeft : scrolled;
        index = currentOL < scrolled && scrolled > next ? nextIndex : index;
        index = isEnd ? 2 : index;
      }
      // console.log("MM element.scrollLeft", element.scrollLeft);

      element.scrollLeft = scrolled;
      dragX = pageX;
      setScroll((scroll) => ({
        ...scroll,
        dragX,
        scrollLeft: scrolled,
        index,
        direction: arrow,
      }));
    }
  };

  const handlerWheel = ({ deltaY }) => {
    if (scrollerRef.current) {
      let direction = deltaY < 0 ? "left" : deltaY > 0 ? "right" : "";
      const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
      setScroll({ ...scroll, direction, scrolling });
    }
  };

  useEffect(() => {
    const element = scrollerRef.current;
    if (element) {
      const onWeel = (event) => event.preventDefault();
      element.addEventListener("wheel", onWeel, { passive: false });
      return () => element.removeEventListener("wheel", onWeel);
    }
  }, []);

  useEffect(() => {
    if (direction) {
      const { arrow } = direction;
      if (arrow === "left" || arrow === "right") {
        const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
        setScroll({ ...scroll, direction: arrow, scrolling });
      }
    }
  }, [direction]);

  useEffect(() => {
    // console.log("useEffect scroll", scroll);
    if (scroll?.scrolling > 0) {
      for (let i = 0; i < scroll.scrolling; i++) {
        move();
      }
    }
    if (!scroll?.filled) {
      filling();
    }
    if (scroll?.filled && !scroll?.inserted) {
      inserting();
    }
    if (scroll?.filled && scroll?.inserted && !scroll?.ready) {
      startPosition();
    }
  }, [scroll]);

  const getIndex = () => {
    const element = scrollerRef.current;
    const { firstChild, offsetWidth, scrollWidth } = element;
    let widthLastScreen = scrollWidth - offsetWidth;
    let index = 0;
    const { childNodes } = firstChild;
    const reverseChildNodes = [...Array.from(childNodes)].reverse();
    reverseChildNodes.forEach((node, i) => {
      if (widthLastScreen > node.offsetLeft && !index) {
        index = i;
      }
    });
    // корректировка
    index += 2;
    return index;
  };

  const scrollList = () => {
    const { childNodes } = scrollerRef.current.firstChild;
    let list = [];
    Array.from(childNodes).forEach((node, i) => {
      const { scrollWidth, offsetLeft, text } = node;
      list.push({ index: i, scrollWidth, offsetLeft, text });
    });
    return list;
  };

  // const closers = () => {
  //   let { endIndex, index, direction, list } = scroll;
  //   const element = scrollerRef.current;
  //   if (direction === "left") {
  //   } else if (direction === "right") {
  //   }
  //   const { offsetLeft } = list[index];
  //   sideScroll(element, element.scrollLeft, offsetLeft);
  // };

  const correctByIndex = () => {
    let { endIndex, index, direction, list } = scroll;
    const element = scrollerRef.current;
    if (direction === "left") {
    } else if (direction === "right") {
    }
    const { offsetLeft } = list[index];
    sideScroll(element, element.scrollLeft, offsetLeft);
  };

  const move = () => {
    let { endIndex, index, scrolling, direction, list } = scroll;
    const element = scrollerRef.current;
    if (direction === "left") {
      index = index === 0 ? endIndex - 1 : index - 1;
      const { offsetLeft } = list[endIndex];
      if (scroll.index === 0) element.scrollLeft = offsetLeft;
    } else if (direction === "right") {
      index = index === endIndex ? 1 : index + 1;
      if (scroll.index === endIndex) element.scrollLeft = 0;
    }
    const { offsetLeft } = list[index];
    sideScroll(element, element.scrollLeft, offsetLeft);
    scrolling = scrolling > 0 ? scrolling - 1 : scrolling;
    setScroll({ ...scroll, index, scrolling, scrollLeft: offsetLeft });
  };

  const startPosition = () => {
    if (scrollerRef?.current?.firstChild) {
      const childNodes = Array.from(scrollerRef.current.firstChild.childNodes);
      if (childNodes.length === childrenRef.current.length) {
        const list = scrollList();
        const index = getIndex();
        scrollerRef.current.scrollLeft = list[index].offsetLeft;
        const endIndex = list.length - index;
        const endOffsetLeft = list[endIndex].offsetLeft;
        const startOffsetLeft = list[index].offsetLeft;

        const startJumpOffsetLeft =
          list[0].scrollWidth / 2 + list[0].offsetLeft;
        const endJumpOffsetLeft =
          list[endIndex].scrollWidth / 2 + list[endIndex].offsetLeft;
        setScroll({
          ...scroll,
          endIndex,
          endOffsetLeft,
          index,
          startOffsetLeft,
          startJumpOffsetLeft,
          endJumpOffsetLeft,
          list,
          ready: true,
        });
      } else {
        setScroll({ ...scroll });
      }
    }
  };

  const filling = () => {
    if (scrollerRef.current) {
      const element = scrollerRef.current;
      const { offsetWidth, scrollWidth } = element;
      const widthLastScreen = scrollWidth - offsetWidth;
      if (widthLastScreen < offsetWidth) {
        setScroll({ ...scroll });
        const array = Array.isArray(childrenRef.current)
          ? childrenRef.current
          : [childrenRef.current];
        const lastElements = array.slice(-1) ? array.slice(-1) : array[0];
        childrenRef.current = [...lastElements, ...array];
      } else {
        setScroll({ ...scroll, filled: true });
      }
    }
  };
  const inserting = () => {
    if (
      Children.count(childrenRef.current) === Children.count(children) ||
      scroll?.filled
    ) {
      const index = getIndex();
      const count = Children.count(children);
      // если index меньше общего кол-ва
      if (index < count || scroll?.filled) {
        const array = Array.isArray(childrenRef.current)
          ? childrenRef.current
          : [childrenRef.current];
        const lastElements = array.slice(-[index]);
        childrenRef.current = [...lastElements, ...array];
        setScroll({ ...scroll, inserted: true });
      }
    }
  };

  const getClonedElements = (children) => {
    return React.Children.map(children, (child, i) => {
      let config;
      if (selected) {
        config = { ...config, onClick: () => handlerSelected(child.key) };
      }
      if (classSelected) {
        config = {
          ...config,
          className:
            child.props.className +
            (select === child.key ? ` ${classSelected}` : ""),
        };
      }
      config = { ...config, key: i };
      return React.cloneElement(child, config);
    });
  };

  let clonedElements = getClonedElements(childrenRef.current);

  return (
    <div className={style.container}>
      <div
        ref={scrollerRef}
        onMouseLeave={dragStop}
        onMouseDown={dragStart}
        onMouseUp={dragStop}
        onMouseMove={dragMove}
        className={
          style.scroller +
          (className ? " " + className : "") +
          (!scroll?.ready ? " " + style.invisible : "")
        }
      >
        <div
          className={style.items + (scroll?.drag ? " " + style.drag : "")}
          onWheel={handlerWheel}
        >
          {clonedElements}
        </div>
      </div>
      {!scroll?.ready && (
        <div className={style.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default HorizontalScroller;
