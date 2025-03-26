import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiLock, FiLogOut, FiUser, FiShoppingBag, FiClock, FiMapPin, FiEdit, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Header from '../pages/Home/Header';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('src/tryjson/userProfile.json');
                const data = await response.json();
                setUser(data);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    password: '********'
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchCurrentOrders = async () => {
            try {
                const response = await fetch('src/tryjson/currentOrders.json');
                const data = await response.json();
                setCurrentOrders(data);
            } catch (error) {
                console.error('Error fetching current orders:', error);
            }
        };

        const fetchOrderHistory = async () => {
            try {
                const response = await fetch('src/tryjson/orderHistory.json');
                const data = await response.json();
                setOrderHistory(data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        if (activeTab === 'orders') {
            fetchCurrentOrders();
        } else if (activeTab === 'history') {
            fetchOrderHistory();
        }
    }, [activeTab]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
        setIsEditing(false);
    };

    const handleNavigation = (tab) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const ProfileTab = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <FiEdit className="mr-2" /> Edit Profile
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        Cancel
                    </button>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">First Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            ) : (
                                <div className="text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                                    {user.firstName}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Last Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            ) : (
                                <div className="text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                                    {user.lastName}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                        <div className="flex items-center text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                            <FiMail className="text-gray-400 mr-3" />
                            {user.email}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
                        {isEditing ? (
                            <div className="flex items-center">
                                <FiPhone className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                                <FiPhone className="text-gray-400 mr-3" />
                                {user.phone}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                        {isEditing ? (
                            <div className="flex items-start">
                                <FiMapPin className="text-gray-400 mr-3 mt-2" />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        ) : (
                            <div className="flex items-start text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                                <FiMapPin className="text-gray-400 mr-3 mt-1" />
                                {user.address}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Password</label>
                        <div className="flex items-center text-base font-medium text-gray-800 px-4 py-2 bg-gray-50 rounded-lg">
                            <FiLock className="text-gray-400 mr-3" />
                            ••••••••••
                        </div>
                    </div>

                    {isEditing && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );

    const OrdersTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Orders</h2>
            {currentOrders.length === 0 ? (
                <p className="text-gray-600">No current orders.</p>
            ) : (
                currentOrders.map(order => (
                    <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-medium text-gray-800">Order # {order.id}</h3>
                                <p className="text-sm text-gray-500">Order Date: {order.orderDate}</p>
                            </div>
                            <span className={`px-2 py-1 text-sm rounded-full ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="border-t border-gray-100 pt-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm font-medium text-gray-800">Total: ${order.totalAmount.toFixed(2)}</p>
                            {order.estimatedDelivery && (
                                <p className="text-sm text-gray-500">Estimated Delivery: {order.estimatedDelivery}</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const HistoryTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
            {orderHistory.length === 0 ? (
                <p className="text-gray-600">No order history available.</p>
            ) : (
                orderHistory.map(order => (
                    <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-medium text-gray-800">Order # {order.id}</h3>
                                <p className="text-sm text-gray-500">Order Date: {order.orderDate}</p>
                            </div>
                            <span className={`px-2 py-1 text-sm rounded-full ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="border-t border-gray-100 pt-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm font-medium text-gray-800">Total: ${order.totalAmount.toFixed(2)}</p>
                            {order.deliveryDate && (
                                <p className="text-sm text-gray-500">Delivered on: {order.deliveryDate}</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const AddressTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Book</h2>
            <div className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-800">Primary Address</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        <FiEdit className="inline mr-1" /> Edit
                    </button>
                </div>
                <div className="text-gray-600">
                    <p>{user.address}</p>
                    <p className="mt-2">Phone: {user.phone}</p>
                </div>
                <button className="mt-6 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    + Add New Address
                </button>
            </div>
        </div>
    );

    const PasswordTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <div className="bg-white shadow rounded-lg p-6 max-w-md">
                <form>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'orders':
                return <OrdersTab />;
            case 'history':
                return <HistoryTab />;
            case 'address':
                return <AddressTab />;
            case 'password':
                return <PasswordTab />;
            default: // profile
                return <ProfileTab />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50"
        style={{backgroundImage: "url('src/assets/Bgpattern.png')"}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
                <div className="md:hidden flex justify-between items-center bg-white shadow rounded-lg p-4 mb-4 sticky top-16 z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                            {user.profileImage ? (
                                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <FiUser className="text-xl text-blue-500" />
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-sm">{user.firstName} {user.lastName}</h2>
                            <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg rounded-b-lg mb-6 animate-slideDown">
                        <nav className="space-y-1 p-2">
                            <button
                                onClick={() => handleNavigation('profile')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <FiUser className="mr-3" /> My Profile
                            </button>
                            <button
                                onClick={() => handleNavigation('orders')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <FiShoppingBag className="mr-3" /> My Orders
                            </button>
                            <button
                                onClick={() => handleNavigation('history')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <FiClock className="mr-3" /> Order History
                            </button>
                            <button
                                onClick={() => handleNavigation('address')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'address' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <FiMapPin className="mr-3" /> Address
                            </button>
                            <button
                                onClick={() => handleNavigation('password')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'password' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <FiLock className="mr-3" /> Change Password
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-500 hover:bg-red-50 transition-colors">
                                <FiLogOut className="mr-3" /> LogOut
                            </button>
                        </nav>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="hidden md:block md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                        <div className="p-5 bg-gradient-to-r from-blue-50 to-gray-300">
    {/* Larger Back Button */}
    <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-800 hover:text-white transition-colors text-lg rounded-lg"
    >
        <FiArrowLeft className="text-2xl" /> 
    </button>

    <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center mb-4 overflow-hidden">
            {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <FiUser className="text-3xl text-blue-500" />
            )}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
    </div>
</div>

                            <nav className="p-4">
                                <button
                                    onClick={() => handleNavigation('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <FiUser className="mr-3" /> My Profile
                                </button>
                                <button
                                    onClick={() => handleNavigation('orders')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <FiShoppingBag className="mr-3" /> My Orders
                                </button>
                                <button
                                    onClick={() => handleNavigation('history')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <FiClock className="mr-3" /> Order History
                                </button>
                                <button
                                    onClick={() => handleNavigation('address')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'address' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <FiMapPin className="mr-3" /> Address
                                </button>
                                <button
                                    onClick={() => handleNavigation('password')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'password' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <FiLock className="mr-3" /> Change Password
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-500 hover:bg-red-50 transition-colors">
                                    <FiLogOut className="mr-3" /> LogOut
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
