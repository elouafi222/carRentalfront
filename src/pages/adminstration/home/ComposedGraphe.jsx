import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
} from "recharts";
import { API_URL } from "../../../util/constants";
import axios from "axios";

const ComposedGraphe = ({ token }) => {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchStatistics() {
  //     try {
  //       const response = await axios.get(`${API_URL}/booking/requestsByMonth`, {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching statistics", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchStatistics();
  // }, [token]);
  const data = [
    { month: "Jan", count: 20, completed: 10, canceled: 1 },
    { month: "Feb", count: 15, completed: 12, canceled: 4 },
    { month: "Mar", count: 25, completed: 15, canceled: 4 },
    { month: "Apr", count: 30, completed: 5, canceled: 3 },
    { month: "May", count: 18, completed: 12, canceled: 6 },
    { month: "Jun", count: 22, completed: 20, canceled: 4 },
    { month: "Jul", count: 28, completed: 14, canceled: 7 },
    { month: "Aug", count: 33, completed: 15, canceled: 8 },
    { month: "Sep", count: 26, completed: 16, canceled: 9 },
    { month: "Oct", count: 19, completed: 17, canceled: 4 },
    { month: "Nov", count: 24, completed: 11, canceled: 3 },
  ];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="graphe h-100">
      <h1>Booking Requests in Last Year</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            name="Number of booking requests"
            dataKey="count"
            stroke="#ff4613"
          />
          <Line
            type="monotone"
            name="Number of booking completed"
            dataKey="completed"
            stroke="#33cc33"
          />
          <Line
            type="monotone"
            name="Number of booking canceled"
            dataKey="canceled"
            stroke="#ff3333"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedGraphe;
