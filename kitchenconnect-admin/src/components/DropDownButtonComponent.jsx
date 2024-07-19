/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

const DropDownButtonComponent = ({options,selectedOption,onOptionSelect}) => {
//   const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelect = (eventKey) => {
    onOptionSelect(eventKey);
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      key="dropdown"
      id={`dropdown-variants-warning`}
      variant={"warning".toLowerCase()}
      title={selectedOption}
      onSelect={handleSelect}
    >
    {options.map((option)=>(<Dropdown.Item key={option} eventKey={option} active={selectedOption === option}>{option}</Dropdown.Item>))}
    </DropdownButton>
  );
};

export default DropDownButtonComponent;
