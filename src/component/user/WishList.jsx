// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const logged = JSON.parse(localStorage.getItem("loggedInUser"));
//       if (!logged) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/users/${logged.id}`);
//         setUser(res.data);
//         setWishlist(res.data.wishlist || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUser();
//   }, []);

//   const removeFromWishlist = async (plantId) => {
//     if (!user) return;
//     const updatedWishlist = wishlist.filter((item) => item.id !== plantId);
//     setWishlist(updatedWishlist);

//     const updatedUser = { ...user, wishlist: updatedWishlist };
//     await axios.patch(`http://localhost:5000/users/${user.id}`, updatedUser);
//     localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">❤️ My Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <div className="text-center">
//           <p>No items in wishlist</p>
//           <button className="btn btn-success" onClick={() => navigate("/shop")}>
//             Go to Shop
//           </button>
//         </div>
//       ) : (
//         <div className="row">
//           {wishlist.map((plant) => (
//             <div key={plant.id} className="col-md-3 mb-3">
//               <div className="card shadow-sm p-2">
//                 <img src={plant.image} className="card-img-top" alt={plant.name} />
//                 <h5>{plant.name}</h5>
//                 <p>₹{plant.price}</p>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => removeFromWishlist(plant.id)}
//                 >
//                   Remove ❌
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!loggedInUser) return;
      try {
        const res = await axios.get(`http://localhost:5000/users/${loggedInUser.id}`);
        setWishlist(res.data.wishlist || []);
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [loggedInUser]);

  const removeFromWishlist = async (plant) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== plant.id);
    setWishlist(updatedWishlist);

    await axios.patch(`http://localhost:5000/users/${loggedInUser.id}`, {
      wishlist: updatedWishlist,
    });

    const updatedUser = { ...loggedInUser, wishlist: updatedWishlist };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  };

  const handleAddToCart = async (plant) => {
    if (cart.some((item) => item.id === plant.id)) return alert("Already in cart!");

    const updatedCart = [...cart, plant];
    setCart(updatedCart);

    await axios.patch(`http://localhost:5000/users/${loggedInUser.id}`, {
      cart: updatedCart,
    });

    const updatedUser = { ...loggedInUser, cart: updatedCart };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    alert(`${plant.name} added to cart!`);
  };

  if (!loggedInUser) {
    return (
      <div className="container py-5 text-center">
        <h4>Please login to view your wishlist.</h4>
        <button className="btn btn-success mt-3" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold text-danger"> Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <h5 className="text-center text-muted">Your wishlist is empty...</h5>
      ) : (
        <div className="row g-4">
          {wishlist.map((plant) => (
            <div key={plant.id} className="col-md-3">
              <div className="card h-100 shadow-sm border-0 position-relative">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => removeFromWishlist(plant)}
                >
                  <FaHeart size={22} />
                </div>

                <img
                  src={plant.image}
                  alt={plant.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold">{plant.name}</h5>
                    <p className="text-muted mb-1">{plant.category}</p>
                    <p className="fw-bold text-success mb-1">₹{plant.price}</p>
                    <p className="text-warning mb-2">
                      {"⭐".repeat(Math.round(plant.rating))}{" "}
                      <span className="text-muted">({plant.rating})</span>
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-success btn-sm mt-2"
                    onClick={() => handleAddToCart(plant)}
                  >
                    Add to Cart
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

