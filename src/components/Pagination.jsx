import React from "react";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="mt-3 d-flex justify-content-center w-100 ">
      <ul className="pagination d-flex align-items-center">

         {
            currentPage !== 1 &&
             <li
             onClick={() => setCurrentPage((prev) => prev - 1)}
             aria-label="Previous"
             className="px-1 mx-1"
           >
           <i className="fa-solid fa-arrow-left"></i>
           </li>
         }
        {generatedPages.map((page) => (
          <li
          onClick={() => setCurrentPage(page)}
          key={page}
            className={`pointer px-1 mx-1 ${currentPage === page ? "active" : ""}`}
          >
              {page}
          </li>
        ))}
         {currentPage !== pages &&
             <li
             className="px-1 mx-1"
             aria-label="Next"
             onClick={() => setCurrentPage((next) => next + 1)}
           >
           <i className="fa-solid fa-arrow-right"></i>
           </li>
         }
      </ul>
    </div>
  );
}

export default Pagination;