import Transaction from "../models/transaction.js";
import { getEtherPrice } from "./getEtherPrice.js";

//function for getting the balance of the user and the current price of ether
export const getBalance = async (req, res) => {
  try {
    const address = req.params.address;
    console.log(address);
    let totalBalance = 0;
    const data = await Transaction.findOne(
      { address },
      { "transactions.value": 1, "transactions.to": 1, "transactions.from": 1 }
    );
    console.log("data received", data);
    if (!data) {
      return res.status(404).send("User not found");
    }
    const allTransactions = data.transactions;
    allTransactions.forEach((data) => {
      if (data.from.toLowerCase() === address.toLowerCase()) {
        totalBalance -= parseInt(data.value);
      }
      if (data.to.toLowerCase() === address.toLowerCase()) {
        totalBalance += parseInt(data.value);
      }
    });
    const price = await getEtherPrice();
    res.status(200).json({
      currentBalance: totalBalance,
      currentPrice: price,
    });
    console.log("finding the data", data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
