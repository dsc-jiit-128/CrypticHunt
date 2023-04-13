import React from 'react';
import ChakraProvider from '@chakra-ui/react';
import {
  Box,
  Link,
  Flex,
  Text,
  VStack,
  Stack,
  Textarea,
  Button,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
export default function Question2() {
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const [answer, setAnswer] = useState('');
  const history = useHistory();
  const handleSubmit = async event => {
    const teamId = localStorage.getItem('teamId');
    const token = localStorage.getItem('token');
    event.preventDefault();
    console.log(answer);
    const ans = answer.toUpperCase();
    console.log(ans);
    console.log(teamId);
    console.log(token);
    try {
      const response = await axios.post(
        `/api/v2/question/q2`,
        { answer: ans },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      history.replace('/mmxiyqtebz');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        align='center'
        minH='100vh'
        bgImage={'url(/back.png)'}
        justifyContent={'center'} 
        bgRepeat='no-repeat'
        bgSize='cover'
        bgPosition='center'
      >
        <Box
          background={'rgba(255, 255, 255, 0.3)'}
          backdropFilter={'blur(10px)'}
          w={{ base: '90%', md: '60%' }} 
          h={300}
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <VStack spacing={6} w='100%'> 
            <Text
              as="span"
              color="black"
              align={'center'} 
              p={5}
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="bold"
              fontFamily="Gilroy-Black"
            >
             
 Question 2: The sound of silence <br></br>
<a href=" https://youtu.be/x_PHcY8_EVk">Listen Closely. </a> 
            </Text>

            <Stack spacing={4} w='50%' align={'center'} >
              <Input variant='filled'
                                  onChange={event => setAnswer(event.target.value)}
                                  placeholder="Enter your answer here" />
              <Button
                align={'center'}
                justify={'center'}
                justifyContent={'center'}
                borderRadius={20}
                fontFamily="Gilroy-Medium"
                fontSize={15}
                background={'rgba(0, 0, 0, 0.7)'}
                textColor={'white'}
                w={{ base: '60%', md: '40%' }}
                onClick={handleSubmit}

              >
                SUBMIT
              </Button>
            </Stack>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}
