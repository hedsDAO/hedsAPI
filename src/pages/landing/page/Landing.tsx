import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Link } from 'react-router-dom';
import { Number } from '@/pages/landing/components/Number';
import { TextBlock } from '@pages/landing/components/TextBlock';

export const Landing = () => {
  return (
    <Parallax pages={4} style={{ top: '0', left: '0', height: '100vh' }}>
      <ParallaxLayer
        offset={0}
        style={{
          backgroundColor: 'black',
        }}
      />
      <ParallaxLayer offset={0}>
        <video playsInline autoPlay muted loop src="/hedsbackground.mp4" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={-0.1}
        style={{
          backgroundColor: 'black',
        }}
      />

      <ParallaxLayer
        offset={2}
        style={{
          backgroundColor: '#e3e2d4',
        }}
      ></ParallaxLayer>

      <ParallaxLayer
        offset={2.2}
        speed={1}
        style={{
          backgroundColor: '#493e68',
          height: '160%',
        }}
      ></ParallaxLayer>

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
          color: '#718096',
        }}
      >
        <div style={{ width: '50%', textAlign: 'center' }}>
          <img src="/hedslogo.png" />
          <p>WELCOME TO THE FUTURE OF CURATION.</p>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
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
          <Link to="/artists">click</Link>
        </button>
      </ParallaxLayer>

      <ParallaxLayer offset={2.2} speed={-0.1}>
        <img src="/hedspin.gif" />
      </ParallaxLayer>

      <ParallaxLayer offset={3.5} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Number inputNum={52} />
        <Number inputNum={420} />
      </ParallaxLayer>
    </Parallax>
  );
};
