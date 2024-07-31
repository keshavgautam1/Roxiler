// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable.js";
import Statistics from "./components/Statistics.js";
import BarChart from "./components/BarChart.js";
import PieChart from "./components/PieChart.js";
import "./App.css";

const App = () => {
  const [month, setMonth] = useState("March");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/combined?month=${month}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {data && (
        <>
          <Statistics data={data.statistics} />
          <TransactionsTable data={data.transactions} />
          <BarChart data={data.barChart} />
          <PieChart data={data.pieChart} />
        </>
      )}
    </div>
  );
};

export default App;
