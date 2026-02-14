import React from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

function MobileInput({ name, onChange, horizontal, ...props }) {
  const {phone_format} = useSelector(selectConfigData);
  const handleChange = (phone, country) => {
    const reducedPhone = phone.replace(country.dialCode, "");
    onChange({
      target: {
        name,
        value: reducedPhone,
        extraValues: {
          cc: country.dialCode,
        },
      },
    });
  };
  return (
    <PhoneInput
      {...props}
      inputStyle={{
        width: "100%",
        borderRadius: "0px",
        height: "40px",
      }}
      containerStyle={{
        width: horizontal?"65%":"100%",
        marginTop: "0px",
        marginBottom: "10px",
      }}
      buttonStyle={{ borderRadius: "0px" }}
      country={phone_format}
      onChange={handleChange}
      specialLabel=""
    />
  );
}

export default MobileInput;
