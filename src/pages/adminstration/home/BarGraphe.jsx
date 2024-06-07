import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

function BarGraphe({ token }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axios.get(`${API_URL}/booking/requestsByCity`, {
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
  // const data = [
  //   {
  //     requests: 3,
  //     city: "CASABLANCA",
  //   },
  //   {
  //     requests: 5,
  //     city: "MARRAKECH",
  //   },
  //   {
  //     requests: 2,
  //     city: "RABAT",
  //   },
  //   {
  //     requests: 7,
  //     city: "TANGIER",
  //   },
  //   {
  //     requests: 4,
  //     city: "AGADIR",
  //   },
  //   {
  //     requests: 6,
  //     city: "FES",
  //   },
  //   {
  //     requests: 1,
  //     city: "MEKNES",
  //   },
  //   {
  //     requests: 3,
  //     city: "OUJDA",
  //   },
  //   {
  //     requests: 5,
  //     city: "CHEFCHAOUEN",
  //   },
  //   {
  //     requests: 8,
  //     city: "ESSAOUIRA",
  //   },
  // ];

  return (
    <div
      className="graphe box-white px-3 py-2 mb-2 pb-4"
      style={{ width: "100%", height: 250 }}
    >
      <h1>Request per cities</h1>
      <ResponsiveContainer>
        <BarChart width={400} height={300} data={data}>
          <XAxis dataKey="city">
            <Label value="Cities" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Requests" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar
            dataKey="requests"
            display={true}
            name="Requests number"
            fill="#ff7800"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraphe;
