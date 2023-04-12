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
  HStack,
  useMediaQuery,
  Spacer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Component } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaDiscord } from 'react-icons/fa';

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
  const [Values, setValue] = useState([]);
  const [team, setTeam] = useState([]);
  const history = useHistory();
  const routes = [
    '/boysnyoblg',
    '/gcwabuklec',
    '/mmxiyqtebz',
    '/udjqhzopat',
    '/mvpqblridf',
    '/twvaowyqpo',
    '/gdmroduldu',
    '/unrjqlcobn',
  ];

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
      const values = [
        response.data.data.solutions.q1,
        response.data.data.solutions.q2,
        response.data.data.solutions.q3,
        response.data.data.solutions.q4,
        response.data.data.solutions.q5,
        response.data.data.solutions.q6,
        response.data.data.solutions.q7,
        response.data.data.solutions.q10,
      ];
      setValue(values);
      const firstFalseIndex = values.findIndex(value => value === false);
      setButtonValues(values);
      setTeam(Team);
      console.log(teamId);
      localStorage.setItem('teamId', teamId);
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
  const [buttonValues, setButtonValues] = useState([]);
  function handleButtonClick() {
    // Find the index of the first false value in the values array
    const firstFalseIndex = Values.findIndex(value => value === false);
    console.log(routes[firstFalseIndex]);
    console.log(firstFalseIndex);
    // Navigate to the route at the corresponding index
    history.push(routes[firstFalseIndex]);
  }
  const onCopy = () => {
    navigator.clipboard.writeText(teamID);
    setHasCopied(true);
  };
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  return (
    <Box
      p={8}
      bgColor={'#161615'}
      h="100vh"
      w="100vw"
      overflowY={'scroll'}
      display={'flex'}
      flexDir="column"
    >
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
          {hasCopied ? 'Copied!' : 'Copy'}
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
      <HStack spacing={4} mt={'20px'}>
        {buttonValues.map((value, index) => (
          <Box
            key={index}
            width="20px"
            height="20px"
            borderRadius="50%"
            bg={value ? 'green' : 'red'}
          />
        ))}
      </HStack>
      <Table
        variant="striped"
        bg={tableBgColor}
        borderWidth="1px"
        borderColor={tableBorderColor}
        borderRadius="xl" // Set border radius to make borders curved
        //maxWidth="800px" // Set max width to make table width fixed
        margin="0 auto" // Center the table
        mt={'20px'}
        transform={isLargerThan768 ? '' : 'scale(0.8) translateX(-10%)'}
      >
        <Thead
          bg={tableHeadColor}
          fontFamily={'Gilroy-Medium'}
          //width
        >
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
      <Flex justifyContent={'center'} flex={1}>
        <Button onClick={handleButtonClick} mt={8} mb={8}>
          PLAY NOW
        </Button>
      </Flex>
      <Flex justifyContent={'center'}>
        <Text fontFamily={'gilroy'} color={'white'}>
          <HStack w={'100%'}>
            <Text>For any queries open a ticket on our </Text>
            <a href="https://discord.gg/2dFfgQFGCs">DISCORD </a>{' '}
            <FaDiscord size={30} />
          </HStack>
        </Text>
      </Flex>
    </Box>
  );
}
