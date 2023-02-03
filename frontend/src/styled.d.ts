// styled.d.ts
import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,
    colors: {
      black: string,
      title: string,
      subtitle: string,
      text: string,
      icons: string,
      green: string,
      "bg-color": {
        10: string,
        20: string,
        30: string,
        40: string,
        50: string
      },
      blue: {
        10: string,
        20: string,
        30: string
      },
      red: {
        10: string,
        20: string
      },
      toast: {
        success: string,
        info: string,
        error: string
      },
    }
  }
}
