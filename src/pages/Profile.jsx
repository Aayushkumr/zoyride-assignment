import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Newsletter from '../components/Newsletter';
import { assets } from '../assets/assets';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (

    <div className='p-10 mt-20 border-t'>
      <div className="flex flex-col items-center bg-gray-100 p-8 mb-40 rounded-md">
        <img
          src={user.avatar || assets.user_avatar} 
          alt={`${user.address.firstName} ${user.address.lastName}`} 
          className="w-24 h-24 rounded-full mb-2 object-cover"
        />
        <p className="text-gray-900 font-semibold">{`${user.address.firstName} ${user.address.lastName}`}</p>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <button
          onClick={logout}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <Newsletter />
    </div>
    
  );
};

export default Profile;