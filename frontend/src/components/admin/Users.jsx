import React from 'react';

const Users = ({ users }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Users Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
              <tr key="" className="border-b border-gray-700">
                <td className="py-2">dushantha</td>
                <td className="py-2">abc@gmail.com</td>
                <td className="py-2">admin</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
