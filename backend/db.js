const mongoose = require("mongoose");

const mongoURI =
  "mongodb://samriddhidev:anmolanmol@ac-wkkicuf-shard-00-00.b4yivxp.mongodb.net:27017,ac-wkkicuf-shard-00-01.b4yivxp.mongodb.net:27017,ac-wkkicuf-shard-00-02.b4yivxp.mongodb.net:27017/vegfood?ssl=true&replicaSet=atlas-8jw43y-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  let data;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    const fetched_data = mongoose.connection.db.collection("food_items");
    data = await fetched_data.find({}).toArray();
    
  } catch (error) {
    console.error("Error connecting to the database", error);
    // Handle the error here or throw it to be caught by the calling function
    throw error;
  }

  if (data) {
    global.food_items = data;
  }
};

module.exports = connectDB;
