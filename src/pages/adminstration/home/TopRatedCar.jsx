import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { API_URL } from "../../../util/constants";

function CarRatingChart({ token }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axios.get(`${API_URL}/car/topRatedCar`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatistics();
  }, [token]);
  //   const data = [
  //     {
  //       avgRating: 5,
  //       numRaters: 1,
  //       model: "BMW 2020",
  //     },
  //     {
  //       avgRating: 3.6666666666666665,
  //       numRaters: 3,
  //       model: "Toyota 2023",
  //     },
  //     {
  //       avgRating: 3,
  //       numRaters: 1,
  //       model: "Duster 2024",
  //     },
  //   ];

  return (
    <div className="graphe box-white px-3 py-2 mb-2 pb-4">
      <h1>Car Ratings</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="model" />
          <YAxis>
            <Label value="Rating" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="avgRating" name="Average Rating" fill="#ff7800" />
          <Bar dataKey="numRaters" name="Number of Raters" fill="#FFB76B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CarRatingChart;
