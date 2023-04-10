import { Box, Center, Heading, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

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

  return (
    <Box p={8} bgColor={"#161615"} h='100vh' w='100vw'>
      <Center>
        <Heading as="h1" size="xl" mb={8} color="white" fontFamily={'Gilroy-Bold'}>
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
            <Th  color="white">Rank</Th>
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
