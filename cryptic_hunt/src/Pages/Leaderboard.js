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
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const leaderboardData = [
  { name: 'John', score: 50 },
  { name: 'Jane', score: 40 },
  { name: 'Bob', score: 35 },
  { name: 'Alice', score: 30 },
];

function Leaderboard() {
  const tableBgColor = useColorModeValue('white', 'gray.800');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');
  const tableHeadColor = useColorModeValue('gray.600', 'gray.400');
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const token = localStorage.getItem('token');
  let TeamID;
  const history = useHistory();
  const handleClick = async event => {
    console.log('clicked');
    event.preventDefault();

    try {
      const response = await axios.get('/api/v2/team/leaderboard', {
        headers: {
          Authorization: `Bearer ${token}`, // include the token in the Authorization header
        },
      });
      console.log(response);
      TeamID = response.data.data.user.team;
      console.log(TeamID);
      // console.log(response?.data?.data?.token);
      console.log(response.data.message); // handle successful response
    } catch (error) {
      console.log(error); // handle error
    }
  };

  return (
    <Box p={8} bgColor={'#161615'} h="100vh" w="100vw">
      <Button onClick={handleClick}>See the id</Button>
      <Center>
        <Heading
          as="h1"
          size="xl"
          mb={8}
          color="white"
          fontFamily={'Gilroy-Bold'}
        >
          Leaderboard
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
      >
        <Thead bg={tableHeadColor} fontFamily={'Gilroy-Medium'}>
          <Tr color="white">
            <Th color="white">Rank</Th>
            <Th color="white">Name</Th>
            <Th color="white">Score</Th>
          </Tr>
        </Thead>
        <Tbody fontFamily={'Gilroy-Medium'}>
          {leaderboardData.map((item, index) => (
            <Tr key={item.name}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Leaderboard;
