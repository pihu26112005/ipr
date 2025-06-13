/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSharedContext } from '../context/hook';
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../uploadImage";
import {
  User, Mail, Phone, Calendar, MapPin, ImagePlus
} from 'lucide-react'

const CreateUser = () => {

  const { users, setUsers, createUser } = useSharedContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    following: [],
    avatarFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFollow = (id) => {
    setFormData((prev) => ({
      ...prev,
      following: prev.following.includes(id)
        ? prev.following.filter((uid) => uid !== id)
        : [...prev.following, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let avatarUrl = "";

    if (formData.avatarFile) {
      avatarUrl = await uploadImage(formData.avatarFile);
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dob,
      address: formData.address,
      avatar: avatarUrl,
      following: formData.following || [],
    };

    console.log("Creating user with payload:", payload);

    createUser(payload);
    navigate("/");
  };

  return (
    <div className="max-w-2xl my-auto  mt-10 mx-auto p-6 bg-white rounded-xl shadow-md border space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: "name", icon: <User className="w-4 h-4 text-gray-400" /> },
          { name: "email", icon: <Mail className="w-4 h-4 text-gray-400" /> },
          { name: "phone", icon: <Phone className="w-4 h-4 text-gray-400" /> },
          { name: "dob", icon: <Calendar className="w-4 h-4 text-gray-400" />, type: "date" },
          { name: "address", icon: <MapPin className="w-4 h-4 text-gray-400" /> }
        ].map(({ name, icon, type = "text" }) => (
          <div key={name} className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
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

        <div className="relative flex items-center border border-dashed border-gray-300 rounded-md px-4 py-3">
          <ImagePlus className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) =>
              setFormData({ ...formData, avatarFile: e.target.files[0] })
            }
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Select users to follow</p>
          <div className="border rounded-md max-h-40 overflow-y-auto p-3 space-y-2">
            {users.map((u) => (
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-all"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
