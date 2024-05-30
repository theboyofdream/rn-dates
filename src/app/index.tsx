import { Image, StyleSheet, Platform, View, Text, Button, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar />
    </View>
  );
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

function calendarInfo(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = first.getDay()
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastDay = last.getDay()
  const daysInMonth = last.getDate()

  let days = '0'.repeat(firstDay + daysInMonth + (6 - lastDay))
  days = days.slice(0, firstDay) + '1'.repeat(daysInMonth) + days.slice(firstDay + daysInMonth)

  return {
    days,
    first,
    firstDay,
    last,
    lastDay,
    daysInMonth
  }
}

function Calendar() {
  console.clear()

  const [date, setDate] = useState(new Date())
  const addMonth = (count: number) => setDate(new Date(date.setMonth(date.getMonth() + count)))
  const updateDate = (count: number) => setDate(new Date(date.setDate(count)))
  // const addMonth = (count: number) => new Date(date.setMonth(date.getMonth() + count))
  const info = calendarInfo(date)

  const today = date.getFullYear() === (new Date().getFullYear())
    && date.getMonth() === (new Date().getMonth())
    && date.getDate() === (new Date().getDate())

  console.log(
    date,
    // date.getFullYear() === (new Date().getFullYear()),
    // date.getMonth() === (new Date().getMonth()),
    // date.getDate() === (new Date().getDate())
  )

  return (
    <View style={{ padding: 15, elevation: 3, borderRadius: 6, borderWidth: 1, borderColor: 'silver' }}>
      {/* {
        info.days.split('').map((_, i) => (
          <Cell text={i} key={i} />
        ))
      } */}
      <Row>
        <Button title='prev' onPress={() => addMonth(-1)} />
        <Text>{MONTH_NAMES[date.getMonth()]} {date.getFullYear()}</Text>
        <Button title='next' onPress={() => addMonth(1)} />
      </Row>
      <Grid
        data={info.days.split('')}
        numberOfColumns={7}
        renderItem={(item, index) => (
          <Cell
            key={index}
            onPress={() => updateDate(index - info.firstDay + 1)}
            active={
              date.getFullYear() === (new Date().getFullYear())
              && date.getMonth() === (new Date().getMonth())
              && date.getDate() === index - info.firstDay + 1
              // && date.getDate() === (new Date().getDate())
              // && index - info.firstDay + 1 === (new Date().getDate())
            }
            text={
              index - info.firstDay + 1 <= 0 ?
                '' :
                (index - info.firstDay + 1) - info.daysInMonth <= 0 ?
                  (index - info.firstDay + 1).toString().padStart(2, '0') :
                  ''
            }
          />
        )}
      />
    </View>
  )
}

function Cell({ text, active, onPress }: { text: string | number, active?: boolean, onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}
      style={[{ padding: 6, flex: 1, borderRadius: 6 },
      active && { backgroundColor: 'navy', color: 'white' }
      ]}>

      <Text style={[{
        textAlign: 'center', textAlignVertical: 'center'
      },
      active && { backgroundColor: 'navy', color: 'white' }
      ]}>
        {text}
      </Text>
    </Pressable>
  )
}

function Grid<T>({
  data, numberOfColumns, renderItem
}: {
  data: T[]
  numberOfColumns: number
  renderItem: (item: T, index: number) => React.ReactNode
}) {
  const numRows = Math.ceil(data.length / numberOfColumns);
  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    data.slice(rowIndex * numberOfColumns, (rowIndex + 1) * numberOfColumns)
  );
  return (
    <View>
      {
        rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {
              row.map((item, columnIndex) => renderItem(item, rowIndex * numberOfColumns + columnIndex))
            }
          </Row>
        ))
      }
    </View>
  )
}

function Row({ children }: PropsWithChildren) {
  return (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      {children}
    </View>
  )
}