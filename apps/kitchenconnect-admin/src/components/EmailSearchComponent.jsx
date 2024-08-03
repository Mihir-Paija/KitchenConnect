/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../styles/EmailSearchComponent.css";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import DropDownButtonComponent from "./DropDownButtonComponent";
import AlertComponent from "./AlertComponent";

const EmailSearchComponent = ({
  submitHandler,
  placeholder,
  type = "email",
  inputValue = "",
  localStorageName = null,
  options = [],
  selectedOption = "",
  onSelectOption,
}) => {
  //state
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      email: inputValue, // Set default value
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (localStorageName) {
      const savedInputValue = localStorage.getItem(localStorageName);
      if (savedInputValue) {
        const parsedValue = JSON.parse(savedInputValue);
        setValue("email", parsedValue);
      }
    }
  });

  // Determine validation rules and placeholders based on type
  const validationRules =
    type === "email"
      ? {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        }
      : {
          required: "ID is required",
          pattern: {
            value: /^[a-fA-F0-9]{24}$/,
            message: "Invalid MongoDB ID",
          },
        };

  useEffect(() => {
    // console.log("hi");
    if (errors.email) {
      setAlertMessage(errors.email.message);
      setShowAlert(true);
    }
  }, [errors,submitHandler]);

  return (
    <div className="email-container">
      <form className="email-form" onSubmit={handleSubmit(submitHandler)}>
        {options.length > 0 && (
          <DropDownButtonComponent
            options={options}
            selectedOption={selectedOption}
            onOptionSelect={onSelectOption}
          />
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label" hidden>
            Customer Email
          </label>
          <input
            type={type}
            id="email"
            className={`form-input ${errors.email ? "invalid" : ""}`}
            placeholder={placeholder}
            {...register("email", validationRules)}
          />
          {(showAlert) && (
            // <span className="error-message">{errors.email.message}</span>
            // setShowAlert(true)
            <AlertComponent
              AlertMsg={alertMessage}
              setShowAlert={setShowAlert}
            />
          )}
        </div>
        <button type="submit" className="form-button">
          Go
        </button>
      </form>
    </div>
  );
};

export default EmailSearchComponent;
