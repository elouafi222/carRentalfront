import React, { useEffect, useState } from "react";
import { API_URL } from "../util/constants";
import axios from "axios";
import { Link } from "react-router-dom";

function HomeCitiesList() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/car/cities`);
        setCities(res.data);
      } catch (error) {
        console.log("Fetching brands failed" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <>
          {cities.map((item, index) => (
            <span key={index} className="col-6  col-md-4 col-lg-3 d-flex justify-content-center py-1">
              <Link
                to={`cars?city=${item.cityName}`}
                className="link p-1 w-100 
                   text-center"
              >
                {item.cityName} ({item.carCount})
              </Link>
            </span>
          ))}
        </>
      )}
    </>
  );
}

export default HomeCitiesList;
