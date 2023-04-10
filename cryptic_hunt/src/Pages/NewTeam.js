import React from 'react';
import Teamcomp from '../components/teamcomp';
import ChakraProvider from '@chakra-ui/react';
import { Box,Link ,Flex,Text} from '@chakra-ui/react';
import '../App.css';
export default function Team() {
  return (
    <>
    <Flex  align='center'   h='100vh' 
    bgImage={'url(/back.png)'} justifyContent={'space-between'} bgRepeat='no-repeat' bgSize='cover' bgPosition='center'>
    
      <Box  ml={'50'} > 
      <Text fontFamily={'Anurati'} align={'left'}  ml={100} mt={-100}
      alignItems={'left'} justifyContent={'left'}  
      color={'white'} fontSize={'8vw'}>C I PHER<br></br>DASH</Text>
      <br></br><br></br><br></br><br></br>
      <Text fontFamily={'Momcake'} align={'left'}  ml={100} mt={-100}
      alignItems={'left'} justifyContent={'left'}  letterSpacing={10}
      color={'white'} fontSize={'2vw'}>DO YOU HAVE WHAT IT TAKES? </Text>
      

</Box>
    <Box justifyContent={'right'} justify={'right'} bgColor={'#161515'} h='100vh'>
      <Teamcomp />

      </Box>
      </Flex>
   
    </>
  );
}
