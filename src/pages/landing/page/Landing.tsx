import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Number } from '@/pages/landing/components/Number';
import { TextBlock } from '@pages/landing/components/TextBlock';
import { FadeOutDown } from '@pages/landing/components/FadeOutDown';
import { Box, Center, Container, Divider, Grid, GridItem, Stack, StackDivider, Flex } from '@chakra-ui/react';
import { HedsTapeTitle } from '@pages/landing/components/HedstapeTitle';
import { GridItemImage } from '@pages/landing/components/GridItemImage';
import { Stepper } from '@pages/landing/components/Stepper';
import { IconDeviceAudioTape, IconHeadphones, IconIcons, IconTicket, IconUsers, IconWallet } from '@tabler/icons';
import { LogoTransform } from '@/pages/landing/components/LogoTransform';
import hedspin from '@/public/hedspin.gif';
import hedsBackground from '@/public/hedsbackground.mp4';

export const Landing = () => {
  const parallaxRef = useRef<IParallax>(null);
  const widthBreakpoint: boolean = window.innerWidth < 480;
  const heightBreakpoint: boolean = window.innerHeight < 700;
  const parallaxPages: number = widthBreakpoint && heightBreakpoint ? 5.6 : widthBreakpoint ? 5.3 : 5;

  return (
    <Parallax className="top-div" pages={parallaxPages} style={{ top: '0', left: '0', height: '100vh', position: 'fixed' }} ref={parallaxRef}>
      {/* Section 1 */}
      <ParallaxLayer
        offset={0}
        style={{
          backgroundColor: 'black',
        }}
      />

      <ParallaxLayer offset={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video style={{ width: '200vw', overflow: 'hidden' }} playsInline autoPlay muted loop src={hedsBackground} />
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        style={{
          backgroundColor: 'black',
        }}
      />
      <ParallaxLayer
        offset={widthBreakpoint ? 1.8 : 2}
        style={{
          backgroundColor: '#e3e2d4',
          height: '20%',
        }}
      />
      <ParallaxLayer
        offset={widthBreakpoint ? 2 : 2.35}
        speed={0.5}
        style={{
          backgroundColor: '#493e68',
          height: widthBreakpoint ? '100%' : '80%',
        }}
      />
      <ParallaxLayer
        offset={3}
        style={{
          backgroundColor: 'white',
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={1}
        sticky={{ start: 0, end: 5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          height: '0%',
        }}
      >
        <LogoTransform parallaxRef={parallaxRef} />
      </ParallaxLayer>

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
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20rem',
          }}
        >
          <FadeOutDown text={'WELCOME TO THE FUTURE OF CURATION.'} />
        </div>
      </ParallaxLayer>

      {/* Section 2 */}
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

      <ParallaxLayer offset={1.1} speed={0.2} style={{ width: '100%' }}>
        <Flex justify="flex-end">
          <Flex direction="column" align="start">
            <TextBlock tapeName="HEDSTAPE 10" tapeTag="SAMPLE FROM" artistName="RAMZOID" artistTag="ARTIST" />
            <button>
              <Link to="/artists">VIEW TAPE</Link>
            </button>
          </Flex>
        </Flex>
      </ParallaxLayer>

      {/* Section 3 */}
      <ParallaxLayer
        offset={widthBreakpoint ? 1.9 : 2}
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
        <Container maxW={['60%', '50%', '40%']}>
          <img src={hedspin} />
        </Container>
      </ParallaxLayer>

      {/* Section 4 */}
      <ParallaxLayer offset={widthBreakpoint ? 2.2 : 2.5} speed={0.2}>
        <Divider />
        <Stack direction={['column', 'row']} divider={<StackDivider borderColor="gray.400" />} h={['70%', '30%']} w="100vw">
          <Box
            w={['100%', '50%']}
            h="100%"
            padding={[null, '2em', '5em']}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="mono"
            color="white"
          >
            <Grid h="60%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
              <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="flex-end">
                <Number inputNum={56} size={['3rem', null, '4rem', '8rem']} />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <Center h="100%" fontSize={['xs', 'sm', 'md']}>
                  heds offers access without genre restrictions. every tape cycle is open to the public. allowing those new to the digital creative space to
                  experiment freely.
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Flex display="flex" justify="center" align={['start', 'center']} h={[null, '100%']}>
                  unique artists
                </Flex>
              </GridItem>
            </Grid>
          </Box>
          <Box
            w={['100%', '50%']}
            h="100%"
            padding={[null, '2em', '5em']}
            fontFamily="mono"
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid h="60%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
              <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="flex-end">
                <Number inputNum={420} dollar size={['3rem', null, '4rem', '8rem']} />
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <Center h="100%" textAlign={[null, 'right']} fontSize={['xs', 'sm', 'md']} padding={['1px', '3px']}>
                  SELECTED ARTISTS GET ACCESS TO EXCLUSIVE HEDS SAMPLE PACKS & ARTIST TOOLS
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Flex display="flex" justify="center" align={['start', 'center']} h={[null, '100%']} textAlign="center" fontSize="sm">
                  average artist earnings per tape
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Stack>
        <Center marginTop={['-2rem', '1rem']}>
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

      {/* Section 5 */}
      <ParallaxLayer offset={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid
          h={['80%', null, '100%']}
          width="100%"
          padding={['1rem', null, '5rem']}
          templateRows={['repeat(3, 1fr)', 'repeat(2, 1fr)']}
          templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={[1, 2, null, 4]}
        >
          <GridItemImage num={207} text="unique minters" icon={IconUsers} />
          <GridItemImage num={59} text="curated artists" icon={IconHeadphones} />
          <GridItemImage num={162} text="unique submissions" icon={IconIcons} />
          <GridItemImage num={734} text="tapes minted" icon={IconDeviceAudioTape} />
          <GridItemImage num={231} text="verified wallets" icon={IconWallet} />
          <GridItemImage num={438} text="total submissions" icon={IconTicket} />
        </Grid>
      </ParallaxLayer>

      {/* Section 6 */}
      <ParallaxLayer offset={4}>
        <Stepper />
      </ParallaxLayer>
    </Parallax>
  );
};
