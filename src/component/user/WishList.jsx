
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:5000/wishlist");
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Remove from wishlist (backend)
  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/wishlist/${id}`);
      setWishlist(wishlist.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // Add to cart (backend)
  const addToCart = async (plant) => {
    try {
      await axios.post("http://localhost:5000/cart", plant);
      alert(`${plant.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center my-4">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <p>Your wishlist is empty.</p>
          <button className="btn btn-success" onClick={() => navigate("/shop")}>
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((plant) => (
            <div key={plant.id} className="col-md-3 mb-3">
              <div className="card shadow-sm h-100">
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5>{plant.name}</h5>
                  <p className="text-success fw-bold">₹{plant.price}</p>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => addToCart(plant)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromWishlist(plant.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
