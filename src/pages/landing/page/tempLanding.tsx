import React, {useEffect } from 'react'
import { Link } from 'react-router-dom';
import {  useSpring, animated, SpringValue } from '@react-spring/web'
import styled from 'styled-components';

const linkTwo = "https://www.heds.cloud/ipfs/QmZWELUaidkye3Fyb955RYThL9TNWyv79kxeZGsaVcGX3x";

  const LinkButton = ({ label, path }: { label: string, path: string }) => {
  
    const buttonStyles: React.CSSProperties = {
        color: '#333333',
        border: 'none',
        borderRadius: '20px',
        width: '120px',
        height: '50px',
        marginRight: window.innerWidth <= 414 ? '15px' : '56px',
        marginLeft: window.innerWidth <= 414 ? '15px' : '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1em',
        fontFamily: 'Space Mono, monospace',
        backgroundSize: '300% 300%',
      };
  
    return (
    <Link to={path}>
        <button style={{ ...buttonStyles }}>
            {label}
        </button>
      </Link>
    );
  }
  

export function Landing() {

  const imagePositions = [
    { top: '10%', left: '10%' },
    { top: '10%', right: '10%' },
    { bottom: '50%', left: '90%' },
    { bottom: '50%', right: '90%' },
    { top: '20%', left: '30%' },
    { top: '40%', left: '70%' },
    { top: '20%', right: '30%' },
    { bottom: '10%', left: '10%' },
    { bottom: '20%', left: '30%' },
    { bottom: '10%', right: '10%' },
    { bottom: '20%', right: '30%' },
    { bottom: '40%', right: '70%' },
  ];
  
  const textStyle: React.CSSProperties = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '4em',
    color: 'white',
    textAlign: 'center',
    marginBottom:  window.innerWidth <= 414 ? '8px' :'6px',
  };


  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #262626;
  height: 100vh;  /* Make the container fill the entire screen height */

  @media (max-width: 1920px) {
    // padding: 20px; /* Add padding on larger screens */
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1728px) {
    // padding: 15px; /* Adjust padding for smaller screens */
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 414px) {
    // padding: 10px; /* Reduce padding for mobile screens */
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 390px) {
    // padding: 5px; /* Reduce padding further for very small screens */
    align-items: center;
    justify-content: center;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 90%;  /* Use only half the container's height */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1920px) {
    height: 85%; /* Adjust video container height on larger screens */
  }

  @media (max-width: 1728px) {
    height: 70%; /* Adjust video container height for smaller screens */
  }

  @media (max-width: 414px) {
    height: 80%; /* Adjust video container height for mobile screens */
  }

  @media (max-width: 390px) {
    height: 90%; /* Adjust video container height for very small screens */
  }
`;

const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',  // Add this
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <Container>
      <div>
        <div style={textStyle}>heds</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '60px', background: "#FACDFA" }}>
        <LinkButton label='tapes' path='/tapes' />
        <LinkButton label='explore' path='/explore' />
        <LinkButton label='artists' path='/artists' />
      </div>
      <VideoContainer>
        <video style={videoStyle} src={linkTwo} autoPlay muted loop playsInline onContextMenu={(e) => e.preventDefault()}/>
        {window.innerWidth >= 414 ? imagePositions.map((position, index) => (
          <FloatingImage key={index} src="https://www.heds.cloud/ipfs/QmPr717eLbsxYJQyxNWRLt2FDNoy27nZKk9RTqujdc1qKS" size={150} top={position.top} left={position.left} right={position.right} bottom={position.bottom} />
        )) : imagePositions.slice(4).map((position, index) => (
            <FloatingImage key={index} src="https://www.heds.cloud/ipfs/QmPr717eLbsxYJQyxNWRLt2FDNoy27nZKk9RTqujdc1qKS" size={150} top={position.top} left={position.left} right={position.right} bottom={position.bottom} />
          ))}
      </VideoContainer>
    </Container>
  )
}

interface FloatingImageProps {
    src: string;
    size: number;
    top: string;
    left: string;
    right: string;
    bottom: string;
  }
  
  const FloatingImage: React.FC<FloatingImageProps> = ({ src, size, top, left, right, bottom }) => {
    const [{x}, api ] = useSpring(() => ({ x: 0, config: { duration: 6000 } }));
  
    useEffect(() => {
      api.start({ x: 360 , loop: true, reset: true, from: { x: 0 } },);
    }, [api]);

    const adjustSizeForViewport = (): number => {
        const viewportWidth = window.innerWidth;
    
        if (viewportWidth <= 390) {
          // Adjust size for screens smaller than 390px
          return size * 0.5;
        } else if (viewportWidth <= 414) {
          // Adjust size for screens smaller than 414px
          return size * 0.7;
        } else if (viewportWidth <= 1728) {
          // Adjust size for screens smaller than 1728px
          return size * 0.85;
        } else {
          // Default size for screens larger than 1728px
          return size;
        }
      };

      const imageStyle = ( top: string, x: SpringValue<number>, left?: string, right?: string, bottom?: string): React.CSSProperties  => ({
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: adjustSizeForViewport(),
        height: adjustSizeForViewport(),
        transform: x.to((x: number) => `rotate(${x}deg)`) as unknown as string,
      });

    useEffect(() => {
    window.addEventListener('resize', adjustSizeForViewport);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', adjustSizeForViewport);
  }, []);
  
    return (
      <animated.img
        src={src}
        style={imageStyle(top, x, left, right, bottom)}
      />
    );
  };
  
