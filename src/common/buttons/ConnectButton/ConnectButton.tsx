import { Modals } from '@/modules/modals/store/modalModel';
import { Dispatch, store } from '@/store';
import { isEmpty } from '@/utils';
import { Avatar, AvatarBadge, Badge, Flex, IconButton } from '@chakra-ui/react';
import { Switch } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ConnectButton = ({ nextModal }: { nextModal?: Modals }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { isConnected, address } = useAccount();
  const profilePicture = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  const activeTrack = useSelector(store.select.audioModel.selectActiveTrack);
  return (
    <Flex gap={2}>
      {isConnected && profilePicture ? (
        <Flex gap={6} alignItems={'center'}>
          {activeTrack?.audio?.length && (
            <Switch
              checked={isShowingPlayer}
              onChange={() => dispatch.audioModel.setIsShowingPlayer(!isShowingPlayer)}
              className={`${isShowingPlayer && !isEmpty(activeTrack) ? 'bg-blue-300' : 'bg-neutral-200'} relative inline-flex h-7 w-12 items-center rounded-sm`}
            >
              <span
                className={`${
                  isShowingPlayer && !isEmpty(activeTrack) ? 'translate-x-6 bg-blue-100' : 'translate-x-1 bg-neutral-50'
                } flex items-center text-center justify-center h-5 w-5 transform rounded-sm transition`}
              >
                <i className="fa-solid fa-waveform text-xs my-auto" />
              </span>
            </Switch>
          )}
          <Flex>
            <Avatar className="hover:scale-105 ease-in-out transition-all cursor-pointer" onClick={() => navigate(`/u/${address}`)} size={'md'} src={profilePicture}></Avatar>
            <Badge
              onClick={() => {
                dispatch.modalModel.setModal(Modals.USER_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              border="2px"
              borderColor="white"
              minW="fit-content"
              borderRadius="full"
              boxSize="2.25em"
              alignSelf={'end'}
              className='-ml-[20%] aspect-square'
              as={IconButton}
              icon={<EllipsisHorizontalIcon className="text-neutral-700 " height="15" width="15" />}
            />
          </Flex>
        </Flex>
      ) : (
        <button
          onClick={() => {
            if (isConnected) navigate(`/u/${address}`);
            else {
              if (nextModal) dispatch.modalModel.setNextModal(nextModal);
              dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }
          }}
          className={`px-6 text-white inline-flex items-center rounded-full tracking-widest text-sm py-1 ${
            isConnected ? 'bg-black' : 'gradient'
          } hover:bg-neutral-900 ease-linear`}
        >
          {'connect'}
        </button>
      )}
    </Flex>
  );
};

export default ConnectButton;
