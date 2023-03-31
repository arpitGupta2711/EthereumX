import * as dotenv from "dotenv";
dotenv.config();
import schedule from "node-schedule";
import mongoose from "mongoose";
import express from "express";
import transactionRoutes from "./routes/transactionRoutes.js";
import { getEtherPrice } from "./controllers/getEtherPrice.js";
import EtherPrice from "./models/price.js";
import helmet from "helmet";
const app = express();

const PORT = process.env.port;


//using the routes defined using express router 
app.use("/transaction", transactionRoutes);
const CONNECTION_URL = process.env.CONNECTION_URL;

//middleware for security
app.use(helmet);


//home page 
app.get('/',(req,res)=>{
    res.send('This is a KoinX server. Use endpoints "/transaction/address_of_user" to get the transactions of a user and "/transaction/balance/address_of_the_user" to get the balance of the ether and current price. Please note that the ether price is in wei, where 1 eth = 10^18 wei')
})



//connecting to mongoose and on successfull connection starting our server
mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });   
//scheduler using cron experssion to run this  function every 10 minutes
schedule.scheduleJob("*/10 * * * *", async () => {
  try {
    const price = await getEtherPrice();
    const newEtherPrice = new EtherPrice({
      price: price,
    });
    await newEtherPrice.save();
    console.log(`Currently ether price is ${price}`);
  } catch (err) {
    console.log("Could not fetch ether price");
  }
});
