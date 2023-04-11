import React from 'react';
import ChakraProvider from '@chakra-ui/react';
import { Box,Link ,Flex,Text,VStack,Stack,Textarea,Button,Input,Image} from '@chakra-ui/react';
import '../App.css';
export default function Question3() {
  return (
    <>
    <Flex  align='center'   h='100vh' 
    bgImage={'url(/back.png)'} justifyContent={'space-between'} bgRepeat='no-repeat' bgSize='cover' bgPosition='center'>
     <div class="wrapper">

<div>
    <Box
 background={'rgba(255, 255, 255, 0.3)'}

backdropFilter={'blur(10px)'}

w={700}
h={500}
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
  <VStack
  spacing={0}><Flex>
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
Question 6:
Now Questions have house rules.They don’t like to lose, so they are never counting cards. 
Grid of 10 words, you have to get 3. 

<Image
src="/q6img.png"
alt="Picture of the author"
w={'40%'}
m={'auto'}
/>



</Text>
</Flex>


<Stack spacing={10}>

<Input 
  variant='filled' placeholder="Enter your answer here"/>

<Flex justify={'center'}>

<Button
align={'center'} justify={'center'} justifyContent={'center'}
h={8}


borderRadius={20}
fontFamily="Gilroy-Medium"
fontSize={15}
background={'rgba(0, 0, 0, 0.7)'}
textColor={'white'}

w={100}

ml={500}

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
