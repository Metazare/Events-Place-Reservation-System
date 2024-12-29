import React from "react";
import Button from "@mui/material/Button";
import LogoIcon from "src/Images/Logo/LogoBox.svg";
import Timeline from "src/Components/Timeline";
import TimelineComp from "src/Components/TimelineComp";
import useReservation from "src/Hooks/useReservation";
import toast from "react-hot-toast";
import { formatToMoney } from "src/Utils/utils";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Tooltip from "@mui/material/Tooltip";

interface ReservationData {
    eventsPlaceId: string;
    rate: number;
    amenities: {
        amenityId: string;
        quantity: number;
        rate: number;
        amenityType: string;
        name: string;
    }[];
    guestCount: number;
    startDate: number;
    days: number;
    date: any;
    amount?: number;
    specialRequest?: string;
}

export default function PaymentModal({ data }: { data: ReservationData }) {
    const [isAgree, setIsAgree] = React.useState(false);
    const { createReservation, getReservationTotal } = useReservation();
    const submitReservation = async (e: any) => {
        e.preventDefault();

        const totalAmount = getReservationTotal(data);
        await createReservation({ ...data, amount: totalAmount });
    };

    return (
        <>
            <div
                className=" w-[100vw] max-w-[1000px]  min-h-[550px] overflow-hidden rounded-xl flex flex-col sm:grid"
                style={{ gridTemplateColumns: "60% 40%" }}
            >
                <div className="p-[1.5em] flex flex-col grow">
                    <h6 className="text-[25px] text-[#144273] font-semibold">
                        Price Details
                    </h6>
                    <div className="grow py-4">
                        <div className="flex flex-col gap-1">
                            <TimelineComp
                                title={`₱${formatToMoney(data.rate)} x ${
                                    data.days
                                } day/s`}
                                subtitle=""
                                price={`₱ ${data.rate * data.days}`}
                            />
                            {/* Display here per amenities */}
                            {data.amenities.map((amenity, index) => {
                                return (
                                    <>
                                        <TimelineComp
                                            title={`₱${formatToMoney(
                                                amenity.rate
                                            )} x ${amenity.quantity}`}
                                            subtitle={amenity.name}
                                            price={`₱ ${formatToMoney(
                                                data.rate * data.days
                                            )}`}
                                        />
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<TaskAltIcon />}
                            onClick={() => {
                                setIsAgree(!isAgree);
                            }}
                        />
                        <p>
                            I agree with the{" "}
                            <a
                                className="font-bold cursor-pointer"
                                target="_blank"
                                href="/policy"
                            >
                                Policy
                            </a>{" "}
                            and{" "}
                            <a
                                className="font-bold cursor-pointer"
                                target="_blank"
                                href="/termscondition"
                            >
                                Terms & Condition
                            </a>
                        </p>
                    </div>
                    <div className="border-t border-[black]/50 flex justify-between items-end pt-[1em]">
                        <p className="text-[18px] text-[black]/50">Total</p>
                        <p className="text-[26px] font-semibold">
                            ₱ {formatToMoney(getReservationTotal(data))}
                        </p>
                    </div>
                </div>
                <div
                    className="p-[1.5em] relative flex flex-col overflow-hidden "
                    style={{ background: `url(${Image})` }}
                >
                    <div className="bg-[#132F4C] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full z-[-4]" />
                    <div className="grow justify-start items-center hidden sm:flex flex-col gap-4">
                        <img
                            src={LogoIcon}
                            className="w-[40%] mt-[20%]"
                            alt=""
                        />
                    </div>
                    <Tooltip title="By clicking this button, you agree to the Events Place's Terms and Conditions and Privacy Policy.">
                        <Button
                            variant="contained"
                            sx={{ background: "#2D74B4" }}
                            fullWidth
                            onClick={submitReservation}
                            disabled={!isAgree}
                        >
                            Reserve
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}
