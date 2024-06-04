import { Image, StyleSheet, Platform, View, Text, Button, Pressable, TouchableOpacity, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  ChevronsUpDown,
  ChevronsDownUp
} from 'lucide-react-native';

const ICONS = {
  'chevron-up': ChevronUp,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-first': ChevronFirst,
  'chevron-last': ChevronLast,
  'chevron-expand': ChevronsUpDown,
  'chevron-collapse': ChevronsDownUp
}

type IconProps = {
  name: keyof typeof ICONS
}
function Icon({
  name
}: IconProps) {
  let Ticon = ICONS[name]
  return (<Ticon />)
}


function useStyles() {
  const isLightMode = useColorScheme() === 'light'
  const colors = {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#E0E4EB'
  }
  return {
    background: colors[isLightMode ? 'white' : 'black'],
    color: colors[isLightMode ? 'black' : 'white'],
    gray: colors.gray
  }
  // FFFFFF
  // E0E4EB
  // 000000
}


type IPressableProps = {
  variant?: 'ghost' | 'primary' | 'secondary' | 'focused'
  onPress?: () => void,
} & PropsWithChildren
function IPressable({
  variant,
  children,
  onPress
}: IPressableProps) {
  let lightTheme = useColorScheme() === 'light'
  const c = useStyles()
  const styles = StyleSheet.create({
    default: {
      padding: 3,
      borderRadius: 9,
      // borderWidth: 1,
      // borderColor: '#00000011',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 3,
    },
    ghost: {
      borderColor: 'transparent',
      // color: lightTheme ? '#000' : '#FFF'
      color: c.color
    },
    primary: {
      // backgroundColor: '#007bff',
      backgroundColor: c.background,
      // borderColor: '#007bff',
      borderColor: c.gray,
      // color: '#FFF'
      color: c.color
    },
    secondary: {
      backgroundColor: '#6c757d80',
      borderColor: '#6c757d80',
      color: lightTheme ? '#000' : '#FFF'
    },
    focused: {
      backgroundColor: '#007bff50',
      borderColor: '#007bff10',
      color: lightTheme ? '#000' : '#FFF'
    }
  })

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.default,
        styles[variant ?? 'ghost']
      ]}
    >
      {children}
    </TouchableOpacity>
  )
}

type IButtonpProps = {
  icon?: keyof typeof ICONS
  title?: string
  iconPosition?: 'start' | 'end'
  variant?: 'ghost' | 'primary' | 'secondary' | 'focused'
  onPress?: () => void,
  theme?: 'light' | 'dark'
}

function IButton({
  icon,
  iconPosition = 'start',
  title,
  variant = 'ghost',
  onPress,
  theme
}: IButtonpProps) {
  let colorScheme = useColorScheme()
  const c = useStyles()
  if (theme) {
    colorScheme = theme
  }

  const buttonStyles = StyleSheet.create({
    default: {
      padding: 3,
      borderRadius: 9,
      borderWidth: 1,
      // borderColor: '#00000011',
      flexDirection: iconPosition === 'start' ? 'row' : 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',

    },
    ghost: {
      borderColor: 'transparent',
      // color: colorScheme === 'light' ? '#000' : '#FFF'
      color: c.color
    },
    primary: {
      backgroundColor: c.background,
      borderColor: c.gray,
      color: c.color
      // backgroundColor: '#007bff',
      // borderColor: '#007bff',
      // color: '#FFF'
    },
    secondary: {
      backgroundColor: c.gray,
      borderColor: c.gray,
      color: c.color
      // backgroundColor: '#6c757d80',
      // borderColor: '#6c757d80',
      // color: colorScheme === 'light' ? '#000' : '#FFF'
    },
    focused: {
      backgroundColor: c.gray,
      borderColor: c.gray,
      color: c.color
      // backgroundColor: '#007bff50',
      // borderColor: '#007bff10',
      // color: colorScheme === 'light' ? '#000' : '#FFF'
    }
  })

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        buttonStyles.default,
        buttonStyles[variant ?? 'ghost']
      ]}
    >
      <Text style={[
        {
          paddingHorizontal: 6,
          color: buttonStyles[variant ?? 'ghost'].color
        }
      ]}>touchable opacity</Text>
      <Icon name={'chevron-down'} />
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const c = useStyles()
  console.log(colorScheme)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: c.background, }}>
      <View style={{
        padding: 50,
        // backgroundColor: colorScheme === 'light' ? '#000' : '#fff',
        backgroundColor: c.background,
        gap: 6
      }}>

        <IPressable>
          <Icon name='chevron-down' />
        </IPressable>
        <IPressable variant='primary'>
          <Icon name='chevron-down' />
          <Text style={{ paddingHorizontal: 6 }}>IPressable</Text>
        </IPressable>
        <IPressable variant='secondary'>
          <Icon name='chevron-down' />
          {/* <Text>IPressable</Text> */}
        </IPressable>
        <IPressable variant='focused'>
          <Text>IPressable</Text>
          <Icon name='chevron-down' />
        </IPressable>

        <IPressable>
          <Text>IPressable</Text>
        </IPressable>
        <IPressable variant='primary'>
          <Text>IPressable</Text>
        </IPressable>
        <IPressable variant='secondary'>
          <Text>IPressable</Text>
        </IPressable>
        <IPressable variant='focused'>
          <Text>IPressable</Text>
        </IPressable>

        {/* <IButton icon='chevron-first' />
        <IButton
          variant='ghost'
          theme='dark'
          icon='chevron-down'
          iconPosition='end'
        />
        <IButton
          variant='primary'
          theme='dark'
          icon='chevron-down'
        />
        <IButton
          variant='secondary'
          theme='dark'
          icon='chevron-down'
        />
        <IButton
          variant='focused'
          theme='dark'
          icon='chevron-down'
        /> */}
      </View>
      <View style={{ padding: 50, gap: 6 }}>
        <IButton
          variant='ghost'
          theme='light'
          icon='chevron-down'
        />
        <IButton
          variant='primary'
          icon='chevron-down'
          theme='light'
        />
        <IButton
          variant='secondary'
          icon='chevron-down'
          theme='light'
        />
        <IButton
          variant='focused'
          icon='chevron-down'
          theme='light'
        />
      </View>
      {/* <Calendar /> */}
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
  // console.clear()

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
    <>
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
    </>
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