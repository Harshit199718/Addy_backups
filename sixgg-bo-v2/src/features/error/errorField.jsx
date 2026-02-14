import React from "react";

const errorField = (error) => {

    let apiErrors = {};

    if(error){
        const errors = error.data;
        
        for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
                const errorMessages = errors[key];
                // Check if errorMessages is an array, if not convert it to an array
                const errorList = Array.isArray(errorMessages) ? errorMessages : [errorMessages];
                // Set the error messages for the current field as a property of apiErrors
                apiErrors[key] = errorList.join(', '); // Join multiple error messages with comma
            }
        }
    }
    return apiErrors;
}

export default errorField;