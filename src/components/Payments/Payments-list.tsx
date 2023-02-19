import React from "react";

import type { ComputedTxns } from "../../services/SplitPaymentCalculator";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

type IProps = {
    txns: ComputedTxns;
};

const PaymentsList = ({ txns }: IProps) => {
    const { toPrice } = useTripContext();
    const [checked, setChecked] = React.useState([-1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <List>
            {txns?.length ? (
                txns?.map((txn, idx) => (
                    <ListItem
                        key={txn.id}
                        disablePadding
                    >
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(txn.id)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(txn.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": `paymentId-${txn.id}` }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={`paymentId-${txn.id}`}
                            >
                                <b>{txn.from_friend.name}</b> gives{" "}
                                <b>{txn.to_friend.name}</b> {toPrice(txn.amount)}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))
            ) : (
                <p>
                    <b>Nobody pays anything to anyone</b>
                </p>
            )}
        </List>
    );
};

export default PaymentsList;
