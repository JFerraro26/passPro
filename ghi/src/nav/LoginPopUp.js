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
        <div className="fixed z-10 top-0 left-0 h-full w-full">
          <div className="m-16 grid grid-cols-5 grid-rows-5">
            <button
              onClick={() => setOpen(false)}
              className="bg-slate-500 h-full w-full opacity-50 inset-0 absolute z-0 cursor-default"
            ></button>
            <div
              // style={{ height: "500px" }}
              className="min-h-500 z-10 bg-orange-300 flex-col col-start-2 col-span-3 row-start-1 row-span-3 border-4 border-blue-500 rounded-2xl mt-16"
            >
              <div className="m-8">
                <div className="flex justify-end">
                  <button
                    className="text-xl text-blue-500 hover:text-green-600"
                    onClick={() => setOpen(false)}
                  >
                    <AiOutlineCloseSquare />
                  </button>
                </div>
                <AnimatePresence>
                  {login ? (
                    <motion.div
                      key="SignUpForm"
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        duration: 1,
                      }}
                      className="flex flex-col md:flex-row justify-evenly content-center"
                    >
                      <div className="flex flex-col items-center justify-center flex-grow">
                        <img
                          className="w-full rounded-2xl shadow-xl"
                          src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                          alt="concert"
                        />
                        <button
                          onClick={() => setLogin(!login)}
                          className="mt-4 underline text-blue-500 hover:text-green-600 transition-all"
                        >
                          Already have an account? Click Here!
                        </button>
                      </div>
                      <div className="flex flex-col col-start-3 col-span-2 items-center justify-center flex-grow">
                        <SignUpForm setOpen={setOpen} />
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
                      className="flex flex-col md:flex-row justify-evenly content-center"
                    >
                      <div className="flex flex-col  items-center justify-center flex-grow">
                        <LoginForm setOpen={setOpen} />
                      </div>
                      <div className="flex flex-col items-center justify-center flex-grow">
                        <img
                          className="w-full rounded-2xl shadow-xl"
                          src="https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?size=626&ext=jpg"
                          alt="concert"
                        />
                        <button
                          onClick={() => setLogin(!login)}
                          className="mt-4 underline text-blue-500 hover:text-green-600 transition-all"
                        >
                          Need an account? Sign Up Here!
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LogInPopUP;
