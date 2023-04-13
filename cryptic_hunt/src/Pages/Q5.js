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
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
export default function Question3() {
  const toast = useToast();
  axios.defaults.baseURL = 'https://cypher-dash.herokuapp.com/';
  const [answer, setAnswer] = useState('');
  const history = useHistory();
  const handleSubmit = async event => {
    const teamId = localStorage.getItem('teamId');
    const token = localStorage.getItem('token');
    event.preventDefault();
    const ans = answer.toUpperCase();
    
    if(ans == "") return;
    try {
      const response = await axios.post(
        `/api/v2/question/q5`,
        { answer: ans },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: 'Correct Answer',
        description: response.data.message,
        
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      history.replace('/twvaowyqpo');
    } catch (error) {
      toast({
        title: 'Try Again',
        description: error.response.data.error,
        
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
        <VStack 
          pos={'absolute'}
          top={10}
        >
          <Button
            onClick={() => history.replace('/leaderboard')}
          >
            LEADERBOARD
          </Button>
        </VStack>
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


How do I get to know which accounts my friends use using what package?
Think :OSINT Github
<br></br>

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
