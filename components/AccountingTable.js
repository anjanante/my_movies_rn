import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Calendar,
  LocaleConfig,
  Agenda,
  AgendaHeaderView,
} from 'react-native-calendars';
import { Table, Row, Rows } from 'react-native-table-component';
// import useLogic from '../useLogic';
// import { COLOR } from '../../../../utils/style';

const COLOR  = {
  primary: '#183861',
  secondary: '#fccf12',
  tertiary: '#9c882f',
  white: '#fff',
  whiteStandard: '#eee',
  success: '#2ecc71',
};

// Configurer la langue pour les calendriers
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
};
LocaleConfig.defaultLocale = 'fr';

function AccountingTable() {
  // const { loading } = useLogic();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    currentDate.toISOString().slice(0, 10),
  );
  const [tableHead, setTableHead] = useState([
    'Date',
    'Entrées',
    'Sorties',
    'Total',
  ]);
  const [tableData, setTableData] = useState([]);
  const [viewMode, setViewMode] = useState('month');

  const [itemState, setItems] = useState({});

  useEffect(() => {
    let date = new Date(selectedDate);
    let day = {dateString:selectedDate,month:date.getMonth()+1,year:date.getFullYear()};
    console.log('Initialize');
    console.log(day);
    loadItemsForMonth(day);
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call to get company delivery data
      const deliveryData = [
        { date: '2023-05-01', input: 10, output: 5 },
        { date: '2023-05-02', input: 7, output: 3 },
        { date: '2023-05-03', input: 8, output: 6 },
        { date: '2023-05-04', input: 5, output: 4 },
        { date: '2023-05-05', input: 12, output: 8 },
        { date: '2023-05-06', input: 15, output: 10 },
        { date: '2023-05-07', input: 9, output: 6 },
        { date: '2023-05-08', input: 11, output: 7 },
        { date: '2023-05-09', input: 6, output: 3 },
        { date: '2023-05-10', input: 7, output: 5 },
        { date: '2023-05-11', input: 10, output: 8 },
        { date: '2023-05-12', input: 13, output: 9 },
        { date: '2023-05-13', input: 8, output: 6 },
        { date: '2023-05-14', input: 7, output: 4 },
        { date: '2023-05-15', input: 12, output: 8 },
        { date: '2023-05-16', input: 16, output: 12 },
        { date: '2023-05-17', input: 9, output: 6 },
        { date: '2023-05-18', input: 11, output: 7 },
        { date: '2023-05-19', input: 5, output: 3 },
        { date: '2023-05-20', input: 7, output: 4 },
        { date: '2023-05-21', input: 10, output: 8 },
        { date: '2023-05-22', input: 13, output: 9 },
        { date: '2023-05-23', input: 8, output: 6 },
        { date: '2023-05-24', input: 7, output: 4 },
        { date: '2023-05-25', input: 12, output: 9 },
        { date: '2023-05-26', input: 14, output: 10 },
        { date: '2023-05-27', input: 11, output: 6 },
        { date: '2023-05-28', input: 9, output: 7 },
        { date: '2023-05-29', input: 12, output: 8 },
        { date: '2023-05-30', input: 15, output: 11 },
        { date: '2023-05-31', input: 6, output: 4 },
      ];
      // Calculate data based on selected view mode
      if (viewMode === 'day') {
        const filteredData = deliveryData.filter(
          data => data.date === selectedDate,
        );
        if (filteredData.length === 0) {
          setTableData([['-', '-', '-', '-']]);
        } else {
          const total = filteredData.reduce(
            (acc, cur) => acc + cur.input - cur.output,
            0,
          );
          setTableData([
            [
              selectedDate,
              filteredData[0].input,
              filteredData[0].output,
              total,
            ],
          ]);
        }
      } else if (viewMode === 'week') {
        const filteredData = deliveryData.filter(data => {
          const dataDate = new Date(data.date);
          const selectedDateObj = new Date(selectedDate);
          const weekStart = new Date(
            selectedDateObj.setDate(
              selectedDateObj.getDate() -
              selectedDateObj.getDay() +
              (selectedDateObj.getDay() === 0 ? -6 : 1),
            ),
          )
            .toISOString()
            .slice(0, 10);
          const weekEnd = new Date(
            selectedDateObj.setDate(
              selectedDateObj.getDate() - selectedDateObj.getDay() + 7,
            ),
          )
            .toISOString()
            .slice(0, 10);
          return data.date >= weekStart && data.date <= weekEnd;
        });
        if (filteredData.length === 0) {
          setTableData([['-', '-', '-', '-']]);
        } else {
          const totalInput = filteredData.reduce(
            (acc, cur) => acc + cur.input,
            0,
          );
          const totalOutput = filteredData.reduce(
            (acc, cur) => acc + cur.output,
            0,
          );
          const total = filteredData.reduce(
            (acc, cur) => acc + cur.input - cur.output,
            0,
          );
          setTableData([
            [
              `${new Date(selectedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })} - ${new Date(selectedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}`,
              totalInput,
              totalOutput,
              total,
            ],
          ]);
        }
      } else if (viewMode === 'month') {
        const filteredData = deliveryData.filter(
          data => data.date.slice(0, 7) === selectedDate.slice(0, 7),
        );
        if (filteredData.length === 0) {
          setTableData([['-', '-', '-', '-']]);
        } else {
          const totalInput = filteredData.reduce(
            (acc, cur) => acc + cur.input,
            0,
          );
          const totalOutput = filteredData.reduce(
            (acc, cur) => acc + cur.output,
            0,
          );
          const total = filteredData.reduce(
            (acc, cur) => acc + cur.input - cur.output,
            0,
          );
          setTableData([
            [
              new Date(selectedDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              }),
              totalInput,
              totalOutput,
              total,
            ],
          ]);
        }
      }
    };
    fetchData();
  }, [selectedDate, viewMode]);

  const MyCalendar = ({ onDayPress }) => {
    return (
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={itemState}
        // items={{
        //   '2023-04-30': [{totalInput: 'item 1 - any js object',day:'2023-04-30'}],
        //   '2023-05-04': [{totalInput: 'item 2 - any js object', height: 80,day:'2023-05-04'}],
        //   '2023-05-05': [{totalInput: 'item 2 - any js object', height: 80,day:'2023-05-04'}],
        //   '2023-05-07': [{totalInput: 'item 2 - any js object', height: 80,day:'2023-05-07'}],
        //   '2023-05-14': [{totalInput: 'item 3 - any js object any js object',day:'2023-05-14'}],
        //   '2023-05-21': [{totalInput: 'item 3 - any js object any js object',day:'2023-05-21'}],
        //   '2023-05-28': [{totalInput: 'item 3 - any js object any js object',day:'2023-05-28'}],
        // }}
        // loadItemsForMonth={loadItemsForMonth}
        onDayPress={onDayPressed}
        selected={selectedDate}
        // selected={'2023-04-30'}
        maxDate={currentDate.toISOString().slice(0, 10)}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayChange={onDayChange}
        renderDay={renderDay}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    );
  };

  const MyTable = ({ tableHead, tableData }) => {
    return (
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        {/* <Row data={tableHead} style={styles.head} textStyle={styles.text} /> */}
        <Row
          data={['Date', 'Input', 'Output', 'Total']}
          style={styles.tableHeader}
          textStyle={styles.tableHeaderText}
        />
        <Rows data={tableData} textStyle={styles.tableText} />
      </Table>
    );
  };

  const onDayPressed = day => {
    console.log('onDayPressed be');
    // const time = day.timestamp - 5 * 24 * 60 * 60 * 1000;
    // const newday = timeToString(time);
    // setSelectedDate(newday);

    // const items = itemState || {};
    // if (!items[day.dateString]) {
    //   loadItemsForMonth(day);
    // }else{
    //   console.log('Efa miexiste le date');
    // }
  };

  const onDayChange = (day, item) => {
    console.log('onDayChange');
    console.log(day);
  };

  const loadItemsForMonth = day => {
    const items = itemState || {};
    const newItems = {};
    console.log(
      '----------------------------------------------------------------',
    );
    console.log('loadItemsForMonth');
    console.log(day);

    setTimeout(() => {
      const weeksInMonth = getWeekRangesInMonth(day.year, day.month - 1);
      console.log(weeksInMonth[0]);
      let b_new = false;
      let numItems = weeksInMonth.length;
      for (let i = 0; i < numItems; i++) {
        let date = weeksInMonth[i].startOfWeek.toISOString().slice(0, 10);
        //select first day and week
        if (i == 0) setSelectedDate(date);

        let datesOfWeek = weeksInMonth[i].datesOfWeek;
        let datesOfWeekLen = datesOfWeek.length;
        for (let j = 0; j < datesOfWeekLen; j++) {
          let date = datesOfWeek[j].date.toISOString().slice(0, 10);
          if (datesOfWeek[j].date > currentDate) { i = numItems; break; };
          if (!items[date]) {
            console.log('Mbola tsis le ' + date);
            b_new = true;
            newItems[date] = [];
            newItems[date].push({
              viewMode: viewMode,
              day: datesOfWeek[j].date,
              totalInput: datesOfWeek[j].totalInput,
              totalOutput: datesOfWeek[j].totalOutput,
            });
          }
        }
      }

      if (b_new) setItems({ ...items, ...newItems });
    }, 1000);

    // console.log('----------------------------------------------------------------');
    // console.log(items);

    // setTimeout(() => {
    //   let b_new = false;
    //   for (let i = -5; i < 30; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);
    //     if (!items[strTime]) {
    //       newItems[strTime] = [];
    //       b_new = true;
    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       // for (let j = 0; j < numItems; j++) {
    //       newItems[strTime].push({
    //         name: 'Item for ' + strTime,
    //         height: 50,
    //         day: new Date(strTime),
    //         totalInput: numItems,
    //         totalOutput: numItems + 2,
    //       });
    //       // }
    //     }
    //   }

    //   // const newItems = {};
    //   // Object.keys(items).forEach(key => {
    //   //   newItems[key] = items[key];
    //   // });
    //   if (b_new) setItems({...items, ...newItems});
    // }, 1000);
  };

  const renderDay = (day, item) => {
    const monthNames = LocaleConfig.locales['fr'].monthNamesShort;
    const date = new Date(item.day);
    const month = monthNames[date.getMonth()];

    if (item.viewMode == 'week') {
      const dateEnd = new Date(item.endOfWeek);
      const monthEnd = monthNames[dateEnd.getMonth()];
      return (
        <View style={styles.itemSide}>
          <Text style={styles.itemDay}>{date.getDate()}</Text>
          <Text style={styles.itemMonth}>{month}</Text>
          <Text>-</Text>
          <Text style={styles.itemDay}>{dateEnd.getDate()}</Text>
          <Text style={styles.itemMonth}>{monthEnd}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.itemSide}>
          <Text style={styles.itemDay}>{date.getDate()}</Text>
          <Text style={styles.itemMonth}>{month}</Text>
        </View>
      );
    }
  };

  const renderItem = (item, isFirst) => {
    const fontSize = 14;
    const color = '#43515c';

    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
      // onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>
          Entrée: {item.totalInput}
          {item.total}Ar
        </Text>
        <Text style={{ fontSize, color }}>Sortie: {item.totalOutput}Ar</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>Empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.totalInput !== r2.totalInput;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setViewMode('day');
  };

  const handleWeekPress = () => {
    setViewMode('week');
    setItems({});
  };

  const handleWeekChange = week => {
    console.log('handleWeekChange');
    // setSelectedWeek(week);
    // setSelectedDate(week.start);
  };

  const handleMonthPress = () => {
    setViewMode('month');
    setItems({});
  };

  const handleMonthChange = week => {
    console.log('handleMonthChange');
    // setSelectedWeek(week);
    // setSelectedDate(week.start);
  };

  const renderHeaderOld = date => {
    if (viewMode === 'day') {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onChange('prev')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
          <Text style={styles.title}>{date.toDateString()}</Text>
          <TouchableOpacity onPress={() => onChange('next')}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay(),
      );
      const endOfWeek = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 6,
      );
      const weekRange = `${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`;
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onChange('prev')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
          <Text style={styles.title}>{weekRange}</Text>
          <TouchableOpacity onPress={() => onChange('next')}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (viewMode === 'month') {
      const monthYear = `${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onChange('prev')}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
          <Text style={styles.title}>{monthYear}</Text>
          <TouchableOpacity onPress={() => onChange('next')}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="#6a1b9a"
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleDayPress}
          style={[styles.button, viewMode === 'day' && styles.activeButton]}>
          <Text
            style={[
              styles.buttonText,
              viewMode === 'day' && styles.activeButtonText,
            ]}>
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleWeekPress}
          style={[styles.button, viewMode === 'week' && styles.activeButton]}>
          <Text
            style={[
              styles.buttonText,
              viewMode === 'week' && styles.activeButtonText,
            ]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMonthPress}
          style={[styles.button, viewMode === 'month' && styles.activeButton]}>
          <Text
            style={[
              styles.buttonText,
              viewMode === 'month' && styles.activeButtonText,
            ]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 4 }}>
        <MyCalendar onDayPress={handleDayPress} />
      </View>

      <View style={styles.tableContainer}>
        <MyTable tableHead={tableHead} tableData={tableData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 28,
  },
  itemSide: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 22,
  },
  itemDay: {
    fontSize: 25,
    color: COLOR.tertiary,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  section: {
    backgroundColor: 'lightgrey',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#007aff',
  },
  tableContainer: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  tableHeaderText: {
    margin: 6,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableText: {
    margin: 6,
    fontSize: 16,
    textAlign: 'center',
  },
  month: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
});

function getWeekRangesInMonth(year, month) {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  const firstSundayOfMonth = new Date(firstDayOfMonth);
  firstSundayOfMonth.setDate(
    firstSundayOfMonth.getDate() - firstSundayOfMonth.getDay(),
  );

  console.log('getWeekRangesInMonth');
  console.log(firstDayOfMonth);
  console.log(lastDayOfMonth);
  console.log(firstSundayOfMonth);

  const weeks = [];
  let currentDay = new Date(firstSundayOfMonth);
  while (currentDay < lastDayOfMonth) {
    const startOfWeek = new Date(currentDay);
    const endOfWeek = new Date(currentDay);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const datesOfWeek = [];
    let inputOfWeek = 0;
    let outputOfWeek = 0;
    for (let i = 0; i <= 6; i++) {
      const date = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
      let totalInput = 23;
      let totalOutput = 2;
      datesOfWeek.push({ date, totalInput, totalOutput });
      inputOfWeek += totalInput;
      outputOfWeek += totalOutput;
    }

    weeks.push({
      startOfWeek,
      datesOfWeek,
      endOfWeek,
      inputOfWeek,
      outputOfWeek
    });

    currentDay.setDate(currentDay.getDate() + 7);
  }

  return weeks;
}

export default AccountingTable;