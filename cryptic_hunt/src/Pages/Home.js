import React from 'react';
import SimpleCard from '../components/Login';
import ChakraProvider, { useToast } from '@chakra-ui/react';
import { Box,Link ,Flex,Text} from '@chakra-ui/react';

import '../App.css';
function Home1() {

  const toast = useToast();
  
  return (
    <>
    <Flex  align='center'   
    bgImage={'url(/back.png)'} 
    flexDirection={{base:'column',md:'row'}}
    overflowY="hidden"
    overflow="hidden"
    overflowX="hidden"
    justifyContent={'space-between'} bgRepeat='no-repeat' bgSize='cover' bgPosition='center'  
    >
    
      <Box   justifyContent={'center'}  >
      <Text fontFamily={'Anurati'}   ml={{base:50,md:100}} mt={{base:50,md:-100}}
      mb={{base:10,md:0}} mr={{base:50,md:0}} align={{'base':'center','md':'left'}}
  
      color={'white'} fontSize={{base:'15vw',md:'8vw'}}>C I PHER<br></br>DASH</Text>
      <br></br><br></br><br></br><br></br>
      <Text fontFamily={'Momcake'} justifyContent={{'base':'center','md':'left'}}   ml={{base:5,md:100}} mt={-100}
      alignItems={'left'}  letterSpacing={10}  mb={10}
      color={'white'} fontSize={{base:'5vw',md:'2vw'}}>DO YOU HAVE WHAT IT TAKES? </Text>
      

</Box>
    {/* <Box  bgColor={'#161515'} overflowY="hidden"  > */}
      <SimpleCard />

      {/* </Box> */}
      </Flex>
   
    </>
  );
}
export default Home1;
