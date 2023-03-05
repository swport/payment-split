import * as React from "react";
import { type ComputedTxns } from "../../services/SplitPaymentCalculator";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

import PaymentsList from "./Payments-list";

const PaymentsShare = React.lazy(() => import("./Payments-share"));

const Payments = () => {
    const { friends, toPrice, getPayments } = useTripContext();

    const [total, setTotal] = React.useState<number | undefined>();
    const [transactions, setTransactions] = React.useState<
        ComputedTxns | undefined
    >();
    const [filteredTxns, setFilteredTxns] = React.useState<
        ComputedTxns | undefined
    >();
    const [friend, setFriend] = React.useState<string>("0");
    const [share, setShare] = React.useState(false);

    const onFriendChange = (
        e:
            | React.ChangeEvent<
                  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
              >
            | SelectChangeEvent
    ) => {
        setFriend(e.target.value ?? "0");

        const friendId = Number(e.target.value);

        if (friendId && friendId > 0) {
            setFilteredTxns(
                transactions?.filter((txn) => txn.from_friend.id === friendId)
            );
        } else {
            setFilteredTxns(transactions);
        }
    };

    React.useEffect(() => {
        const payInstance = getPayments();
        const transactions = payInstance.getPayments();

        setTotal(payInstance.getTotal());
        setTransactions(transactions);
        setFilteredTxns(transactions);
    }, [getPayments]);

    return (
        <>
            <Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <IconButton
                        onClick={() => setShare(true)}
                        disabled={share}
                    >
                        <ShareIcon />
                    </IconButton>
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
                                <MenuItem
                                    key={friend.id}
                                    value={friend.id}
                                >
                                    {friend.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Box>
                {filteredTxns && <PaymentsList txns={filteredTxns} />}
                {total && (
                    <p>
                        Total:{" "}
                        <b>
                            <em>{toPrice(total)}</em>
                        </b>
                    </p>
                )}
            </Box>

            <React.Suspense fallback={<div>Loading...</div>}>
                <PaymentsShare
                    isOpen={share}
                    closeModal={() => setShare(false)}
                />
            </React.Suspense>
        </>
    );
};

export default Payments;
