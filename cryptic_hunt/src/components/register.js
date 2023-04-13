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

import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
export default function Register() {
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleEmailChange = e => {
    const value = e.target.value;
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(value);
    setIsEmailValid(pattern.test(value));
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    const pattern =    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-])[A-Za-z\d|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-]{8,}$/;

    setPassword(value);
    setIsPasswordValid(pattern.test(value));
  };

  const handleEmailClick = () => {
    setIsEmailClicked(true);
  };

  const handlePasswordClick = () => {
    setIsPasswordClicked(true);
  };
  const history = useHistory();
  const handleRegister = async e => {
    e.preventDefault();
    if (!isEmailValid) {
      toast({
        title: 'Error',
        description: 'Invalid Email',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!isPasswordValid) {
      toast({
        title: 'Error',
        description:
          'Password must contain atleast 8 characters, 1 uppercase, 1 lowercase and 1 number and special character',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (username === '') {
      toast({
        title: 'Error',
        description: 'Invalid Username',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post('/api/v1/user/register', {
        user_name: username,
        email: email,
        password: password,
      });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      //response status code
      if (response.status === 200) {
        history.push('/team');
      } else {
        //toast error
        toast({
          title: 'Error',
          description: response.data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      // handle success, e.g. redirect to dashboard page
      // console.log(response.data.token);
    } catch (err) {
      // handle error, e.g. display error message to user
      setError(err.response.data.error);
      toast({
        title: 'Error',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      // console.log(err.response.data);
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
            Register a New Account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                // onChange={e => setEmail(e.target.value)}
                onChange={handleEmailChange}
                onFocus={handleEmailClick}
              />
            </FormControl>
            {isEmailClicked && !isEmailValid && (
              <Text color={'red'}>Please enter a valid email address.</Text>
            )}
            {isEmailClicked && isEmailValid && (
              <Text color={'green'}>Your email is valid!</Text>
            )}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                // onChange={e => setPassword(e.target.value)}
                onChange={handlePasswordChange}
                onFocus={handlePasswordClick}
              />
            </FormControl>
            {isPasswordClicked && !isPasswordValid && (
              <Text color={'red'}>
                - 8 characters
                <br />
                - Atleast 1 Upper Case letter
                <br />
                - Atleast 1 Number
                <br />
                - Atleast 1 Special Character
                <br />
              </Text>
            )}
            {isPasswordClicked && isPasswordValid && (
              <Text color={'green'}>Your password is valid!</Text>
            )}
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleRegister}
              >
                Sign in
              </Button>
            </Stack>
            <Flex flexDirection={'column'}>
              <Text fontFamily={'Gilroy-SemiBold'}> Already a member?</Text>
              <Link color="blue.400" href="/">
                Sign-in now
              </Link>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
