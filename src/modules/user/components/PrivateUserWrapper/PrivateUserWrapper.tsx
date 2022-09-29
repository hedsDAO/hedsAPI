import { User } from '@/modules/user/models/common';

const PrivateUserWrapper = ({ userData, loading, children }: { userData: User; loading: boolean; children: React.ReactNode }) => {
  if (userData?.public && !loading) return <>{children}</>;
  else
    return (
      <div className="text-center text-gray-500 mt-[8rem]">
        <i className="fa-solid fa-lock text-lg"></i>
        <p className="mt-2 text-lg">This user&#39;s profile is private</p>
      </div>
    );
};

export default PrivateUserWrapper;
