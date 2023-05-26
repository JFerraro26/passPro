import React, { useEffect, useState } from "react";


function MyTickets() {


    const [sales, setSales] = useState([]);

    const fetchSaleData = async () => {
        const url = "http://localhost:8000/api/sales";

        const response = await fetch(url);

        if (response.ok) {
            const data  = await response.json();
            setSales(data);
            console.log(data);
        }
    }


    useEffect(() => {
        fetchSaleData();
    }, []);

    return (
        <>
        <h1>Temp list to GET sales</h1>
        <h1 className="text-center">My Tickets</h1>
        <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
                Event
                </th>
                <th scope="col" className=" px-6 py-4 dark:border-neutral-500">
                Ticket Quantity
                </th>
            </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                    <tr
                       key={sale.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                        <td className="whitespace-nowrap px-6 py-4">{sale.event}</td>
                        <td className="whitespace-nowrap px-6 py-4">{sale.quantity}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default MyTickets
