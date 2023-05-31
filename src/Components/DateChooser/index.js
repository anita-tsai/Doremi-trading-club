import React, { useState } from "react";
import _DatePicker from "react-datepicker";
import styled from 'styled-components';

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = styled(_DatePicker)`
  width: 100%;
  height: 40px;
  border: 1px solid #aeaeae;
  border-radius: 4px;
`


const DateChooser = ({ onChange, eventTime }) => {
  return (
    <DatePicker 
      selected={eventTime} 
      onChange={onChange} 
      isClearable={true}
      dateFormat="yyyy/MM/dd"
    />
  );
};


export default DateChooser;
