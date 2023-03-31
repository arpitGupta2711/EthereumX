import axios from "axios";
import Transaction from "../models/transaction.js";


//function for getting all the transactions of the user and saving it in database
export const getTransaction = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const address = req.params.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
    const transactions = await axios.get(url);
    const userTransactions = await Transaction.findOneAndUpdate(
      {
        address
      },
      { transactions: transactions.data.result },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(userTransactions);
  } catch (error) {
    console.log('hi there is an error',error);
    res.send('User not found')

  }
};
