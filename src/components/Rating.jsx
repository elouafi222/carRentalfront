import React from "react";

function Rating({ rating }) {
  const totalStars = rating?.reduce((acc, curr) => acc + curr.rateStars, 0);
  const averge = Math.ceil(totalStars / rating?.length);
  return (
    <span className=" rating ">
      <i className={`${averge >= 1 ? "fa-solid " : "fa-regular"} fa-star `}></i>
      <i className={`${averge >= 2 ? "fa-solid " : "fa-regular"} fa-star `}></i>
      <i className={`${averge >= 3 ? "fa-solid " : "fa-regular"} fa-star `}></i>
      <i className={`${averge >= 4 ? "fa-solid " : "fa-regular"} fa-star `}></i>
      <i className={`${averge >= 5 ? "fa-solid " : "fa-regular"} fa-star `}></i>
    </span>
  );
}
export default Rating;
