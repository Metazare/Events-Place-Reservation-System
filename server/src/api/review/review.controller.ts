import { BodyRequest, QueryRequest, RequestHandler } from "express";
import { CheckData } from "../../utilities/checkData";
import { CreateReview, GetReviews, ReviewDocument } from "./review.types";
import { EventsPlaceDocument } from "../eventsPlace/eventsPlace.types";
import {
    NotFound,
    Unauthorized,
    UnprocessableEntity,
} from "../../utilities/errors";
import EventsPlaceModel from "../eventsPlace/eventsPlace.model";
import ReviewModel from "./review.model";
import { logCreateReview } from "../log/log.controller";

export const createReview: RequestHandler = async (
    req: BodyRequest<CreateReview>,
    res
) => {
    const { user, body } = req;

    if (!user) throw new Unauthorized();

    const { rating, eventsPlaceId, comment } = body;
    const checker = new CheckData();

    checker.checkType(rating, "string", "rating");
    checker.checkType(eventsPlaceId, "string", "eventsPlaceId");
    checker.checkType(comment, "string", "comment", true);
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    // Find events place
    const eventsPlace: EventsPlaceDocument | null =
        await EventsPlaceModel.findOne({ eventsPlaceId }).exec();
    if (!eventsPlace) throw new NotFound("Events Place");

    const review = await ReviewModel.create({
        eventsPlace: eventsPlace._id,
        reviewer: user._id,
        comment,
        rating,
    });

    await logCreateReview(
        review.reviewId,
        user.userId,
        eventsPlace.eventsPlaceId
    );

    res.sendStatus(201);
};

export const getReviews: RequestHandler = async (
    req: QueryRequest<GetReviews>,
    res
) => {
    const { query } = req;

    const { eventsPlaceId } = query;
    const checker = new CheckData();

    checker.checkType(eventsPlaceId, "string", "eventsPlaceId", true);
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const reviewQuery: GetReviews = {};

    // Find events place if it is given
    if (eventsPlaceId) {
        const eventsPlace: EventsPlaceDocument | null =
            await EventsPlaceModel.findOne({ eventsPlaceId }).exec();
        if (eventsPlace) {
            reviewQuery.eventsPlaceId = eventsPlace.eventsPlaceId;
        }
    }

    // Get all reviews and populate eventsPlace
    const reviews: ReviewDocument[] = await ReviewModel.find()
        .populate("eventsPlace")
        .populate("reviewer")
        .exec();

        console.log(reviews);
    // Filter reviews by eventsPlaceId if it is given
    const filteredReviews = eventsPlaceId
        ? reviews.filter(
              (review) => review.eventsPlace.eventsPlaceId === eventsPlaceId
          )
        : reviews;
    

    res.json(filteredReviews);
};
