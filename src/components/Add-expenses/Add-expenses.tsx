import * as React from "react";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import type {
    FriendType,
    TxnInputType,
} from "../Trips/Trip-context/Trip-types";
import ExpensesList from "./Expenses-list";

const AddExpenses = () => {
    const { friends, addTxn } = useTripContext();
    const amtInputRef = React.useRef<HTMLInputElement>(null);

    const [selectedFriend, setSelectedFriend] = React.useState<
        FriendType["id"] | undefined
    >(undefined);
    const [txnAmount, setTxnAmount] = React.useState<
        TxnInputType["amount"] | undefined
    >(undefined);

    const onTxnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTxnAmount(Number(e.target.value));
    };

    const onFriendChange = (
        e:
            | React.ChangeEvent<
                  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
              >
            | SelectChangeEvent
    ) => {
        const id = parseInt(e.target.value);
        if (id) {
            setSelectedFriend(id);
        }
    };

    const onTxnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFriend) {
            return alert("Please select a friend");
        }

        if (!txnAmount || txnAmount <= 0) {
            return alert("Invalid transaction amount");
        }

        addTxn(selectedFriend, {
            amount: txnAmount,
        });

        amtInputRef.current?.focus();
        amtInputRef.current?.select(); // it may not work on safari mobile
    };

    return (
        <div>
            <Typography marginBottom=".875rem">
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Add expenses
                </Typography>
                <Typography variant="subtitle2">
                    Select friend, input amount, and add expense
                </Typography>
            </Typography>
            <form onSubmit={onTxnSubmit}>
                <Grid
                    container
                    spacing={1}
                    wrap="nowrap"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={7}
                        sm={8}
                    >
                        <FormControl
                            size="small"
                            fullWidth
                        >
                            <TextField
                                id="demo-customized-select"
                                value={String(selectedFriend ?? "0")}
                                select={true}
                                size="small"
                                onChange={onFriendChange}
                                required
                            >
                                <MenuItem value="0">
                                    <small>Friend</small>
                                </MenuItem>
                                {friends.map((friend) => (
                                    <MenuItem value={friend.id}>
                                        {friend.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={3}
                    >
                        <FormControl fullWidth>
                            <TextField
                                autoFocus
                                autoComplete="false"
                                autoCapitalize="false"
                                autoCorrect="false"
                                inputRef={amtInputRef}
                                onChange={onTxnAmountChange}
                                value={txnAmount ?? undefined}
                                size="small"
                                id="outlined-multiline-flexible"
                                placeholder="Amount"
                                type="number"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs
                        textAlign="center"
                    >
                        <IconButton type="submit">
                            <AddCircleIcon color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </form>

            <hr />

            <ExpensesList />
        </div>
    );
};

export default AddExpenses;
