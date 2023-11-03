import { useState } from 'react'
import './App.css'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './layout/Sidebar'
import Router from './Router'

function App() {

  return (
    <>
      <Flex>
        <Sidebar />
        <Box padding={"4rem 1em 2em"} flexGrow={1}>
        <Router />
        </Box>
      </Flex>
    </>
  )
}

export default App
