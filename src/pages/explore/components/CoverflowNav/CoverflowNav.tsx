import { Button, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import * as constants from '@/pages/explore/models/constants';
import * as styles from '@/pages/explore/components/CoverflowNav/styles';

/**
 * @function CoverflowNav
 * @description Renders navigation buttons for the Coverflow component on the Explore page.
 * @returns {JSX.Element} - Rendered CoverflowNav component.
 **/

export const CoverflowNav = () => {
  const dispatch = useDispatch<Dispatch>();
  const activeIndex = useSelector(store.select.exploreModel.selectActiveIndex);
  return (
    <Flex {...styles.$coverflowNavFlexStyles}>
      {constants.items?.map((item: {cover:string, link: string}, i: number) => (
        <Button key={item.cover + i} {...styles.buttonStyles(activeIndex === i)} onClick={() => dispatch.exploreModel.setActiveIndex(i)}>
          <i className={constants.COVERFLOW_NAV_ICON}></i>
        </Button>
      ))}
    </Flex>
  );
};
