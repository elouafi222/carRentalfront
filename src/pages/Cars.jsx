import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL, CARS_PER_PAGE } from "../util/constants";
import axios from "axios";
import CarItem from "../components/CarItem";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Cars() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const search = queryParams.get("search");
  const brand = queryParams.get("brand");
  const loc = queryParams.get("loc");
  const [searchText, setSearchText] = useState(search ? search : "");
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        let res;
        if (city) {
          res = await axios.get(
            `${API_URL}/car?city=${city}&page=${currentPage}`
          );
        } else if (brand) {
          res = await axios.get(
            `${API_URL}/car?brand=${brand}&page=${currentPage}`
          );
        } else if (loc) {
          res = await axios.get(
            `${API_URL}/car?loc=${loc}&page=${currentPage}`
          );
        } else if (searchText.trim() !== "") {
          res = await axios.get(
            `${API_URL}/car?search=${searchText}&page=${currentPage}`
          );
        } else {
          res = await axios.get(`${API_URL}/car?page=${currentPage}`);
        }
        setCars(res.data.cars);
        setCount(res.data.count);
      } catch (error) {
        console.log("Fetching cars failed" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, [currentPage, searchText, city, brand, loc]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Cars</title>
      </Helmet>
      <div className="p-4  px-lg-5 cars-list">
        <div className="row">
          <div
            className={`${city || brand || loc ? "col-md-12" : "col-md-6"} `}
          >
            <div className="page-path  px-3 py-1">
              <Link to="/" className="link">
                <span className="one">
                  Home<i className="fa-solid fa-chevron-right ms-1"></i>{" "}
                </span>
              </Link>
              <span className="ms-2 two">
                Cars list <i className="fa-solid fa-chevron-right ms-1"></i>{" "}
              </span>
              <span className="ms-2 three">
                {city
                  ? city
                  : brand
                  ? brand
                  : loc
                  ? "Location " + cars[0]?.location.name
                  : ""}
                {search && "Search"}
              </span>
            </div>
          </div>
          {!(city || brand || loc) && (
            <div className="col-md-6 mt-2 mt-lg-0  cars-search">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                className="form-control w-100 "
                placeholder="City, Brand, Price per day , ect ..."
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          )}
        </div>
        {searchText && cars.length > 0 && (
          <p className="p-0 m-0 mt-3 text-center search-result">
            <i className="fa-solid fa-car me-2"></i>x {count} results
          </p>
        )}
        <div className="row p-0">
          {isLoading ? (
            <Loader />
          ) : cars.length > 0 ? (
            <>
              {cars?.map((item) => (
                <CarItem car={item} key={item._id} />
              ))}
            </>
          ) : (
            <p className="m-0 mt-3 text-center">
              No result about "{`${searchText}`}" <br />
              <i className="fa-solid fa-circle-exclamation"></i>
            </p>
          )}
        </div>
        {cars.length > 0 && (
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </HelmetProvider>
  );
}

export default Cars;
