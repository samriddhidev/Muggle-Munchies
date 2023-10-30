import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <Card />
        </div>
        <Footer />
      </div>
    </div>
  );
}