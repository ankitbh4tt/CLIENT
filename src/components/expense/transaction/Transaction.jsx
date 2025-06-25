import React from "react";

const Transaction = ({ transactions = [], type = "expense" }) => {
  return (
    <div>
      {console.log(transactions)}
      {transactions?.map((txns) => (
        <div>
          {Object.entries(txns).map((key, val) => (
            <span>
              {key}
              {val}
            </span>
          ))}
        </div>
      ))}
      {type}
    </div>
  );
};

export default Transaction;
