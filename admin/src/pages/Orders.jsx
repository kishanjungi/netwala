import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("active");
  const totalCount = orders.length;
  const deliveredCount = orders.filter(
    (o) => o.status === "Delivered"
  ).length;
  const activeCount = orders.filter(
    (o) => o.status !== "Delivered"
  ).length;


  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) fetchAllOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "active") return order.status !== "Delivered";
    if (filter === "delivered") return order.status === "Delivered";
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>

      {/* FILTER TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium border
            ${
              filter === "all"
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          ALL ({totalCount})
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md text-sm font-medium border
            ${
              filter === "active"
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          ACTIVE ({activeCount})
        </button>

        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-md text-sm font-medium border
            ${
              filter === "delivered"
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          DELIVERED ({deliveredCount})
        </button>
      </div>


      {/* ORDER CARDS */}
      {filteredOrders.map((order, index) => (
        <div
          key={index}
          className="border rounded-lg p-5 mb-4 bg-white shadow-sm"
        >
          {/* TOP */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                {currency}
                {order.amount}
              </p>

              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="border p-2 rounded-md text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivary">Out for Delivary</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* ITEMS */}
          <div className="mt-3 text-sm text-gray-700">
            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.quantity} ({item.size})
              </p>
            ))}
          </div>

          {/* PAYMENT */}
          <div className="mt-3 flex gap-6 text-sm">
            <p>
              Method: <span className="font-medium">{order.paymentMethod}</span>
            </p>
            <p>
              Payment:{" "}
              <span
                className={
                  order.payment ? "text-green-600" : "text-red-600"
                }
              >
                {order.payment ? "Done" : "Pending"}
              </span>
            </p>
          </div>

          {/* ADDRESS */}
          <div className="mt-3 text-sm text-gray-500">
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.country} -{" "}
              {order.address.zipcode}
            </p>
            <p>📞 {order.address.phone}</p>
            <p> {order.address.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
