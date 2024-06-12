// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native

export { useColorScheme } from "react-native";

// import { useState } from "react";

// but can be achieved using a styling library like Nativewind.
// export function useColorScheme() {
//   const [colorScheme, setColorScheme] = useState('light')
//   window.matchMedia('(prefers-color-scheme: dark)')
//     .addEventListener('change', ({ matches }) => {
//       setColorScheme(matches ? 'dark' : 'light')
//     })
//   // return 'light';
//   return colorScheme
// }



