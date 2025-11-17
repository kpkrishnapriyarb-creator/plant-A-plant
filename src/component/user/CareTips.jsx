import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import './CareTip.css';

// --- Sample Data for 10 Popular Indoor Plants (Fallback/Local Dev) ---
// NOTE: In production, this will be fetched from your API using Axios.
const plantData = [
  { id: 1, name: "Pothos (Epipremnum aureum)", imgUrl: "https://via.placeholder.com/300x200/4a755d/FFFFFF?text=Pothos", tips: "Loves bright, indirect light; water when top inch of soil is dry. Extremely forgiving." },
  { id: 2, name: "Snake Plant (Sansevieria)", imgUrl: "https://via.placeholder.com/300x200/90EE90/1a472a?text=Snake+Plant", tips: "Tolerates low light; water sparingly (monthly in winter). Requires excellent drainage." },
  { id: 3, name: "ZZ Plant (Zamioculcas)", imgUrl: "https://via.placeholder.com/300x200/808080/FFFFFF?text=ZZ+Plant", tips: "Thrives on neglect. Water thoroughly only when soil is completely dry. Avoid direct sun." },
  { id: 4, name: "Monstera Deliciosa", imgUrl: "https://via.placeholder.com/300x200/e6f1e8/1a472a?text=Monstera", tips: "Bright, indirect light and consistent moisture. Wipe leaves to maximize light absorption." },
  { id: 5, name: "Spider Plant (Chlorophytum comosum)", imgUrl: "https://via.placeholder.com/300x200/ADD8E6/1a472a?text=Spider+Plant", tips: "Prefers bright light for optimal 'babies' (plantlets). Avoid tap water chemicals if possible." },
  { id: 6, name: "Fiddle Leaf Fig (Ficus lyrata)", imgUrl: "https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Fiddle+Leaf+Fig", tips: "Needs bright light; hates to be moved. Water thoroughly and let drain completely." },
  { id: 7, name: "Peace Lily (Spathiphyllum)", imgUrl: "https://via.placeholder.com/300x200/F0FFF4/4a755d?text=Peace+Lily", tips: "Water when it dramatically droops. Prefers medium to low light. Excellent air purifier." },
  { id: 8, name: "African Violet (Saintpaulia)", imgUrl: "https://via.placeholder.com/300x200/9370DB/FFFFFF?text=African+Violet", tips: "Bottom-water only. Avoid getting water on the fuzzy leaves. Requires bright light but no direct sun." },
  { id: 9, name: "Succulent (Echeveria spp.)", imgUrl: "https://via.placeholder.com/300x200/FFD700/1a472a?text=Succulent", tips: "Requires direct sun or very bright light. Water very infrequently (monthly) and only when soil is bone dry." },
  { id: 10, name: "Areca Palm (Dypsis lutescens)", imgUrl: "https://via.placeholder.com/300x200/B0C4DE/1a472a?text=Areca+Palm", tips: "Prefers bright, filtered light. Keep soil lightly moist, but not soggy. Loves high humidity." }
];

// --- 3. Simple Modal Component (for specific tips) ---
const CareTipModal = ({ plant, onClose }) => {
    if (!plant) return null;

    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          <h2>{plant.name} Care Guide</h2>
          <img src={plant.imgUrl} alt={plant.name} style={{ width: '100%', borderRadius: '8px' }} />
          <p className="modal-tips">*Key Care Tip:* {plant.tips}</p>
          <div className="modal-footer">
            <p>Remember: Every home is different. Adjust care as needed!</p>
          </div>
        </div>
      </div>
    );
  };


const CareTips = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 
  const [selectedPlant, setSelectedPlant] = useState(null); 

  // 1. Fetching Data with Axios
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(false);
      
      // *** IMPORTANT: Replace this with your actual backend API endpoint ***
      const API_ENDPOINT = '/api/plants'; 

      try {
        const response = await axios.get(API_ENDPOINT); 
        setPlants(response.data); 
      } catch (err) {
        console.error("Error fetching plant data from API:", err);
        setError(true);
        // Fallback for local development or API failure
        setPlants(plantData); 
      } finally {
        setLoading(false); 
      }
    };
    
    fetchPlants();
    
  }, []); // Runs only once on mount

  // 2. Filter Plants based on Search Term
  const filteredPlants = useMemo(() => {
    if (!searchTerm) {
      return plants;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return plants.filter(plant => 
      plant.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [plants, searchTerm]);

  return (
    <div className="plant-care-search-page">
      
      {/* -------------------- NAV BAR / SEARCH BAR -------------------- */}
      <section className="search-hero">
        <div className="container">
          <h1>Find Your Plant Care Tips</h1>
          {/* The Search Bar is placed directly below the title/nav area */}
          <input
            type="text"
            placeholder="Search for a specific plant (e.g., Pothos, Monstera)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      {/* -------------------- PLANT GRID / CARE CARDS -------------------- */}
      <section className="plant-grid-section container">
        {loading && <p className="loading-message">Loading plant data...</p>}
        
        {error && !loading && (
             <p className="error-message">Could not connect to plant database. Displaying default list.</p>
        )}

        {!loading && filteredPlants.length === 0 && (
          <p className="no-results">No plants found matching "{searchTerm}". Try a different name!</p>
        )}

        <div className="plant-grid">
          {filteredPlants.map(plant => (
            // Div Box for each plant card
            <div key={plant.id} className="plant-card">
              
              {/* Pic of the plant */}
              <div className="plant-image-container">
                <img src={plant.imgUrl} alt={plant.name} className="plant-image" />
              </div>
              
              {/* Plant Name under the pic */}
              <h3 className="plant-name">{plant.name}</h3>

              {/* Button to know the care tips */}
              <button 
                className="care-tip-button"
                onClick={() => setSelectedPlant(plant)}
              >
                Know the Care Tips →
              </button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Render the Modal */}
      <CareTipModal 
        plant={selectedPlant} 
        onClose={() => setSelectedPlant(null)} 
      />
    </div>
  );
};

export default CareTips;