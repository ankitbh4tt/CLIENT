import React from "react";
import { format } from "date-fns";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const Transaction = ({ transactions = [], type }) => {
  const toTitleCase = (str) => {
    const string = str.split("");
    const titledCase = string.map((st, idx) => {
      return idx !== 0 ? st.toLowerCase() : st;
    });
    return titledCase.join("");
  };
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
          <TransactionCard
            key={txns._id}
            txns={txns}
            toTitleCase={toTitleCase}
          />
        ))}
      </div>
    </div>
  );
};

const TransactionCard = ({ txns, toTitleCase }) => {
  return (
    <div
      className={`${
        txns.type.toLowerCase() === "income" ? "bg-green-200" : "bg-red-200"
      } px-6 py-3 rounded-md`}
    >
      <div className="flex items-center gap-1 justify-between">
        <div>
          <span className="font-semibold uppercase">{txns.title}</span>
          <span className="text-[10px] font-semibold text-gray-500">
            &#183; {toTitleCase(txns.source || txns.category)}
            {/* {txns.source || txns.category} */}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {txns.type.toLowerCase() === "income" ? (
            <GiPayMoney />
          ) : (
            <GiReceiveMoney />
          )}
          <span>{format(txns.createdAt, "yyyy-mm-dd")}</span>
        </div>
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
      <span className="flex items-center gap-1">
        Total {type.toLowerCase() === "income" ? "Income" : "Expense"}{" "}
        <GiMoneyStack />
      </span>
      <span className="flex justify-center">
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
