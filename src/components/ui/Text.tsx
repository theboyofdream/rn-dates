import { useTheme } from "@/themes/useTheme";
import { PixelRatio, Text as RText, TextProps as RTextProps } from "react-native";

/**
xs
sm
md
lg
xl
 */

const SIZES = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 30,
  xl: 40
}

type TextProps = {
  size?: keyof typeof SIZES
} & RTextProps


export function Text({
  size = 'md',
  ...props
}: TextProps) {
  const fontScale = PixelRatio.getFontScale()
  const { text } = useTheme().colors
  return (
    <RText
      {...props}
      style={[{
        color: text,
        fontSize: SIZES[size] * fontScale
      },
      props.style]}
    />
  )
}
