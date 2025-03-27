import React, { useState, useEffect } from "react";
import { FiUser, FiShoppingBag, FiLock, FiLogOut, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import Navbar from "../components/navbar";
import Header from "./Home/Header";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("profile");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user ID from token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("auth_token");
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64.replace(/=/g, ''))); // <--- added this
            return payload.jti || null; // <--- changed userId to id
        } catch (e) {
            console.error("Error decoding token:", e);
            return null;
        }
    };

    const userId = getUserIdFromToken();

    // Configure axios to include auth token
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Fetch user data from the API
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setError("Please login to view profile");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8080/v1/user?uid=${userId}`);
                setUser(response.data);
                setProfileData(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load user data");
                if (error.response?.status === 401) {
                    localStorage.removeItem("auth_token");
                    window.location.href = "/login";
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // Fetch orders from the API
    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;

            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:8080/v1/orders?uid=${userId}`);
                setOrders(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                setError(null);
            } catch (error) {
                console.error("Error fetching orders:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("auth_token");
                    window.location.href = "/login";
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [userId, activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleEditProfile = () => {
        setEditProfileOpen(true);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSaveProfile = async () => {
        try {
            setIsLoading(true);
            await axios.put(`http://localhost:8080/v1/user?uid=${userId}`, {
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                email: profileData.email,
                phone_no: profileData.phone_no,
                address: profileData.address
            });
            setUser(profileData);
            setEditProfileOpen(false);
        } catch (error) {
            console.error("Error saving profile data:", error);
            setError("Failed to save profile changes");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
    };

    const renderOrders = () => {
        return orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                        <p className="text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()} •
                            ${order.total_price.toFixed(2)}
                        </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                        {order.status}
                    </span>
                </div>

                <div className="mt-3 border-t pt-3">
                    <p className="font-medium">Delivery Address:</p>
                    <p className="text-gray-600">{order.delivery_address}</p>
                </div>

                <div className="mt-3">
                    <h4 className="font-medium mb-2">Items ({order.items.length}):</h4>
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
                            <div>
                                <p>Product #{item.pid.slice(0, 8)}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p>${item.price_at_purchase.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className="md:hidden flex justify-between items-center bg-white shadow rounded-lg p-4 mb-4 sticky top-16 z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                            {user?.image_url ? (
                                <img src={user.image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <FiUser className="text-xl text-blue-500" />
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-sm">
                                {isLoading ? "Loading..." : user ? `${user.first_name} ${user.last_name}` : "Guest"}
                            </h2>
                            <p className="text-gray-500 text-xs">{user?.email || ""}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiArrowLeft className={`h-5 w-5 transition-transform ${mobileMenuOpen ? "rotate-90" : "-rotate-90"}`} />
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg rounded-lg mb-6 animate-slideDown">
                        <nav className="space-y-1 p-2">
                            <button
                                onClick={() => handleTabChange('profile')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <FiUser className="mr-3" /> My Profile
                            </button>
                            <button
                                onClick={() => handleTabChange('orders')}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <FiShoppingBag className="mr-3" /> My Orders
                            </button>
                            <button
                                className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-500 hover:bg-red-50"
                                onClick={handleLogout}
                            >
                                <FiLogOut className="mr-3" /> Logout
                            </button>
                        </nav>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:block md:w-1/3 lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-200">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center mb-4 overflow-hidden">
                                        {user?.image_url ? (
                                            <img src={user.image_url} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <FiUser className="text-3xl text-blue-500" />
                                        )}
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {isLoading ? "Loading..." : user ? `${user.first_name} ${user.last_name}` : "Guest"}
                                    </h2>
                                    <p className="text-gray-500 text-sm">{user?.email || ""}</p>
                                    <button
                                        onClick={handleEditProfile}
                                        className="mt-4 text-blue-500 hover:text-blue-700 text-sm"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            <nav className="p-4">
                                <button
                                    onClick={() => handleTabChange('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <FiUser className="mr-3" /> My Profile
                                </button>
                                <button
                                    onClick={() => handleTabChange('orders')}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <FiShoppingBag className="mr-3" /> My Orders
                                </button>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-500 hover:bg-red-50"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut className="mr-3" /> Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {isLoading && activeTab === 'profile' ? (
                            <div className="bg-white rounded-xl shadow-sm p-6 text-center py-8">
                                <p>Loading profile...</p>
                            </div>
                        ) : activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                {editProfileOpen ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 mb-1">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={profileData.first_name || ''}
                                                    onChange={handleProfileChange}
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={profileData.last_name || ''}
                                                    onChange={handleProfileChange}
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profileData.email || ''}
                                                    onChange={handleProfileChange}
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone_no"
                                                    value={profileData.phone_no || ''}
                                                    onChange={handleProfileChange}
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-700 mb-1">Address</label>
                                                <textarea
                                                    name="address"
                                                    value={profileData.address || ''}
                                                    onChange={handleProfileChange}
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                onClick={() => setEditProfileOpen(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveProfile}
                                                disabled={isLoading}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                {isLoading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-semibold">My Profile</h3>
                                            <button
                                                onClick={handleEditProfile}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Edit Profile
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-500">First Name</p>
                                                <p className="font-medium mt-1">{user?.first_name || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Last Name</p>
                                                <p className="font-medium mt-1">{user?.last_name || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Email</p>
                                                <p className="font-medium mt-1">{user?.email || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Phone Number</p>
                                                <p className="font-medium mt-1">{user?.phone_no || '-'}</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <p className="text-gray-500">Address</p>
                                                <p className="font-medium mt-1">{user?.address || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-xl font-semibold mb-6">My Orders</h3>
                                {isLoading ? (
                                    <p className="text-center py-4">Loading orders...</p>
                                ) : orders.length === 0 ? (
                                    <p className="text-center py-4">No orders found</p>
                                ) : (
                                    renderOrders()
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
