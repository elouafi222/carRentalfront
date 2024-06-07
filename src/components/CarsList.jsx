import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import { API_URL } from '../util/constants'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
function CarsList() {
    const [cars, setCars] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      const fetchBrands = async () =>{
        try {
          setIsLoading(true)
          const res = await axios.get(`${API_URL}/car?page=1`)
          setCars(res.data.cars)
        } catch (error) {
          console.log("Fetching cars failed" + error);
        } finally {
          setIsLoading(false)
        }
      }
      fetchBrands();
    }, [])
    
  return (
   <div className=" p-4  px-lg-5 cars-list text-center ">
      <h1 className='mb-3'>Find your dream car</h1>
      <p>Rent your perfect car hassle-free at RentalCars Morocco. Customize your booking with payment options, chauffeur services, and delivery preferences. Your journey starts here!</p>
    <div className="row ">
    {
      isLoading ? 
     <Loader />
      : (
        <>
        {
  cars?.map((item) => (
   <CarItem car={item} key={item._id}  />
  ))
}
</>
      )
    }
    </div>
    <Link to="/cars">
    <button className='mt-3 px-3 py-1'>Explore More ...</button>
    </Link>
   </div>
  )
}

export default CarsList