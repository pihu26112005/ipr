/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSharedContext } from '../context/hook';
import { uploadImage } from "../uploadImage";
import {
  User, Mail, Phone, Calendar, MapPin, ImagePlus
} from 'lucide-react'


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser, getUserById, setUsers } = useSharedContext();

  const user = getUserById(id);

  const formatDateForInput = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    following: [],
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: formatDateForInput(user.date_of_birth),
        address: user.address,
        following: user.following || [],
        avatar: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFollow = (followId) => {
    setFormData((prev) => ({
      ...prev,
      following: prev.following.includes(followId)
        ? prev.following.filter((id) => id !== followId)
        : [...prev.following, followId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let avatarUrl = user.avatar;

    if (formData.avatar) {
      avatarUrl = await uploadImage(formData.avatar);
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      avatar: avatarUrl,
      address: formData.address,
      following: formData.following,
    };
    await updateUser(user.id, updatedUser);
    navigate("/");
  };

  if (!user) {
    return <div className="p-6 text-center text-red-500">User not found</div>;
  }

  return (
    <div className="max-w-2xl mt-10 mx-auto p-6 bg-white rounded-xl shadow-md border space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: "name", icon: <User className="w-4 h-4 text-gray-400" /> },
          { name: "email", icon: <Mail className="w-4 h-4 text-gray-400" /> },
          { name: "phone", icon: <Phone className="w-4 h-4 text-gray-400" /> },
          { name: "dob", icon: <Calendar className="w-4 h-4 text-gray-400" />, type: "date" },
          { name: "address", icon: <MapPin className="w-4 h-4 text-gray-400" /> }
        ].map(({ name, icon, type = "text" }) => (
          <div key={name} className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="text-sm font-medium text-gray-700">Current Avatar</label>
          <div className="flex items-center space-x-4 mt-2">
            <img
              src={user.avatar}
              alt="Current Avatar"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">Change avatar?</label>
              <div className="flex items-center border border-dashed border-gray-300 rounded-md px-3 py-2">
                <ImagePlus className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                  className="text-sm text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Update Following</p>
          <div className="border rounded-md max-h-40 overflow-y-auto p-3 space-y-2">
            {users
              .filter((u) => u.id !== id)
              .map((u) => (
                <label key={u.id} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.following.includes(u.id)}
                    onChange={() => handleToggleFollow(u.id)}
                    className="accent-blue-600"
                  />
                  <span>{u.name}</span>
                </label>
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;
