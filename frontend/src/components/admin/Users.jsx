import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/users`);
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }
        const responseData = await response.json();
        if (!responseData.data || !Array.isArray(responseData.data)) {
          throw new Error("API response is missing 'data' property or it's not an array. Check your API.");
        }
        setUsers(responseData.data);
      } catch (err) {
        setError(err);
        toast.error(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen "> {/* Added bg-gray-800 */}
        <Loader className="w-12 h-12 text-purple-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800"> {/* Added bg-gray-800 */}
        <div className="p-6 text-xl font-semibold text-red-400 bg-gray-800 rounded-lg shadow-xl">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 mt-12 bg-gray-900"> {/* Added bg-gray-800 */}
      <div className="max-w-6xl mx-auto">
        

        <div className="overflow-hidden bg-gray-800 bg-opacity-50 shadow-2xl rounded-3xl backdrop-blur-lg"> {/* bg-gray-800 already present */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <tr>
                  <th className="px-8 py-6 font-semibold tracking-wider text-left text-white uppercase">
                    User
                  </th>
                  <th className="px-8 py-6 font-semibold tracking-wider text-left text-white uppercase">
                    Email
                  </th>
                  <th className="px-8 py-6 font-semibold tracking-wider text-left text-white uppercase">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-all duration-300 hover:bg-gray-700/30 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold rounded-full bg-gradient-to-r from-purple-400 to-blue-400">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-medium text-gray-100">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-300 transition-colors group-hover:text-white">
                      {user.email}
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-purple-300 rounded-full bg-purple-900/30">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="py-12 text-center bg-gray-800"> {/* Added bg-gray-800 */}
              <div className="text-lg text-gray-400">No users found</div>
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-center text-gray-400">
          Showing {users.length} of {users.length} results
        </div>
      </div>
    </div>
  );
}

export default Users;