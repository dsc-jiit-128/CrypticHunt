import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    useColorModeValue,


    Stack,
    Link,
    Button,
    HStack,
    Heading,
    Text,
  } from '@chakra-ui/react';
  
  export default function Teamcomp() {
    return (
 
      <Box
      overflowY="hidden"
   
    h={{md:'100vh',base:'700'}}
   mt={{md:'0',base:'10vh'}}
   mb={{md:'0',base:'10vh'}}
   ml={{md:'0',base:'5vh'}}
   mr={{md:'0',base:'5vh'}}
borderRadius="20"


    align={'center'}
    justify={'center'}
    bgColor={'#161515'}
    >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} fontFamily={'Gilroy-Bold'} color={'white'}>Enroll yourself in a team</Heading>
          
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
              
            <Stack spacing={4}>
            <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                Create Team
                </Button>
                <Text justify={'center'} align={'center'} alignItems={'center'} fontFamily={'Gilroy-Bold'} fontSize={
                  'xl'} color={'black'}>
                OR</Text>
              <FormControl id="teamcode">
                <FormLabel>Team Code</FormLabel>
                <Input borderColor="#FFFFF"/>
              </FormControl>
       
              <Stack spacing={10}>
             
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Join Team
                </Button>
              </Stack>
              {/* <HStack>
              <Text fontFamily={'Gilroy-SemiBold'}> Not a member yet
              </Text>
              <Link color='blue.400' href='/signup' >Register Now</Link>
              </HStack> */}
            </Stack>
          </Box>
        </Stack>
        </Box>
    );
  }