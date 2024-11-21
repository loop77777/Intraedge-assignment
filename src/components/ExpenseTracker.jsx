import React, { useState } from "react";
import "../App.css";

const ExpenseTracker = () => {
  // state for managing transactions
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Expense");

  const addTransaction = () => {
    const newTransaction = {
      amount: parseFloat(amount),
      description,
      date,
      type,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setDate("");
    setType("Expense");
  };

  const deleteTransaction = (index) => {
    // filter out the transaction at the given index
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
  };

  const getNetBalance = () => {
    return transactions.reduce((acc, transaction) => {
      // if transaction type is income, add the amount to the accumulator, otherwise subtract the amount
      return transaction.type === "Income"
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  };

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.description} - {transaction.type}{" "}
            - ${transaction.amount}
            <button onClick={() => deleteTransaction(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Net Balance: ${getNetBalance()}</h3>
    </div>
  );
};

export default ExpenseTracker;
