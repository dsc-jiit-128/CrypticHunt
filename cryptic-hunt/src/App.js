import React from 'react';
import JoinOurTeam from './Pages/home';
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

function App() {
  return (
    <>

      <Home />
    </>
  );
}

export default App;
