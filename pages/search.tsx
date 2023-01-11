import { useRouter } from "next/router";
import * as React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard/InfoCard";
import Map, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

export type SearchResult = {
  img: string;
  location: string;
  description: string;
  star: number;
  title: string;
  price: string;
  total: string;
  long?: number;
  lat?: number;
};

interface Viewport {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface SearchProps {
  searchResults: Array<SearchResult>;
}

const Search: React.FunctionComponent<SearchProps> = ({
  searchResults,
}): JSX.Element => {
  const router = useRouter();

  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate as string), "dd MMM yy");
  const formattedEndtDate = format(new Date(endDate as string), "dd MMM yy");
  const range = `${formattedStartDate} - ${formattedEndtDate}`;
  const coordinates = searchResults.map(
    ({ lat, long }): Coordinate => ({
      latitude: lat as number,
      longitude: long as number,
    })
  );
  const center = getCenter(coordinates);

  const [viewport, setViewport] = React.useState<Viewport>({
    width: "100%",
    height: "100%",
    latitude: center ? center.latitude : 37.7577,
    longitude: center ? center.longitude : -122.4376,
    zoom: 8,
  });

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuest} guests`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuest} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          {searchResults.map(
            (
              {
                img,
                location,
                title,
                description,
                star,
                price,
                total,
              }: SearchResult,
              i
            ): JSX.Element => (
              <InfoCard
                key={i}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
              />
            )
          )}
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map
            initialViewState={viewport}
            mapStyle="mapbox://styles/barqi/clcqxt479002m14s683x3c6qo"
            mapboxAccessToken={process.env.mapbox_key}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
