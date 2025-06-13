import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Users },
    { path: '/create', label: 'Create User', icon: UserPlus },
    // { path: '/edit', label: 'Edit User', icon: Settings },
    { path: '/alluser', label: 'All Users', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-lg mx-auto px-4 py-3">
        <div className="flex justify-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className='hidden sm:block'>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;