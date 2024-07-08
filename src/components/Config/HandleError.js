export const handleHttpError = (status) => {
    let message;
    console.log(status);
    switch (status) {
        case 400:
            message = "Bad Request: Please check your input and try again.";
            break;
        case 401:
            message = "Unauthorized: Please log in and try again.";
            break;
        case 403:
            message = "Forbidden: You do not have permission to perform this action.";
            break;
        case 404:
            message = "Not Found: The requested resource could not be found.";
            break;
        case 409:
            message = "Conflict: The request could not be completed due to a conflict with the current state of the resource.";
            break;
        case 500:
            message = "Internal Server Error: An error occurred on the server. Please try again later.";
            break;
        case 502:
            message = "Bad Gateway: The server received an invalid response from the upstream server.";
            break;
        case 503:
            message = "Service Unavailable: The server is not ready to handle the request.";
            break;
        case 504:
            message = "Gateway Timeout: The server did not get a response in time from the upstream server.";
            break;
        default:
            message = "An unexpected error occurred. Please try again.";
            break;
    }
    alert(message);
    return message;
};
