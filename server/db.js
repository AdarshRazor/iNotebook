const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority";

const connectToMongo = async function () {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Hurray !! Connected to MongoDB");
  } catch (error) {
    console.error("Oh No !! Failed to connect to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
