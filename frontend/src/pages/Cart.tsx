import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

let productImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD2qqTETNvhuwbOxm06z6aWQjJsytiMsbtzw&s";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="md:w-[70%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <div className="flex flex-col gap-4">
          {/* cart products */}
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-4">
              <img
                src={productImg}
                alt="productImg"
                className="w-32 h-32 object-contain rounded-md"
              />
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">Gaming Laptop</span>
                <span className="text-2xl font-bold text-blue-600">₹1,499</span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-3">
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button className="text-red-500 hover:text-red-600 p-2">
                <BiTrash size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="md:w-[30%] bg-white rounded-lg shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${1499*quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Charges</span>
            <span>₹0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹149</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-₹0</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹1,648</span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="flex gap-2 mt-6">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Apply
            </button>
          </div>

          <button
            onClick={() => navigate("/shipping")}
            className="w-full py-3 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
