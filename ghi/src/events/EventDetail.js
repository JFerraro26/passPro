import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCartList } from "../redux/slices/cartSlice";
import dayjs from "dayjs";

function EventDetail() {
  const event = useSelector((state) => state.rootReducer.eventGrab.globalEvent);
  const cart = useSelector((state) => state.rootReducer.cart.globalCartList);
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
    if (tickets <= 1) {
      return;
    } else {
      setTickets(tickets - 1);
    }
  };

  const eventInCart = cart.some((item) => item.id === event.id);

  return (
    <>
      <div className="grid grid-cols-7 bg-green-100">
        <div className="mt-4 grid grid-cols-5 grid-rows-5 col-start-2 col-span-5">
          <div className="bg-white relative rounded-3xl overflow-hidden aspect-video col-start-1 col-span-5 row-start-1 row-span-5">
            <img
              className="object-cover opacity-70 w-full h-full"
              src={event.event_image}
              alt={event.event_name}
            />
          </div>
          <div className="z-10 flex items-center justify-center col-start-2 col-span-3 row-start-1 row-span-1">
            <h1 className="text-3xl font-bold">{event.event_name}</h1>
          </div>
        </div>
        <div className="mx-20 mt-12 flex col-start-1 col-span-5 whitespace-pre-line">
          <p className="whitespace-pre-line text-lg">{event.description}</p>
        </div>
        <div className="mt-12 flex flex-col items-center col-start-6 col-span-1">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold">Location:</h1>
            <h1 className="text-lg font-semibold">
              {event.city}, {event.state_id}
            </h1>
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
          <div className="text-lg font-semibold">
            Price: ${parseFloat(event.tickets_price * tickets).toFixed(2)}
          </div>
          {eventInCart ? (
            <div className="border border-blue-500 bg-orange-300 rounded-xl">
              <p className="text-2xl">Ticket added to Cart</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
export default EventDetail;
