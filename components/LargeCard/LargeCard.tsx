import Image from "next/image";
import * as React from "react";

interface LargeCardProps {
  img: string;
  title: string;
  description: string;
  buttonText: string;
}

const LargeCard: React.FunctionComponent<LargeCardProps> = ({
  img,
  title,
  description,
  buttonText,
}): JSX.Element => {
  return (
    <section className=" relative p-16 cursor-pointer">
      <div className="relative h-96  min-w-[300px]">
        <Image
          fill
          src={img}
          alt="large-card-img"
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-20">
        <h3 className="text-black text-4xl mb-3 w-64">{title}</h3>
        <p className="text-black">{description}</p>
        <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
