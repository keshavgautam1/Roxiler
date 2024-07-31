const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/transactions", async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;
  const regex = new RegExp(search, "i");
  const query = {
    $or: [{ title: regex }, { description: regex }, { price: regex }],
    dateOfSale: { $regex: `-${month}-` },
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

module.exports = router;
