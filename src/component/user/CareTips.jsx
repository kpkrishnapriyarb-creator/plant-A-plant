
// // import React, { useState, useEffect, useMemo } from 'react';
// // import axios from 'axios';
// // import './CareTips.css';

// // // --------------- Default/Fallback Plant Data -----------------
// // const fallbackPlantData = [
// //   { id: 1, name: "Pothos", imgUrl: "https://via.placeholder.com/300x200/4a755d/FFFFFF?text=Pothos", tips: "Bright indirect light, water when top soil is dry." },
// //   { id: 2, name: "Snake Plant", imgUrl: "https://via.placeholder.com/300x200/90EE90/1a472a?text=Snake+Plant", tips: "Low light tolerant, water sparingly." },
// //   { id: 3, name: "ZZ Plant", imgUrl: "https://via.placeholder.com/300x200/808080/FFFFFF?text=ZZ+Plant", tips: "Tough plant, water only when completely dry." },
// //   { id: 4, name: "Monstera", imgUrl: "https://via.placeholder.com/300x200/e6f1e8/1a472a?text=Monstera", tips: "Bright light, keep soil slightly moist." },
// // ];

// // // ----------------- Modal Component ----------------------
// // const CareTipModal = ({ plant, onClose }) => {
// //   if (!plant) return null;

// //   return (
// //     <div className="modal-backdrop" onClick={onClose}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <button className="modal-close-btn" onClick={onClose}>×</button>
// //         <h2>{plant.name} - Care Guide</h2>
// //         <img src={plant.imgUrl} alt={plant.name} className="modal-image" />
// //         <p className="modal-tips"><strong>Tip:</strong> {plant.tips}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // // ----------------- Main Component ----------------------
// // const CareTips = () => {
// //   const [plants, setPlants] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [selectedPlant, setSelectedPlant] = useState(null);

// //   useEffect(() => {
// //     const fetchPlants = async () => {
// //       setLoading(true);

// //       try {
// //         const res = await axios.get('/api/plants');

// //         // SAFE DATA HANDLING
// //         let data = [];

// //         if (Array.isArray(res.data)) data = res.data;
// //         else if (Array.isArray(res.data?.plants)) data = res.data.plants;
// //         else if (Array.isArray(res.data?.data)) data = res.data.data;
// //         else data = [];

// //         setPlants(data.length ? data : fallbackPlantData);
// //       } catch (err) {
// //         console.error("API failed → Using fallback data");
// //         setPlants(fallbackPlantData);
// //       }

// //       setLoading(false);
// //     };

// //     fetchPlants();
// //   }, []);

// //   // Filter plants on search
// //   const filteredPlants = useMemo(() => {
// //     const keyword = searchTerm.toLowerCase();
// //     return plants.filter((p) => p.name.toLowerCase().includes(keyword));
// //   }, [plants, searchTerm]);

// //   return (
// //     <div className="care-page">
// //       <section className="search-section">
// //         <h1>Plant Care Tips</h1>
// //         <input
// //           type="text"
// //           placeholder="Search for a plant..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="search-input"
// //         />
// //       </section>

// //       <section className="plant-grid">
// //         {loading && <p className="loading">Loading plants...</p>}

// //         {!loading && filteredPlants.length === 0 && (
// //           <p className="no-results">No plants found.</p>
// //         )}

// //         {!loading &&
// //           filteredPlants.map((plant) => (
// //             <div className="plant-card" key={plant.id}>
// //               <img src={plant.imgUrl} alt={plant.name} className="plant-img" />
// //               <h3>{plant.name}</h3>
// //               <button onClick={() => setSelectedPlant(plant)} className="view-btn">
// //                 View Care Tips →
// //               </button>
// //             </div>
// //           ))}
// //       </section>

// //       <CareTipModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
// //     </div>
// //   );
// // };

// // export default CareTips;
// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import './CareTips.css';

// // ---------------- FALLBACK DATA ----------------
// const fallbackPlantData = [
//   { id: 1, name: "Pothos", imgUrl: "https://via.placeholder.com/300x200/4a755d/FFFFFF?text=Pothos", tips: "Bright indirect light, water when top soil is dry." },
//   { id: 2, name: "Snake Plant", imgUrl: "https://via.placeholder.com/300x200/90EE90/1a472a?text=Snake+Plant", tips: "Low light tolerant, water sparingly." },
//   { id: 3, name: "ZZ Plant", imgUrl: "https://via.placeholder.com/300x200/808080/FFFFFF?text=ZZ+Plant", tips: "Water only when completely dry." },
//   { id: 4, name: "Monstera", imgUrl: "https://via.placeholder.com/300x200/e6f1e8/1a472a?text=Monstera", tips: "Bright light, keep soil slightly moist." },
// ];

// // ---------------- MODAL COMPONENT ----------------
// const CareTipModal = ({ plant, onClose }) => {
//   if (!plant) return null;

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close-btn" onClick={onClose}>×</button>

//         <h2>{plant.name} - Care Guide</h2>

//         <img src={plant.imgUrl} alt={plant.name} className="modal-image" />

//         <p className="modal-tips">
//           <strong>Tip:</strong> {plant.tips}
//         </p>
//       </div>
//     </div>
//   );
// };

// // ---------------- MAIN COMPONENT ----------------
// const CareTips = () => {
//   const [plants, setPlants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   useEffect(() => {
//     const fetchPlants = async () => {
//       setLoading(true);

//       try {
//         // 👉 JSON SERVER URL
//         const res = await axios.get("http://localhost:5000/careTips");

//         // Validate data safely
//         let data = Array.isArray(res.data) ? res.data : [];

//         setPlants(data.length ? data : fallbackPlantData);
//       } catch (err) {
//         console.error("API failed → Loading fallback data");
//         setPlants(fallbackPlantData);
//       }

//       setLoading(false);
//     };

//     fetchPlants();
//   }, []);

//   // Filter logic (search)
//   const filteredPlants = useMemo(() => {
//     const key = searchTerm.toLowerCase();
//     return plants.filter((p) => p.name.toLowerCase().includes(key));
//   }, [plants, searchTerm]);

//   return (
//     <div className="care-page">
      
//       {/* ---------- SEARCH SECTION ---------- */}
//       <section className="search-section">
//         <h1>Plant Care Tips</h1>

//         <input
//           type="text"
//           placeholder="Search for a plant..."
//           className="search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </section>

//       {/* ---------- PLANT GRID ---------- */}
//       <section className="plant-grid">
//         {loading && <p className="loading">Loading plants...</p>}

//         {!loading && filteredPlants.length === 0 && (
//           <p className="no-results">No plants found.</p>
//         )}

//         {!loading &&
//           filteredPlants.map((plant) => (
//             <div className="plant-card" key={plant.id}>
//               <img src={plant.imgUrl} alt={plant.name} className="plant-img" />
//               <h3>{plant.name}</h3>

//               <button
//                 className="view-btn"
//                 onClick={() => setSelectedPlant(plant)}
//               >
//                 View Care Tips →
//               </button>
//             </div>
//           ))}
//       </section>

//       {/* ---------- MODAL ---------- */}
//       <CareTipModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
//     </div>
//   );
// };

// export default CareTips;

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './CareTips.css';

// ---------------- FALLBACK DATA ----------------
const fallbackPlantData = [
  { id: 1, name: "Pothos", imgUrl: "https://via.placeholder.com/300x200/4a755d/FFFFFF?text=Pothos", tips: "Bright indirect light, water when top soil is dry." },
  { id: 2, name: "Snake Plant", imgUrl: "https://via.placeholder.com/300x200/90EE90/1a472a?text=Snake+Plant", tips: "Low light tolerant, water sparingly." },
  { id: 3, name: "ZZ Plant", imgUrl: "https://via.placeholder.com/300x200/808080/FFFFFF?text=ZZ+Plant", tips: "Water only when fully dry." },
  { id: 4, name: "Monstera", imgUrl: "https://via.placeholder.com/300x200/e6f1e8/1a472a?text=Monstera", tips: "Bright light, keep soil slightly moist." },
];

// ---------------- MODAL COMPONENT ----------------
const CareTipModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>

        <h2>{plant.name} - Care Guide</h2>

        <img src={plant.imgUrl} alt={plant.name} className="modal-image" />

        <p className="modal-tips">
          <strong>Tip:</strong> {plant.tips}
        </p>
      </div>
    </div>
  );
};

// ---------------- MAIN COMPONENT ----------------
const CareTips = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);

      try {
        const res = await axios.get("http://localhost:5000/careTips");

        let data = Array.isArray(res.data) ? res.data : [];

        setPlants(data.length ? data : fallbackPlantData);
      } catch (err) {
        console.error("API failed → Loading fallback data");
        setPlants(fallbackPlantData);
      }

      setLoading(false);
    };

    fetchPlants();
  }, []);

  // SAFE filter logic (FIXED TO PREVENT ERROR)
  const filteredPlants = useMemo(() => {
    const key = searchTerm.toLowerCase();

    return plants.filter((p) =>
      (p?.name || "").toLowerCase().includes(key)
    );
  }, [plants, searchTerm]);

  return (
    <div className="care-page">
      
      {/* ---------- SEARCH SECTION ---------- */}
      <section className="search-section">
        <h1>Plant Care Tips</h1>

        <input
          type="text"
          placeholder="Search for a plant..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {/* ---------- PLANT GRID ---------- */}
      <section className="plant-grid">
        {loading && <p className="loading">Loading plants...</p>}

        {!loading && filteredPlants.length === 0 && (
          <p className="no-results">No plants found.</p>
        )}

        {!loading &&
          filteredPlants.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img src={plant.imgUrl} alt={plant.name} className="plant-img" />
              <h3>{plant.name}</h3>

              <button
                className="view-btn"
                onClick={() => setSelectedPlant(plant)}
              >
                View Care Tips →
              </button>
            </div>
          ))}
      </section>

      {/* ---------- MODAL ---------- */}
      <CareTipModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </div>
  );
};

export default CareTips;
