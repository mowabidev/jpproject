import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/400.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import Users from './content/Users.jsx'

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
