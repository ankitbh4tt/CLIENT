import React from "react";

const Transaction = ({ transactions = [], type }) => {
  return (
    <div>
      <div className="flex justify-end my-4">
        {type.toLowerCase() === "income" ? (
          <SummaryCard type={"income"} transactions={transactions} />
        ) : type.toLowerCase() === "expense" ? (
          <SummaryCard type={"expense"} transactions={transactions} />
        ) : (
          <div className="flex gap-4">
            <SummaryCard type={"income"} transactions={transactions} />
            <SummaryCard type={"expense"} transactions={transactions} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {transactions?.map((txns) => (
          <TransactionCard key={txns._id} txns={txns} />
        ))}
      </div>
    </div>
  );
};

const TransactionCard = ({ txns }) => {
  return (
    <div
      className={`${
        txns.type.toLowerCase() === "income" ? "bg-green-200" : "bg-red-200"
      } px-6 py-3 rounded-md`}
    >
      <div className="flex items-center gap-1 justify-between">
        <span className="font-semibold uppercase">{txns.title}</span>
        <span className="text-[8px] font-bold text-gray-500 uppercase">
          {txns.source || txns.category}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{txns.description}</span>
        <span
          className={`${
            txns.type.toLowerCase() === "income"
              ? "text-green-900"
              : "text-red-900"
          } text-lg font-semibold`}
        >
          &#x20B9;{txns.amount}
        </span>
      </div>
    </div>
  );
};

const SummaryCard = ({ type, transactions }) => {
  return (
    <div
      className={`${
        type.toLowerCase() === "income" ? "bg-green-200" : "bg-red-200"
      }  flex flex-col gap-2 py-2 px-4 rounded-lg`}
    >
      <span>
        Total {type.toLowerCase() === "income" ? "Income" : "Expense"}{" "}
      </span>
      <span>
        &#x20B9;
        {transactions.reduce((acc, txn) => {
          return txn.type?.toLowerCase() === "income"
            ? acc + txn.amount
            : acc + txn.amount;
        }, 0)}
      </span>
    </div>
  );
};

export default Transaction;
