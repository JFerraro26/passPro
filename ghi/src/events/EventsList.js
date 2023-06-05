import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartList } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

function EventsList() {

    const arr = useSelector((state) => state.rootReducer.cart.globalCartList);
    console.log("array", arr);
    const [event, setEvent] = useState([]);
    const dispatchCartList = useDispatch();

    const fetchEventData = async () => {
        const url = "http://localhost:8000/api/events";

        const response = await fetch(url);

        if (response.ok) {
            const data  = await response.json();
            setEvent(data);
            console.log(data);
        }
    }


    useEffect(() => {
        fetchEventData();
    }, []);

    const AddToCartClick = async (event) => {
        // const updatedList = arr.push(event);
        // console.log("Updated", updatedList);
        dispatchCartList(setCartList(event));
        console.log("Sent to Cart!");
    };

    return (
        <>
        <h1 className="text-center">Events</h1>
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
                Ticket Quantity
                </th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>
                {event.map(event => {
                    return (
                    <tr key={event.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4">{event.date}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                            <Link className="hover:text-blue-400" onClick={() => dispatchEvent(setEvent(event))} to="/events/detail">
                                {event.event_name}
                            </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{event.venue}</td>
                        <td className="whitespace-nowrap px-6 py-4">{event.city}</td>
                        <td className="whitespace-nowrap px-6 py-4">{event.tickets_sold}</td>
                        <td>
                            <button
                                onClick={() => AddToCartClick(event)}
                                className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                                type="button">
                                Add to Cart
                            </button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default EventsList
