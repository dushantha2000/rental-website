import React from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  // Sample notification data
  const notifications = [
    {
      message: "New user signed up for your rental service.",
      date: "2025-01-23",
    },
    {
      message: "House owner added a new property listing.",
      date: "2025-01-22",
    },
    {
      message: "A tenant made a booking for your property.",
      date: "2025-01-21",
    },
    {
      message: "System maintenance scheduled for this weekend.",
      date: "2025-01-20",
    },
    {
      message: "Reminder: Your property listing will expire soon.",
      date: "2025-01-19",
    },
    {
      message: "A new message from a potential tenant.",
      date: "2025-01-18",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
        <FaBell className="text-yellow-400 text-3xl" />
        <span>Recent Notifications</span>
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* If there are no notifications, show a message */}
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-4 px-4 text-center text-gray-500">
                  No new notifications.
                </td>
              </tr>
            ) : (
              notifications.map((notification, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-200"
                >
                  <td className="py-3 px-4 text-white">{notification.message}</td>
                  <td className="py-3 px-4 text-white">{notification.date}</td>
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
