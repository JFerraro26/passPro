import { useState } from "react";
import LoginForm from "../accounts/loginForm";
import SignUpForm from "../accounts/signUpForm";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

function LogInPopUP() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <div className="flex justify-end">
      <button
        className="relative block text-2xl font-semibold hover:text-orange-500"
        onClick={() => setOpen(true)}
      >
        Login
      </button>
      {open ? (
        <div className="fixed z-10 inset-0 grid grid-cols-7 grid-rows-7">
          <AnimatePresence>
            <div className="col-start-3 col-span-3 row-start-3 row-span-3">
              {login ? (
                <motion.div
                  key="SignUpForm"
                  initial={{ y: -200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    duration: 1,
                  }}
                  className="grid grid-cols-5 grid-rows-5"
                >
                  <div className="z-30 col-start-5 col-span-1 row-start-1 row-span-1 flex justify-center items-center">
                    <button
                      className="text-xl text-black hover:text-orange-500"
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        <AiOutlineCloseSquare />
                      </span>
                    </button>
                  </div>
                  <div className="z-20 relative border-4 border-blue-500 rounded-3xl overflow-hidden shadow-xl shadow-orange-500 col-start-1 col-span-5 row-start-1 row-span-5 ">
                    <img
                      className="object-cover w-full h-full"
                      src="https://indie88.com/wp-content/uploads/2016/03/MoshPit1190.jpg"
                      alt="concert"
                    />
                  </div>
                  <div className="z-30 flex flex-col col-start-2 col-span-3 row-start-2 row-span-3 items-center justify-center">
                    <SignUpForm setOpen={setOpen} />
                    <button
                      onClick={() => setLogin(!login)}
                      className="mt-4 underline rounded-2xl text-white bg-black bg-opacity-5 hover:text-orange-500 transition-all"
                    >
                      Already have an account? Click Here!
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="LoginForm"
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    duration: 1,
                  }}
                  className="grid grid-cols-5 grid-rows-5"
                >
                  <div className="z-30 col-start-5 col-span-1 row-start-1 row-span-1 flex justify-center items-center">
                    <button
                      className="text-xl text-white hover:text-green-600 bg-black bg-opacity-10"
                      onClick={() => setOpen(false)}
                    >
                      <AiOutlineCloseSquare />
                    </button>
                  </div>
                  <div className="z-30 flex flex-col col-start-2 col-span-3 row-start-2 row-span-3 items-center justify-center">
                    <LoginForm setOpen={setOpen} />
                    <button
                      onClick={() => setLogin(!login)}
                      className="mt-4 underline bg-black bg-opacity-50 text-white hover:text-green-600 transition-all"
                    >
                      Need an account? Sign Up Here!
                    </button>
                  </div>
                  <div className="z-20  relative border-4 border-blue-500 rounded-3xl overflow-hidden shadow-xl shadow-orange-500 col-start-1 col-span-5 row-start-1 row-span-5 ">
                    <img
                      className="object-cover w-full h-full"
                      src="https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?size=626&ext=jpg"
                      alt="concert"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
          <button
            // onClick={() => setOpen(false)}
            className="bg-black h-full w-full opacity-70 inset-0 absolute z-0 cursor-default"
          ></button>
        </div>
      ) : null}
    </div>
  );
}

export default LogInPopUP;
