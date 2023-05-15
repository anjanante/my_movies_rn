import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import { StyleSheet, Text, View } from "react-native";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <View style={[styles.header,styles.row]}>
        <Text>TTTT</Text>
      </View>
      // <div className="header row flex-middle">
      //   <div className="col col-start">
      //     {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
      //       prev month
      //     </div> */}
      //   </div>
      //   <div className="col col-center">
      //     <span>{format(currentMonth, dateFormat)}</span>
      //   </div>
      //   <div className="col col-end">
      //     {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
      //   </div>
      // </div>
    );
  };
  // const renderDays = () => {
  //   const dateFormat = "EEE";
  //   const days = [];
  //   let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
  //   for (let i = 0; i < 7; i++) {
  //     days.push(
  //       <div className="col col-center" key={i}>
  //         {format(addDays(startDate, i), dateFormat)}
  //       </div>
  //     );
  //   }
  //   return <div className="days row">{days}</div>;
  // };
  // const renderCells = () => {
  //   const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
  //   const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
  //   const dateFormat = "d";
  //   const rows = [];
  //   let days = [];
  //   let day = startDate;
  //   let formattedDate = "";
  //   while (day <= endDate) {
  //     for (let i = 0; i < 7; i++) {
  //       formattedDate = format(day, dateFormat);
  //       const cloneDay = day;
  //       days.push(
  //         <div
  //           className={`col cell ${
  //             isSameDay(day, new Date())
  //               ? "today"
  //               : isSameDay(day, selectedDate)
  //               ? "selected"
  //               : ""
  //           }`}
  //           key={day}
  //           onClick={() => {
  //             const dayStr = format(cloneDay, "ccc dd MMM yy");
  //             onDateClickHandle(cloneDay, dayStr);
  //           }}
  //         >
  //           <span className="number">{formattedDate}</span>
  //           <span className="bg">{formattedDate}</span>
  //         </div>
  //       );
  //       day = addDays(day, 1);
  //     }

  //     rows.push(
  //       <div className="row" key={day}>
  //         {days}
  //       </div>
  //     );
  //     days = [];
  //   }
  //   return <div className="body">{rows}</div>;
  // };
  // const renderFooter = () => {
  //   return (
  //     <div className="header row flex-middle">
  //       <div className="col col-start">
  //         <div className="icon" onClick={() => changeWeekHandle("prev")}>
  //           prev week
  //         </div>
  //       </div>
  //       <div>{currentWeek}</div>
  //       <div className="col col-end" onClick={() => changeWeekHandle("next")}>
  //         <div className="icon">next week</div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <View style={styles.calendar}>
      {renderHeader()}
      {/* {renderDays()}
      {renderCells()}
      {renderFooter()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    margin: 20,
    flex:1,
    flexDirection:'column'
  },
  header: {
    flex:1,
    padding: 2,
    borderBottomColor: 'red',
    borderBottomWidth:2,
    backgroundColor: '#ddd'
  },
  row:{
    margin:0,
    padding:0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
