import { FormEvent, useState } from "react";
import { useSearchContext } from "../Context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-2 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 rounded">
        <label className="items-center flex text-gray-700">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold  text-indigo-700"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex text-gray-700">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold text-indigo-700"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="relative">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded cursor-pointer"
          wrapperClassName="min-w-full"
        />
        <label className="absolute right-5 top-1/2 transform -translate-y-1/2 text-indigo-800 text-sm ">
          Check-in
        </label>
      </div>
      <div className="relative">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded cursor-pointer"
          wrapperClassName="min-w-full"
        />
        <label className="absolute right-5  top-1/2 transform -translate-y-1/2 text-indigo-800 text-sm pointer-events-none">
          Check-out
        </label>
      </div>

      <div className="flex gap-1">
        <button className="w-2/3 bg-indigo-700 rounded text-white font-poppins h-full p-2.5  text-m hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-green-800 rounded text-white h-full font-poppins p-2.5 text-m hover:bg-green-500">
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
