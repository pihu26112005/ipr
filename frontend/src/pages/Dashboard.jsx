/* eslint-disable no-unused-vars */

import React from 'react'
import { useContext } from 'react';
import { useSharedContext } from '../context/hook';
import { Heart, UserPlus, UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBlock from "../components/CategoryBlock"

const Dashboard = () => {
  const { users } = useSharedContext();

  const topFollowedUsers = [...users]
    .sort((a, b) => (b.followers?.length || 0) - (a.followers?.length || 0))
    .slice(0, 3);

  const topOldestJoinUsers = [...users]
    .sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate))
    .slice(0, 3);

  const topFollowingUsers = [...users]
    .sort((a, b) => (b.following?.length || 0) - (a.following?.length || 0))
    .slice(0, 3);

  const topOldestUsers = [...users]
    .sort((a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth)) // older DOB = older age
    .slice(0, 3);

  const topYoungestUsers = [...users]
    .sort((a, b) => new Date(b.date_of_birth) - new Date(a.date_of_birth)) // newer DOB = younger
    .slice(0, 3);


  const totalFollowers = users.reduce((sum, user) => sum + user.followers.length, 0);
  const totalFollowing = users.reduce((sum, user) => sum + user.following.length, 0);
  const averageAge = users.reduce((sum, user) => {
    const today = new Date();
    const birthDate = new Date(user.date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return sum + age;
  }, 0) / users.length;

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className="mb-8 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900">Users Dashboard</h1>
        <p className="text-gray-600 mt-2 text-base">
          Manage and overview all users in your social network
        </p>
      </div>

      <div className='lg:max-w-1/2 mx-auto max-lg:w-full'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4">
          <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">{users.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Connections</p>
              <p className="text-2xl font-semibold text-purple-700">{totalFollowing}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Age</p>
              <p className="text-2xl font-semibold text-amber-700">{Math.round(averageAge)}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-lg mx-auto px-4 mb-8">
        <div className="bg-gray-100 rounded-xl p-6 text-center shadow-sm border">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
            Want to view, search, or edit users?
          </h2>
          <p className="text-gray-600 mb-4">
            Click below to explore the full user list with filters and editing options.
          </p>
          <Link
            to="/alluser"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            Go to All Users
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 space-y-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Top Users</h2>
        <div className="flex justify-center items-center flex-col gap-8">
          <CategoryBlock title="Most Followed Users" users={topFollowedUsers} />
          <CategoryBlock title="Oldest Joiners" users={topOldestJoinUsers} />
          <CategoryBlock title="Most Following" users={topFollowingUsers} />
          <CategoryBlock title="Oldest by Age" users={topOldestUsers} />
          <CategoryBlock title="Youngest Users" users={topYoungestUsers} />
        </div>
      </div>


    </div>

  )
}

export default Dashboard