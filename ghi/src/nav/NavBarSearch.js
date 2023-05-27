import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function NavBarSearch() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEventData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/events`
      );
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error(response);
      }
    }
    fetchEventData();
  }, []);

  return (
    <div className="relative">
      <input
        onChange={() => setOpen(true)}
        className="relative z-10 border w-80"
        id="search-bar"
        name="search-bar"
        placeholder="Find an Event..."
      />

      {open ? (
        <div className="">
          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 h-full w-full cursor-default"
          ></button>
          <div className="border flex flex-col w-80 absolute top-auto">
            <h1 className="text-2xl font-semibold">Events:</h1>
            {events?.map((event) => {
              return (
                <Link
                  className="hover:bg-blue-400 bg-white"
                  state={{ event: event }}
                  to="/events/detail"
                  key={event.id}
                >
                  <button className="border w-80">
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
                  </button>
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
