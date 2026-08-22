import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const AllUser = ({ token }) => {

  const [alluser, setallUser] = useState([]);
  const [deletingUser, setDeletingUser] = useState(null);

  const totalUsers = alluser.length;
  const adminCount = alluser.filter(user => user.isAdmin).length;
  const normalUserCount = totalUsers - adminCount;

  // Fetch all users
  const fetchUser = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/alluser/userlist",
        {},
        {
          headers: {
            token: token
          }
        }
      );

      if (response.data.success) {
        setallUser(response.data.users);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      setDeletingUser(userId);

      const response = await axios.post(
        backendUrl + "/api/alluser/deleteuser",
        {
         id: userId 
        },
        {
          headers: {
            token: token
          }
        }
      );

      if (response.data.success) {

        toast.success("User deleted successfully");

        // Remove deleted user from UI
        setallUser((prevUsers) =>
          prevUsers.filter(user => user._id !== userId)
        );

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );

    } finally {
      setDeletingUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-4 max-w-5xl">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-4">
        Users
      </h2>

      {/* STATS */}
      <div className="flex gap-4 mb-6">

        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <p className="text-2xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">
            Admins
          </p>

          <p className="text-2xl font-bold text-blue-600">
            {adminCount}
          </p>
        </div>

        <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">
            Users
          </p>

          <p className="text-2xl font-bold text-green-600">
            {normalUserCount}
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden bg-white">

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_3fr_1fr_1fr] bg-gray-100 p-3 text-sm font-semibold">

          <p>Name</p>

          <p>Email</p>

          <p className="text-center">
            Role
          </p>

          <p className="text-center">
            Action
          </p>

        </div>

        {/* User Rows */}
        {alluser.map((user) => (

          <div
            key={user._id}
            className="grid grid-cols-[2fr_3fr_1fr_1fr] items-center border-t p-3 text-sm hover:bg-gray-50"
          >

            {/* NAME */}
            <p className="font-medium">
              {user.name}
            </p>

            {/* EMAIL */}
            <p className="text-gray-600">
              {user.email}
            </p>

            {/* ROLE */}
            <p className="text-center">

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  user.isAdmin
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.isAdmin ? "Admin" : "User"}
              </span>

            </p>

            {/* DELETE */}
            <div className="text-center">

              <button
                onClick={() => deleteUser(user._id)}
                disabled={deletingUser === user._id}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition
                ${
                  deletingUser === user._id
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                }`}
              >
                {deletingUser === user._id
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AllUser;