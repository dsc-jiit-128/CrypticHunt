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
} from '@chakra-ui/react';

import axios from 'axios';
import React, { useState } from 'react';

export default function SimpleCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(email);
    console.log(password);

    axios
      .post('/api/v1/user/login', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <HStack>
              <Text fontFamily={'Gilroy-SemiBold'}> Not a member yet</Text>
              <Link color="blue.400" href="/signup">
                Register Now
              </Link>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
