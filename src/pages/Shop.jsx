import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Header from '../pages/Home/Header';
import { FiShoppingCart } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleProducts, setVisibleProducts] = useState(8); // Initial number of products to show
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("src/tryjson/products.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCardClick = (product) => {
        navigate('/productdetails', { state: { product } });
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation(); // Prevent card click from triggering
        // Add your cart logic here
        console.log("Added to cart:", product);
        // You would typically add this to a cart context or state
    };

    const loadMoreProducts = () => {
        setVisibleProducts(prev => prev + 4); // Load 4 more products
    };

    return (
        <div>
            <Navbar />
            <Header />

            <div
                className="min-h-screen flex flex-col items-center py-10 px-5 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/src/assets/Bgpattern.png')" }}
            >
                <div className="bg-transparent p-6 rounded-lg">
                    <h2 className="text-2xl text-center font-semibold text-gray-800">Featured Products</h2>
                    <p className="text-gray-600 text-center max-w-md mt-2">
                        Discover our best-selling cakes and desserts.
                    </p>
                </div>

                {loading ? (
                    <p className="text-gray-700 mt-6">Loading products...</p>
                ) : error ? (
                    <p className="text-red-500 mt-6">Error: {error}</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-1">
                            {products.slice(0, visibleProducts).map((product, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(product)}
                                    className="bg-gray-100 bg-opacity-90 p-4 rounded-xl shadow-md max-w-xs
                                transition-all duration-300 ease-in-out
                                hover:bg-white hover:bg-opacity-100
                                hover:shadow-lg hover:shadow-pink-300 hover:-translate-y-1
                                cursor-pointer relative"
                                >
                                    <div className="absolute top-3 right-3 flex gap-2">
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 pr-8">{product.name}</h3>
                                    <p className="text-gray-500 text-sm">{product.description || "Delicious and fresh"}</p>
                                    <p className="text-red-500 text-sm font-semibold">-30% off</p>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover mt-2 rounded"
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <div>
                                            <p className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
                                            <p className="text-lg font-bold">${product.discountPrice.toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleCardClick(product)}
                                            className="flex items-center text-sm text-pink-600 hover:text-pink-800"
                                        >
                                            View details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visibleProducts < products.length && (
                            <div className="mt-10">
                                <button
                                    onClick={loadMoreProducts}
                                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center"
                                >
                                    View More Products
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;