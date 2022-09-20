import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';
import { User } from 'src/models/common';
import { Box, Image, Skeleton } from '@chakra-ui/react';
import { IconBrandTwitter, IconClipboard } from '@tabler/icons';
import styled from 'styled-components';
import Container from '@/common/Container';

export const UserPage = () => {
  const isUserDataLoading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData: User = useSelector((state: RootState) => state.userModel);
  const dispatch = useDispatch<Dispatch>();
  const { wallet } = useParams<{ wallet: string }>();

  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);

  return (
    <Container>
      <div></div>
      <div></div>
      {/* <Section $width="30%">
        <Box>
          <Image src={userData.profilePicture} alt={userData.displayName} borderRadius="0.5rem" />
        </Box>
        <DisplayName>{userData.displayName || 'Not Found'}</DisplayName>
        <Description>{userData.description || '...'}</Description>
        <Box>
          <Skeleton fadeDuration={2} isLoaded={!isUserDataLoading}>
            <a href={`https://www.twitter.com/${userData.twitterHandle}`} target="_blank" rel="noreferrer">
              <Description>
                <IconBrandTwitter />
                {userData.twitterHandle}
              </Description>
            </a>
          </Skeleton>
        </Box>
        <Box>
          <Skeleton fadeDuration={3} isLoaded={!isUserDataLoading}>
            <Description>
              <IconClipboard />
              {userData.wallet}
            </Description>
          </Skeleton>
        </Box>
      </Section>
      <Section $width="70%">
        <DisplayName>Submissions</DisplayName>
        <DisplayName>Featured on</DisplayName>
      </Section> */}
    </Container>
  );
};

// const Container = styled.div`
//   max-width: 80rem;
//   margin: 2.5rem auto 2.5rem auto;
//   padding-left: 0.75rem;
//   padding-right: 0.75rem;
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
// `;

const Section = styled.div<{ $width: string }>`
  width: ${(props) => props.$width || '100%'};
  flex-direction: column;
`;

const DisplayName = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: rgb(17, 24, 39);
`;

const Description = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(82, 82, 82);
`;
