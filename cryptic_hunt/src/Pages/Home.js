import React from 'react';
import SimpleCard from '../components/Login';
import ChakraProvider from '@chakra-ui/react';
import { Box,Link ,Flex,Text} from '@chakra-ui/react';
import '../App.css';
function Home1() {
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
    
      <Box   > 
      <Text fontFamily={'Anurati'} align={'left'}  ml={{base:100,md:100}} mt={{base:50,md:-100}}
      alignItems={'left'} justifyContent={'left'}  
      mb={{base:10,md:0}}
      color={'white'} fontSize={{base:'15vw',md:'8vw'}}>C I PHER<br></br>DASH</Text>
      <br></br><br></br><br></br><br></br>
      <Text fontFamily={'Momcake'} align={'left'}  ml={100} mt={-100}
      alignItems={'left'} justifyContent={'left'}  letterSpacing={10}
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
