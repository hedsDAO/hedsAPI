import { User } from '@/models/common';
import { selectUserPublicStatus } from '@/pages/user/store/selectors';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const PrivateUserWrapper = ({ children }: { children: React.ReactNode }) => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const isPublic = useSelector(selectUserPublicStatus);

  if (isPublic && !loading) return <>{children}</>;
  else
    return (
      <div className="text-center text-gray-500 mt-[8rem]">
        <i className="fa-solid fa-lock text-lg"></i>
        <p className="mt-2 text-lg">This user&#39;s profile is private</p>
      </div>
    );
};

export default PrivateUserWrapper;
