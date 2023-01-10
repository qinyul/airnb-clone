import Image from "next/image";
import * as React from "react";
import { ExploreData } from "../../pages";

const SmallCard: React.FunctionComponent<ExploreData> = ({
  img,
  location,
  distance,
}): JSX.Element => {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hove:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      <div className="relative h-16 w-16">
        <Image src={img} fill className="rounded-lg" alt="card-img" />
      </div>
      <div>
        <h2>{location}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
};

export default SmallCard;
