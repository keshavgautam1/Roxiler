const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/combined", async (req, res) => {
  console.log("Combined data route hit");
  const { month } = req.query;

  try {
    const [
      transactionsResponse,
      statisticsResponse,
      barChartResponse,
      pieChartResponse,
    ] = await Promise.all([
      axios.get(`http://localhost:3001/api/transactions?month=${month}`),
      axios.get(`http://localhost:3001/api/statistics?month=${month}`),
      axios.get(`http://localhost:3001/api/barchart?month=${month}`),
      axios.get(`http://localhost:3001/api/piechart?month=${month}`),
    ]);

    res.json({
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
});

module.exports = router;
