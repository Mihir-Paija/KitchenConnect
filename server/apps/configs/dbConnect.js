import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const uri = process.env.DB_CONNECTION_STRING;
    const connect = await mongoose.connect(uri);
    console.log(
      "Database Connected: ",
      connect.connection.host,
      connect.connection.name
    );
    return connect; // Return the connection object if needed
  } catch (err) {
    console.error("Error connecting to database : ", err.message);
    process.exit(1);
  }
};

export { connectDB }; // Export the connectToDB function
