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
  LabelList, // Import LabelList component
} from "recharts";
import { API_URL } from "../../../util/constants";

function PerLocation({ token }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axios.get(
          `${API_URL}/booking/requestsByLocation`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
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
  //       totalBookings: 5,
  //       requested: 2,
  //       inProgress: 2,
  //       completed: 2,
  //       canceled: 1,
  //       location: "LocationMarrakech",
  //     },
  //     {
  //       totalBookings: 3,
  //       requested: 0,
  //       inProgress: 2,
  //       completed: 2,
  //       canceled: 0,
  //       location: "LocationCasa",
  //     },
  //     {
  //       totalBookings: 8,
  //       requested: 4,
  //       completed: 3,
  //       canceled: 1,
  //       location: "LocationRabat",
  //     },
  //     {
  //       totalBookings: 6,
  //       requested: 2,
  //       completed: 3,
  //       canceled: 1,
  //       location: "LocationTangier",
  //     },
  //     {
  //       totalBookings: 10,
  //       requested: 5,
  //       completed: 4,
  //       canceled: 1,
  //       location: "LocationAgadir",
  //     },
  //     {
  //       totalBookings: 7,
  //       requested: 3,
  //       inProgress: 2,
  //       completed: 2,
  //       canceled: 2,
  //       location: "LocationFes",
  //     },
  //     {
  //       totalBookings: 4,
  //       requested: 1,
  //       inProgress: 2,
  //       completed: 2,
  //       canceled: 1,
  //       location: "LocationEssaouira",
  //     },
  //     {
  //       totalBookings: 9,
  //       requested: 4,
  //       completed: 3,
  //       canceled: 2,
  //       location: "LocationChefchaouen",
  //     },
  //     {
  //       totalBookings: 5,
  //       requested: 2,
  //       completed: 1,
  //       canceled: 2,
  //       location: "LocationOuarzazate",
  //     },
  //     {
  //       totalBookings: 3,
  //       requested: 1,
  //       completed: 1,
  //       canceled: 1,
  //       location: "LocationMerzouga",
  //     },
  //   ];

  return (
    <div
      className="graphe box-white px-3 py-2 mb-2 pb-4"
      style={{ width: "100%", height: 300 }}
    >
      <h1>Bookings per locations</h1>
      <ResponsiveContainer>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="location">
            <Label name="locations" offset={0} position="insideLeft" />
          </XAxis>
          <YAxis>
            <Label name="Number" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar
            dataKey="requested"
            name="Requested"
            stackId="status"
            fill="#ff7800"
          >
            <LabelList dataKey="totalBookings" position="top" />
          </Bar>
          <Bar
            dataKey="inProgress"
            name="in Progress"
            stackId="status"
            fill="#FF8D21"
          >
            <LabelList dataKey="totalBookings" position="top" />
          </Bar>
          <Bar
            dataKey="completed"
            name="Completed"
            stackId="status"
            fill="#FFA652"
          >
            <LabelList dataKey="totalBookings" position="top" />
          </Bar>
          <Bar
            dataKey="canceled"
            name="Canceled"
            stackId="status"
            fill="#FFB76B"
          >
            <LabelList dataKey="totalBookings" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerLocation;
