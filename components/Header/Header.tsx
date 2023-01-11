import Image from "next/image";
import * as React from "react";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

interface HeaderProps {
  placeholder?: string;
}

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface SearchPageQuery {
  pathname: string;
  query: {
    location: string;
    startDate: string;
    endDate: string;
    numberOfGuest: number;
  };
}

const Header: React.FunctionComponent<HeaderProps> = ({
  placeholder,
}): JSX.Element => {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [numberOfGuest, setNumberOfGuest] = React.useState<number>(1);

  const selectionRange: SelectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const searchPagequery: SearchPageQuery = {
    pathname: "/search",
    query: {
      location: searchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      numberOfGuest,
    },
  };

  const handleSelect = (ranges: { selection: SelectionRange }) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const search = () => {
    router.push(searchPagequery);
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div
        onClick={() => router.push("/")}
        className="relative flex item-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="airnb-logo"
          fill
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </div>
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          placeholder={placeholder ?? "Start your search"}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        />
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5861"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              {"Number of Guests"}
            </h2>
            <UserIcon className="h-5 text-black" />
            <input
              type="number"
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(Number(e.currentTarget.value))}
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400 bg-white"
            />
          </div>
          <div className="flex">
            <button
              onClick={() => setSearchInput("")}
              className="flex-grow text-gray-500"
            >
              {"Cancel"}
            </button>
            <button className="flex-grow text-red-400" onClick={search}>
              {"Search"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
