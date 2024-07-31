// routes/pieChart.js
const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/piechart", async (req, res) => {
  const { month } = req.query;
  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `-${month}-` },
    });
    const categoryData = transactions.reduce((acc, transaction) => {
      if (acc[transaction.category]) {
        acc[transaction.category]++;
      } else {
        acc[transaction.category] = 1;
      }
      return acc;
    }, {});

    const data = Object.keys(categoryData).map((category) => ({
      category,
      count: categoryData[category],
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
});

module.exports = router;
