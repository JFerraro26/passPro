import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TicketsConfirmationPage() {
    const accountInfo = useSelector(
        (state) => state.rootReducer?.accountInfo.account || null
    );

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid text-center bg-blue-500 rounded-xl p-10 opacity-90 shadow-lg text-white">
                <h1 className="mb-4">Congratulations!</h1>
                <p className="mb-2">Your ticket purchase was successful.</p>
                <p className="mb-2">Thank you for your purchase.</p>
                {accountInfo && (
                    <p className="mb-4">
                        Your confirmation has been sent to {accountInfo.email}
                    </p>
                )}
                <Link
                    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded flex justify-center"
                    type="button"
                    to="/events/list"
                >
                    Checkout our other events here!
                </Link>
            </div>
        </div>
    );
}
