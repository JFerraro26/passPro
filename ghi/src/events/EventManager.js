import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { removeEventFromList } from "../redux/slices/eventsSlice";

function EventManager({ myEvents }) {
  const [events, setEvents] = useState(myEvents.events);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.rootReducer.accountInfo.account);
  const token = account?.token;

  const DeleteButtonClick = async (event) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${event.event_name}?`
    );
    if (confirm) {
      const eventID = event.id;
      const custUrl = `${process.env.REACT_APP_API_HOST}/api/events/${eventID}`;
      const fetchConfig = {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(custUrl, fetchConfig);
      if (response.ok) {
        const updatedEvents = events.filter((item) => item.id !== eventID);
        setEvents(updatedEvents);
        dispatch(removeEventFromList({ eventId: eventID }));
      } else {
        console.error(response);
      }
    }
  };

  return (
    <>
      <h1 className="text-center">My Events</h1>
      <table className="min-w-full text-center text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
              Date
            </th>
            <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
              Event
            </th>
            <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
              Venue
            </th>
            <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
              City
            </th>
            <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
              Tickets
            </th>
          </tr>
        </thead>
        <tbody>
          {events.length !== 0 ? (
            events.map((event) => (
              <tr
                key={event.id}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {dayjs(event.date).format("MM/DD/YYYY")}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {event.event_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{event.venue}</td>
                <td className="whitespace-nowrap px-6 py-4">{event.city}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {event.tickets_sold}/{event.tickets_max}
                </td>
                <td className="whitespace-nowrap px-1 py-4">
                  <div className="inline-flex">
                    <Link
                      className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                      type="button"
                      state={{ event: event }}
                      to="/events/form"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => DeleteButtonClick(event)}
                      className="ml-3 bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                  <Link
                    onClick={() => dispatch(setEvent(event))}
                    to="/events/detail"
                    className=" ml-3 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-5">
                <Link
                  className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                  type="button"
                  to="/events/form"
                >
                  Create an Event
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default EventManager;
