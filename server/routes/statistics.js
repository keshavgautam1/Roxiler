const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/statistics", async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $regex: `-${month}-` } };

  try {
    const transactions = await Transaction.find(query);
    const totalSale = transactions.reduce(
      (acc, transaction) => acc + transaction.price,
      0
    );
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.filter((t) => !t.sold).length;

    res.json({ totalSale, soldItems, notSoldItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
});

module.exports = router;
