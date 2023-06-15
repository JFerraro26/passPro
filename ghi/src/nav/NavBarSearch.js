import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";
import { setEventList } from "../redux/slices/eventsSlice";

function NavBarSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const events = useSelector((state) => state.rootReducer.eventList.eventList);

  useEffect(() => {
    async function fetchEventData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/events`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(setEventList(data));
      } else {
        console.error(response);
      }
    }
    fetchEventData();
  }, [dispatch]);

  const openDropdown = () => {
    setOpen(true);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const filteredEvents = events?.filter((e) => {
    const { city, event_name, state_id, venue } = e;
    const lowerCaseQuery = query.toLowerCase();

    return (
      city.toLowerCase().includes(lowerCaseQuery) ||
      event_name.toLowerCase().includes(lowerCaseQuery) ||
      state_id.toLowerCase().includes(lowerCaseQuery) ||
      venue.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => {
          openDropdown();
          handleQueryChange(e);
        }}
        className="relative border rounded-md h-10 w-80"
        id="search-bar"
        name="search-bar"
        placeholder="  Enter Event, City, State, or Venue"
      />

      {open ? (
        <div className="">
          <button
            onClick={() => {
              closeDropdown();
              setQuery("");
            }}
            className="fixed inset-0 h-full w-full cursor-default"
          ></button>
          <div className="border rounded-md flex flex-col w-80 absolute top-auto">
            <h1 className="z-10 bg-white text-2xl font-semibold">Events:</h1>
            {filteredEvents?.map((event) => {
              return (
                <Link
                  className="z-10 border w-80 hover:bg-blue-400 bg-white"
                  to="/events/detail"
                  key={event.id}
                  onClick={() => {
                    closeDropdown();
                    setQuery("");
                    dispatch(setEvent(event));
                  }}
                >
                  <div className="grid grid-cols-4 grid-rows-2">
                    <div className="flex flex-col w-12 h-12 col-start-1 col-span-1 row-start-1 row-span-2">
                      <h1>{dayjs(event.date).format("MMM")}</h1>
                      <h1>{dayjs(event.date).format("DD")}</h1>
                    </div>
                    <div className="text-left w-68 col-start-2 col-span-3 row-start-1 row-span-1">
                      <h1>{event.event_name}</h1>
                    </div>
                    <div className="text-left w-68 col-start-2 col-span-3 row-start-2 row-span-1">
                      <h1>
                        {event.city}, {event.state_id}
                      </h1>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NavBarSearch;
