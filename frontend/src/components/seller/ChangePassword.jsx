import React from 'react';



const ChangePassword = () => {
  return (
    <div className="p-6 rounded-lg ">
      <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 text-white bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 text-white bg-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
