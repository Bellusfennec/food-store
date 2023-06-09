import React, { useState } from "react";
import style from "./TourHome.module.scss";
import Section from "../../../common/components/ui/section";
import Card from "../../../common/components/ui/card/Card";
import List from "../../../common/components/ui/card/List";

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
  const [data, setData] = useState(init);
  return (
    <Section>
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
    </Section>
  );
};

export default TourHome;
