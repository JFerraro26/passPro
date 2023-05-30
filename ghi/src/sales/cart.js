import React, { useEffect, useState } from "react";


function Cart() {

    const [event, setEvent] = useState("");
    const handleEventChange = (e) => {
        const value = e.target.value;
        setEvent(value);
    }

    const [quantity, setQuantity] = useState(0);
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value);
    }

    const [soldTo, setSoldTo] = useState("");
    const handleSoldTo = (e) => {
        const value = e.target.value;
        setSoldTo(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};

        data.event = event;
        data.quantity = quantity;
        data.sold_to = soldTo;

        const saleUrl = "http://localhost8000/api/sales";
        const FetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            header: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(saleUrl, FetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setEvent("");
            setQuantity("");
            setSoldTo("");
        }
    }



    return (
        <>
            <h1>Temp cart to POST sale</h1>
            <div className="container mx-auto">
            <h5 className="flex justify-center">Cart Checkout</h5>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="grid-cols-2">
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">Event: </label>
                        <input
                        onChange={handleEventChange}
                        name="event"
                        type="text"
                        placeholder="Enter event UUID for now"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">Quantity:</label>
                        <input
                        onChange={handleQuantityChange}
                        name="quantity"
                        type="number"
                        placeholder="0"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">Sold To:</label>
                        <input
                        onChange={handleSoldTo}
                        name="sold-to"
                        type="text"
                        placeholder="Enter account UUID for now"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                    </div>
                    <div className="flex justify-end">
                        <button
                        className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                        type="submit">
                        Checkout
                        </button>
                    </div>
                </form>
            </div>
            </div>
    </>
    )
}

export default Cart
