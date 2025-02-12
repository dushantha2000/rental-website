import { FaUsers, FaHome, FaUserAlt, FaMoneyBillAlt, FaBell, FaComment, FaCheckCircle } from 'react-icons/fa';

const CustomDashboard = () => {
  const availableProperties = 23655; 
  const rentedProperties = 11234; 
  const activeTenants = 157; 
  const usersCount = 1207; 
  const houseOwnersCount = 350; 
  const notificationsCount = 857; 
  const chatMessagesCount = 344; 

  return (
    <div className="p-6 mt-12 rounded-lg">
      <h2 className="mb-6 text-2xl font-bold text-white ">Dashboard Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Available Properties Card */}
        <div className="p-6 transition-all duration-300 transform bg-blue-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-blue-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaHome className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">Available Properties</h3>
              <p className="text-3xl font-semibold text-white">{availableProperties}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-blue-700 rounded-full">
            <div className="h-full bg-blue-500" style={{ width: `${(availableProperties / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Rented Properties Card */}
        <div className="p-6 transition-all duration-300 transform bg-green-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-green-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaCheckCircle className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">Rented Properties</h3>
              <p className="text-3xl font-semibold text-white">{rentedProperties}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-green-700 rounded-full">
            <div className="h-full bg-green-500" style={{ width: `${(rentedProperties / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Active Tenants Card */}
        <div className="p-6 transition-all duration-300 transform bg-purple-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-purple-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaUserAlt className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">Active Tenants</h3>
              <p className="text-3xl font-semibold text-white">{activeTenants}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-purple-700 rounded-full">
            <div className="h-full bg-purple-500" style={{ width: `${(activeTenants / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Users Card */}
        <div className="p-6 transition-all duration-300 transform bg-teal-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-teal-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">Users</h3>
              <p className="text-3xl font-semibold text-white">{usersCount}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-teal-700 rounded-full">
            <div className="h-full bg-teal-500" style={{ width: `${(usersCount / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* House Owners Card */}
        <div className="p-6 transition-all duration-300 transform bg-orange-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-orange-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaHome className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">House Owners</h3>
              <p className="text-3xl font-semibold text-white">{houseOwnersCount}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-orange-700 rounded-full">
            <div className="h-full bg-orange-500" style={{ width: `${(houseOwnersCount / 100) * 0.1}%` }}></div>
          </div>
        </div>

        {/* Chat Messages Card */}
        <div className="p-6 transition-all duration-300 transform bg-indigo-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-indigo-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaComment className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">New Chat Messages</h3>
              <p className="text-3xl font-semibold text-white">{chatMessagesCount}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-indigo-700 rounded-full">
            <div className="h-full bg-indigo-500" style={{ width: `${(chatMessagesCount / 100) * 10}%` }}></div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="p-6 transition-all duration-300 transform bg-gray-900 rounded-lg shadow-2xl hover:shadow-xl hover:bg-gray-800 hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaBell className="text-3xl text-white" />
            <div>
              <h3 className="text-lg text-white">Notifications</h3>
              <p className="text-3xl font-semibold text-white">{notificationsCount}</p>
            </div>
          </div>
          <div className="h-1 mt-4 bg-gray-700 rounded-full">
            <div className="h-full bg-gray-500" style={{ width: `${(notificationsCount / 10) * 0.3}%` }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomDashboard;
