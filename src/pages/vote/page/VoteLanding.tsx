import { Dispatch, store } from '@/store';
import { isEmpty } from '@/utils';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LandingAllVotes } from '../components/LandingAllVotes';
import { LandingTapeCovers } from '../components/LandingTapeCovers';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import hedImage from '../../../public/heddot.png';

export const VoteLanding = () => {
  const dispatch = useDispatch<Dispatch>();
  const allHedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const allProposals = useSelector(store.select.voteModel.selectAllProposals);
  var settings = { dots: true, autoplay: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };

  useEffect(() => {
    dispatch.voteModel.getAllProposals();
  }, []);

  return (
    <Fragment>
      <Box minH="75vh" minW="100vw">
        <Box maxW="7xl" mx="auto" pb={10}>
          {!isEmpty(allHedsTapes) && allProposals?.length ? (
            <Slider arrows={false} {...settings}>
              {Object.values(allHedsTapes)
                .slice(Object.values(allHedsTapes).length - 3, Object.values(allHedsTapes).length)
                .reverse()
                .map((tape) => {
                  const currentProposal = allProposals?.filter((proposal) => (proposal.ipfs.IpfsHash === tape.proposalId ? proposal : null));
                  if (currentProposal?.length) return <LandingTapeCovers key={tape.contract + tape.proposalId} tape={tape} proposal={currentProposal[0]} />;
                })}
            </Slider>
          ) : (
            <Flex minH="50vh" alignItems={'center'} justifyContent="center">
              <Spinner h="12" w="12" size="md" />
            </Flex>
          )}
        </Box>
        <Image
          src={hedImage}
          opacity="50%"
          zIndex="10"
          top="24"
          left="72%"
          maxH="50rem"
          display={{ lg: 'block', base: 'none' }}
          position="absolute"
          objectFit="contain"
          style={{ filter: 'invert(0.75)' }}
        />
      </Box>
      <LandingAllVotes allHedsTapes={allHedsTapes} />
    </Fragment>
  );
};
