import React from "react";
import Qoute from "../Images/Qoute.svg";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import moment from "moment";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "white",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
    "& .MuiRating-iconEmpty": {
        color: "white", // Modify the color of the unfilled star here
    },
    "& .MuiRating-iconHalf": {
        color: "green", // Modify the color of the half-filled star here
    },
});

type ReviewData = {
    eventsPlaceId?: string;
    rating?: string;
    comment?: string;
    name?: string;
    date?: string;
    photo?: string;
};

export default function ReviewCard({ review }: { review: ReviewData }) {
    return (
        <div className="relative bg-[#092646] rounded-xl z-[-1] p-4 text-[white]">
            <img
                className="absolute top-4 w-[20%] z-[-1] opacity-80 mb-[-30px]"
                src={Qoute}
                alt=""
            />
            <p className="pl-4  z-[12] text-[15px]  pt-[30px] z leading-[18px]">
                {review?.comment}
            </p>
            <div className="mt-[2em] flex gap-3 items-center z-[4]">
                <Avatar
                    variant="circular"
                    src={review?.photo}
                    alt="WEW"
                    sx={{ width: "45px", height: "45px" }}
                />
                <div className="grow">
                    <h6 className="text-[18px] leading-[18px] font-semibold">
                        {review?.name}
                    </h6>
                    <p className="text-[12px] leading-[15px] font-semibold opacity-65">
                        {review?.date
                            ? moment(review.date).format("MMMM DD, YYYY")
                            : ""}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <p>{review?.rating}</p>
                    <StyledRating
                        name="read-only"
                        value={Number(review?.rating)}
                        precision={0.5}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}
