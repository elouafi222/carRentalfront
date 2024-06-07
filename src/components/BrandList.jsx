import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../lib/util';
import axios from 'axios';
import { API_URL } from '../util/constants';
import { Link } from 'react-router-dom';
import Loader from './Loader';
function BrandList() {
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchBrands = async () =>{
      try {
        setIsLoading(true)
        const res = await axios.get(`${API_URL}/car/brands`)
        setBrands(res.data)
      } catch (error) {
        console.log("Fetching brands failed" + error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchBrands();
  }, [])
  
  return (
    <div className=" p-4  px-lg-5 brand-list d-flex text-center flex-column justify-content-center py-3">
        <h1 className='mb-3'>Our Luxury brands available for rental</h1>
        {
        isLoading ? 
        <Loader />
        : (
          <>
         <Carousel
        transitionDuration={0.5}
        autoPlay={true}
        rewind={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        arrows={false}
        responsive={responsive}
        
      >
      
           {brands.map((brand, index) => (
            <div key={index} className="img-box mx-2 d-flex align-items-end justify-content-center" >
            <div className="row w-100 d-flex align-items-center mb-3 ">
            <div className="col-6 brand">
            {brand}
            </div>
            <div className="col-6">
               <Link to={`cars?brand=${brand}`} className='link'> <button className="p-1 d-flex px-1 align-items-center justify-content-center w-100">Discover</button></Link>
                </div>
            </div>
    </div>
        ))}
       
      </Carousel>
      </>
        )
       }
    </div>
  )
}

export default BrandList