/**
 * En Route - Itineraries page
 */

import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import PhotoCarousel from "../ui/carousel.jsx";
import { useNavigate } from "react-router-dom";
import itinerariesPreviewsData from "../../data/itineraryPreviews.json";

const Itineraries = () => {
  const [selectedCity, setSelectedCity] = useState("dublin");
  const navigate = useNavigate();
  const cities = ["Dublin", "NYC", "Paris", "Tokyo"];
  const carouselRef = useRef(null); // Create a ref for the carousel section
  const itinerariesPreviewsCity = itinerariesPreviewsData[selectedCity];

  const handleCityClick = (city) => {
    setSelectedCity(city.toLowerCase());

    // Scroll to the carousel section
    if (carouselRef.current) {
      const yOffset = -100; // Adjust this value to scroll slightly less
      const y =
        carouselRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Container
        fluid
        className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark">
        <h1 style={{ fontWeight: 700, color: "#b1f8b6" }}>
          Where do you want to go?
        </h1>
        <div className="mt-3">
          {cities.map((city) => (
            <Button
              key={city}
              onClick={() => handleCityClick(city)}
              className="mx-2"
              style={{
                backgroundColor:
                  selectedCity === city.toLowerCase() ? "#88e097" : "#555",
                border: "none",
                color: "#000",
              }}>
              {city}
            </Button>
          ))}
        </div>
      </Container>

      <Container
        ref={carouselRef}
        className="my-4 p-3 rounded"
        style={{ backgroundColor: "#0b524c" }}>
        <Row>
          <Col md={6}>
            <h2
              className="text-center p-3"
              style={{ color: "#F19EDC", fontWeight: "bold" }}>
              {selectedCity.toUpperCase()}
            </h2>

            <PhotoCarousel city={selectedCity} />
          </Col>

          <Col md={6} className="mt-4 mt-md-0">
            <h2
              className="text-center p-3"
              style={{ color: "#F19EDC", fontSize: "1.8rem" }}>
              Suggested itineraries
            </h2>

            <Accordion>
              {itinerariesPreviewsCity.map((itinerary, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{itinerary.title}</Accordion.Header>
                  <Accordion.Body>
                    {itinerary.description}
                    <div className="mt-auto d-flex justify-content-end">
                      <Button
                        style={{
                          backgroundColor: "#88e097",
                          border: "none",
                          color: "#000",
                        }}
                        onClick={() => navigate("/inside-itinerary")}>
                        Go
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Itineraries;
