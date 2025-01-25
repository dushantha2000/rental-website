import { FaUsers, FaHome, FaUserAlt, FaMoneyBillAlt, FaBell, FaComment, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
  const availableProperties = 23655; // Example count
  const rentedProperties = 11234; // Example count
  const activeTenants = 157; // Example count
  const usersCount = 1207; // Example count
  const houseOwnersCount = 350; // Example count
  const notificationsCount = 857; // Example count
  const chatMessagesCount = 344; // Example count

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Available Properties Card */}
        <div className="bg-blue-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaHome className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">Available Properties</h3>
              <p className="text-3xl text-white font-semibold">{availableProperties}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-blue-700 rounded-full">
            <div className="h-full bg-blue-500" style={{ width: `${(availableProperties / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Rented Properties Card */}
        <div className="bg-green-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-green-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaCheckCircle className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">Rented Properties</h3>
              <p className="text-3xl text-white font-semibold">{rentedProperties}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-green-700 rounded-full">
            <div className="h-full bg-green-500" style={{ width: `${(rentedProperties / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Active Tenants Card */}
        <div className="bg-purple-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-purple-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaUserAlt className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">Active Tenants</h3>
              <p className="text-3xl text-white font-semibold">{activeTenants}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-purple-700 rounded-full">
            <div className="h-full bg-purple-500" style={{ width: `${(activeTenants / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-teal-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-teal-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">Users</h3>
              <p className="text-3xl text-white font-semibold">{usersCount}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-teal-700 rounded-full">
            <div className="h-full bg-teal-500" style={{ width: `${(usersCount / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* House Owners Card */}
        <div className="bg-orange-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-orange-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaHome className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">House Owners</h3>
              <p className="text-3xl text-white font-semibold">{houseOwnersCount}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-orange-700 rounded-full">
            <div className="h-full bg-orange-500" style={{ width: `${(houseOwnersCount / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Chat Messages Card */}
        <div className="bg-indigo-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaComment className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">New Chat Messages</h3>
              <p className="text-3xl text-white font-semibold">{chatMessagesCount}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-indigo-700 rounded-full">
            <div className="h-full bg-indigo-500" style={{ width: `${(chatMessagesCount / 100) * 10}%` }}></div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl hover:shadow-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaBell className="text-white text-3xl" />
            <div>
              <h3 className="text-lg text-white">Notifications</h3>
              <p className="text-3xl text-white font-semibold">{notificationsCount}</p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-gray-700 rounded-full">
            <div className="h-full bg-gray-500" style={{ width: `${(notificationsCount / 10) * 0.3}%` }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
