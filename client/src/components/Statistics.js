// src/components/Statistics.js
import React from "react";

const Statistics = ({ data }) => (
  <div>
    <h2>Statistics - {data.month}</h2>
    <div>Total Sale: {data.totalSale}</div>
    <div>Total Sold Items: {data.soldItems}</div>
    <div>Total Not Sold Items: {data.notSoldItems}</div>
  </div>
);

export default Statistics;
