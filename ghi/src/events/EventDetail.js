import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCartList } from "../redux/slices/cartSlice";

function EventDetail() {
  const event = useSelector((state) => state.rootReducer.eventGrab.globalEvent);
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState(1);

  const AddToCartClick = (event) => {
    const updatedEvent = { ...event };
    updatedEvent.quantity = tickets;
    dispatch(setCartList(updatedEvent));
  };
  if (event == null) {
    return (
      <>
        <p>Something Went Wrong</p>-
      </>
    );
  }

  const addTicket = () => {
    setTickets(tickets + 1);
  };

  const removeTicket = () => {
    if (tickets === 0) {
      return;
    } else {
      setTickets(tickets - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4">
        <div className="flex flex-col items-center col-start-1 col-span-5 row-start-1 row-span-1">
          <img
            className="min-w-fit"
            src={event.event_image}
            alt={event.event_name}
          />
          <h1>{event.event_name}</h1>
        </div>
        <div className="flex col-start-1 col-span-3 row-start-2 row-span-2">
          <p className="whitespace-pre-line">{event.description}</p>
        </div>
        <div className="flex flex-col col-start-4 col-span-2 row-start-2 row-span-2">
          <div>
            <div className="flex">
              <button
                onClick={removeTicket}
                className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              >
                -
              </button>
              <p>{tickets}</p>
              <button
                onClick={addTicket}
                className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => AddToCartClick(event)}
              className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              type="button"
            >
              Add to Cart
            </button>
          </div>
          <p>{event.date}</p>
          <p>
            {event.start_time} to {event.end_time}
          </p>
        </div>
        <div className="flex items-center justify-center col-start-1 col-span-5 row-start-4 row-span-1">
          <p>list of like events</p>
        </div>
      </div>
    </>
  );
}
export default EventDetail;
