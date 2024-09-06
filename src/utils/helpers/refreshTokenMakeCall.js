import { refreshTokenApi } from "../../apis/refreshTokenApi";
import { urls } from "../../constants/urls/urls";

export const refreshTokenMakeCall = async (
    setShowLoading,
    callMethods,
    urlsList,
    isPostOrPut = false,
    body = {}
) => {
    setShowLoading(true);
    const responseRefreshToken = await refreshTokenApi(urls.REFRESH_TOKEN_URL);
    setShowLoading(false);

    const callsResponses = [];

    if (responseRefreshToken.status === 200) {
        setShowLoading(true);

        for (let i = 0; i < callMethods.length; i++) {
            if (isPostOrPut) {
                const response = await callMethods[i](
                    urlsList[i],
                    body,
                    {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${responseRefreshToken.data.access_token}`
                    }
                );
    
                console.log("Response call method: ", response);
    
                callsResponses.push(response);
            } else {
                const response = await callMethods[i](
                    urlsList[i],
                    {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${responseRefreshToken.data.access_token}`
                    }
                );
    
                callsResponses.push(response);
            }            
        }

        setShowLoading(false);
    }

    return {
        responseRefreshToken,
        callsResponses
    };
};