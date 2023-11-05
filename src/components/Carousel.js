import React from "react";

export default function Carousel() {
  return (
    <div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{zIndex:"10"}}>
              <form Name="d-flex">
                <input
                  Name="form-control me-2"
                  type="search"
                  placeh older="Search"
                  aria-label="Search"
                />
                <button Name="btn btn-outline-success text-white bg-success" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div>
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              NameName="d-block w-100"
              style={{filter:"brightness(30%"}}
            />
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pastry"
              className="d-block w-100"
              style={{filter:"brightness(30%"}} alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?barbeuque"
              className="d-block w-100"
              style={{filter:"brightness(30%"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
