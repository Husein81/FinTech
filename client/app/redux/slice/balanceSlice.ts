import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transactions: Transaction[];
}

const initialState: BalanceState = {
  transactions: [],
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    runTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const { runTransaction, clearTransactions } = balanceSlice.actions;

export const selectBalance = (state: { balance: BalanceState }) =>
  state.balance.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );


export default balanceSlice.reducer;
