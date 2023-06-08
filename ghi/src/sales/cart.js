import React from "react";
import { useSelector } from "react-redux";
import TicketQuantity from "./TicketQuantity";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../redux/slices/cartSlice";


function Cart() {
  const eventList = useSelector(
    (state) => state.rootReducer.cart.globalCartList
  );
  const account = useSelector((state) => state.rootReducer.accountInfo.account);
  const token = account?.token;
  let dispatch = useDispatch();

  let totalPrice = 0;
  for (let event of eventList) {
    totalPrice += event.tickets_price * event.quantity;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let event of eventList) {
      const saleData = {};

      saleData.event = event.id;
      saleData.quantity = event.quantity;
      saleData.sold_to = account.id;

      const saleUrl = `${process.env.REACT_APP_API_HOST}/api/sales`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(saleData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log(JSON.stringify(saleData));
      console.log("saledata", saleData);
      const response = await fetch(saleUrl, fetchConfig);
      console.log("response", response);
      if (response.ok) {
        const newSale = await response.json();
        console.log("Tickets Purchased!", newSale);
      }
    }
  };

  const DeleteButtonClick = async (event) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${event.event_name} from the cart?`
    );
    if (confirm) {
      dispatch(deleteCartItem({eventId: event.id}))
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="flex justify-center">Cart Checkout</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="grid-cols-2">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    Venue
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    Ticket Quantity
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-4 dark:border-neutral-500"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventList?.map((event, index) => {
                  return (
                    <tr
                      key={event.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {event.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {event.event_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {event.venue}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {event.city}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <TicketQuantity event={event} index={index} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          $
                          {parseFloat(
                            event.tickets_price * event.quantity
                          ).toFixed(2)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-1 py-4">
                        <div className="inline-flex">
                          <button
                            onClick={() => DeleteButtonClick(event)}
                            className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end">
              <h3>Total: ${parseFloat(totalPrice).toFixed(2)}</h3>
            </div>
            <div className="flex justify-end">
              <button
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                type="submit"
              >
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cart;
