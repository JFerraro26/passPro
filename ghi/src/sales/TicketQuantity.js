import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartList } from "../redux/slices/cartSlice";

function TicketQuantity(props) {
  let dispatch = useDispatch();
  const [ticketQuantity, setTicketQuantity] = useState(props.event.quantity);

  const addTicket = () => {
    setTicketQuantity(ticketQuantity + 1);
    dispatch(updateCartList((eventList[props.index] = eventObject)));
    console.log();
    console.log("eventObject", eventObject);
    console.log("eventList", eventList);
    console.log("eventList index", eventList[props.index]);
    // console.log("eventList update", (eventList[props.index] = eventObject));
  };
// console.log("eventList update", (eventList));
  //   eventList[props.index] = eventObject

  const reduceTicket = () => {
    if (ticketQuantity === 0) {
      return;
    } else {
      setTicketQuantity(ticketQuantity - 1);
      //   dispatch(updateCartList(eventObject));
      console.log("eventObject", eventObject);
      console.log("eventList", eventList);
    }
  };

  const eventList = useSelector(
    (state) => state.rootReducer.cart.globalCartList
  );


  const eventObject = {
    city: props.event.city,
    created_by: props.event.created_by,
    date: props.event.date,
    description: props.event.description,
    end_time: props.event.end_time,
    event_image: props.event.event_image,
    event_name: props.event.event_name,
    event_type: props.event.event_type,
    id: props.event.id,
    promoted: props.event.promoted,
    quantity: ticketQuantity,
    start_time: props.event.start_time,
    state_id: props.event.state_id,
    tickets_max: props.event.tickets_max,
    tickets_price: props.event.tickets_price,
    tickets_sold: props.event.tickets_sold,
    venue: props.event.venue,
  };

//   console.log("props.event", props.event);
//   console.log("props.index", props.index);
//   console.log("eventList", eventList);

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
