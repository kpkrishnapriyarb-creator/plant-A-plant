
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCart(response.data); // assuming your API returns an array
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`); // remove from backend
      setCart((prev) => prev.filter((item) => item.id !== id)); // update state
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-success mb-4"> Your Cart</h2>

      {cart.length === 0 ? (
        <h5 className="text-center text-muted">Your cart is empty</h5>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-md-4 mb-3">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5>{item.name}</h5>
                    <p className="text-success fw-bold">₹{item.price}</p>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold text-success">Total: ₹{total}</h4>
            <button
              className="btn btn-success px-4 py-2 fw-semibold"
              onClick={() => navigate("/placeorder", { state: { cart } })}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
