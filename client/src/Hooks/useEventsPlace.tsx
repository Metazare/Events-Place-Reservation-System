import useRequest from "./useRequest";

enum AmenityType {
    ONE_TIME = "one time",
    PER_DAY = "per day",
    PER_QUANTITY = "per quantity",
}

interface Amenity {
    name: string;
    amenityType: AmenityType;
    rate: number;
}

interface EventsPlaceData {
    name: string;
    description: string;
    placeType: string;
    location: string;
    rate: number;
    maxCapacity: number;
    images: string[];
    amenities: Amenity[];
    eventsPlaceId?: string;
}

function useEventsPlace() {
    const { data, loading, error, makeRequest } = useRequest();

    const getEventsPlace = (id?: string) => {
        makeRequest({
            method: "get",
            url: `/eventsplace${id ? `?eventsPlaceId=${id}` : ""}`,
        });
    };

    const createEventsPlace = (content: EventsPlaceData) => {
        makeRequest({
            method: "post",
            url: "/eventsplace",
            data: content,
        });
    };

    const updateEventsPlace = (content: EventsPlaceData) => {
        makeRequest({
            method: "patch",
            url: `/eventsplace`,
            data: content,
        });
    };

    const deleteEventsPlace = (id: string) => {
        makeRequest({
            method: "delete",
            url: `/eventsplace`,
            data: { eventsPlaceId: id },
        });
    };

    return {
        data,
        loading,
        error,
        getEventsPlace,
        createEventsPlace,
        updateEventsPlace,
        deleteEventsPlace,
    };
}

export default useEventsPlace;
