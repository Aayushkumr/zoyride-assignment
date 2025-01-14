import { assets } from '../assets/assets';
import Newsletter from '../components/Newsletter';

const Profile = () => {
  return (
    <div className='p-10 mt-20 border-t'>
      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md">
        <img
          src={assets.user1}
          alt="User1"
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <p className="text-gray-900 font-semibold">John Doe</p>
        <p className="text-gray-500 text-sm">admin@admin.com</p>
      </div>

      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-md">
        <img
          src={assets.user2}
          alt="User2"
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <p className="text-gray-900 font-semibold">Jane Smith</p>
        <p className="text-gray-500 text-sm">something@something.com</p>
      </div>
      <Newsletter />
    </div>
  );
};

export default Profile;
