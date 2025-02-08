import React, { useState, useEffect } from "react";
import { FaBell, FaFilter, FaTimes } from "react-icons/fa";
import { apiUrl } from "../common/Http";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const countToken = () => {
          const data = JSON.parse(localStorage.getItem("adminInfo"));
          return data.id;
        };
        const userId = countToken();

        const response = await fetch(`${apiUrl}/notifications/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data);
        setFilteredNotifications(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    let filtered = notifications;

    if (filter === "read") {
      filtered = notifications.filter((notification) => notification.read);
    } else if (filter === "unread") {
      filtered = notifications.filter((notification) => !notification.read);
    }

    if (searchQuery) {
      filtered = filtered.filter((notification) =>
        notification.property_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [filter, searchQuery, notifications]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading notifications...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FaBell className="mr-2" /> Notifications
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => handleFilterChange(filter === "all" ? "unread" : filter === "unread" ? "read" : "all")}
            >
              <FaFilter className="mr-2" /> {filter === "all" ? "All" : filter === "read" ? "Read" : "Unread"}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <tbody>
            {filteredNotifications.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No notifications found.
                </td>
              </tr>
            ) : (
              filteredNotifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`transition-all duration-200 border-b border-gray-700 hover:bg-gray-700 ${
                    notification.read ? "bg-gray-700" : "bg-gray-800"
                  }`}
                >
                  <td className="px-4 py-3 text-white">
                    {notification.property_name}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {notification.name}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {notification.email}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {notification.phone}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {notification.date}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {notification.time}
                  </td>
                  <td className="px-4 py-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
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