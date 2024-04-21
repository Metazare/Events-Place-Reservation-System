import useRequest from './useRequest';

interface UserData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffixName: string;
    contact: string;
    photo: string;
    description: string;
    license: string;
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

    return {
        data,
        loading,
        error,
        getUser,
        editInfo,
        editCredentials
    };
}

export default useUser;
