import { useState } from "react";
import useRequest from "./useRequest";

interface CMSData {
    logo?: String;
    color?: String;
}

function useCMS() {
    const { data, loading, error, makeRequest } = useRequest();

    const getCms = () => {
        makeRequest({
            method: "get",
            url: `/cms`,
        });
    };

    const updateCms = (content: CMSData) => {
        makeRequest({
            method: "post",
            url: "/cms",
            data: content,
        });
    };

    return {
        data,
        loading,
        error,
        getCms,
        updateCms,
    };
}

export default useCMS;
