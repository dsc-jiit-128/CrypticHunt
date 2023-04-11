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
  
  export default function Register() {
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
        <Stack spacing={4} mx={'auto'} maxW={'lg'} py={12} px={6} >
          <Stack align={'center'}>
            <Heading fontSize={'2.5xl'} fontFamily={'Gilroy-Bold'} color={'white'}>Register a New Account</Heading>
          
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={2}>
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="username" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
             
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
              <HStack>
              <Text fontFamily={'Gilroy-SemiBold'}> Already a member?
              </Text>
              <Link color='blue.400' href='/' >Sign-in now</Link>
              </HStack>
            </Stack>
          </Box>
        </Stack>
        </Box>
    );
  }