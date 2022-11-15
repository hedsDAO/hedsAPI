import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export const Landing = () => {
  return (
    <Parallax pages={2} style={{ top: '0', left: '0', height: '100vh' }}>
      <ParallaxLayer
        offset={0}
        speed={2.5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '80px',
          fontFamily: 'monospace',
          fontWeight: '100',
          color: '#718096',
        }}
      >
        <p>welcome to the future of music</p>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={2} />
      <ParallaxLayer
        offset={1}
        speed={0.5}
        style={{
          position: 'fixed',
          width: '100%',
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
    </Parallax>
  );
};
