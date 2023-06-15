import React, { useState } from "react";
import { GrLinkedin } from "react-icons/gr";
import {
    SiGitlab,
    SiTailwindcss,
    SiJavascript,
    SiPython,
    SiFastapi,
    SiRedux,
    SiDocker,
} from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";

export default function ContactPage() {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noopener noreferrer");
    };

    const [hoveredIndex, setIsHovered] = useState(-1);

    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(-1);
    };

    return (
        <>
            <h1 className="text-4xl text-center mt-10 mb-5">Meet the Team!</h1>
            <div className="flex justify-center items-center mt-28 mb-20 mx-auto">
                <div className="flex space-x-36">
                    <div className="flex-grow w-72 h-full">
                        <div className="w-72 bg-green-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 drop-shadow-lg hover:drop-shadow-2xl p-12 ease-in duration-200 hover:scale-110 hover:bg-green-400">
                            <div
                                className={`flex flex-col items-center pb-10 ${
                                    hoveredIndex === 0 || hoveredIndex === -1
                                        ? ""
                                        : "filter blur-md"
                                }`}
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    className="w-32 h-32 mb-3 rounded-full shadow-lg"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/photos/Michael.png"
                                    }
                                    alt="Profile"
                                />
                                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white m-w-full truncate">
                                    Michael Gianoulakis
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-bold underline">
                                    Full Stack Developer
                                </span>
                                <span className="text-md text-gray-500 dark:text-gray-400">
                                    <div className=" text-md text-center pt-3">
                                        <AiOutlineMail className="inline-block text-gray-500 dark:text-gray-400 mr-1" />
                                        <span className="text-md text-gray-500 dark:text-gray-400">
                                            mgiano02@gmail.com
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-5 pt-6">
                                        <SiPython className="w-6 h-6" />
                                        <SiJavascript className="w-6 h-6" />
                                        <SiTailwindcss className="w-6 h-6" />
                                        <SiFastapi className="w-6 h-6" />
                                        <SiRedux className="w-6 h-6" />
                                        <SiDocker className="w-6 h-6" />
                                    </div>
                                </span>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a
                                        href="https://gitlab.com/Mgiano02"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://gitlab.com/Mgiano02"
                                            )
                                        }
                                    >
                                        <SiGitlab className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/michael-gianoulakis/"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-blue-500 border border-blue-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://www.linkedin.com/in/michael-gianoulakis/"
                                            )
                                        }
                                    >
                                        <GrLinkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="w-72 bg-green-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-12 ease-in duration-200 hover:scale-110 hover:bg-green-400 drop-shadow-lg hover:drop-shadow-2xl">
                            <div
                                className={`flex flex-col items-center pb-10 ${
                                    hoveredIndex === 1 || hoveredIndex === -1
                                        ? ""
                                        : "filter blur-md"
                                }`}
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    className="w-32 h-32 mb-3 rounded-full shadow-lg"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/photos/Joe.jpg"
                                    }
                                    alt="Profile"
                                />
                                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white m-w-full truncate">
                                    Joseph Ferraro
                                </h5>
                                <span className="text-md text-gray-500 dark:text-gray-400 font-bold underline">
                                    Full Stack Developer
                                </span>
                                <span className="text-md text-gray-500 dark:text-gray-400">
                                    <div className=" text-md text-center pt-3">
                                        <AiOutlineMail className="inline-block text-gray-500 dark:text-gray-400 mr-1" />
                                        <span className="text-md text-gray-500 dark:text-gray-400">
                                            jferraro2626@gmail.com
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-5 pt-6">
                                        <SiPython className="w-6 h-6" />
                                        <SiJavascript className="w-6 h-6" />
                                        <SiTailwindcss className="w-6 h-6" />
                                        <SiFastapi className="w-6 h-6" />
                                        <SiRedux className="w-6 h-6" />
                                        <SiDocker className="w-6 h-6" />
                                    </div>
                                </span>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a
                                        href="https://gitlab.com/jferraro2626"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://gitlab.com/jferraro2626"
                                            )
                                        }
                                    >
                                        <SiGitlab className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/jferraro26/"
                                        className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-gray-900 bg-blue-500 border border-blue-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://www.linkedin.com/in/jferraro26/"
                                            )
                                        }
                                    >
                                        <GrLinkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="w-72 bg-green-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-12 ease-in duration-200 hover:scale-110 hover:bg-green-400 drop-shadow-lg hover:drop-shadow-2xl">
                            <div
                                className={`flex flex-col items-center pb-10 ${
                                    hoveredIndex === 2 || hoveredIndex === -1
                                        ? ""
                                        : "filter blur-md"
                                }`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    className="w-32 h-32 mb-3 rounded-full shadow-lg"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/photos/Chad.png"
                                    }
                                    alt="Profile"
                                />
                                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white m-w-full">
                                    Chad Manuel
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-bold underline">
                                    Full Stack Developer
                                </span>
                                <span className="text-md text-gray-500 dark:text-gray-400">
                                    <div className="text-md text-center pt-3">
                                        <AiOutlineMail className="inline-block text-gray-500 dark:text-gray-400 mr-1" />
                                        <span className="text-md text-gray-500 dark:text-gray-400">
                                            chadc_manuel@yahoo.com
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-5 pt-6">
                                        <SiPython className="w-6 h-6" />
                                        <SiJavascript className="w-6 h-6" />
                                        <SiTailwindcss className="w-6 h-6" />
                                        <SiFastapi className="w-6 h-6" />
                                        <SiRedux className="w-6 h-6" />
                                        <SiDocker className="w-6 h-6" />
                                    </div>
                                </span>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a
                                        href="https://gitlab.com/chdclar16"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://gitlab.com/chdclar16"
                                            )
                                        }
                                    >
                                        <SiGitlab className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/chadmanuel/"
                                        className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-gray-900 bg-blue-500 border border-blue-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            openInNewTab(
                                                "https://www.linkedin.com/in/chadmanuel/"
                                            )
                                        }
                                    >
                                        <GrLinkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
