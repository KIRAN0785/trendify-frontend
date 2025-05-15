import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const MyProfile = ({label, fieldKey, value, onChange}) => {
  const { token, backendUrl } = useContext(ShopContext);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, newPass: false });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          setUserData({ name: res.data.user.name, email: res.data.user.email });
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.put(`${backendUrl}/api/user/change-password`, passwords, {
        headers: { token },
      });
  
      if (res.data.success) {
        toast.success(res.data.message);
        setPasswords({ current: '', newPass: '' });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to change password");
    }
  };
  

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

    
  

  return (
    <div className='w-[90%] max-w-lg mx-auto mt-10'>
      <div className='border p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-6'>My Profile & Password</h2>
        <form onSubmit={handlePasswordChange} className='flex flex-col gap-6'>

          {/* Profile Fields */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-medium'>Profile Information</h3>
            <input
              type='text'
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              placeholder='Name'
              className='border px-4 py-2 rounded'
            />
            <input
              type='email'
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder='Email'
              className='border px-4 py-2 rounded'
            />
          </div>

          {/* Password Fields */}
          <div className='relative '>
          <h3 className='text-lg font-medium   '>Change Password</h3>
          <input
    type={showPasswords.current ? 'text' : 'password'}
    value={passwords.current}
    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
    placeholder='Current Password'
    className='border px-4 py-2 rounded w-full pr-10'
  />
  <span
    className='absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600'
    onClick={() => togglePasswordVisibility('current')}
  >
    {showPasswords.current ? <FiEyeOff /> : <FiEye />}
  </span>
    </div>
    <div className='relative'>
    <input
    type={showPasswords.newPass ? 'text' : 'password'}
    value={passwords.newPass}
    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
    placeholder='New Password'
    className='border px-4 py-2 rounded w-full pr-10'
  />
  <span
    className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
    onClick={() => togglePasswordVisibility('newPass')}
  >
    {showPasswords.newPass ? <FiEyeOff /> : <FiEye />}
  </span>
    </div>
          <button type='submit' className='bg-black text-white px-6 py-2 rounded mt-4'>
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default MyProfile;
