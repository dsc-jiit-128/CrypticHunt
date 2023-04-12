import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  HStack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';


export default function SimpleCard() {
  const toast = useToast();
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const handleLogin = async event => {
    event.preventDefault();
    console.log(username);
    console.log(password);

    try {
      const response = await axios.post('/api/v1/user/login', {
        user_name: username,
        password: password,
      });
      const token = response.data.data.token;
      const team = response.data.data.isteam;
      localStorage.setItem('token', token);
      console.log(response);
      if (response.data.message === 'Login verified' && team === false) {
        history.push('/team');
      } else if (response.data.message === 'Login verified' && team ===true) {
        history.push('/leaderboard');
      } else if (response.data.message === 'User already exists') {
        history.push('/login');
      } else {
        // Handle other messages
        toast({
          title: 'Error',
          description: 'Invalid Credentials',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

      }
      // console.log(response?.data?.data?.token);
      console.log(response.data.message); // handle successful response
    } catch (error) {
      console.log(error); // handle error
      toast({
        title: 'Error',
        description: 'Invalid Credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgColor={'#161515'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'3xl'}
              fontFamily={'Gilroy-Bold'}
              color={'white'}
            >
              Login to your Account
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input
                  type="email"
                  id="user_name"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  // onChange={handleInputChange}
                  mb={0}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </Stack>
              <Flex flexDirection={'column'}>
                <Text fontFamily={'Gilroy-SemiBold'}> Not a member yet?</Text>
                <Link color="blue.400" href="/register">
                  Register Now
                </Link>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
