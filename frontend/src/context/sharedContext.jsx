/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SharedContext = createContext();

export const SharedProvider = ({ children }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");

        const processed = res.data.map((user) => ({
          ...user,
          followers: user.followers || [],
          following: user.following || [],
        }));

        setUsers(processed);
        console.log("Fetched users:", processed);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
  
      // Update frontend context
      setUsers(prev =>
        prev
          .filter(user => user.id !== id)
          .map(user => ({
            ...user,
            followers: user.followers.filter(f => f !== id),
            following: user.following.filter(f => f !== id)
          }))
      );
    } catch (err) {
      console.error("Failed to delete user:", err.message);
    }
  };

  const createUser = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        avatar: formData.avatar,
        address: formData.address,
        following: formData.following || []
      };
      console.log("Creating user with payload:", payload);
      const res = await axios.post("http://localhost:5000/api/users", payload);
      const newUser = res.data;
      console.log("Created user:", newUser);
  
      setUsers(prev => [...prev, {
        ...newUser,
        followers: [],
        following: payload.following
      }]);
  
    } catch (err) {
      console.error("Error creating user:", err.message);
    }
  };


const updateUser = async (id, userData) => {
  try {
    const payload = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      date_of_birth: userData.dob, 
      avatar: userData.avatar,
      address: userData.address,
      following: userData.following || []
    };

    await axios.put(`http://localhost:5000/api/users/${id}`, payload);

    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...userData } : user
      )
    );
  } catch (err) {
    console.error("Failed to update user:", err.message);
  }
};


  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };

  const isFollowing = (followerId, followingId) => {
    const follower = users.find(user => user.id === followerId);
    return follower ? follower.following.includes(followingId) : false;
  };

  return (
    <SharedContext.Provider
      value={{ users, setUsers, updateUser, deleteUser, getUserById, isFollowing, createUser }}>
      {children}
    </SharedContext.Provider>
  );
};

