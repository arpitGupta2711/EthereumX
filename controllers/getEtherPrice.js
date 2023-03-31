import mongoose from "mongoose";
import axios from "axios";


//function returning the current price of ether
export const getEtherPrice = async () => {
  try {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";
    const price = await axios.get(url);
    return price.data.ethereum.inr;
  } catch (error) {
    console.log(error);
  }
};
