import React from 'react';



const ChangePassword = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            className="w-full bg-gray-700 text-white rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            className="w-full bg-gray-700 text-white rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Confirm New Password</label>
          <input
            type="password"
            className="w-full bg-gray-700 text-white rounded py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
