import { ThemeProvider } from 'styled-components'
import HomePage from './pages/home-page'
import GlobalStyle from '../styles/global'

import theme from "../styles/theme-light";

function App (): any {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HomePage />
      </ThemeProvider>
    </>
  )
}

export default App
