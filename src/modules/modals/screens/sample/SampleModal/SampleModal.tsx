import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Dispatch, RootState } from '@/store';
import { selectCurrentTape, selectCurrentTapeId } from '@/pages/tapes/store/selectors';
import { SecondaryButton, PrimaryButton } from '@/common/buttons';
import { ModalContainer } from '@/modules/modals/components';
import { Disclaimer, TapeAndCurator } from '@/modules/modals/screens/sample/components';
import { DateTime } from 'luxon';

const SampleModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { isLoading, isChecked, sampleModalText } = useSelector((state: RootState) => state.sampleModel);
  const { end } = useSelector(selectCurrentTape).timeline.submit;
  const id = useSelector(selectCurrentTapeId);
  const now = DateTime.now().setZone(process.env.GLOBAL_TIMEZONE).toMillis();

  useEffect(() => {
    return () => {
      dispatch.sampleModel.setIsChecked(false);
      dispatch.sampleModel.setIsLoading(false);
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title className="h4 text-2xl mb-2 font-semibold">
          <i className={sampleModalText.icon} /> {sampleModalText.title}
        </Dialog.Title>
        <TapeAndCurator />
        <Disclaimer />
        <div className="flex gap-2">
          <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{sampleModalText.secondaryButtonText}</SecondaryButton>
          <PrimaryButton isLoading={isLoading} onClick={() => dispatch.sampleModel.getSampleDownload(id)} disabled={now > end ? false : !isChecked}>
            {sampleModalText.primaryButtonText}
          </PrimaryButton>
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SampleModal;
