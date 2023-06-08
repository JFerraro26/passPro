import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../redux/slices/cartSlice";

function TicketQuantity(props) {
  let dispatch = useDispatch();
  const [ticketQuantity, setTicketQuantity] = useState(props.event.quantity);

  const addTicket = () => {

    const updateTicketQuantity = props.event.quantity + 1;

    dispatch(updateCartQuantity({ eventId: props.event.id, quantity: updateTicketQuantity }));
    setTicketQuantity(updateTicketQuantity);
  };

  const reduceTicket = () => {
    if (ticketQuantity === 0) {
      return;
    } else {
    const updateTicketQuantity = props.event.quantity - 1;

    dispatch(updateCartQuantity({eventId: props.event.id, quantity: updateTicketQuantity,}));
    setTicketQuantity(updateTicketQuantity);
    };
  };

  const eventList = useSelector(
    (state) => state.rootReducer.cart.globalCartList
  );


  return (
    <div className="flex">
      <div
        onClick={reduceTicket}
        className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        -
      </div>
      <div className="w-full px-2 py-2 text-lg font-semibold">
        {ticketQuantity}
      </div>
      <div
        onClick={addTicket}
        className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        +
      </div>
    </div>
  );
}

export default TicketQuantity;
