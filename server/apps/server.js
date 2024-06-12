import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from "./configs/dbConnect.js";
import router from "./routes/index.js";
import { verifyJwt } from "./utils/jwt.js";
import { firebaseAdmin } from "./utils/firebaseAdmin.js";

// Call the connectToDB function
connectDB();
firebaseAdmin();
// Create an Express application
const app = express();
export const server = createServer(app);

//global middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

//use "/KitchenConnect/api" before every back-end api...
app.use("/KitchenConnect/api", router);

// Define a route that responds with a message when accessed
app.get("/", (req, res) => {
  res.status(200).json({ message: "This is KitchenConnect" });
});

// Specify the port number
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server for KitchenConnect is listening on port ${port}...`);
});

export const io = new Server(server,{
  cors:{
    origin: "*",
    methods:["GET", "POST"]
  }
})

export let providers = {}


io.on('connection', (socket) =>{
  console.log('Socket Connected')

  socket.on('register-provider', (data) => {
    const providerID = verifyJwt(data.providerID).decoded.userID
    providers[providerID] = socket.id;
    console.log(providerID, " registered with ", socket.id)
  });

  socket.on('disconnect-provider', () => {
    
    for (let providerID in providers) {
      if (providers[providerID] === socket.id) {
        delete providers[providerID];
        break;
      }
    }
    console.log('Provider Disconnected!')
  });
})

export default providers;


