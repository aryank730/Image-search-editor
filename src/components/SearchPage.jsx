import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
   try {
     const response = await axios.get(
       `https://api.unsplash.com/search/photos?query=${query}&client_id=YOUR_UNSPLASH_ACCESS_KEY`
     );
     setImages(response.data.results);
   } catch (error) {
     console.error("Error fetching images:", error);
   }
 };
 

  return (
    <div className="container">
      <h2>Search Page</h2>
      <p><b>Name:</b> Your Name</p>
      <p><b>Email:</b> Your Email</p>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>🔍</button>
      </div>

      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img
              src={image.urls.small}
              alt="thumbnail"
              onClick={() => navigate("/caption", { state: { imageUrl: image.urls.regular } })}
            />
            <button onClick={() => navigate("/caption", { state: { imageUrl: image.urls.regular } })}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;