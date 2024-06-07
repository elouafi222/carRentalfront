import data from "../lib/data.json";
import React from "react";
function Conditions() {

  return (
    <div
      id="condition"
      className="p-4 px-lg-5 condition d-flex flex-column align-items-center"
    >
      <h1 className="mb-3  text-center">General conditions</h1>
      <p>
        Please read the following general conditions carefully before
        proceeding. These conditions outline the terms of use and agreement
        between you (the client) and CARRENTAL regarding the services provided.
        By using our services, you agree to abide by these conditions.
      </p>
      <div className="accordion box-white  p-3" id="accordionExample">
        {data.services.map((serv, index) => (
          <div className="my-1 condition-box" key={index}>
            <div
              id={`serv${index}`}
              className="d-flex flex-row justify-content-between align-items-center condition-button px-5 py-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              <span>{serv.title}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div
              id={`collapse${index}`}
              className="condition-desciption collapse px-3 py-2 box-grey"
              aria-labelledby={`serv${index}`}
              data-bs-parent="#accordionExample"
            >
              {serv.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conditions;
