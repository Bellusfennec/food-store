import React, { useState } from "react";
import style from "./TourHome.module.scss";
import Card from "../../../common/components/card/Card";
import List from "../../../common/components/card/List";
import Divider from "../../../common/components/divider";
import ContainerWrapper, {
  SectionWrapper,
} from "../../../common/components/wrapper";

const init = [
  {
    id: 1,
    title: "Домашний уголок",
    address: "г.Казань, ул. Баумана, 23/25",
    image: "/image/restaurant-0.jpg",
  },
  {
    id: 2,
    title: "Скверный Санта",
    address: "г.Москва, ул. Кремлевская, 4а",
    image: "/image/restaurant-0.jpg",
  },
  {
    id: 3,
    title: "Огненный китай",
    address: "г.Санкт-Петербург, ул. Леонида Филатова, 2",
    image: "/image/restaurant-0.jpg",
  },
  {
    id: 4,
    title: "Ароматный француз",
    address: "г.Краснодар, ул. Петербургская, 56/1",
    image: "/image/restaurant-0.jpg",
  },
];

const TourHome = () => {
  const [data] = useState(init);
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <h2 className={style.label}>Рестораны</h2>
        <Divider row="2" />
        <List>
          {data &&
            data.map(({ id, title, address, image }) => (
              <Card
                key={id}
                title={title}
                description={address}
                link="#"
                image={image}
              />
            ))}
        </List>
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export default TourHome;
