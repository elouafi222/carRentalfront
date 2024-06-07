import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
import { API_URL } from "../../../util/constants";
import { useSelector } from "react-redux";
import axios from "axios";
const PieChartComponent = ({ token }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axios.get(`${API_URL}/booking/bookingsByBrand`, {
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
  //       _id: "Duster",
  //       totalBookings: 3,
  //     },
  //     {
  //       _id: "BMW",
  //       totalBookings: 3,
  //     },
  //     {
  //       _id: "Toyota",
  //       totalBookings: 2,
  //     },
  //   ];
  return (
    <div className="graphe box-white px-3 py-2 mb-2 pb-4 ">
      <h1>Booking Counts by Car Brand</h1>
      <ResponsiveContainer width="100%" height={248}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalBookings"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#ff7800"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
