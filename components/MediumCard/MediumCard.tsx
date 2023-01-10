import Image from "next/image";
import * as React from "react";
import { CardData } from "../../pages";

const MediumCard: React.FunctionComponent<CardData> = ({
  img,
  title,
}): JSX.Element => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} fill alt="medium-card-img" className="rounded-xl" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
};

export default MediumCard;
