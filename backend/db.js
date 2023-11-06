const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://samriddhidev:anmolanmol@cluster0.b4yivxp.mongodb.net/vegfood?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database");

    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    console.log("Data from the collection:");
    console.log(data);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports = connectDB;
