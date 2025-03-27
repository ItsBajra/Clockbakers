import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("src/tryjson/products.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch cart items");
                }
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems => prevItems.map((item, i) => i === index ? { ...item, quantity: newQuantity } : item));
    };

    const handleDelete = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {/* Added pt-24 (6rem) to account for fixed navbar height */}
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
                                {cartItems.map((item, index) => (
                                    <li key={index} className="p-4 sm:p-6">
                                        <div className="flex items-start sm:items-center">
                                            <img src={item.image} alt={item.name} className="flex-shrink-0 w-20 h-20 rounded-lg object-cover border border-gray-200" />
                                            <div className="ml-4 flex-1 min-w-0">
                                                <div className="flex justify-between">
                                                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                                                    <p className="ml-4 text-lg font-semibold text-gray-900">${(item.discountPrice * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                                <div className="mt-2 flex items-center">
                                                    <p className="text-sm text-gray-500 line-through mr-2">${item.originalPrice.toFixed(2)}</p>
                                                    <p className="text-sm font-semibold text-red-600">${item.discountPrice.toFixed(2)}</p>
                                                </div>
                                                <div className="mt-3 flex items-center">
                                                    <div className="flex items-center border border-gray-300 rounded-md">
                                                        <button 
                                                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1 text-gray-900 border-x border-gray-300">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleDelete(index)}
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
        </div>
    );
};

export default Cart;