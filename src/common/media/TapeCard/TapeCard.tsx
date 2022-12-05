import { TapeData } from '@/models/common';
import { store } from '@/store';
import { AspectRatio, Avatar, Container, Divider, Flex, Image, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TapeCard = ({ tape }: { tape: TapeData }) => {
  const navigate = useNavigate();
  const artistMapping = useSelector(store.select.artistModel.selectArtistMapping);
  return (
    <div
      role="button"
      onClick={() => navigate(tape.route, { replace: true })}
      key={tape.contract}
      className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-sm bs-preset-1"
    >
      <AspectRatio className="m-2 lg:m-4" ratio={1}>
        <Image
          w="full"
          src={tape.image}
          alt={tape.name}
          objectFit="cover"
          rounded="sm"
          className="group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
        />
      </AspectRatio>
      <Container textColor="white" className="font-bold relative bottom-8 lg:bottom-10 lg:left-1 -mb-5">
        <Text fontSize={{ base: 'xs', lg: 'sm' }} px={1} w="fit-content" rounded="sm" bg={'black'}>
          {/* {tape?.tracks?.length ? getTotalDuration(tape.tracks, tape.route) : 'PENDING'} */}
        </Text>
      </Container>
      <div className="flex flex-col justify-center p-2 lg:p-4 duration-500 group-hover:bg-gray-500/20">
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-sm sm:text-base lg:text-2xl text-gray-700 font-bold tracking-widest whitespace-nowrap w-full text-right">
            {tape.name.split(' ')[0]}
            <span className="text-red-500 font-light ml-2">{tape.name.split(' ')[1]}</span>
            <span aria-hidden="true" className="absolute inset-0 truncate" />
          </h3>
          <Text fontWeight={'light'} fontSize={{ base: 'xs', lg: 'sm' }} textAlign={'right'} mb={{ base: 2, lg: 0 }}>
            {DateTime.fromMillis(tape?.timeline?.mint?.end).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
          <Divider my={2} />
          <Flex className="" gap={2} alignItems="center">
            <Avatar src={artistMapping[tape?.curator].profilePicture} size="2xs" />
            <Text textColor={'gray.800'} fontWeight={'semibold'} letterSpacing={'widest'} fontSize={{ base: '2xs', lg: 'xs' }}>
              {artistMapping[tape?.curator].displayName}
            </Text>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default TapeCard;
