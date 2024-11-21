import React from "react";
import EventCard from "src/Components/EventCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
export default function Analytics() {
    const [salesType, setSalesType] = React.useState("Weekly");
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
                    ₱500
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
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                    }}
                >
                    {/* {data && data.length > 0 ? (
                        data.map((event: any) => (
                            <EventCard
                                key={event.id}
                                data={event}
                                type="view"
                            />
                        ))
                    ) : (
                        <p>No events available</p>
                    )} */}
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
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                    }}
                >
                    {/* {data && data.length > 0 ? (
                        data.map((event: any) => (
                            <EventCard
                                key={event.id}
                                data={event}
                                type="view"
                            />
                        ))
                    ) : (
                        <p>No events available</p>
                    )} */}
                </div>
            </div>
        </div>
    );
}
