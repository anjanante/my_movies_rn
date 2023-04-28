import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const AccountingTable = () => {
  const [calendarMode, setCalendarMode] = useState('month'); // mode par défaut
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [entries, setEntries] = useState([
    { id: 1, type: 'entry', amount: 100 },
    { id: 2, type: 'entry', amount: 200 },
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, type: 'expense', amount: 50 },
    { id: 2, type: 'expense', amount: 75 },
  ]);

  const onDayPress = (day) => {
    console.log('selected day', day);
    setSelectedDate(day.dateString);
  };

  const totalEntries = entries.reduce((total, entry) => total + entry.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const total = totalEntries - totalExpenses;

  const renderEntry = (entry) => (
    <View key={entry.id} style={styles.row}>
      <Text style={styles.entry}>{entry.amount}</Text>
    </View>
  );

  const renderExpense = (expense) => (
    <View key={expense.id} style={styles.row}>
      <Text style={styles.expense}>{expense.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        // onDayPress={onDayPress}
        markedDates={{ 
            [selectedDate]: { selected: true, selectedDotColor: 'orange' }, 
            // '2023-04-28': {selected: true, marked: true, selectedColor: 'blue'},
            // '2023-04-24': {marked: true},
            // '2023-05-02': {selected: true, marked: true, selectedColor: 'blue'}
        }}
        mode={'week'}
        // options pour changer de mode
        onMonthPress={() => setCalendarMode('month')}
        onDayPress={() => setCalendarMode('day')}
        onWeekPress={() => setCalendarMode('week')}
      />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Type</Text>
          <Text style={styles.header}>Amount</Text>
        </View>
        {entries.map(renderEntry)}
        {expenses.map(renderExpense)}
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.total}>{total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  header: {
    fontWeight: 'bold',
  },
  entry: {
    color: 'green',
    fontWeight: 'bold',
  },
  expense: {
    color: 'red',
    fontWeight: 'bold',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  total: {
    fontWeight: 'bold',
  },
});

export default AccountingTable;
