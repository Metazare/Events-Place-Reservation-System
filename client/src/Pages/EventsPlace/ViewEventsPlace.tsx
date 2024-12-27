import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Imported Components
import Container from "@mui/material/Container";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReportIcon from "@mui/icons-material/Report";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

// Created Components
import ReviewCard from "src/Components/ReviewCard";
import AmenitiesCard from "src/Components/AmenitiesCard";
import { formatToMoney } from "../../Utils/utils";

// Hooks
import useEventsPlace from "src/Hooks/useEventsPlace";
import { useAuthContext } from "src/Context/AuthContext";
import useModal from "src/Hooks/useModal";
import ReservationForm from "./ReservationForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ViewImageModal from "src/Components/ViewImageModal";
import GoBackComp from "src/Components/GoBackComp";
import useReview from "src/Hooks/useReview";

import TextField from "src/Components/TextField";
import { useFormik } from "formik";
import { AmenityType } from "src/Hooks/useTypes";
import Button from "@mui/material/Button";
import DatePicker from "src/Components/DatePicker";
import DateRange from "src/Components/DateRange";
import useDates from "src/Hooks/useDates";
import PaymentModal from "./PaymentModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { addDays } from "date-fns";

export default function ViewEventsPlace({ data: passedData }: { data?: any }) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, loading, error, getEventsPlace } = useEventsPlace();
    const {
        data: reviewData,
        loading: reviewLoading,
        error: reviewError,
        getReview,
        getAverageRating,
    } = useReview();
    const { authUser } = useAuthContext();
    // const { AmenitiesList, ReservationFormComp, setEventsPlaceData } =
    //     ReservationForm();
    const { setOpenModal, ModalComponent, closeModal } = useModal();

    useEffect(() => {
        if (passedData) {
            setEventsPlaceData(passedData);
        } else {
            if (id) getEventsPlace(id);
            if (id) getReview(id);
        }
    }, []);
    useEffect(() => {
        if (data) {
            setEventsPlaceData(data[0]);
            reviewData && console.log(reviewData);
        }
    }, [data]);

    const { getDatesToArray } = useDates();
    const [selectedDate, setSelectedDate] = useState<string>("Single Day");
    const [dateRange, setDateRange] = useState({
        startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // One day ahead of today
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)), // One day ahead of today
        key: "selection",
    });

    const [datePicker, setDatePicker] = useState(addDays(new Date(), 1));
    const [EventsPlaceData, setEventsPlaceData] = useState<any>({});
    const ReservationFormik = useFormik({
        initialValues: {
            guestCount: 1,
            renterID: "",
            hostID: "",
            eventsPlaceId: "",
            status: "",
            timeStamp: "",
            amenities: [],
            specialRequest: "",
            date: [addDays(new Date(), 1)],
        },
        onSubmit: (values) => {
            let data = {
                ...values,
                date: getDate(),
                eventsPlaceId: EventsPlaceData.eventsPlaceId,
                rate: EventsPlaceData.rate,
                startDate:
                    getDate()[0]?.getTime() ?? dateRange.startDate.getTime(),
                days:
                    values.date.length ||
                    dateRange.endDate.getDate() -
                        dateRange.startDate.getDate() +
                        1,
                AmenitiesList: values.amenities.map((amenity: any) => {
                    return {
                        amenityId: amenity.amenityId,
                        quantity: amenity.quantity,
                    };
                }),
            };
            console.log(data);
            setOpenModal(<PaymentModal data={data} />);
        },
    });

    useEffect(() => {
        console.log(ReservationFormik.values);
    }, [ReservationFormik.values]);
    function getDate() {
        if (selectedDate === "Single Day") {
            return getDatesToArray(datePicker, datePicker);
        } else if (selectedDate === "Multiple Days") {
            return getDatesToArray(dateRange.startDate, dateRange.endDate);
        } else {
            return getDatesToArray(
                addDays(new Date(), 1),
                addDays(new Date(), 1)
            );
        }
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <Container
            maxWidth="lg"
            sx={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                alignItems: "start",
                padding: "2em 1em",
            }}
        >
            {data && <GoBackComp />}
            <div className="w-full">
                <div className="flex text-[#303030] items-start">
                    <h3 className="text-[27px] grow font-medium">
                        {passedData?.name || data?.[0]?.name}
                    </h3>
                    {data?.[0]?.host?.userId === authUser?.userId ? (
                        <Tooltip title="Update">
                            <IconButton
                                sx={{ marginTop: ".1em" }}
                                onClick={() => {
                                    navigate(
                                        "/eventsplace/update/" +
                                            data[0]?.eventsPlaceId
                                    );
                                }}
                            >
                                <BorderColorIcon sx={{ fontSize: "27px" }} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Report">
                            <IconButton
                                sx={{ marginTop: ".1em" }}
                                onClick={() => {
                                    navigate("/helpdesk");
                                }}
                            >
                                <ReportIcon sx={{ fontSize: "27px" }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                <div className="flex gap-2 items-center color-[#303030]">
                    <StarIcon sx={{ fontSize: "15 px" }} />
                    <p className="text-[15  px]">
                        {getAverageRating(reviewData)} ({reviewData?.length}{" "}
                        Reviews)
                    </p>
                </div>
            </div>
            <div className="relative flex flex-col md:flex-row  aspect-video w-full gap-4">
                <div
                    className="ImageClickable grow h-full rounded"
                    style={{
                        background: `url("${
                            passedData
                                ? passedData.images[0]
                                : data?.[0]?.images?.[0]
                        }") no-repeat`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    onClick={() => {
                        setOpenModal(
                            <ViewImageModal
                                data={
                                    passedData
                                        ? passedData.images
                                        : data?.[0]?.images
                                }
                                index={0}
                            />
                        );
                    }}
                />
                <div className="w-[100%] md:w-[30%] hidden md:flex flex-col gap-4">
                    <div
                        className="ImageClickable grow rounded"
                        style={{
                            background: `url("${
                                passedData
                                    ? passedData.images[1]
                                    : data?.[0]?.images?.[1]
                            }") no-repeat`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => {
                            setOpenModal(
                                <ViewImageModal
                                    data={
                                        passedData
                                            ? passedData.images
                                            : data?.[0]?.images
                                    }
                                    index={1}
                                />
                            );
                        }}
                    />
                    <div
                        className="ImageClickable grow rounded"
                        style={{
                            background: `url("${
                                passedData
                                    ? passedData.images[2]
                                    : data?.[0]?.images?.[2]
                            }") no-repeat`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        onClick={() => {
                            setOpenModal(
                                <ViewImageModal
                                    data={
                                        passedData
                                            ? passedData.images
                                            : data?.[0]?.images
                                    }
                                    index={2}
                                />
                            );
                        }}
                    />
                    {(passedData
                        ? passedData.images.length > 3
                        : data?.[0]?.images.length > 3) && (
                        <p className="absolute bottom-[15px] right-[15px] px-3 py-2 bg-[black]/80 rounded-xl shadow-lg text-[white]">
                            3+ Photos
                        </p>
                    )}
                </div>
            </div>
            <div
                className="w-full flex md:grid gap-5"
                style={{ gridTemplateColumns: "1fr .6fr" }}
            >
                <div className="grow flex flex-col gap-[2.5em]">
                    <div className="border-b border-[black]/10 pb-[2.5em]">
                        <h6 className="text-[20px] font-semibold mb-3">
                            About this place
                        </h6>
                        <p className="text-justify">
                            {passedData?.description || data?.[0]?.description}
                        </p>
                    </div>
                    <div className="border-b border-[black]/10 pb-[2.5em]">
                        <h6 className="text-[20px] font-semibold mb-3">
                            What this place can offer
                        </h6>
                        <div
                            className="grid gap-4"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(300px, 1fr))",
                            }}
                        >
                            {EventsPlaceData?.amenities?.map(
                                (data: any, index) => {
                                    let isSelected =
                                        ReservationFormik.values.amenities.find(
                                            (amenity: any) =>
                                                amenity.amenityId ===
                                                data.amenityId
                                        ) !== undefined;
                                    return (
                                        <AmenitiesCard
                                            data={data}
                                            key={index}
                                            isSelected={isSelected}
                                            clickHandler={() => {
                                                if (isSelected) {
                                                    ReservationFormik.setFieldValue(
                                                        "amenities",
                                                        ReservationFormik.values.amenities.filter(
                                                            (amenity: any) =>
                                                                amenity.amenityId !==
                                                                data.amenityId
                                                        )
                                                    );
                                                } else {
                                                    ReservationFormik.setFieldValue(
                                                        "amenities",
                                                        [
                                                            ...ReservationFormik
                                                                .values
                                                                .amenities,
                                                            {
                                                                ...data,
                                                                quantity: 1,
                                                            },
                                                        ]
                                                    );
                                                }
                                                // data !== null && ReservationFormik.setFieldValue("amenities",ReservationFormik.setFieldValue("amenities", [...ReservationFormik.values.amenities,{ amenityId: data.amenityId, quantity: 1 }]))
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                        <div className=" md:hidden mt-10">
                            <div className="w-full sticky top-[10px] rounded-xl shadow-sm bg-[white]  p-4 flex flex-col gap-3">
                                <h5 className=" mb-1">
                                    <span className="font-semibold opacity-70 text-[32px]">
                                        ₱{"190"}
                                    </span>{" "}
                                    <span>per day</span>
                                </h5>
                                <div className="w-full flex rounded-full border border-[black]/10">
                                    <p
                                        style={{
                                            transition: "all .3s ease-in-out",
                                        }}
                                        className={`grow text-center rounded-full  py-[.5em]  cursor-pointer ${
                                            selectedDate === "Single Day"
                                                ? "bg-[#144273] text-[white]"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (selectedDate === "Single Day")
                                                return;
                                            if (
                                                selectedDate === "Multiple Days"
                                            ) {
                                                ReservationFormik.setFieldValue(
                                                    "date",
                                                    addDays(new Date(), 1)
                                                );
                                            }
                                            setSelectedDate("Single Day");
                                        }}
                                    >
                                        Single Day
                                    </p>
                                    <p
                                        style={{
                                            transition: "all .3s ease-in-out",
                                        }}
                                        className={`grow text-center py-[.5em] rounded-full  cursor-pointer ${
                                            selectedDate === "Multiple Days"
                                                ? "bg-[#144273] text-[white]"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            ReservationFormik.setFieldValue(
                                                "date",
                                                {
                                                    startDate: new Date(),
                                                    endDate: new Date(),
                                                    key: "selection",
                                                }
                                            );
                                            setSelectedDate("Multiple Days");
                                        }}
                                    >
                                        Multiple Days
                                    </p>
                                </div>
                                {selectedDate === "Multiple Days" ? (
                                    <>
                                        <div>
                                            <p
                                                className={`mb-2  font-[500]  text-[#646464]`}
                                            >
                                                Date Range
                                            </p>
                                            <DateRange
                                                dateValue={dateRange}
                                                setDateValue={setDateRange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p
                                                className={`mb-2  font-[500]  text-[#646464]`}
                                            >
                                                When
                                            </p>
                                            <DatePicker
                                                value={datePicker}
                                                handleChange={(value) => {
                                                    setDatePicker(value);
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                                <TextField
                                    attr={{
                                        placeholder: "1",
                                        name: "guestCount",
                                        value: ReservationFormik.values
                                            .guestCount,
                                        min: 1,
                                        max: 250,
                                    }}
                                    label="Guests"
                                    type="number"
                                    handleChange={
                                        ReservationFormik.handleChange
                                    }
                                    error={
                                        ReservationFormik.touched.guestCount &&
                                        ReservationFormik.errors.guestCount !==
                                            undefined
                                    }
                                    errorMessages={
                                        ReservationFormik.errors.guestCount
                                    }
                                />
                                <TextField
                                    attr={{
                                        placeholder: "Special Request",
                                        name: "specialRequest",
                                        value: ReservationFormik.values
                                            .specialRequest,
                                    }}
                                    label="Special Request"
                                    type="text"
                                    handleChange={
                                        ReservationFormik.handleChange
                                    }
                                    error={
                                        ReservationFormik.touched
                                            .specialRequest &&
                                        ReservationFormik.errors
                                            .specialRequest !== undefined
                                    }
                                    errorMessages={
                                        ReservationFormik.errors.specialRequest
                                    }
                                />
                                {ReservationFormik.values.amenities.length >
                                    0 && (
                                    <>
                                        <div>
                                            <p
                                                className={`mb-2  font-[500] text-[#646464]`}
                                            >
                                                Amenities
                                            </p>
                                            <div className="flex flex-col gap-3">
                                                {ReservationFormik.values.amenities.map(
                                                    (
                                                        data: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <>
                                                                <div className="flex gap-2 items-center border border-[black]/10 p-2 rounded-xl">
                                                                    <div className="grow">
                                                                        <p className="font-semibold text-[black]/70">
                                                                            {
                                                                                data.name
                                                                            }
                                                                        </p>
                                                                        <p className="mt-[-7px]">
                                                                            ₱
                                                                            {
                                                                                data.rate
                                                                            }{" "}
                                                                            {data.amenityType ===
                                                                                "per day" &&
                                                                                "per day"}{" "}
                                                                            {data.amenityType ===
                                                                                "per quantity" &&
                                                                                "each"}
                                                                        </p>
                                                                    </div>
                                                                    {data.amenityType !==
                                                                        "one time" && (
                                                                        <div className="flex gap-1 items-center">
                                                                            <IconButton
                                                                                aria-label=""
                                                                                onClick={() => {
                                                                                    ReservationFormik.setFieldValue(
                                                                                        "amenities",
                                                                                        ReservationFormik.values.amenities.map(
                                                                                            (
                                                                                                amenity: any
                                                                                            ) => {
                                                                                                if (
                                                                                                    amenity.amenityId ===
                                                                                                        data.amenityId &&
                                                                                                    data.quantity !==
                                                                                                        1
                                                                                                ) {
                                                                                                    return {
                                                                                                        ...amenity,
                                                                                                        quantity:
                                                                                                            amenity.quantity -
                                                                                                            1,
                                                                                                    };
                                                                                                }
                                                                                                return amenity;
                                                                                            }
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <RemoveCircleOutlineIcon />
                                                                            </IconButton>
                                                                            <span>
                                                                                {
                                                                                    data.quantity
                                                                                }
                                                                            </span>
                                                                            <IconButton
                                                                                aria-label=""
                                                                                onClick={() => {
                                                                                    ReservationFormik.setFieldValue(
                                                                                        "amenities",
                                                                                        ReservationFormik.values.amenities.map(
                                                                                            (
                                                                                                amenity: any
                                                                                            ) => {
                                                                                                if (
                                                                                                    amenity.amenityId ===
                                                                                                    data.amenityId
                                                                                                ) {
                                                                                                    return {
                                                                                                        ...amenity,
                                                                                                        quantity:
                                                                                                            amenity.quantity +
                                                                                                            1,
                                                                                                    };
                                                                                                }
                                                                                                return amenity;
                                                                                            }
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <AddCircleOutlineIcon />
                                                                            </IconButton>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {data?.[0]?.host?.userId !==
                                    authUser?.userId && (
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            ReservationFormik.handleSubmit();
                                        }}
                                        sx={{
                                            borderRadius: "10px !important",
                                            marginTop: "2em",
                                            background: "#144273",
                                        }}
                                    >
                                        Reserve
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-[1em]">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <Avatar
                                    variant="circular"
                                    src={
                                        passedData?.photo ||
                                        data?.[0]?.host?.photo
                                    }
                                    alt="Wew"
                                    sx={{ width: "55px", height: "55px" }}
                                />
                                <div>
                                    <h6 className="text-[20px] leading-[23px] font-semibold">
                                        {passedData?.host ||
                                            data?.[0]?.host?.name?.first +
                                                " " +
                                                data?.[0]?.host?.name
                                                    ?.last}{" "}
                                    </h6>
                                    <p className="text-[14px] leading-[13px] font-semibold opacity-65">
                                        Owner
                                    </p>
                                </div>
                            </div>
                            <IconButton
                                aria-label=""
                                onClick={() => {
                                    navigate(
                                        `/chat/${
                                            passedData?.userId ||
                                            data?.[0]?.host?.userId
                                        }`
                                    );
                                }}
                            >
                                <ChatIcon sx={{ fontSize: "35px" }} />
                            </IconButton>
                        </div>
                        <p className="mt-[1em] text-justify">
                            {passedData?.description ||
                                data?.[0]?.host?.description}
                        </p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="w-full sticky top-[10px] rounded-xl shadow-sm bg-[white]  p-4 flex flex-col gap-3">
                        <h5 className=" mb-1">
                            <span className="font-semibold opacity-70 text-[32px]">
                                ₱
                                {passedData?.rate
                                    ? formatToMoney(passedData?.rate)
                                    : data?.[0]?.rate
                                    ? formatToMoney(data?.[0]?.rate)
                                    : ""}
                            </span>{" "}
                            <span>per day</span>
                        </h5>
                        <div className="w-full flex rounded-full border border-[black]/10">
                            <p
                                style={{ transition: "all .3s ease-in-out" }}
                                className={`grow text-center rounded-full  py-[.5em]  cursor-pointer ${
                                    selectedDate === "Single Day"
                                        ? "bg-[#144273] text-[white]"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (selectedDate === "Single Day") return;
                                    if (selectedDate === "Multiple Days") {
                                        ReservationFormik.setFieldValue(
                                            "date",
                                            addDays(new Date(), 1)
                                        );
                                    }
                                    setSelectedDate("Single Day");
                                }}
                            >
                                Single Day
                            </p>
                            <p
                                style={{ transition: "all .3s ease-in-out" }}
                                className={`grow text-center py-[.5em] rounded-full  cursor-pointer ${
                                    selectedDate === "Multiple Days"
                                        ? "bg-[#144273] text-[white]"
                                        : ""
                                }`}
                                onClick={() => {
                                    ReservationFormik.setFieldValue("date", {
                                        startDate: new Date(),
                                        endDate: new Date(),
                                        key: "selection",
                                    });
                                    setSelectedDate("Multiple Days");
                                }}
                            >
                                Multiple Days
                            </p>
                        </div>
                        {selectedDate === "Multiple Days" ? (
                            <>
                                <div>
                                    <p
                                        className={`mb-2  font-[500]  text-[#646464]`}
                                    >
                                        Date Range
                                    </p>
                                    <DateRange
                                        dateValue={dateRange}
                                        setDateValue={setDateRange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p
                                        className={`mb-2  font-[500]  text-[#646464]`}
                                    >
                                        When
                                    </p>
                                    <DatePicker
                                        value={datePicker}
                                        handleChange={(value) => {
                                            setDatePicker(value);
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <TextField
                            attr={{
                                placeholder: "1",
                                name: "guestCount",
                                value: ReservationFormik.values.guestCount,
                                min: 1,
                                max: 250,
                            }}
                            label="Guests"
                            type="number"
                            handleChange={(e) => {
                                let value = e.target.value;

                                // Allow the input to be empty, and if not empty, ensure it is a number less than 250
                                if (value === "" || /^[0-9]*$/.test(value)) {
                                    const numericValue =
                                        value === "" ? "" : parseInt(value, 10);

                                    if (
                                        numericValue === "" ||
                                        numericValue <= 250
                                    ) {
                                        // Set the value to the numeric value or empty string
                                        ReservationFormik.setFieldValue(
                                            "guestCount",
                                            numericValue
                                        );
                                    }
                                }
                            }}
                            error={
                                ReservationFormik.touched.guestCount &&
                                ReservationFormik.errors.guestCount !==
                                    undefined
                            }
                            errorMessages={ReservationFormik.errors.guestCount}
                        />

                        <TextField
                            attr={{
                                placeholder: "Special Request",
                                name: "specialRequest",
                                value: ReservationFormik.values.specialRequest,
                            }}
                            label="Special Request"
                            type="text"
                            handleChange={ReservationFormik.handleChange}
                            error={
                                ReservationFormik.touched.specialRequest &&
                                ReservationFormik.errors.specialRequest !==
                                    undefined
                            }
                            errorMessages={
                                ReservationFormik.errors.specialRequest
                            }
                        />
                        {ReservationFormik.values.amenities.length > 0 && (
                            <>
                                <div>
                                    <p
                                        className={`mb-2  font-[500] text-[#646464]`}
                                    >
                                        Amenities
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        {ReservationFormik.values.amenities.map(
                                            (data: any, index: number) => {
                                                let isSelected =
                                                    ReservationFormik.values.amenities.find(
                                                        (amenity: any) =>
                                                            amenity.amenityId ===
                                                            data.amenityId
                                                    ) !== undefined;
                                                return (
                                                    <>
                                                        <AmenitiesCard
                                                            data={data}
                                                            key={index}
                                                            isSelected={
                                                                isSelected
                                                            }
                                                            clickHandler={() => {
                                                                if (
                                                                    isSelected
                                                                ) {
                                                                    ReservationFormik.setFieldValue(
                                                                        "amenities",
                                                                        ReservationFormik.values.amenities.filter(
                                                                            (
                                                                                amenity: any
                                                                            ) =>
                                                                                amenity.amenityId !==
                                                                                data.amenityId
                                                                        )
                                                                    );
                                                                } else {
                                                                    ReservationFormik.setFieldValue(
                                                                        "amenities",
                                                                        [
                                                                            ...ReservationFormik
                                                                                .values
                                                                                .amenities,
                                                                            {
                                                                                ...data,
                                                                                quantity: 1,
                                                                            },
                                                                        ]
                                                                    );
                                                                }
                                                                // data !== null && ReservationFormik.setFieldValue("amenities",ReservationFormik.setFieldValue("amenities", [...ReservationFormik.values.amenities,{ amenityId: data.amenityId, quantity: 1 }]))
                                                            }}
                                                        />
                                                    </>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {data?.[0]?.host?.userId !== authUser?.userId && (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    ReservationFormik.handleSubmit();
                                }}
                                sx={{
                                    borderRadius: "10px !important",
                                    marginTop: "2em",
                                    background: "#144273",
                                }}
                            >
                                Reserve
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="border-t mt-4 flex flex-col-reverse gap-12 md:gap-0 pt-[2.5em] border-[black]/10 w-full md:grid"
                style={{ gridTemplateColumns: "1fr .5fr" }}
            >
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                    }}
                >
                    {reviewData?.map((review: any, index: number) => (
                        <ReviewCard
                            key={index}
                            review={{
                                comment: review.comment,
                                name:
                                    review.reviewer.name.first +
                                    " " +
                                    review.reviewer.name.last,
                                date: review.createdAt,
                                rating: review.rating,
                                photo: review.reviewer.photo,
                            }}
                        />
                    ))}
                </div>
                <div>
                    <div className="w-full items-center sticky top-[10px] flex flex-col justify-center">
                        <h6 className="text-[66px] font-semibold leading-[88px]">
                            {getAverageRating(reviewData)}
                        </h6>
                        <Rating
                            name="read-only"
                            value={getAverageRating(reviewData) ?? 0}
                            precision={0.5}
                            sx={{ border: "white" }}
                            readOnly
                        />
                        <p className="mt-2 text-[18px] opacity-80">
                            {reviewData?.length} Review(s)
                        </p>
                    </div>
                </div>
            </div>
            <ModalComponent />
        </Container>
    );
}
