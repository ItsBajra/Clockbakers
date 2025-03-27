import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [checkoutModal, setCheckoutModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        delivery_date: '',
        delivery_time: '',
        message: ''
    });
    const [userAddress, setUserAddress] = useState('');
    const navigate = useNavigate();

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            return payload.id || payload.userId || payload.sub || payload.jti || null;
        } catch (e) {
            console.error('Error decoding token:', e);
            return null;
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                setError("Please login to view your cart");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/v1/cart?uid=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });

                // Assuming the response includes product details along with cart info
                setCartItems(response.data.items || []);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch cart items");
            } finally {
                setLoading(false);
            }
        };

        const fetchUserAddress = async () => {
            const userId = getUserIdFromToken();
            if (!userId) return;

            try {
                const response = await axios.get(`http://localhost:8080/v1/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setUserAddress(response.data.address || '');
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        };

        fetchCartItems();
        fetchUserAddress();
    }, []);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await axios.put(`http://localhost:8080/v1/cart/${itemId}`, {
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
            setError('Failed to update quantity');
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/v1/cart/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item:', error);
            setError('Failed to remove item');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) =>
            total + (item.product.price * item.quantity * item.pounds), 0
        ).toFixed(2);
    };

    const handleCheckout = async () => {
        if (!orderDetails.delivery_date || !orderDetails.delivery_time) {
            setCheckoutError('Please select delivery date and time');
            return;
        }

        setCheckoutLoading(true);
        setCheckoutError(null);

        try {
            const userId = getUserIdFromToken();
            if (!userId) throw new Error('User not authenticated');

            const orderData = {
                items: cartItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    pounds: item.pounds
                })),
                delivery_date: orderDetails.delivery_date,
                delivery_time: orderDetails.delivery_time,
                message: orderDetails.message,
                total_price: calculateTotal()
            };

            await axios.post('http://localhost:8080/v1/order/bulk', orderData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            // Clear cart after successful checkout
            await axios.delete(`http://localhost:8080/v1/cart/clear?uid=${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            setCheckoutSuccess(true);
            setCartItems([]);
            setTimeout(() => {
                setCheckoutModal(false);
                setCheckoutSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('Error during checkout:', error);
            setCheckoutError(error.response?.data?.message || 'Failed to place order');
        } finally {
            setCheckoutLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-5 text-center">Your Shopping Cart</h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-600">Loading your cart...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">Error: {error}</p>
                                </div>
                            </div>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                            <p className="mt-1 text-gray-500">Start adding some products to your cart</p>
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="p-4 sm:p-6">
                                        <div className="flex items-start sm:items-center">
                                            <img
                                                src={`src/assets/cakes/${item.product.sku}.png`}
                                                alt={item.product.name}
                                                className="flex-shrink-0 w-20 h-20 rounded-lg object-cover border border-gray-200"
                                                onError={(e) => { e.target.src = "/src/assets/placeholder.png"; }}
                                            />
                                            <div className="ml-4 flex-1 min-w-0">
                                                <div className="flex justify-between">
                                                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.product.name}</h3>
                                                    <p className="ml-4 text-lg font-semibold text-gray-900">
                                                        ${(item.product.price * item.quantity * item.pounds).toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="mt-1 text-sm text-gray-500">
                                                    <p>Weight: {item.pounds} lb</p>
                                                    <p>Price per lb: ${item.product.price.toFixed(2)}</p>
                                                </div>
                                                <div className="mt-3 flex items-center">
                                                    <div className="flex items-center border border-gray-300 rounded-md">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1 text-gray-900 border-x border-gray-300">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                        onClick={() => setCheckoutModal(true)}
                                    >
                                        Checkout
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            onClick={() => navigate('/')}
                                            type="button"
                                            className="text-pink-600 font-medium hover:text-pink-500"
                                        >
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Checkout Modal */}
            {checkoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Confirm Your Order</h3>

                        {checkoutSuccess ? (
                            <div className="text-center py-4">
                                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">Order Placed Successfully!</h3>
                                <p className="mt-1 text-gray-500">Your items will be delivered soon.</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 mb-4">
                                    <p><span className="font-semibold">Total Items:</span> {cartItems.length}</p>
                                    <p><span className="font-semibold">Total Price:</span> ${calculateTotal()}</p>

                                    <div className="mt-4">
                                        <label className="font-semibold">Delivery Date:</label>
                                        <input
                                            type="date"
                                            name="delivery_date"
                                            value={orderDetails.delivery_date}
                                            onChange={(e) => setOrderDetails({...orderDetails, delivery_date: e.target.value})}
                                            className="border p-2 rounded-sm w-full mt-1"
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <label className="font-semibold">Time:</label>
                                        <select
                                            name="delivery_time"
                                            value={orderDetails.delivery_time}
                                            onChange={(e) => setOrderDetails({...orderDetails, delivery_time: e.target.value})}
                                            className="border p-2 rounded-sm w-full mt-1"
                                            required
                                        >
                                            <option value="">--Select Time--</option>
                                            <option value="morning">Morning (9 AM - 12 PM)</option>
                                            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                            <option value="evening">Evening (4 PM - 8 PM)</option>
                                        </select>
                                    </div>

                                    <div className="mt-2">
                                        <textarea
                                            name="message"
                                            value={orderDetails.message}
                                            onChange={(e) => setOrderDetails({...orderDetails, message: e.target.value})}
                                            placeholder="Special instructions (optional)"
                                            className="border p-2 rounded-sm w-full"
                                        />
                                    </div>

                                    <p className="mt-2">
                                        <span className="font-semibold">Delivery Address:</span>
                                        {userAddress ? ` ${userAddress}` : ' Same as in your profile'}
                                    </p>
                                </div>

                                {checkoutError && <p className="text-red-500 text-sm mb-4">{checkoutError}</p>}

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        onClick={() => setCheckoutModal(false)}
                                        disabled={checkoutLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                                        onClick={handleCheckout}
                                        disabled={checkoutLoading}
                                    >
                                        {checkoutLoading ? 'Processing...' : 'Confirm Order'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
