import * as React from "react";
import SplitPaymentCalculator, {
  type ComputedTxns,
  type ExpensesType,
} from "../services/SplitPaymentCalculator";
import { useTripContext } from "./Trips/Trip-context/Trip-context";

import type { TxnListType, TxnType } from "./Trips/Trip-context/Trip-types";

const consolidate_expenses = (txns: TxnListType): ExpensesType => {
  const _txns = txns.reduce((acc, txn) => {
    const friend_id = txn.friend.id;
    const amount = parseFloat(txn.amount.toFixed(2));

    if (acc[friend_id]) {
      acc[friend_id]["amount"] += amount;
    } else {
      acc[friend_id] = { ...txn };
    }

    return acc;
  }, {} as { [key: number]: TxnType });

  return Object.values(_txns);
};

const Payments = () => {
  const { txns } = useTripContext();

  const [total, setTotal] = React.useState<number | undefined>();
  const [transactions, setTransactions] = React.useState<
    ComputedTxns | undefined
  >();

  React.useEffect(() => {
    const t = new SplitPaymentCalculator(consolidate_expenses(txns));

    setTotal(t.get_total());
    setTransactions(t.get_transactions());
  }, [txns]);

  return (
    <>
      <h5>Final payments:</h5>
      <div>
        {transactions?.length ? (
          transactions?.map((txn, idx) => (
            <p key={idx}>
              <b>{txn.from_friend.name}</b> gives <b>{txn.to_friend.name}</b>{" "}
              {Number(txn.amount)}
            </p>
          ))
        ) : (
          <p>
            <b>Nobody pays anything to anyone</b>
          </p>
        )}
      </div>
      <p>Total: {total}</p>
    </>
  );
};

export default Payments;
