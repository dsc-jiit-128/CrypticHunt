import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Route,Switch,Redirect } from 'react-router-dom';



import Home from './Pages/Home';
import Register from './Pages/Register';
import Team from './Pages/NewTeam';

function App() {
  return (
    <>
    <ChakraProvider>

    
      
     {

      <Route path="/" exact component={Home} />
      
      }
{
      <Route path="/team" exact component={Team} />
}
     {
      <Route path="/register" exact component={Register} />
     }
 


      
    </ChakraProvider>
    </>
  );
}

export default App;
