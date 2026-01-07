import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const AllUser = ({ token }) => {

  const [alluser, setallUser] = useState([]);
  const totalUsers = alluser.length;
  const adminCount = alluser.filter(user => user.isAdmin).length;
  const normalUserCount = totalUsers - adminCount;


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
      )

      if (response.data.success) {
        setallUser(response.data.users) 
        // console.log(response.data.users)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
          <div className="p-4 max-w-4xl">

            {/* TITLE */}
            <h2 className="text-2xl font-semibold mb-4">Users</h2>

            {/* STATS */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>

              <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-blue-600">{adminCount}</p>
              </div>

              <div className="flex-1 border rounded-lg p-4 bg-white shadow-sm">
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-2xl font-bold text-green-600">{normalUserCount}</p>
              </div>
            </div>

            {/* TABLE */}
            <div className="border rounded-lg overflow-hidden">

              {/* Table Header */}
              <div className="grid grid-cols-[2fr_3fr_1fr] bg-gray-100 p-3 text-sm font-semibold">
                <p>Name</p>
                <p>Email</p>
                <p className="text-center">Role</p>
              </div>

              {/* User Rows */}
              {alluser.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-[2fr_3fr_1fr] items-center border-t p-3 text-sm hover:bg-gray-50"
                >
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>

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
                </div>
              ))}
            </div>

          </div>
        );

}

export default AllUser
