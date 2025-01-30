import React from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  // Sample notification data
  const notifications = [
    {
      message: " booked a visit to the Ocean View Apartment. - Perera  0788824998",
      date: "2025-03-03",
    },
   
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="flex items-center mb-6 space-x-3 text-2xl font-bold text-white">
        <FaBell className="text-3xl text-yellow-400" />
        <span>Recent Notifications</span>
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-300 bg-gray-700">
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* If there are no notifications, show a message */}
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                  No new notifications.
                </td>
              </tr>
            ) : (
              notifications.map((notification, index) => (
                <tr
                  key={index}
                  className="transition-all duration-200 border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-white">{notification.message}</td>
                  <td className="px-4 py-3 text-white">{notification.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
