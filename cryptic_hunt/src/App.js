import React from 'react';
import Home from './Pages/home';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import './App.css';

function App() {
  return (
    <><ChakraProvider>
      <Home />
      </ChakraProvider>
    </>
  );
}

export default App;
