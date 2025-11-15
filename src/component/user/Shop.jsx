
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Shop() {
  const [plants, setPlants] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState("All");

  const navigate = useNavigate();

  // Fetch plants & wishlist from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const plantsRes = await axios.get("http://localhost:5000/plants");
        setPlants(plantsRes.data);

        const wishlistRes = await axios.get("http://localhost:5000/wishlist");
        setWishlist(wishlistRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Add plant to cart (backend)
  const handleAddToCart = async (plant) => {
    try {
      // POST to cart endpoint
      await axios.post("http://localhost:5000/cart", plant);
      alert(`${plant.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Toggle wishlist (backend)
  const toggleWishlist = async (plant) => {
    try {
      const exists = wishlist.find((item) => item.id === plant.id);
      let updatedWishlist;

      if (exists) {
        await axios.delete(`http://localhost:5000/wishlist/${plant.id}`);
        updatedWishlist = wishlist.filter((item) => item.id !== plant.id);
      } else {
        await axios.post("http://localhost:5000/wishlist", plant);
        updatedWishlist = [...wishlist, plant];
        alert(`${plant.name} added to wishlist! ❤️`);
      }

      setWishlist(updatedWishlist);
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  // Filtered plants logic
  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesRating = rating === "All" || p.rating >= Number(rating);
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold text-success">🌿 Our Plants</h2>

      {/* Search & Filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Flowering">Flowering</option>
            <option value="Succulent">Succulent</option>
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            onChange={(e) => {
              const value = e.target.value.split("-").map(Number);
              setPriceRange(value);
            }}
          >
            <option value="0-1000">All Prices</option>
            <option value="0-300">Below ₹300</option>
            <option value="300-600">₹300 - ₹600</option>
            <option value="600-1000">₹600 - ₹1000</option>
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="All">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
            <option value="1">1★ & above</option>
          </select>
        </div>

        <div className="col-md-1 mb-2">
          <button className="btn btn-success w-100" onClick={() => navigate("/cart")}>
            Cart
          </button>
        </div>

        <div className="col-md-2 mb-2">
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => navigate("/wishlist")}
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="row">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => {
            const isInWishlist = wishlist.some((item) => item.id === plant.id);
            return (
              <div key={plant.id} className="col-md-3 mb-4">
                <div className="card shadow-sm h-100 border-0 position-relative">
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      color: isInWishlist ? "red" : "gray",
                    }}
                    onClick={() => toggleWishlist(plant)}
                  >
                    {isInWishlist ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
                  </div>

                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold">{plant.name}</h5>
                    <p className="text-muted mb-1">{plant.category}</p>
                    <p className="fw-bold text-success mb-1">₹{plant.price}</p>
                    <p className="text-warning mb-2">
                      {"⭐".repeat(Math.round(plant.rating))}{" "}
                      <span className="text-muted">({plant.rating})</span>
                    </p>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleAddToCart(plant)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h5 className="text-center text-muted">No plants found...</h5>
        )}
      </div>
    </div>
  );
}

export default Shop;
