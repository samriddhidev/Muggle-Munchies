 import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received from the server:", data);
      setFoodCat(data[0]);
      setFoodItem(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Calling loadData...");
    loadData();
  }, []);

  console.log("Render, foodCat:", foodCat);
  console.log("Render, foodItem:", foodItem);

  // Create an array of unique category names
  const uniqueCategories = [
    ...new Set(foodItem.map((item) => item.CategoryName)),
  ];

  return (
    <div>
      <Navbar />
      <div>
        <Carousel />
      </div>
      <div className="container">
        {/* Use uniqueCategories to create columns */}
        <div className="row">
          {uniqueCategories.map((category) => (
            <div key={category} className="col-sm">
              <div className="fs-3 m-3">{category}</div>
              <hr />
              {foodItem
                .filter((item) => item.CategoryName === category)
                .map((filterItems) => (
                  <div key={filterItems._id}>
                    <Card data={filterItems} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
