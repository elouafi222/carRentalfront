import React, { useEffect } from "react";
import CarsList from "../components/CarsList";
import BrandList from "../components/BrandList";
import Conditions from "../components/Conditions";
import HomeCitiesList from "../components/HomeCitiesList";
import HomeSearchInput from "../components/HomeSearchInput";
import { Helmet, HelmetProvider } from "react-helmet-async";

import LocationsList from "../components/LocationsList";
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div
        id="home"
        className=" home d-flex flex-column justify-content-center align-items-center"
      >
        <div className="custom-shape-divider-bottom-1716492993">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h1>Cars for rent</h1>
        <p>Explore thse availiable cars in different locations</p>
        <div className="seach-container mt-5  px-2 px-lg-5 d-flex flex-column justify-content-center align-items-center">
          <HomeSearchInput />
          <div className="cities  row w-100">
            <HomeCitiesList />
          </div>
        </div>
      </div>
      <BrandList />
      <CarsList />
      <LocationsList />
      <Conditions />
    </HelmetProvider>
  );
}

export default Home;
