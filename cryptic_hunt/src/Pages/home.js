import React from 'react';
import SimpleCard from '../components/Login';
import ChakraProvider from '@chakra-ui/react';
import { Box,Link ,Flex,Text} from '@chakra-ui/react';
import '../App.css';
export default function Home() {
  return (
    <>
    <Flex  align='center'   
    bgImage={'url(/back.png)'} 
    flexDirection={{base:'column',md:'row'}}
    justifyContent={'space-between'} bgRepeat='no-repeat' bgSize='cover' bgPosition='center'         overflowY="hidden"
    >
    
      <Box   > 
      <Text fontFamily={'Anurati'} align={'left'}  ml={{base:30,md:100}} mt={{base:-200,md:-100}}
      alignItems={'left'} justifyContent={'left'}  
      color={'white'} fontSize={'8vw'}>C I PHER<br></br>DASH</Text>
      <br></br><br></br><br></br><br></br>
      <Text fontFamily={'Momcake'} align={'left'}  ml={100} mt={-100}
      alignItems={'left'} justifyContent={'left'}  letterSpacing={10}
      color={'white'} fontSize={'2vw'}>DO YOU HAVE WHAT IT TAKES? </Text>
      

</Box>
    <Box  bgColor={'#161515'} overflowY="hidden"  >
      <SimpleCard />

      </Box>
      </Flex>
   
    </>
  );
}
