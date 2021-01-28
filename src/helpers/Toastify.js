import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const toastNotification = (type, text) => {
    let backgroundColor = "";

    switch (type) {
        case "error":
            backgroundColor = "#dc3545";
            break;
        case "info":
            backgroundColor = "#17a2b8";
            break;
        case "success":
            backgroundColor = "#28a745";
            break;
        default:
            break;
    }

    Toastify({
        text: text,
        duration: 3000, 
        gravity: "top",
        position: "right",
        close: true,
        backgroundColor: backgroundColor
    }).showToast();
};