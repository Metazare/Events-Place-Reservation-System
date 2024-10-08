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

export default function ViewEventsPlace({ data: passedData }: { data?: any }) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, loading, error, getEventsPlace } = useEventsPlace();
    const { authUser } = useAuthContext();
    const { AmenitiesList, ReservationFormComp, setEventsPlaceData } =
        ReservationForm();
    const { setOpenModal, ModalComponent, closeModal } = useModal();

    useEffect(() => {
        if (passedData) {
            setEventsPlaceData(passedData);
        } else {
            if (id) getEventsPlace(id);
        }
    }, []);
    useEffect(() => {
        if (data) {
            setEventsPlaceData(data[0]);
        }
    }, [data]);

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
                                onClick={() => {}}
                            >
                                <ReportIcon sx={{ fontSize: "27px" }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                <div className="flex gap-2 items-center color-[#303030]">
                    <StarIcon sx={{ fontSize: "15 px" }} />
                    <p className="text-[15  px]">0 (0 Reviews)</p>
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
                        <AmenitiesList />
                        <div className=" md:hidden mt-10">
                            <div className="w-full sticky top-[10px] rounded-xl shadow-sm bg-[white]  p-4 flex flex-col gap-3">
                                <h5 className=" mb-1">
                                    <span className="font-semibold opacity-70 text-[32px]">
                                        ₱{"190"}
                                    </span>{" "}
                                    <span>per day</span>
                                </h5>
                                <ReservationFormComp />
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
                                        Host
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
                                ₱{passedData?.rate || data?.[0]?.rate}
                            </span>{" "}
                            <span>per day</span>
                        </h5>
                        <ReservationFormComp data={data?.[0]} />
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
                    <ReviewCard />
                </div>
                <div>
                    <div className="w-full items-center sticky top-[10px] flex flex-col justify-center">
                        <h6 className="text-[66px] font-semibold leading-[88px]">
                            4.5
                        </h6>
                        <Rating
                            name="read-only"
                            value={4.5}
                            precision={0.5}
                            sx={{ border: "white" }}
                            readOnly
                        />
                        <p className="mt-2 text-[18px] opacity-80">
                            28 Reviews
                        </p>
                    </div>
                </div>
            </div>
            <ModalComponent />
        </Container>
    );
}
