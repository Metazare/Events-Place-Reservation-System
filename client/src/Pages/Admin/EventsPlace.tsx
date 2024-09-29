import React, { useEffect } from "react";
import useSearch from "src/Hooks/useSearch";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EventCard from "src/Components/EventCard";
import useEventsPlace from "src/Hooks/useEventsPlace";

export default function EventsPlace() {
    const { SearchComponent } = useSearch([]);
    const { data, loading, error, getEventsPlace } = useEventsPlace();
    useEffect(() => {
        getEventsPlace("");
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <>
            <div className="flex justify-between md:justify-start items-center gap-4">
                <SearchComponent />
                <IconButton aria-label="" onClick={() => {}}>
                    <FilterAltIcon />
                </IconButton>
            </div>
            <div
                className="grid gap-5 mb-7 mt-5"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                }}
            >
                {data && data.length > 0 ? (
                    data.map((event: any) => (
                        <EventCard key={event.id} data={event} type="view" />
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </>
    );
}
