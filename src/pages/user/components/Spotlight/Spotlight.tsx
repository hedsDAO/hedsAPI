import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { Box, Button, Divider, Flex, GridItem, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Spotlight/styles';
import { Modals } from '@/modals/models/modalModel';

/**
 * @function Spotlight
 * @description Renders a users' spotlighted track with cover image and artist information.
 * @returns {JSX.Element} - Rendered component.
 **/

const TEMP_IMAGE = 'https://www.heds.cloud/ipfs/QmQZPNohaxYn3JXwRFXzixZUatT263psYfZaWzCiNmR4c4';
const TEMP_HEADER = 'Spotlight';
const TEMP_DESC = `There's nothing here...`;

export const Spotlight = () => {
  const dispatch = useDispatch<Dispatch>();
  const spotlight = useSelector(store.select.userModel.selectSpotlight);
  const connectedWallet = useSelector(store.select.authModel.selectWallet);
  const currentWallet = useSelector(store.select.userModel.selectWallet);
  return (
    <SimpleGrid {...styles.$simpleGridStyles}>
      <GridItem {...styles.$gridItemStackStyles}>
        {spotlight?.cover ? <Image {...styles.$imageStyles} src={spotlight?.cover} /> : <Image {...styles.$imageStyles} src={TEMP_IMAGE} />}
      </GridItem>
      <GridItem {...styles.$gridItemTextStyles}>
        <Stack {...styles.$detailsStackStyles}>
          {spotlight?.submission_data?.sub_id ? (
            <Text {...styles.$submissionTextStyles}>{spotlight?.submission_data?.sub_id}</Text>
          ) : (
            <Text {...styles.$trackTextStyles}>{TEMP_HEADER}</Text>
          )}
          <Divider {...styles.$dividerStyles} />
          <Flex {...styles.$flexStyles}>
            <Stack>
              {spotlight?.artists?.length ? (
                <Text {...styles.$artistNameTextStyles}>{spotlight?.public ? spotlight?.artists?.map((e: User) => e.display_name) : 'anonymous'}</Text>
              ) : (
                <Text {...styles.$artistTextStyles}>{TEMP_DESC}</Text>
              )}
            </Stack>
            <Flex {...styles.$flexIconsStyles}>
              <Button {...styles.$penCircleIconStyles} />
              <Button {...styles.$playCircleIconStyles} />
            </Flex>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem {...styles.$gridItemIconStyles}>
        <Flex {...styles.$flexIconLargeStyles}>
          {connectedWallet === currentWallet && <Button onClick={() => dispatch.modalModel.setModal(Modals.SPOTLIGHT)} {...styles.$penCircleIconLargeStyles} />}
          <Button {...styles.$playCircleIconLargeStyles} />
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
