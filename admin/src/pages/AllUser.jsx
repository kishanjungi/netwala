import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const AllUser = ({ token }) => {

  const [alluser, setallUser] = useState([])

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
    <>
      <p className="mb-3 text-lg font-semibold">All Users</p>

      <div className="flex flex-col gap-2">

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_3fr_1fr] bg-gray-100 p-2 text-sm font-semibold">
          <p>Name</p>
          <p>Email</p>
          <p className="text-center">Role</p>
        </div>

        {/* User List */}
        {
          alluser.map((user, index) => (
            <div
              key={user._id}
              className="grid grid-cols-[2fr_3fr_1fr] items-center border p-2 text-sm"
            >
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p className="text-center">
                {user.isAdmin ? "Admin" : "User"}
              </p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default AllUser
