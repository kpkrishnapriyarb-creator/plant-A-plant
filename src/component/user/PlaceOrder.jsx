import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };

  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !address || !phone) {
      alert("Please fill all fields before placing your order!");
      return;
    }

    try {
      const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

      // ✅ Correct order object
      const order = {
        user, // ✅ use correct variable name
        address,
        phone,
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        })),
        total,
        status: "pending",
        date: new Date().toISOString(),
      };

      await axios.post("http://localhost:5000/orders", order);

      alert(" Your order has been placed successfully!");
      localStorage.removeItem("cart");
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      alert(" Failed to place order. Try again later.");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <h4 className="text-center mt-5 text-muted">
        Your cart is empty. Add plants before placing an order.
      </h4>
    );
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success fw-bold mb-4">
        🪴 Place Your Order
      </h2>

      <div className="row justify-content-center">
        {/* Left side — Customer Details */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="text-center mb-3 fw-semibold">Customer Details</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address"
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <h6 className="fw-bold text-success mt-4">
                Total Amount: ₹{total.toLocaleString("en-IN")}
              </h6>

              <button
                type="submit"
                className="btn btn-success w-100 mt-3 fw-semibold"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>

        {/* Right side — Cart Summary */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="card shadow p-3">
            <h5 className="text-center fw-semibold mb-3">Your Cart</h5>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-3 border-bottom pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div className="ms-3">
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">₹{item.price}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;