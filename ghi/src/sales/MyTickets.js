import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEvent } from "../redux/slices/eventSlice";
import { useGetTokenQuery } from "../redux/store/accountsApi";

function MyTickets() {
    const [account, setAccount] = useState([]);
    const dispatchEvent = useDispatch();
    const accountInfo = useGetTokenQuery();
    const accountId = accountInfo.currentData.account.id;


    useEffect(() => {
        const fetchAccountData = async () => {
            const url = `http://localhost:8000/api/accounts/${accountId}`;

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAccount(data.sales);
                console.log("data", data);
            }
        };
        // fetchSaleData();
        fetchAccountData();
    }, [accountId]);

    return (
        <>
            <h1>Temp list to GET sales</h1>
            <h1 className="text-center">My Tickets</h1>
            <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
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
                            Ticket Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {account.map((sale) => {
                        return (
                            <tr
                                key={sale.sale_id}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            >
                                <td className="whitespace-nowrap px-6 py-4">
                                    <Link
                                        className="hover:text-blue-400"
                                        to="/events/detail"
                                        onClick={() =>
                                            dispatchEvent(setEvent(sale))
                                        }
                                    >
                                        {sale.event_name}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {sale.sale_quantity}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MyTickets;
