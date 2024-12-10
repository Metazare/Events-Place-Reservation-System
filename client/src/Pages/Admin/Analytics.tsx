import React, { useEffect } from "react";
import EventCard from "src/Components/EventCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import useReservation from "src/Hooks/useReservation";
import useAnalytics from "src/Hooks/useAnalytics";
import useEventsPlace from "src/Hooks/useEventsPlace";

export default function Analytics() {
    const [salesType, setSalesType] = React.useState("Weekly");

    const { data, getReservation } = useReservation();
    const {
        top3Booked,
        top3Highest,
        getMostBooked,
        getTotalSales,
        getHighestRated,
        getMonthlySales,
        getWeeklySales,
    } = useAnalytics();

    useEffect(() => {
        getReservation({ userType: "admin" });
    }, []);

    useEffect(() => {
        if (data) {
            getMostBooked(data);
            getHighestRated(data);
        }
    }, [data, top3Booked, top3Highest]);

    if (!data) {
        return <p>Loading...</p>;
    }
    if (data.length !== 0) {
        if (top3Booked.length === 0 && top3Highest.length === 0) {
            return <p>No data available</p>;
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1em",
            }}
        >
            <div
                style={{
                    padding: "1em",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px 0px #0000001a",
                    background: "#0071BC",
                    minWidth: "400px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <MonetizationOnIcon
                        style={{ fontSize: "3.5em", color: "white" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            gap: "1em",
                        }}
                    >
                        <Button
                            variant={
                                salesType === "Montly" ? "contained" : "text"
                            }
                            color="primary"
                            sx={
                                salesType === "Montly"
                                    ? {
                                          color: "#0071BC",
                                          background: "white !important",
                                      }
                                    : {
                                          color: "white",
                                      }
                            }
                            onClick={() => {
                                setSalesType("Montly");
                            }}
                        >
                            Montly
                        </Button>
                        <Button
                            variant={
                                salesType === "Weekly" ? "contained" : "text"
                            }
                            color="primary"
                            sx={
                                salesType === "Weekly"
                                    ? {
                                          color: "#0071BC",
                                          background: "white !important",
                                      }
                                    : {
                                          color: "white",
                                      }
                            }
                            onClick={() => {
                                setSalesType("Weekly");
                            }}
                        >
                            Weekly
                        </Button>
                    </div>
                </div>

                <p
                    style={{
                        fontSize: "3em",
                        fontWeight: "bold",
                        color: "white",
                        marginTop: ".5em",
                        lineHeight: "1em",
                    }}
                >
                    {salesType === "Weekly"
                        ? `₱${getWeeklySales(data)}`
                        : `₱${getMonthlySales(data)}`}
                </p>
                <p
                    style={{
                        fontSize: "1.2em",
                        opacity: ".7",
                        color: "white",
                    }}
                >
                    Total Sales
                </p>
            </div>
            <div>
                <h2
                    style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                    }}
                >
                    Most Booked{" "}
                </h2>
                <div
                    className="grid gap-5 mb-7 mt-5"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1em",
                    }}
                >
                    {top3Booked &&
                    Array.isArray(top3Booked) &&
                    top3Booked?.length > 0 ? (
                        top3Booked?.map((event: any) => {
                            return (
                                <div
                                    key={event.id}
                                    style={{
                                        flex: "1 1 calc(33.333% - 1em)",
                                        minWidth: "300px",
                                    }}
                                >
                                    <EventCard data={event} type="view" />
                                </div>
                            );
                        })
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            </div>
            <div>
                <h2
                    style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                    }}
                >
                    Highest Rated
                </h2>
                <div
                    className="grid gap-5 mb-7 mt-5"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1em",
                    }}
                >
                    {top3Highest && top3Highest.length > 0 ? (
                        top3Highest.map((event: any) => {
                            return (
                                <div
                                    key={event.id}
                                    style={{
                                        flex: "1 1 calc(33.333% - 1em)",
                                        minWidth: "300px",
                                    }}
                                >
                                    <EventCard data={event} type="view" />
                                </div>
                            );
                        })
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
