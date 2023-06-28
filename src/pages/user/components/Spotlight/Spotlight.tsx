import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { AspectRatio, Button, Divider, Flex, GridItem, Image, SimpleGrid, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import * as styles from '@pages/user/components/Spotlight/styles';
import * as constants from '@pages/user/models/constants';
import { Modals } from '@/modals/models/modalModel';
import { useNavigate } from 'react-router-dom';

/**
 * @function Spotlight
 * @description Renders a users' spotlighted track with cover image and artist information.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Spotlight = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const [hasStockImageLoaded, setHasStockImageLoaded] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const spotlight = useSelector(store.select.userModel.selectSpotlight);
  const userData = useSelector(store.select.userModel.selectUser);
  const connectedWallet = useSelector(store.select.authModel.selectWallet);
  const currentWallet = useSelector(store.select.userModel.selectWallet);
  return (
    <SimpleGrid {...styles.$simpleGridStyles}>
      <GridItem {...styles.$gridItemStackStyles}>
        {spotlight?.cover ? (
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasImageLoaded} fitContent rounded={'lg'} height="100%">
            <AspectRatio ratio={1}>
              <Image onLoad={setHasImageLoaded.on} {...styles.$imageStyles} src={spotlight?.cover} />
            </AspectRatio>
          </Skeleton>
        ) : (
          <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={hasStockImageLoaded} fitContent rounded={'lg'} height="100%">
            <AspectRatio ratio={1}>
              <Image onLoad={setHasStockImageLoaded.on} {...styles.$imageStyles} src={constants.STOCK_IMAGE} />
            </AspectRatio>
          </Skeleton>
        )}
      </GridItem>
      <GridItem {...styles.$gridItemTextStyles}>
        <Stack {...styles.$detailsStackStyles}>
          {spotlight?.track_name ? (
            <Text title={spotlight?.track_name} {...styles.$submissionTextStyles}>{spotlight?.track_name}</Text>
          ) : (
            <Text {...styles.$trackTextStyles}>{constants.STOCK_HEADER}</Text>
          )}
          <Divider {...styles.$dividerStyles} />
          <Flex {...styles.$flexStyles}>
            <Stack alignSelf={'start'}>
              {spotlight?.artists?.length ? (
                <Text {...styles.$artistNameTextStyles}>{spotlight?.public ? spotlight?.artists?.map((e: User) => e.display_name) : 'anonymous'}</Text>
              ) : (
                <Text {...styles.$artistTextStyles}>{constants.STOCK_DESC}</Text>
              )}
            </Stack>
            <Flex {...styles.$flexIconsStyles}>
              {connectedWallet === currentWallet && <Button onClick={() => dispatch.modalModel.setModal(Modals.SPOTLIGHT)} {...styles.$penCircleIconStyles} />}
              <Button onClick={() => navigate(`/song/${userData?.spotlight}`)} isDisabled={!spotlight?.audio} {...styles.$playCircleIconStyles} />
            </Flex>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem {...styles.$gridItemIconStyles}>
        <Flex {...styles.$flexIconLargeStyles}>
          {connectedWallet === currentWallet && <Button onClick={() => dispatch.modalModel.setModal(Modals.SPOTLIGHT)} {...styles.$penCircleIconLargeStyles} />}
          <Button onClick={() => navigate(`/song/${userData?.spotlight}`)} isDisabled={!spotlight?.audio} {...styles.$playCircleIconLargeStyles} />
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
