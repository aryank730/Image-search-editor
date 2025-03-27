import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import "../index.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=21948349-476e43c7edfba0b4d57654814&q=${query}&image_type=photo`
      );
      setImages(response.data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    }
  };

  const goToCaptionPage = (imageUrl) => {
    console.log("Navigating with image URL:", imageUrl);  
    navigate("/caption", { state: { imageUrl } });
  };



  return (
    <>
      <div className="intro">
        <p><b>Name:</b> Aryan Katiyar</p>
        <p><b>Email:</b> rikkypatel730@gmail.com</p>
      </div>
      <div className="container">
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
          {Array.isArray(images) &&
            images.map((image) => (
              <div key={image.id} className="image-item">
                <img
                  src={image.webformatURL}
                  alt="thumbnail"
                  onClick={() => goToCaptionPage(image.largeImageURL)}
                />
                <button onClick={() => goToCaptionPage(image.largeImageURL)}>
                  Add Caption
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;