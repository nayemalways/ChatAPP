import Cookies from 'js-cookie';

export const formatMessageTime = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: '2-digit',
        hour12: false
    })
}

export const getAccessToken = () => {
    return Cookies.get("accessToken");
}