import React from "react";
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

function GroupedBarChart({ token }) {
  const data = [
    {
      requested: 1,
      inProgress: 2,
      completed: 3,
      canceled: 4,
      city: "CASABLANCA",
    },
    {
      requested: 2,
      inProgress: 0,
      completed: 2,
      canceled: 3,
      city: "MARRAKECH",
    },
    {
      requested: 1,
      inProgress: 0,
      completed: 3,
      canceled: 0,
      city: "RABAT",
    },
    {
      requested: 0,
      inProgress: 2,
      completed: 1,
      canceled: 1,
      city: "FES",
    },
    {
      requested: 3,
      inProgress: 1,
      completed: 0,
      canceled: 0,
      city: "TANGIER",
    },
    {
      requested: 0,
      inProgress: 0,
      completed: 4,
      canceled: 0,
      city: "AGADIR",
    },
    {
      requested: 2,
      inProgress: 1,
      completed: 1,
      canceled: 0,
      city: "MOROCCO",
    },
    {
      requested: 1,
      inProgress: 0,
      completed: 2,
      canceled: 1,
      city: "MEKNES",
    },
    {
      requested: 0,
      inProgress: 3,
      completed: 1,
      canceled: 0,
      city: "OUJDA",
    },
    {
      requested: 2,
      inProgress: 1,
      completed: 1,
      canceled: 0,
      city: "SAFI",
    },
  ];

  return (
    <div
      className="graphe box-white px-3 py-2 mb-2 pb-4"
      style={{ width: "100%", height: 300 }}
    >
      <h1>Bookings per City by Status</h1>
      <ResponsiveContainer>
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="city">
            <Label name="cities" offset={0} position="insideLeft" />
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
          />
          <Bar
            dataKey="inProgress"
            name="In Progress"
            stackId="status"
            fill="#FF8D21"
          />
          <Bar
            dataKey="completed"
            name="Completed"
            stackId="status"
            fill="#FFA652"
          />
          <Bar
            dataKey="canceled"
            name="Canceled"
            stackId="status"
            fill="#FFB76B"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GroupedBarChart;
