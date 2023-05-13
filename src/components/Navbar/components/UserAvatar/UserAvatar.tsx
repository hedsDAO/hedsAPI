import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { store } from '@/store';
import { useScrollPosition } from '@/components/Navbar/components/useScrollPosition/useScrollPosition';
import * as styles from '@/components/Navbar/components/UserAvatar/styles';
/**
 * @function UserAvatar
 * @description UserAvatar component renders the avatar of the connected user.
 * This component's animations are handled by the `useScrollPosition` hook and the `useAnimation` hook from `framer-motion`.
 * @returns {JSX.Element} Rendered UserAvatar component.
 */

export const UserAvatar = () => {
  const { pathname } = useLocation();
  const { scrollPosition, isScrolled } = useScrollPosition();
  const connectedUser = useSelector(store.select.authModel.selectUser);
  const navigate = useNavigate();
  const MotionAvatar = motion.img;
  const avatarControls = useAnimation();

  useEffect(() => {
    const avatarSize = isScrolled ? '20px' : '25px';
    avatarControls.start({
      borderRadius: '100%',
      width: avatarSize,
      height: avatarSize,
    });
  }, [scrollPosition, avatarControls, pathname]);

  return (
    <Button {...styles.$buttonStyles} onClick={() => navigate(`/u/${connectedUser?.wallet}`)}>
      <MotionAvatar src={connectedUser?.profile_picture} animate={avatarControls} />
    </Button>
  );
};
