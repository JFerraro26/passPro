import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-white shadow dark:bg-gray-900">
        <div className="max-w-full px-4 md:px-6 lg:px-8 py-3 md:py-1 flex justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <img
              src={process.env.PUBLIC_URL + "/photos/passpro.png"}
              className="h-20 mr-3"
              alt="PassPro Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              PassPro
            </span>
          </div>
          <ul className="flex items-center mb-2 text-sm font-medium text-gray-500 space-x-4 flex-grow-0">
            <li>
              <Link to={"https://gitlab.com/pass-pro/app"}>
                <p
                  href="#"
                  className="mr-4 hover:underline md:mr-6"
                >
                  About
                </p>
              </Link>
            </li>
            <li>
              <p href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </p>
            </li>
            <li>
              <p href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </p>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <p href="https://pass-pro.gitlab.io/app/" className="hover:underline">
            PassPro™
          </p>
          All Rights Reserved.
        </span>
      </footer>
    );
};

export default Footer;
