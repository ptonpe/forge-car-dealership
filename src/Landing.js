// landing.js
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { keyframes as emotionKeyframes } from '@emotion/react';
import carImage from './car-and-guy.png'
import githubLogo from './GitHub-Logo.wine.png'
import './App.css';
import { Global } from '@emotion/react';

// define a keyframe sequence (floating effect)
const floatKeyframes = emotionKeyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const GlobalStyles = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
      body {
        font-family: 'Roboto', sans-serif;
      }
    `}
  />
);

const Landing = () => {
  // attach it in a variable for easy usage
  const floatAnimation = `${floatKeyframes} 3s ease-in-out infinite`;

  return (
    <>
      <GlobalStyles />
      <Box
        minH="100vh"
        bg='rgb(255,239,224)'
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={10}
        pl={40}
        textAlign="center"
        color="white"
        
      >
        <Flex alignItems="center" mb={4}>
          <Image 
            src={carImage}
            alt="Car Image" 
            boxSize="500px" 
            mr={4} 
          />
          <Box textAlign="left">
            <Heading fontSize="5xl" fontFamily="Roboto" textColor={'black'}>
              Convergent Car Dealership
            </Heading>
            <Text fontSize="xl" maxW="600px" mb={10} fontFamily="Roboto" textColor={'black'}>
              Your one-stop shop for <span style={{ fontSize: '3rem' }}>🚗</span>
            </Text>
            <Flex gap={6} animation={floatAnimation}>
              <Button
                as={RouterLink}
                to="/car-gallery"
                colorScheme="whiteAlpha"
                size="lg"
                textColor={'black'}
              >
                Car Gallery
              </Button>
              <Button
                as="a"
                href="https://github.com/ptonpe"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                textColor={'black'}
                display="flex"
                alignItems="center"
              >
                <Image 
                  src={githubLogo} 
                  alt="GitHub Logo" 
                  boxSize="30px"
                  objectFit="contain"
                  mr={2}
                />
                Code Repo
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Landing;
