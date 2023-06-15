import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCartList } from "../redux/slices/cartSlice";
import dayjs from "dayjs";

function EventDetail() {
  const event = useSelector((state) => state.rootReducer.eventGrab.globalEvent);
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState(1);
  const [purchased, setPurchased] = useState(false);

  const AddToCartClick = (event) => {
    const updatedEvent = { ...event };
    updatedEvent.quantity = tickets;
    dispatch(setCartList(updatedEvent));
    setPurchased(true);
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
    if (tickets <= 1) {
      return;
    } else {
      setTickets(tickets - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 bg-green-100">
        <div className="col-start-1 col-span-5 row-start-1 row-span-1 bg-black shadow-xl"></div>
        <div className="bg-black text-white max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl md:flex flex-col items-center col-start-2 col-span-3 row-start-1 row-span-1">
          <div className="flex-grow md:shrink-0">
            <img
              className="relative  aspect-video h-full w-full object-cover md:h-full shadow-xl"
              src={event.event_image}
              alt={event.event_name}
            />
          </div>
        </div>
        <div className="col-start-3 row-start-2 row-span-1">
          <h1 className="text-center text-3xl font-bold">{event.event_name}</h1>
        </div>
        <div className="px-28 py-12 flex col-start-1 col-span-3 row-start-2 row-span-2 whitespace-pre-line">
          <p className="whitespace-pre-line text-lg">{event.description}</p>
        </div>
        <div className="px-24 py-12 text-center flex flex-col col-start-4 col-span-2 row-start-2 row-span-1">
          {!purchased ? (
            <div>
              <div className="flex justify-center">
                <div
                  onClick={removeTicket}
                  className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                >
                  -
                </div>
                <div className="px-2 py-2 text-lg font-semibold">{tickets}</div>
                <div
                  onClick={addTicket}
                  className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                >
                  +
                </div>
              </div>
              <button
                onClick={() => AddToCartClick(event)}
                className="my-2 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="border border-blue-500 bg-orange-300 rounded-xl">
              <p className="text-2xl">Ticket added to Cart</p>
            </div>
          )}
          <div className="text-lg font-semibold">
            Price: ${parseFloat(event.tickets_price * tickets).toFixed(2)}
          </div>
          <p className="mt-3 text-lg font-semibold">Event Date:</p>
          <div className="text-lg font-semibold">
            {dayjs(event.date).format("MM/DD/YYYY")}
          </div>
          <p className="mt-3 text-lg font-semibold">Event Time:</p>
          <div className="text-lg font-semibold">
            {dayjs(event.date + event.start_time).format("h:mm A")} -{" "}
            {dayjs(event.date + event.end_time).format("h:mm A")}
          </div>
        </div>
      </div>
    </>
  );
}
export default EventDetail;
