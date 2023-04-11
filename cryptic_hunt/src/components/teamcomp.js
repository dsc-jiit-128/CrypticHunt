import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Teamcomp() {
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const [teamname, setTeamname] = useState('');
  const [teamcode, setTeamcode] = useState('');
  const token = localStorage.getItem('token');
  const history = useHistory();
  const handleCreateTeamClick = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'api/v2/user/createTeam',
        {
          name: teamname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      console.log(response.data.message);
      if (response.data.message === 'team created successfully') {
        history.push('/leaderboard');
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleJoinTeamClick = async event => {
    event.preventDefault();
    console.log(teamcode);
    const response = await axios.post(
      `/api/v2/user/joinTeam/${teamcode}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response);
    console.log(response.data.message);
    if (response.data.message === 'team joined successfully') {
      history.push('/leaderboard');
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgColor={'#161515'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} fontFamily={'Gilroy-Bold'} color={'white'}>
            Enroll yourself in a team
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="teamcode">
              <FormLabel>Team Name</FormLabel>
              <Input
                type="text"
                id="teamname"
                borderColor="#FFFFF"
                onChange={e => setTeamname(e.target.value)}
              />
            </FormControl>

            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleCreateTeamClick}
            >
              Create Team
            </Button>
            <Text
              justify={'center'}
              align={'center'}
              alignItems={'center'}
              fontFamily={'Gilroy-Bold'}
              fontSize={'xl'}
              color={'black'}
            >
              OR
            </Text>
            <FormControl id="teamcode">
              <FormLabel>Team Code</FormLabel>
              <Input
                type="text"
                borderColor="#FFFFF"
                id="teamcode"
                onChange={e => setTeamcode(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleJoinTeamClick}
              >
                Join Team
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
