/* eslint-disable no-unused-vars */
import React from 'react'

const CategoryBlock = ({ title, users }) => {

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };


    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border w-[80%] max-sm:w-full">
            <h3 className="text-lg text-center font-semibold text-gray-700 mb-4">{title}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 p-4 rounded-xl shadow-sm border flex flex-col justify-between h-full">
                        {/* Top Section */}
                        <div className="flex items-center space-x-4 mb-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover border"
                            />
                            <div>
                                <h3 className="text-md font-semibold text-gray-800">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400">Age: {calculateAge(user.date_of_birth)}</p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="border-t pt-3 flex justify-between text-xs text-gray-500">
                            <span>{user.followers.length} followers</span>
                            <span>{user.following.length} following</span>
                            <span>Joined: {formatDate(user.join_date)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CategoryBlock