import React from "react";
import { formatToMoney } from "src/Utils/utils";
export default function PayReservation({
    closeModal,
    accountNum,
    total,
}: {
    closeModal: () => void;
    accountNum: number;
    total: number;
}) {
    return (
        <div className="p-4 w-[95vw] max-w-[400px]">
            <p className="text-[20px] font-semibold">Pay Reservation</p>
            <p className="mt-4 text-[14px] text-[#144273]">
                {/* Pay your reservation total of ₱{total} through GCash at{" "}
                {accountNum} */}
                Your total reservation is ₱{formatToMoney(total)}. but you are
                required only to pay 50% of the total amount to secure your
                reservation. The remaining balance will be paid on the day of
                the event. Please pay the amount of ₱{formatToMoney(total / 2)}{" "}
                to secure your reservation. You can pay through GCash at{" "}
                {accountNum}.
            </p>
            <p className="mt-4 text-[14px] text-[#144273]">
                Use the link below to pay
            </p>

            <div className="grid mt-5 gap-4">
                <button
                    onClick={closeModal}
                    className="bg-[#144273] text-[white] px-4 py-2 rounded-md"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}
