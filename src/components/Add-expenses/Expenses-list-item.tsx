import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { TxnType } from "../Trips/Trip-context/Trip-types";
import type { SxProps } from "@mui/material";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";

import { useTripContext } from "../Trips/Trip-context/Trip-context";
import MuiNumberInputField from "../UI/MuiNumberInputField";

const sxAvatar: SxProps = { fontSize: "18px", fontWeight: "400" };

type IProps = {
    txn: TxnType;
};

const ExpensesListItem = ({ txn }: IProps) => {
    const friend = txn.friend;

    const { updateTxn, removeTxn, toPrice } = useTripContext();

    const [editing, setEditing] = React.useState(false);
    const [newAmt, setNewAmt] = React.useState<number | undefined>(txn.amount);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onUpdatingAmt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAmt(Number(e.target.value));
    };
    
    const onUpdateAmtCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        setEditing(false);
        setNewAmt(txn.amount);
    };

    const onUpdateAmtSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if( !newAmt || newAmt <= 0 ) {
            return alert("Invalid amount. Please enter a valid amount.");
        }

        updateTxn(txn.id, newAmt);
        setEditing(false);
        setNewAmt(newAmt);
    };

    const onTxnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if( window.confirm("Are you sure?") ) {
            removeTxn(txn.id);
        }
    };

    const startEditing = () => {
        setEditing(true);
        console.log("inputRef.current: ", inputRef.current);
        inputRef.current?.focus();
        inputRef.current?.select();
    };

    React.useEffect(() => {
        const resetField = (e: KeyboardEvent) => {
            if( e.key.toLocaleLowerCase() === "escape" ) {
                setEditing(false);
                setNewAmt(txn.amount);
            }
        };
        
        window.addEventListener("keyup", resetField);

        return () => {
            window.removeEventListener("keyup", resetField);
        };

    }, [txn]);

    return (
        <Grid
            container
            spacing="2"
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
        >
            <Grid
                item
                xs
                container
                alignItems="center"
                wrap="nowrap"
            >
                <Avatar
                    sx={{
                        ...sxAvatar,
                        backgroundColor: friend.color?.backgroundColor,
                        color: friend.color?.color,
                    }}
                >
                    {friend.initials}
                </Avatar>
                <Grid item xs container wrap="nowrap" alignItems="center" marginLeft="8px">
                    <b>{friend.name}</b>
                    {/* wtf React? */}
                    &nbsp;
                    <span>paid</span>
                    &nbsp;
                    {editing ? (
                        <Grid
                            container
                            alignItems="center"
                            wrap="nowrap"
                            component="form"
                            onSubmit={onUpdateAmtSubmit}>
                            <Grid item>
                                <MuiNumberInputField
                                    value={newAmt}
                                    onChange={onUpdatingAmt}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <IconButton type="submit">
                                    <Check />
                                </IconButton>
                                <IconButton onClick={onUpdateAmtCancel}>
                                    <Clear />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ) : (
                        <b onClick={() => startEditing()}> {toPrice(txn.amount)}</b>
                    )}
                </Grid>
            </Grid>
            {!editing && (
                <Grid
                    item
                    xs
                    textAlign="right"
                    justifyContent="flex-end"
                    container
                    alignItems="center"
                >
                    <IconButton onClick={() => startEditing()}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onTxnRemove}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
};

export default ExpensesListItem;
