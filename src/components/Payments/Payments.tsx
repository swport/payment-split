import * as React from "react";
import SplitPaymentCalculator, {
    type ComputedTxns,
    type ExpensesType,
} from "../../services/SplitPaymentCalculator";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import type {
    FriendType,
    TxnListType,
    TxnType,
} from "../Trips/Trip-context/Trip-types";

import PaymentsList from "./Payments-list";

const get_consolidate_expenses = (txns: TxnListType): ExpensesType => {
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
    const { txns, friends } = useTripContext();

    const [total, setTotal] = React.useState<number | undefined>();
    const [transactions, setTransactions] = React.useState<
        ComputedTxns | undefined
    >();
    const [filteredTxns, setFilteredTxns] = React.useState<
        ComputedTxns | undefined
    >();
    const [friend, setFriend] = React.useState<string>("0");

    const onFriendChange = (
        e:
            | React.ChangeEvent<
                  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
              >
            | SelectChangeEvent
    ) => {
      setFriend(e.target.value ?? "0");

      const friendId = Number(e.target.value);

      if( friendId && friendId > 0 ) {
        setFilteredTxns(
          transactions?.filter(txn => txn.from_friend.id === friendId)
        );
      } else {
        setFilteredTxns(transactions);
      }
    };

    React.useEffect(() => {
        const payments = new SplitPaymentCalculator(
            get_consolidate_expenses(txns)
        );

        const transactions = payments.get_transactions();

        setTotal(payments.get_total());
        setTransactions(transactions);
        setFilteredTxns(transactions);
    }, [txns]);

    return (
        <>
            <Box textAlign="right">
                <FormControl size="small">
                    <TextField
                        value={String(friend ?? "0")}
                        select={true}
                        size="small"
                        onChange={onFriendChange}
                        required
                    >
                        <MenuItem value="0">
                            <small>All Friends</small>
                        </MenuItem>
                        {friends.map((friend) => (
                            <MenuItem value={friend.id}>{friend.name}</MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Box>
            {filteredTxns && <PaymentsList txns={filteredTxns} />}
            <p>Total: <b>{total}</b></p>
        </>
    );
};

export default Payments;
