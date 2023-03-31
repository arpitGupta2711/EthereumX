import mongoose from "mongoose";
const { Schema } = mongoose;

//Schema to store transactions of an user
const TransactionsSchema = new Schema(
  {
    address: {
      type: String,
      unique: true,
      required: [true, "Transactions must be from an address"],
    },
    transactions: [
      {
        blockNumber: {
          type: String,
          requried: true,
        },
        timeStamp: {
          type: Number,
          required: true,
        },
        nonce: {
          type: Number,
          required: true,
        },
        blockHash: {
          type: String,
          required: true,
          unique: true,
        },
        transactionIndex: {
          type: Number,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
        },
        value: {
          type: Number,
          required: true,
        },
        gas: {
          type: Number,
          required: true,
        },
        gasPrice: {
          type: Number,
          required: true,
        },
        isError: {
          type: Boolean,
          default: false,
        },
        txreceipt_status: {
          type: Boolean,
        },
        input: String,
        contractAddress: String,
        cumulativeGasUsed: {
          type: Number,
          required: true,
        },
        gasUsed: {
          type: Number,
          required: true,
        },
        confirmations: {
          type: Number,
          required: true,
        },
        methodId: String,
        functionName: String,
      },
    ],
  },

  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionsSchema);
export default Transaction;
