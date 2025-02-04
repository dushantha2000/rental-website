import React from 'react';
import { LayoutDashboard, Layers, Users, Bell, Key, LogOut } from 'lucide-react';

const Slider = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { id: 'edit', icon: <Layers />, label: 'Edit' },
    { id: 'property', icon: <Users />, label: 'Property' },
    { id: 'notifications', icon: <Bell />, label: 'Notifications' },
    { id: 'password', icon: <Key />, label: 'Change Password' },
  ];

  return (
    <div className="p-8">
       <h2 className="mb-4 text-xl font-semibold">Dashboard</h2>
    <div className="p-12 space-y-4 bg-gray-800 rounded-lg ">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`w-full text-left py-2 px-3 ${
            activeSection === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
          } rounded flex items-center`}
        >
          {item.icon}
          <span className="ml-2">{item.label}</span>
        </button>
      ))}
      <button className="flex items-center w-full px-3 py-2 text-left rounded hover:bg-gray-700">
        <LogOut className="mr-2"   /> Logout
      </button>
    </div>
    </div>
  );
};

export default Slider;
