import React from 'react'
import { motion } from "framer-motion";
function Loader() {
  return (
    <div 
    
     className='loader d-flex justify-content-center align-items-center'>
       {/* <motion.i 
        initial={{x: "-50vw"}}
        animate={{x :"52vw"}}
        transition={{ duration: 10, repeat: Infinity }}
         className="fa-solid fa-car-side"></motion.i> */}
         <div className="spinner-grow" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
       </div>
  )
}

export default Loader