import { useState } from "react";
import useRequest from "./useRequest";

interface CMSData {
    name?: String;
    phone?: String;
    email?: String;
    logo?: String;
    color?: String;
}

function useCMS() {
    const { data, loading, error, makeRequest } = useRequest();

    const getCms = () => {
        makeRequest({
            method: "get",
            url: `/content`,
        });
    };

    const updateCms = (content: CMSData) => {
        makeRequest({
            method: "post",
            url: "/content",
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
