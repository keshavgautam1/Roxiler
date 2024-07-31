// seedDatabase.js
const axios = require("axios");
const Transaction = require("./models/Transaction");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/transactions", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data.map((transaction) => ({
      ...transaction,
      dateOfSale: transaction.dateOfSale.split("T")[0], // Ensure date format is consistent
    }));

    await Transaction.insertMany(transactions);
    console.log("Database seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

seedDatabase();
