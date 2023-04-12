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
export default function Question3() {
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
        `/api/v2/question/q3`,
        { answer: ans },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      history.replace('/udjqhzopat');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        align="center"
        h="100vh"
        bgImage={'url(/back.png)'}
        justifyContent={'space-between'}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      >
        <div class="wrapper">
          <div>
            <Box
              background={'rgba(255, 255, 255, 0.3)'}
              backdropFilter={'blur(10px)'}
              w={700}
              h={300}
              alignContent="center"
              alignSelf={'center'}
              //bg="linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(your-image-url)"
              //backgroundSize="cover"
              borderRadius="10px"
              //boxShadow="0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <VStack spacing={0}>
                <Flex>
                  <Text
                    as="span"
                    color="black"
                    align={'left'}
                    verticalAlign={'top'}
                    textAlign={'left'}
                    justify={'left'}
                    justifyContent={'left'}
                    p={5}
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="bold"
                    fontFamily="Gilroy-Black"
                  >
                    Question 3) You’ve bit off more than you can chew. But
                    exploring this island cave without light might be a bad
                    idea. Stumbling forward in the dark, you wonder what you’ll
                    find… 52, 46, 32, 60, 38, 54
                  </Text>
                </Flex>

                <Stack spacing={10}>
                  <Input
                    variant="filled"
                    placeholder="Enter your answer here"
                    onChange={event => setAnswer(event.target.value)}
                  />

                  <Flex justify={'center'}>
                    <Button
                      align={'center'}
                      justify={'center'}
                      justifyContent={'center'}
                      h={8}
                      borderRadius={20}
                      fontFamily="Gilroy-Medium"
                      fontSize={15}
                      background={'rgba(0, 0, 0, 0.7)'}
                      textColor={'white'}
                      w={100}
                      ml={500}
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </Button>
                  </Flex>
                </Stack>
              </VStack>
            </Box>
          </div>
        </div>
      </Flex>
    </>
  );
}
