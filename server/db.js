const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://adarshere:adarsh12345@nootbook.euo459b.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Nootbook";

const connectToMongo = async function () {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Hurray !! Connected to MongoDB");
  } catch (error) {
    console.error("Oh No !! Failed to connect to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
