import { useState } from "react";

function BecomeEventManager() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
        onClick={() => setOpen(!open)}
      >
        Become Event Manager
      </button>
      {open ? (
        <div className="fixed top-0 left-0 h-full w-full">
          <div className="flex bg-yellow-100 m-6 flex-col place-content-center items-center content-center justify-center">
            <p>
              Agreement Regarding Allocation of Sales Proceeds This Agreement
              ("Agreement") is made between [Your Name] ("Event Manager") and
              [Event Management Company] ("Company"), collectively referred to
              as the "Parties," for the purpose of defining the allocation of
              sales proceeds generated through events managed by the Event
              Manager. Allocation of Sales Proceeds: a. The Event Manager agrees
              to allocate 5% of all sales proceeds generated from events managed
              by them to PassPro Inc. ("Beneficiary"). b. The allocation will be
              based on the net sales proceeds after deducting any applicable
              taxes, fees, and expenses incurred in the event management
              process. Payment Terms: a. The Event Manager shall remit the
              allocated amount to the Beneficiary within [number of days] days
              following the completion of each event. b. The payment shall be
              made in the form of [preferred payment method] unless otherwise
              agreed upon by both Parties. Reporting: a. The Event Manager shall
              provide a detailed report outlining the sales proceeds and the
              allocated amount to the Beneficiary within [number of days] days
              of the payment. b. The report shall include the event details,
              sales breakdown, and any relevant supporting documentation. Term
              and Termination: a. This Agreement shall remain in effect unless
              terminated by either Party with a written notice of [number of
              days] days. b. Upon termination, the Event Manager shall fulfill
              any outstanding payment obligations up to the date of termination.
              Confidentiality: a. The Parties agree to maintain the
              confidentiality of all financial and sales-related information
              shared in relation to this Agreement. Governing Law: This
              Agreement shall be governed by and construed in accordance with
              the laws of [State/Country], without regard to its conflict of law
              principles. Please sign and return a copy of this Agreement to
              indicate your acceptance and agreement with the terms outlined
              above.
            </p>
            <div className="flex justify-between m-4">
              <button
                onClick={() => setOpen(!open)}
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
              >
                Accept
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BecomeEventManager;
