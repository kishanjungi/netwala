import React from "react";

const Profilecard = ({ user }) => {
  return (
    <div className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl p-4 z-50">
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-sm">
        <button className="text-left hover:text-blue-600">
          Edit Profile
        </button>
        <button className="text-left hover:text-blue-600">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profilecard;
