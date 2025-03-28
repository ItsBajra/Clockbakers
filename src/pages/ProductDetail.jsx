import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/navbar";
import Header from "../pages/Home/Header";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    pounds: 0.5,
    delivery_date: "",
    delivery_time: "",
    message: "",
    quantity: 1,
  });
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartId, setCartId] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      return payload.id || payload.userId || payload.sub || payload.jti || null;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  const fetchCartId = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/v1/cart_id?uid=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setCartId(response.data.cart_id);
      return response.data.cart_id;
    } catch (error) {
      console.error("Error fetching cart ID:", error);
      throw error;
    }
  };

  const handleAddToCart = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("Please login to add items to cart");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // First get or create cart ID
      let currentCartId = cartId;
      if (!currentCartId) {
        currentCartId = await fetchCartId(userId);
        setCartId(currentCartId); // Update state with new cart ID
      }

      const cartItem = {
        cart_id: currentCartId,
        product_id: product.id,
        quantity: orderDetails.quantity,
      };

      await axios.post(`http://localhost:8080/v1/cart`, cartItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="text-center text-lg font-semibold text-red-500 mt-10">
        No product details available.
      </div>
    );
  }

  const handleMouseEnter = (image) => {
    setPopupImage(image);
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWeightSelect = (pounds) => {
    setOrderDetails((prev) => ({
      ...prev,
      pounds,
    }));
  };

  const handleBuyNow = async () => {
    if (!orderDetails.delivery_date || !orderDetails.delivery_time) {
      setError("Please select delivery date and time");
      return;
    }

    setOrderConfirmation(true);
  };

  const confirmOrder = async () => {
    setIsLoading(true);
    setError("");

    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const orderData = {
        product_id: product.id,
        user_id: userId,
        pounds: parseFloat(orderDetails.pounds),
        quantity: orderDetails.quantity,
        delivery_date: orderDetails.delivery_date,
        delivery_time: orderDetails.delivery_time,
        message: orderDetails.message,
        total_price: product.price * orderDetails.pounds,
      };

      const response = await axios.post(
        "http://localhost:8080/v1/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      console.log("Order placed successfully:", response.data);
      setOrderConfirmation(false);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div
        className="min-h-screen flex flex-col items-center py-10 px-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/Bgpattern.png')" }}
      >
        {cartSuccess && (
          <div className="fixed top-20 right-5 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg z-50">
            <p>Item added to cart successfully!</p>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative flex justify-center items-center flex-col">
            <div className="relative flex justify-center">
              <img
                src={"src/assets/cakes/" + product.sku + ".png"}
                alt={product.name}
                className="w-80 h-80 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/src/assets/placeholder.png";
                }}
              />
              {showPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-white shadow-lg p-2 sm:p-4 rounded-lg z-10 w-[90%] sm:w-80 max-w-full h-auto">
                  <img
                    src={popupImage}
                    alt="Popup"
                    className="w-full h-auto max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 group">
              <div className="mt-2 text-left">
                <div className="flex items-center">
                  <div className="bg-pink-600 w-2 h-10"></div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      Description
                    </h1>
                  </div>
                </div>
                <p className="mt-1 text-md">
                  {product.description || "Delicious and fresh cake!"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-xl text-gray-700">${product.price.toFixed(2)}</p>

            <div className="mt-4">
              <p className="font-semibold">Choose weight (in pounds)</p>
              <div className="flex gap-2 mt-2">
                {[0.5, 1, 2, 3].map((weight) => (
                  <button
                    key={weight}
                    className={`px-4 py-2 rounded-lg ${
                      orderDetails.pounds === weight
                        ? "bg-pink-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleWeightSelect(weight)}
                  >
                    {weight} lb
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold">Delivery Date:</label>
              <input
                type="date"
                name="delivery_date"
                value={orderDetails.delivery_date}
                onChange={handleInputChange}
                className="border p-2 rounded-sm w-full mt-1"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="mt-4">
              <label className="font-semibold">Time:</label>
              <select
                name="delivery_time"
                value={orderDetails.delivery_time}
                onChange={handleInputChange}
                className="border p-2 rounded-sm w-full mt-1"
              >
                <option value="">--Select Time--</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 8 PM)</option>
              </select>
            </div>

            <div className="mt-4">
              <textarea
                name="message"
                value={orderDetails.message}
                onChange={handleInputChange}
                placeholder="Message on Cake (optional)"
                className="border p-2 rounded-sm w-full"
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-4 flex gap-4">
              <button
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {orderConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Your Order</h3>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Product:</span> {product.name}
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {orderDetails.pounds} lb
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {orderDetails.quantity}
              </p>
              <p>
                <span className="font-semibold">Price:</span> $
                {(product.price * orderDetails.pounds).toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Delivery Date:</span>{" "}
                {orderDetails.delivery_date}
              </p>
              <p>
                <span className="font-semibold">Delivery Time:</span>{" "}
                {orderDetails.delivery_time}
              </p>
              <p>
                <span className="font-semibold">Delivery Address:</span>
                {userAddress ? ` ${userAddress}` : " Same as in your profile"}
              </p>
              {orderDetails.message && (
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {orderDetails.message}
                </p>
              )}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {userAddress
                ? "If you need to change the address, please update your profile first."
                : "The delivery will be made to the address in your profile."}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setOrderConfirmation(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                onClick={confirmOrder}
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
