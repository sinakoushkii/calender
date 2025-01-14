import React, { useEffect, useState } from "react";
import "jalaali-react-date-picker/lib/styles/index.css";
import {
  DatePicker,
  InputDatePicker,
  RangePicker,
} from "jalaali-react-date-picker";
import Jalaali from "jalaali-js";

const JalaliCalender = () => {
  const persianType = false;

  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const formatJalaaliDate = (date) => {
    if (!date || typeof date !== "object" || date === null) {
      return "Invalid date";
    }
    if (persianType) {
      const y = date.jy;
      const m = date.jm < 10 ? `0${date.jm}` : date.jm;
      const d = date.jd < 10 ? `0${date.jd}` : date.jd;
      return `${y}/${m}/${d}`;
    }
  };
  const formatGregorianDate = (date) => {
    if (!date || typeof date !== "object" || date === null) {
      return "Invalid date";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleDateChange = (date, dateString) => {
    console.log(`dateString ${dateString}`);
    if (date) {
      const gDate = new Date(date);
      const jDate = Jalaali.toJalaali(
        gDate.getFullYear(),
        gDate.getMonth() + 1, // Months are zero-based in JavaScript Date
        gDate.getDate()
      );
      setSelectedDate(jDate);
      console.log("Jalaali Date:", jDate);
      console.log("Jalaali Date:", formatJalaaliDate(jDate));
    } else {
      console.log("No date selected.");
    }
  };
  const handleGDateChange = (date, dateString) => {
    console.log(`dateString ${dateString}`);
    if (date) {
      const gDate = new Date(date);
      console.log("Gregorian Date:", gDate);
      console.log("Formatted Date:", formatGregorianDate(gDate));
      setSelectedDate(formatGregorianDate(gDate))
    } else {
      console.log("No date selected.");
    }
  };

  const getDisplayDate = () => {
    if (selectedDate && persianType) {
      return formatJalaaliDate(selectedDate);
    }else if(selectedDate && persianType === false){
        return formatGregorianDate(selectedDate)
    }else{
        return "No date selected.";
    }
    
  };
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <h2 className="text-2xl">Date picker :</h2>
      <DatePicker
        onChange={persianType ? handleDateChange : handleGDateChange} // Handle date selection
        // format={persianType && "jYYYY/jMM/jDD"}
        locale={persianType ? "fa" : "en"}
        // defaultValue={moment()}
      />
      <div>
        <p>Selected Date: {persianType?getDisplayDate():selectedDate}</p>
        <p>Current Date: {currentDate}</p>
      </div>
      <h2 className="text-2xl">Range picker :</h2>
      <RangePicker />
      <h2 className="text-2xl">Input picker :</h2>
      <div className="w-52">
        <InputDatePicker />
      </div>
    </div>
  );
};

export default JalaliCalender;
