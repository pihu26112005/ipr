/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Mail, Phone, MapPin, Calendar, Trash2, UserPlus, UserMinus, Users, Heart, MailIcon } from 'lucide-react';
import { useSharedContext } from '../context/hook';


const UserCard = ({ user }) => {
    const { deleteUser, followUser, unfollowUser, isFollowing } = useSharedContext();

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id);
        }
    };

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
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <div className='max-sm:max-w-[100px]'>
                        <h3 className="text-lg max-sm:text-[15px] font-semibold text-gray-900 ">{user.name}</h3>
                        <p className="text-xs text-gray-400">Age: {calculateAge(user.date_of_birth)}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 max-sm:space-x-1 ">
                    <Link to={`/edit/${user.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md" >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                    <MailIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{user.phone}</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Born: {formatDate(user.date_of_birth)}</span>
                </div>
                {user.address && (
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{user.address}</span>
                    </div>
                )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{user.followers.length} <span className='max-sm:hidden'>followers</span></span>
                </div>
                <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>{user.following.length} <span className='max-sm:hidden'>following</span></span>
                </div>
                <span className="text-xs text-gray-400">Joined: {formatDate(user.join_date)}</span>
            </div>
        </div>

    );
};

export default UserCard;