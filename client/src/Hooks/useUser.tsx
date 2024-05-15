import useRequest from './useRequest';
import toast from "react-hot-toast";
import axios from './useAxios';

interface UserData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffixName: string;
    contact?: string;
    photo?: string;
    description?: string;
    license?: string;
};

interface Credentials {
    email: string;
    password: string;
}

function useUser() {
    const { data, loading, error, makeRequest } = useRequest();

    const getUser = (id: string) => {
        makeRequest({
            method: 'get',
            url: `/user`,
            params: {
                userId: id,
            }
        });
    };

    const editInfo = (content: UserData) => {
        makeRequest({
            method: 'patch',
            url: `/user`,
            data: content,
        });
    };

    const editCredentials = (content: Credentials) => {
        makeRequest({
        method: 'patch',
        url: `/user/credentials`,
        data: content,
        });
    };
    
    const getUserInfo = async (userId: string): Promise<any>  => {
        try {
            const response = await axios.get(`/user?userId=${userId}`);
            return response.data[0];
        } 
        catch (error: any) {
            toast.error(error.response?.data?.message);
            return null;
        } 
    }

    return {
        data,
        loading,
        error,
        getUser,
        editInfo,
        editCredentials,
        getUserInfo
    };
}

export default useUser;
