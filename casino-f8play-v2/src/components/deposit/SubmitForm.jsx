import React, { useEffect, useState } from "react";

const SubmitForm = (url, data) => {
    const bankdata = data;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.style.display = "none"; // Hide the form

    // Add input elements for each bankdata key-value pair
    Object.entries(bankdata).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Append the form to the body, submit it, and remove it
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
};

export default SubmitForm;