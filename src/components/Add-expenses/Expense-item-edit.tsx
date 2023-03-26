import React from "react";

import Grid from "@mui/material/Grid";

import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import MuiNumberInputField from "../UI/MuiNumberInputField";

type IProps = {
    open?: boolean;
    title: string;
    amount: number;
    reason?: string;
    close: () => void;
    save: (amount: number, reason?: string) => void;
};

const ExpenseItemEdit = ({
    open = true,
    title,
    amount,
    reason,
    close,
    save,
}: IProps) => {
    const [newAmount, setNewAmount] = React.useState<number>();
    const [newReason, setNewReason] = React.useState<string>();

    const onUpdatingAmt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAmount(Number(e.target.value));
    };

    const onReasonUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewReason(e.target.value);
    };

    const onUpdateAmtCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        close();
    };

    const onUpdateAmtSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newAmount || newAmount <= 0) {
            return alert("Invalid amount. Please enter a valid amount.");
        }

        save(newAmount, newReason);
        close();
    };

    React.useEffect(() => {
        setNewAmount(amount);
        setNewReason(reason);
    }, [title, amount, reason]);

    return (
        <Dialog
            open={open}
            onClose={close}
            scroll="paper"
            maxWidth="xs"
        >
            <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={onUpdateAmtSubmit}>
                    <Grid
                        container
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <MuiNumberInputField
                                value={newAmount}
                                onChange={onUpdatingAmt}
                                autoFocus={true}
                                placeholder="Amount"
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
                    <FormControl
                        margin="dense"
                        fullWidth
                    >
                        <TextField
                            value={newReason}
                            size="small"
                            placeholder="Reason (optional)"
                            type="text"
                            onChange={onReasonUpdate}
                        />
                    </FormControl>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseItemEdit;
