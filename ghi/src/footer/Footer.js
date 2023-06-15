import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noopener noreferrer");
    };

    return (
        <footer className="bg-blue-500 shadow dark:bg-gray-900">
            <div className="max-w-full px-4 md:px-6 lg:px-8 py-3 md:py-1 flex justify-between">
                <div className="flex items-center mb-2 sm:mb-0">
                    <img
                        src={process.env.PUBLIC_URL + "/photos/passpro.png"}
                        className="h-20 mr-3"
                        alt="PassPro Logo"
                    />
                    <span className="text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                        PassPro
                    </span>
                </div>
                <ul className="flex items-center mb-2 text-sm font-medium text-white space-x-4 flex-grow-0">
                    <li>
                        <p
                            onClick={() =>
                                openInNewTab("https://gitlab.com/pass-pro/app")
                            }
                            className="mr-4 hover:underline md:mr-6 cursor-pointer hover:text-orange-500"
                        >
                            About
                        </p>
                    </li>
                    <li>
                        <p
                            href="#"
                            className="mr-4 hover:underline md:mr-6 cursor-pointer hover:text-orange-500"
                        >
                            Privacy Policy
                        </p>
                    </li>
                    <li>
                        <p
                            href="#"
                            className="mr-4 hover:underline md:mr-6 cursor-pointer hover:text-orange-500"
                        >
                            Licensing
                        </p>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="hover:underline hover:text-orange-500"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
            <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
            <span className="block text-sm text-white sm:text-center dark:text-gray-400">
                © 2023 <p href="https://pass-pro.gitlab.io/app/">PassPro™</p>
                All Rights Reserved.
            </span>
        </footer>
    );
};

export default Footer;
