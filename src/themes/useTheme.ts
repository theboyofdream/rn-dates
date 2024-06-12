import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "./colors";


type Colors = typeof Colors.light & typeof Colors.common


export function useTheme() {
  const colorScheme = useColorScheme()

  const { colors } = useMemo(function () {
    let colors = {} as Colors
    if (colorScheme === 'light') {
      colors = { ...Colors.light, ...Colors.common }
    } else {
      colors = { ...Colors.dark, ...Colors.common }
    }

    return { colors }
  }, [colorScheme])

  return { colors }
}

