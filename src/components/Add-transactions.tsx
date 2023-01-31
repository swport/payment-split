import * as React from "react";
import { useTripContext } from "./Trips/Trip-context/Trip-context";

import type { FriendType, TxnInputType } from "./Trips/Trip-context/Trip-types";

const AddTransactions = () => {
  const { friends, txns, addTxn, removeTxn } = useTripContext();

  const [selectedFriend, setSelectedFriend] = React.useState<
    FriendType["id"] | undefined
  >(undefined);
  const [txnAmount, setTxnAmount] = React.useState<TxnInputType["amount"]>(0.0);

  const onTxnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setTxnAmount(amount ?? 0.0);
  };

  const onFriendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (id) {
      setSelectedFriend(id);
    }
  };

  const onTxnAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedFriend) {
      return alert("Please select a friend");
    }

    if (txnAmount <= 0) {
      return alert("Invalid transaction amount");
    }

    addTxn(selectedFriend, {
      amount: txnAmount,
    });

    setTxnAmount(0.0);
  };

  return (
    <div>
      <h4 className="font-bold text-lg">Add transactions</h4>

      {!friends.length ? (
        <p className="bd-light">Please start by adding friends</p>
      ) : null}

      <div className="row row-center">
        <select
          onChange={onFriendChange}
          value={selectedFriend}
          className="col"
        >
          <option value="">-Select friend-</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
        <input
          onChange={onTxnAmountChange}
          value={txnAmount}
          type="number"
          onFocus={(e) => e.target.select()}
          step="1"
          placeholder="Amount spent"
          className="col"
        />
        <button
          onClick={onTxnAdd}
          type="button"
          className="button clear text-success"
        >
          Add
        </button>
      </div>

      <div>
        <ul>
          {txns.map((txn) => (
            <li key={txn.id} className="row row-center">
              <div className="row row-center">
                <div className="col">
                  <b>{txn.friend.name}</b> paid <b>{txn.amount}</b>
                </div>
                <button
                  onClick={() => removeTxn(txn.id)}
                  className="button clear text-error"
                >
                  x remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTransactions;
