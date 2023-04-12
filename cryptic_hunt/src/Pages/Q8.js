import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Stack,
  Text,
  Textarea,
  Button,
  Input,
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';
import '../App.css';

// Extend Chakra UI theme to include custom breakpoints
const theme = extendTheme({
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
  },
});

export default function Question() {
  return (
    <ChakraProvider theme={theme}>
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
        

Question 8:
<br/> I wish I could download all the best quality songs from youtube (youtube-dl) like a zombie so that i can listen till the end of playlist 
            </Text>

            <Stack spacing={4} w='50%' align={'center'} >
              <Input variant='filled' placeholder="Enter your answer here" />
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
              >
                SUBMIT
              </Button>
            </Stack>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}



