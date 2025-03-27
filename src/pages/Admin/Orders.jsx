import { useEffect, useState } from 'react';

const sampleOrders = [
  {
    id: "1",
    user_id: "user123",
    items: [
      { product_name: "Book 1", quantity: 2, price: 10 },
      { product_name: "Book 2", quantity: 1, price: 15 }
    ],
    total_amount: 35,
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "user456",
    items: [
      { product_name: "Book 3", quantity: 1, price: 12 },
      { product_name: "Book 4", quantity: 3, price: 8 }
    ],
    total_amount: 36,
    status: "shipped",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "user789",
    items: [
      { product_name: "Book 5", quantity: 4, price: 5 }
    ],
    total_amount: 20,
    status: "delivered",
    created_at: new Date().toISOString(),
  }
];

const Orders = () => {
  const [allOrders, setAllOrders] = useState(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    uid: '',
    status: ''
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { uid, status } = filters;
      const filteredData = allOrders.filter(order => {
        const matchesUid = uid ? order.user_id.includes(uid) : true;
        const matchesStatus = status ? order.status === status : true;
        return matchesUid && matchesStatus;
      });

      setFilteredOrders(filteredData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Update all orders
      const updatedAllOrders = allOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setAllOrders(updatedAllOrders);

      // Update filtered orders to reflect changes immediately
      setFilteredOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-4">
          <input
            type="text"
            name="uid"
            placeholder="Filter by User ID"
            className="px-4 py-2 border rounded-lg"
            value={filters.uid}
            onChange={handleFilterChange}
          />
          <select
            name="status"
            className="px-4 py-2 border rounded-lg"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={fetchOrders}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.user_id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {item.quantity}x {item.product_name} (${item.price.toFixed(2)})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-sm ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing {filteredOrders.length} results
        </span>
      </div>
    </div>
  );
};

export default Orders;