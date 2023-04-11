import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Route,Switch,Redirect } from 'react-router-dom';
import Home1 from './Pages/Home';
import Register from './Pages/Register';
import Team from './Pages/NewTeam';
import Question from './Pages/Question1';
import Question2 from './Pages/Q2';
import Question3 from './Pages/Q3';
import Question4 from './Pages/Q4';
import Question5 from './Pages/Q5';
import Question6 from './Pages/Q6';
import Question7 from './Pages/Q7';
import Question8 from './Pages/Q8';

import Leaderboard from './Pages/Leaderboard';
const Q2= () => {
  if (window.location.pathname === "/Q2") {
    return <Question2 />
  }
}
const Q3= () => {
  if (window.location.pathname === "/Q3") {
    return <Question3 />
  }
}
const Q4= () => {
  if (window.location.pathname === "/Q4") {
    return <Question4 />
  }
}
const Q5= () => {
  if (window.location.pathname === "/Q5") {
    return <Question5 />
  }
}
const Q6= () => {
  if (window.location.pathname === "/Q6") {
    return <Question6 />
  }
}
const Q7= () => {
  if (window.location.pathname === "/Q7") {
    return <Question7 />
  }
}
const Q8= () => {
  if (window.location.pathname === "/Q8") {
    return <Question8 />
  }
}


function App() {
  return (
    <>
    <ChakraProvider>

    {Q2()}
    {Q3()}
    {Q4()}
    {Q5()}
    {Q6()}
    {Q7()}
    {Q8()}
   
      
     {

      <Route path="/" exact component={Home1} />
      
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
