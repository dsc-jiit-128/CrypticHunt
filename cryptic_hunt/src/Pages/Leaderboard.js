import {
  Box,
  Center,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Component } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaDiscord } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons'
const leaderboardData = [
  { name: 'John', score: 50 },
  { name: 'Jane', score: 40 },
  { name: 'Bob', score: 35 },
  { name: 'Alice', score: 30 },
];

export default function Leaderboard() {
  const tableBgColor = useColorModeValue('white', 'gray.800');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const tableHeadColor = useColorModeValue('gray.600', 'gray.400');
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const token = localStorage.getItem('token');
  const [teamID, setTeamID] = useState('0');
  const [teamName, setTeamName] = useState('');
  const [team, setTeam] = useState([]);
  const history = useHistory();
  const handleClick = async event => {
    console.log('clicked');
    // event.preventDefault();
    try {
      const response = await axios.get('/api/v2/team/leaderboard', {
        headers: {
          Authorization: `Bearer ${token}`, // include the token in the Authorization header
        },
      });
      const Team = response.data.data.team;
      console.log(response);
      console.log(Team[0].email);
      const teamId = response.data.data.user.team;
      const teamname = response.data.data.teamData.name;
      console.log(teamname);
      setTeamName(teamname);
      console.log(Array.isArray(Team));
      setTeam(Team);
      console.log(Array.isArray(team));
      console.log(teamId);
      setTeamID(teamId);
      // console.log(response?.data?.data?.token);
      console.log(response.data.message); // handle successful response
    } catch (error) {
      console.log(error); // handle error
    }
  };
  useEffect(() => {
    handleClick();
  }, []);
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(teamID);
    setHasCopied(true);
  };
  return (
    <Box p={8} bgColor={'#161615'} h="100vh" w="100vw">
      {/* <Button onClick={handleClick}>See the id</Button> */}
      {/* <FontAwesomeIcon icon={faCoffee} /> */}
        {/* <FontAwesomeIcon icon={faGithub} /> */}
      <Flex alignItems={'center'} justifyContent={'center'}>
        {teamID !== '0' && ( // display the team ID only if it's not the default value
          <Text
            fontSize="lg"
            fontFamily={'gilroy'}
            mt="10px"
            color="white"
            size="30px"
          >
            Your team ID is: {teamID}
          </Text>
        )}
       <Button onClick={onCopy} ml={4}>
          {hasCopied ? "Copied!" : "Copy"}
        </Button>
      </Flex>
      
      <Center>
        <Heading
          as="h1"
          size="xl"
          mb={8}
          color="white"
          fontFamily={'Gilroy-Bold'}
          mt={'40px'}
        >
          Team Name: {teamName}
        </Heading>
      </Center>
      <Table
        variant="striped"
        bg={tableBgColor}
        borderWidth="1px"
        borderColor={tableBorderColor}
        borderRadius="xl" // Set border radius to make borders curved
        maxWidth="800px" // Set max width to make table width fixed
        margin="0 auto" // Center the table
        mt={'20px'}
      >
        <Thead bg={tableHeadColor} fontFamily={'Gilroy-Medium'}>
          <Tr color="white">
            <Th color="white">Serial No</Th>
            <Th color="white">Username</Th>
            <Th color="white">Role</Th>
          </Tr>
        </Thead>
        <Tbody fontFamily={'Gilroy-Medium'}>
          {team.map((item, index) => (
            <Tr key={item.name}>
              <Td>{index + 1}</Td>
              <Td>{item.user_name}</Td>
              <Td>{item.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent={'center'}>
        <Heading
          as="h1"
          size="xl"
          mb={0}
          color="white"
          fontFamily={'Gilroy-Bold'}
          mt={'20px'}
        >
          Starting soon ..... Stay tuned
          
        </Heading>
      </Flex>
      <Flex justifyContent={'center'}>
        <Heading
          as="h1"
          size="md"
          mb={2}
          color="white"
          fontFamily={'Gilroy-Bold'}
          mt={'0px'}
        >
          You will get be notified when the game starts
        </Heading>
      </Flex>
      <Flex justifyContent={'center'} m>
        <Text fontFamily={'gilroy'} color={'white'} >For any queries or doubts join our <a href='https://discord.gg/Dy3MVM2'>DISCORD</a>  </Text>
        <Text><a><FaDiscord /></a> </Text>
      </Flex>
    </Box>
  );
}
