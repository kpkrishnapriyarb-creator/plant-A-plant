
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewOrder.css";

function ViewOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="main-content py-4">
      <h2 className="view-heading text-center mb-4">View Orders</h2>

      <div className="table-responsive">
        <table
          className="table table-bordered table-striped shadow-sm"
          style={{ width: "90%", margin: "auto" }}
        >
          <thead className="table-success text-center align-middle">
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="text-center align-middle">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.address || "—"}</td>
                  <td>{order.phone || "—"}</td>

                  {/* ✅ Display all products in the order */}
                  <td className="text-start">
                    {order.products?.map((p, index) => (
                      <div key={index}>
                        {p.name} – ₹{p.price}
                      </div>
                    )) || "No products"}
                  </td>

                  <td>₹{order.total?.toLocaleString("en-IN")}</td>

                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "pending"
                          ? "bg-warning text-dark"
                          : order.status === "delivered"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => handleStatusChange(order.id, "delivered")}
                      disabled={order.status === "delivered"}
                    >
                      Mark Delivered
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleStatusChange(order.id, "cancelled")}
                      disabled={order.status === "cancelled"}
                    >
                      Cancel
                    </button>
                  </td>

                  <td>
                    {new Date(order.date).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewOrder;