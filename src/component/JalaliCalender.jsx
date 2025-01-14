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
  const [currentDate, setCurrentDate] = useState();

  //   useEffect(() => {
  //     const currentDate = moment(); // Get the current date
  //     const formattedDate = currentDate.format("jYYYY/jMM/jDD");
  //     setCurrentDate(formattedDate)
  //     console.log(`formattedDate ${formattedDate}`)
  //   }, []);

  const formatJalaaliDate = (date) => {
    if (!date || typeof date !== "object" || date === null) {
      return "Invalid date";
    }
    const y = date.jy;
    const m = date.jm < 10 ? `0${date.jm}` : date.jm;
    const d = date.jd < 10 ? `0${date.jd}` : date.jd;
    return `${y}/${m}/${d}`;
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
    // setSelectedDate(date); // Update the state with the selected date
    const gregorianDate = date.format("YYYY-MM-DD"); // Convert to Gregorian date
    console.log("Selected Gregorian Date:", gregorianDate);
  };

  const getDisplayDate = () => {
    if (selectedDate) {
      return formatJalaaliDate(selectedDate);
    }
    return "No date selected.";
  };
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <h2 className="text-2xl">Date picker :</h2>
      <DatePicker
        onChange={persianType ? handleDateChange : handleGDateChange} // Handle date selection
        format="jYYYY/jMM/jDD"
        locale={persianType ? "fa" : "en"}
        // defaultValue={moment()}
      />
      <div>
        <p>Selected Date: {getDisplayDate()}</p>
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
