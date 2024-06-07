import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeSearchInput() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const MoveSearch = () => {
    if (search.trim()) {
      navigate(`/cars?search=${search}`);
    }
  };
  return (
    <div className="form-floating mb-3 d-flex w-100">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="email"
        className="form-control rounded-end-0"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label htmlFor="floatingInput">City, Brand, Price , ect ...</label>
      <button onClick={MoveSearch} className="rounded-start-0">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default HomeSearchInput;
