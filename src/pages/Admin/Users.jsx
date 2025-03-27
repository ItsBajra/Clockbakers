import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    email: '',
    role: ''
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const query = new URLSearchParams();
      if (filters.email) query.set('email', filters.email);
      if (filters.role) query.set('role', filters.role);

      const response = await fetch(`http://localhost:8080/v1/users?${query}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">User Management</h1>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-2 md:gap-4">
          <input
            type="text"
            name="email"
            placeholder="Filter by Email"
            className="w-full md:w-48 px-3 py-2 text-sm border rounded-lg"
            value={filters.email}
            onChange={handleFilterChange}
          />
          <select
            name="role"
            className="w-full md:w-32 px-3 py-2 text-sm border rounded-lg"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={fetchUsers}
            className="bg-blue-600 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">
          Error: {error}. Check console for details.
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Phone
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Address
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                    {user.email}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                    {user.phone || 'N/A'}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-normal max-w-[200px] truncate text-sm hidden sm:table-cell">
                    {user.address || 'Not provided'}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {formatDate(user.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing {users.length} {users.length === 1 ? 'result' : 'results'}
        </span>
      </div>
    </div>
  );
};

export default Users;