import { useState } from "react";
import { useUpdateMutation } from "../redux/apis/accountsApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAccountInfo } from "../redux/slices/accountSlice";

function BecomeEventManager() {
  const [open, setOpen] = useState(false);
  const [edit] = useUpdateMutation();
  const account = useSelector((state) => state.rootReducer.accountInfo.account);
  const dispatchAccount = useDispatch();
  const token = account?.token;

  const updatedAccount = {
    id: account.id,
    username: account.username,
    avatar_img: account.avatar_img,
    email: account.email,
    event_manager: true,
  };

  const handleAccept = async (e) => {
    try {
      console.log("updated account", updatedAccount);
      await edit({
        accountId: account.id,
        updatedAccount,
        token: token,
      });
      updatedAccount.token = token;
      dispatchAccount(setAccountInfo(updatedAccount));
    } catch (error) {
      console.error("failed to update account");
    }
  };

  return (
    <div className="relative">
      <button
        className="m-2 p-2 bg-white rounded-lg w-full"
        onClick={() => setOpen(!open)}
      >
        Become Event Manager
      </button>
      {open ? (
        <div className="fixed top-0 left-0 h-full w-full">
          <div className="m-16 grid grid-cols-5 grid-rows-5">
            <div className="bg-orange-100 flex flex-col col-start-2 col-span-3 row-start-1 row-span-3 border-4 border-blue-500 rounded-2xl mt-16">
              <div className="m-8">
                <h1 className="text-center text-2xl font-semibold">
                  Event Manager Agreement
                </h1>
                <p className="mt-4">
                  Agreement Regarding Allocation of Sales Proceeds. This
                  Agreement is made between {account.username} and PassPro Inc,
                  collectively referred to as the "Parties," for the purpose of
                  defining the allocation of sales proceeds generated through
                  events managed by the Event Manager.
                </p>
                <br></br>
                <h1>Allocation of Sales Proceeds:</h1>
                <p>
                  a. The Event Manager agrees to allocate 5% of all sales
                  proceeds generated from events managed by them to PassPro Inc.
                  b. The allocation will be based on the net sales proceeds
                  after deducting any applicable taxes, fees, and expenses
                  incurred in the event management process.
                </p>
                <br></br>
                <h1>Payment Terms</h1>
                <p>
                  a. The Event Manager shall remit the allocated amount to the
                  Beneficiary at point of purchase. b. The payment shall be
                  deducted from sale, unless otherwise agreed upon by both
                  Parties.
                </p>
                <br></br>
                <h1>Term and Termination:</h1>
                <p>
                  a. This Agreement shall remain in effect unless terminated by
                  either Party. b. Upon termination, the Event Manager shall
                  fulfill any outstanding payment obligations up to the date of
                  termination.
                </p>
                <br></br>
                <h1>Confidentiality:</h1>
                <p>
                  a. The Parties agree to maintain the confidentiality of all
                  financial and sales-related information shared in relation to
                  this Agreement. This Agreement shall be governed by and
                  construed in accordance with the laws of United States of
                  America, without regard to its conflict of law principles.
                </p>
                <br></br>
                <div className="flex justify-around">
                  <button
                    onClick={() => {
                      setOpen(!open);
                      handleAccept();
                    }}
                    className=" border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setOpen(!open)}
                    className=" border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BecomeEventManager;
