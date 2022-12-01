import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Link } from 'react-router-dom';
import { Number } from '@/pages/landing/components/Number';
import { TextBlock } from '@pages/landing/components/TextBlock';
import { FadeOutDown } from '@pages/landing/components/FadeOutDown';
import { Box, Center, Container, Divider, Grid, GridItem, HStack, StackDivider } from '@chakra-ui/react';
import { HedsTapeTitle } from '@pages/landing/components/HedstapeTitle';

export const Landing = () => {
  return (
    <Parallax pages={5} style={{ top: '0', left: '0', height: '100vh' }}>
      <ParallaxLayer
        offset={0}
        style={{
          backgroundColor: 'black',
        }}
      />

      {/* <ParallaxLayer offset={0} speed={0} style={{ height: '50%' }}>
        <video playsInline autoPlay muted loop src="/hedspinning-beige.mp4" />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={2} style={{ height: '50%' }}>
        <video playsInline autoPlay muted loop src="/hedspinning-purple.mp4" />
      </ParallaxLayer> */}

      <ParallaxLayer offset={0}>
        <video playsInline autoPlay muted loop src="/hedsbackground.mp4" />
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        style={{
          backgroundColor: 'black',
        }}
      />
      <ParallaxLayer
        offset={2}
        style={{
          backgroundColor: '#e3e2d4',
          height: '20%',
        }}
      />
      <ParallaxLayer
        offset={2.35}
        speed={0.5}
        style={{
          backgroundColor: '#493e68',
          height: '80%',
        }}
      />
      <ParallaxLayer
        offset={3}
        style={{
          backgroundColor: 'black',
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: '100',
          color: 'white',
        }}
      >
        <div style={{ width: '50%', textAlign: 'center' }}>
          <img src="/hedslogo.png" />
          <FadeOutDown text={'WELCOME TO THE FUTURE OF CURATION.'} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1.1}
        speed={0.5}
        style={{
          position: 'fixed',
          width: '80%',
        }}
      >
        <video
          playsInline
          autoPlay
          muted
          loop
          src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/landing%2Framzgraded.mp4?alt=media&amp;token=18ca3dd0-eebb-4827-87e2-71da33045739"
        />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1.4}
        speed={0.2}
        style={{
          display: 'block',
          width: '40%',
          height: 'auto',
          marginLeft: '60%',
        }}
      >
        <video
          playsInline
          autoPlay
          muted
          loop
          src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/landing%2Framzoid2.mp4?alt=media&token=02a29777-c054-4770-9554-f2c1b3eba0c9"
        />
      </ParallaxLayer>

      <ParallaxLayer offset={1.1} speed={0.2} style={{ width: '70%', marginLeft: '55%' }}>
        <TextBlock tapeName="HEDSTAPE 10" tapeTag="SAMPLE FROM" artistName="RAMZOID" artistTag="ARTIST" />
        <button>
          <Link to="/artists">VIEW TAPE</Link>
        </button>
      </ParallaxLayer>

      <ParallaxLayer
        offset={2}
        speed={0.2}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '20%',
          marginTop: '3em',
        }}
      >
        <HedsTapeTitle />
        <Container maxW="40%">
          <img src="/hedspin.gif" />
        </Container>
      </ParallaxLayer>

      <ParallaxLayer offset={2.6}>
        <Divider />
        <HStack divider={<StackDivider borderColor="gray.400" />} h="30%">
          <Box w="50%" h="100%" padding="5em" alignItems="center" fontFamily="mono" color="white" paddingTop="3em">
            <Grid h="60%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
              <GridItem rowSpan={1} colSpan={1}>
                <Number inputNum={56} />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <Center h="100%" fontSize="sm">
                  heds offers access without genre restrictions. every tape cycle is open to the public. allowing those new to the digital creative space to
                  experiment freely.
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Center h="100%">unique artists</Center>
              </GridItem>
            </Grid>
          </Box>
          <Box w="50%" h="100%" padding="5em" paddingTop="3em" fontFamily="mono" color="white">
            <Grid h="60%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
              <GridItem rowSpan={1} colSpan={1}>
                <Number inputNum={420} dollar />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <Center h="100%" marginLeft="5rem" textAlign="right" w="50%" fontSize="md">
                  SELECTED ARTISTS GET ACCESS TO EXCLUSIVE HEDS SAMPLE PACKS & ARTIST TOOLS
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Center h="100%" fontSize="sm">
                  average artist earnings per tape
                </Center>
              </GridItem>
            </Grid>
          </Box>
        </HStack>
        <Center marginTop="1rem">
          <Box
            as="button"
            p={4}
            color="white"
            fontWeight="bold"
            borderRadius="lg"
            bgGradient="linear(to-l, #572682, #FFB9AB)"
            _hover={{
              bgGradient: 'linear(to-l, #581394, #FF8269)',
            }}
          >
            <Link to="/artists">explore</Link>
          </Box>
        </Center>
      </ParallaxLayer>
    </Parallax>
  );
};

// steps page
// link to explore page
