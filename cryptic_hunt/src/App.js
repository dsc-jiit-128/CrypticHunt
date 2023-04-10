import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Route,Switch,Redirect } from 'react-router-dom';



import Home from './Pages/Home';
import Register from './Pages/Register';
import Team from './Pages/NewTeam';
import Question from './Pages/Question1';
import Question2 from './Pages/Q2';
import Leaderboard from './Pages/Leaderboard';
const Q2= () => {
  if (window.location.pathname === "/Q2") {
    return <Question2 />
  }
}

function App() {
  return (
    <>
    <ChakraProvider>

    {Q2()}
      
     {

      <Route path="/" exact component={Home} />
      
      }
{
      <Route path="/team" exact component={Team} />
}
     {
      <Route path="/register" exact component={Register} />
     }
 {
      <Route path="/question" exact component={Question} />
 }
{
  <Route path="/question2" exact component={Question2} />
}
{
  <Route path="/leaderboard" exact component={Leaderboard} />
}
      
    </ChakraProvider>
    </>
  );
}

export default App;
