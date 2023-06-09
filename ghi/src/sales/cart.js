import React from "react";
import { useSelector } from "react-redux";
import TicketQuantity from "./TicketQuantity";
import { useDispatch } from "react-redux";
import { deleteCartItem, clearCartList } from "../redux/slices/cartSlice";
import LoginPopUp from "../nav/LoginPopUp";
import { useNavigate } from "react-router-dom";

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
                <h1 className="flex justify-center">Cart Checkout</h1>
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
                                                    <TicketQuantity
                                                        event={event}
                                                        index={index}
                                                    />
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex flex-col space-y-1">
                                                    $
                                                    {parseFloat(
                                                        event.tickets_price *
                                                            event.quantity
                                                    ).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-4">
                                                <div className="inline-flex">
                                                    <button
                                                        onClick={() =>
                                                            DeleteButtonClick(
                                                                event
                                                            )
                                                        }
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
                        {token ? (
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                    type="submit"
                                >
                                    Checkout
                                </button>
                            </div>
                        ) : null}
                    </form>
                    {!token ? (
                        <>
                            <LoginPopUp />
                            <div className="flex justify-end items-start">
                                <div
                                    className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                    role="alert"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">
                                            Login Required!
                                        </span>{" "}
                                        Login to complete your transaction.
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Cart;
