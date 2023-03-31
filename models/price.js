import mongoose from "mongoose";
const { Schema } = mongoose;

//Schema to store ether price 
const etherPriceSchema = new Schema(
  {
    price: {
      type: Number,
      required: [true, "Ether should have a price"],
    },
  },
  { timestamps: true }
);

const EtherPrice = new mongoose.model("EtherPrice", etherPriceSchema);
export default EtherPrice;
