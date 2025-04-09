import { useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";

const img =
  "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/Shoes_0b4c2bae38.jpg";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "43",
    quantity: 10,
    price: 2000,
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Ajay Upadhyay",
    address: "77 black street",
    city: "Basti",
    country: "India",
    state: "Uttar pradesh",
    pinCode: 272194,
    status: "Processing",
    subtotal: 1000,
    discount: 100,
    shippingCharges: 0,
    tax: 200,
    totalAmount: 1000 + 200 + 0 - 100,
    orderItems,
    _id: "uhjk",
  });

  const updateStatus = (newStatus: OrderType["status"]) => {
    setOrder((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  const getStatusColor = (status: OrderType["status"]) => {
    switch (status) {
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8">
        <h2 className="text-2xl font-bold mb-6">
          Transaction ID: #{order._id}
        </h2>

        {/* Order Items Section */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.orderItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ₹{item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Info Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Customer Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">Name:</span>
                <p className="font-medium">{order.name}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Address:</span>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">City:</span>
                <p className="font-medium">{order.city}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">State:</span>
                <p className="font-medium">{order.state}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Country:</span>
                <p className="font-medium">{order.country}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Pin Code:</span>
                <p className="font-medium">{order.pinCode}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ₹{order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Charges:</span>
                <span className="font-medium">₹{order.shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">₹{order.tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium text-green-600">
                  -₹{order.discount}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Update Status
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(e.target.value as OrderType["status"])
                      }
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => {
                        // Add your update logic here
                        console.log("Status updated to:", order.status);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TransactionManagement;
