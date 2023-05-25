import { useSelector } from 'react-redux';
import { User } from '@/models/common';
import { store } from '@/store';
import { Box, Button, Divider, Flex, GridItem, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ARTIST_TEXT, TRACK_TEXT } from '@pages/user/models/constants';
import * as styles from '@pages/user/components/Spotlight/styles';

/**
 * @function Spotlight
 * @description Renders a users' spotlighted track with cover image and artist information.
 * @returns {JSX.Element} - Rendered component.
 **/

const TEMP_IMAGE = 'https://www.heds.cloud/ipfs/QmQZPNohaxYn3JXwRFXzixZUatT263psYfZaWzCiNmR4c4';
const TEMP_HEADER = 'Spotlight';
const TEMP_DESC = 'Coming Soon...';


export const Spotlight = () => {
  const spotlight = useSelector(store.select.userModel.selectSpotlight);
  return (
    <SimpleGrid {...styles.$simpleGridStyles}>
      <GridItem {...styles.$gridItemStackStyles}>
        {/* <Image {...styles.$imageStyles} src={spotlight?.cover} /> */}
        <Image {...styles.$imageStyles} src={TEMP_IMAGE} />
      </GridItem>
      <GridItem {...styles.$gridItemTextStyles}>
        <Stack {...styles.$detailsStackStyles}>
          <Text {...styles.$trackTextStyles}>{TEMP_HEADER}</Text>
          {/* <Text {...styles.$trackTextStyles}>{TRACK_TEXT}</Text>
          <Text {...styles.$submissionTextStyles}>{spotlight?.submission_data?.sub_id}</Text>
          <Divider {...styles.$dividerStyles} /> */}
          <Flex {...styles.$flexStyles}>
            <Stack>
              {/* <Text {...styles.$artistTextStyles}>{ARTIST_TEXT}</Text> */}
              <Text {...styles.$artistTextStyles}>
                {TEMP_DESC}
              </Text>
              <Text {...styles.$artistNameTextStyles}>{spotlight?.artists?.map((e: User) => e.display_name)}</Text>
            </Stack>
            <Flex {...styles.$flexIconsStyles}>
              <Button {...styles.$playCircleIconStyles} />
              <Button {...styles.$heartIconStyles} />
            </Flex>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem {...styles.$gridItemIconStyles}>
        <Flex {...styles.$flexIconLargeStyles}>
          <Button {...styles.$playCircleIconLargeStyles} />
          <Button {...styles.$heartIconLargeStyles} />
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
