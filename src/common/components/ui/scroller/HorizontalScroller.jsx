import React, { Children, useEffect, useRef, useState } from "react";
import style from "./HorizontalScroller.module.scss";
import { sideScroll } from "../../../utils/scroller";
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
    setScroll((scroll) => ({ ...scroll, drag: false }));
    move();
  };

  const dragMove = (event) => {
    if (scroll?.drag) {
      event.preventDefault();
      const element = scrollerRef.current;
      const { pageX } = event;
      const { endIndex, endOffsetLeft, list } = scroll;
      let { dragX, index } = scroll;
      let scrolled = pageX - dragX;
      scrolled = element.scrollLeft + scrolled;

      const arrow = pageX < dragX ? "left" : "right";

      console.log(arrow);
      if (arrow === "left") {
        scrolled = scrolled < 0 ? endOffsetLeft : scrolled;
        index = index === 0 ? endIndex - 1 : index - 1;
        console.log("index", index);
        const next = list[index - 1].offsetLeft;
        index = next < scrolled ? index - 1 : index;
      } else if (arrow === "right") {
        scrolled = scrolled > endOffsetLeft ? 0 : scrolled;
        index = index === endIndex ? 1 : index + 1;
        const next = list[index].offsetLeft;
        index = next < scrolled ? index + 1 : index;
        console.log("index", index, next, "<", scrolled);
      }

      element.scrollLeft = scrolled;

      console.log("MM element.scrollLeft", element.scrollLeft);
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
    console.log("useEffect scroll", scroll);
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
        setScroll({
          ...scroll,
          endIndex,
          endOffsetLeft,
          index,
          startOffsetLeft,
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
