import React from 'react';
import iconImage from '../assets/icon.jpg'

const Header = ({ fullName, handleLogout }) => {
  return (
    <div className="flex items-center justify-between py-4">
    <img src={iconImage} alt="Icon" className="w-16 h-auto rounded-lg" />
      <h3 className="text-4xl font-light">{fullName}</h3>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
