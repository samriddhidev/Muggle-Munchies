const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://samriddhidev:samriddhi9729547448@cluster0.21qpffp.mongodb.net/?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You are successfully connected to the database");

    const fetched_data = mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};

module.exports = connectToMongoDB;
