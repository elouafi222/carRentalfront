import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../util/constants";
import Loader from "./Loader";

function LocationsList() {
  const [location, setlocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/location`);
        setlocation(res.data.locations);
      } catch (error) {
        console.log("Fetching location failed" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className=" p-4  px-lg-5 location-list text-center ">
      <h1 className="mb-3">Some of our locations</h1>
      <p>
        Rent your perfect car hassle-free at Rentallocation Morocco. Customize
        your booking with payment options, chauffeur services, and delivery
        preferences. Your journey starts here!
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {location?.map((item) => (
            <div key={item._id} className="col-md-4 p-3">
              <div className="location-box box-white h-100 p-3 ">
                <div className="px-3 mb-3">
                  <div className="row box-grey px-3 py-2 mb-3">
                    <i className="fa-solid fa-building mb-2"></i>
                    <h1>{item?.name}</h1>
                    <span className="d-flex align-items-center">
                      <i className="me-1 fa-solid fa-location-dot"></i>
                      <p className="m-0">
                        {item?.cityId.name} - {item?.adresse}
                      </p>
                    </span>
                    <div className="mt-1 d-flex justify-content-between">
                      <span className="d-flex align-items-center">
                        <i className="me-1 fa-solid fa-phone"></i>
                        <p className="m-0">{item.phone}</p>
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="me-1 fa-solid fa-car"></i>
                        <p className="m-0"> x {item?.cars.length} </p>
                      </span>
                    </div>
                  </div>
                  <Link className="link" to={`/cars?loc=${item?._id}`}>
                    {" "}
                    <button className="p-1 d-flex px-1 align-items-center justify-content-center w-100">
                      Explore NOW
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationsList;
