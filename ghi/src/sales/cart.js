import React from "react";
import { useSelector } from "react-redux";
import TicketQuantity from "./TicketQuantity";
import { useDispatch } from "react-redux";
import { deleteCartItem, clearCartList } from "../redux/slices/cartSlice";
import LoginPopUp from "../nav/LoginPopUp";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Cart() {
    const eventList = useSelector(
        (state) => state.rootReducer.cart.globalCartList
    );
    const account = useSelector(
        (state) => state.rootReducer.accountInfo.account
    );
    const token = account?.token;
    const navigate = useNavigate();
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
            const response = await fetch(saleUrl, fetchConfig);

            const updateData = {};

            updateData.event_name = event.event_name;
            updateData.event_image = event.event_image;
            updateData.event_type = event.event_type;
            updateData.date = event.date;
            updateData.start_time = event.start_time;
            updateData.end_time = event.end_time;
            updateData.description = event.description;
            updateData.tickets_sold = event.tickets_sold + event.quantity;
            updateData.tickets_max = event.tickets_max;
            updateData.tickets_price = event.tickets_price;
            updateData.promoted = event.promoted;
            updateData.venue = event.venue;
            updateData.city = event.city;
            updateData.state_id = event.state_id;
            updateData.created_by = event.created_by;

            const fetchUpdateConfig = {
                method: "put",
                body: JSON.stringify(updateData),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const updateResponse = await fetch(
                `${process.env.REACT_APP_API_HOST}/api/events/${saleData.event}`,
                fetchUpdateConfig
            );
            if (!response.ok) {
                console.error(response);
            }

            if (!updateResponse.ok) {
                console.error(updateResponse);
            } else {
                dispatch(clearCartList());
                navigate("/sales/confirmation");
            }
        }
    };

    const DeleteButtonClick = async (event) => {
        const confirm = window.confirm(
            `Are you sure you want to delete ${event.event_name} from the cart?`
        );
        if (confirm) {
            dispatch(deleteCartItem({ eventId: event.id }));
        }
    };

    return (
      <>
        <div className="flex flex-col mx-auto">
          <h1 className="flex justify-center text-xl font-bold text-gray-900 sm:text-3xl">
            Your Cart
          </h1>
          <iframe
            title="cart"
            src="https://embed.lottiefiles.com/animation/95321"
            style={{ pointerEvents: "none" }}
            allowtransparency="true"
          ></iframe>
          <div className="flex-col justify-end">
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
                          {dayjs(event.date).format("MM/DD/YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="relative">
                            <div
                              className="rounded-lg overflow-hidden"
                              style={{
                                width: "100%",
                                paddingBottom: "100%",
                              }}
                            >
                              <img
                                src={event.event_image}
                                alt="event"
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-2 truncate ">
                              {event.event_name}
                            </div>
                          </div>
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
                        <td className="whitespace-nowrap px-5 py-4">
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
              <div className="flex flex-col text-end pr-6">
                <h3 className="text-xl py-6">
                  <div className="font-bold">Total:</div> $
                  {parseFloat(totalPrice).toFixed(2)}
                </h3>
                {token ? (
                  <div className="self-end">
                    <button className="relative inline-flex items-center justify-center h-full px-8 py-3 overflow-hidden text-lg font-medium text-green-500 border-2 border-green-400 rounded-full hover:text-white group hover:bg-gray-50 w-auto">
                      <span className="absolute left-0 block w-full h-0 transition-all bg-green-300 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                      <span className="absolute right-0 flex items-center justify-center w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="relative z-10">Checkout</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
            {!token ? (
              <>
                <div className="flex justify-center font-bold pr-5">
                  <p>Please log in to checkout</p>
                </div>
                <div className="flex justify-center pr-5">
                  <LoginPopUp />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </>
    );
}

export default Cart;
