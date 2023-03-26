import React from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@mui/system/styled";

import usePayments from "../Trips/Trip-context/usePayments";
import useScreenshot from "../../hooks/useScreenshot";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

type IProps = {
    setImageUrl: (url: string) => void;
};

const Wrapper = styled(Paper)(() => ({
    borderRadius: 0,
    padding: "0.475rem",
    width: "24rem",
    maxWidth: "100%",
}));

const CList = styled(List)(() => ({
    "& > li": {
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: "small",
    },
    marginBottom: "0.875rem",
}));

const ScreenShot: React.FC<IProps> = React.memo(({ setImageUrl }) => {
    const screenShotRef = React.useRef<HTMLDivElement>(null);

    const [imageBase64Str, takeScreenShot] = useScreenshot();
    const [total, transactions, expenses] = usePayments();
    const { toPrice } = useTripContext();

    React.useEffect(() => {
        if (screenShotRef.current && transactions?.length) {
            takeScreenShot(screenShotRef.current);
        }
    }, [takeScreenShot, transactions]);

    React.useEffect(() => {
        if (imageBase64Str && imageBase64Str !== "") {
            setImageUrl(imageBase64Str);
        }
    }, [imageBase64Str, setImageUrl]);

    return (
        <Wrapper ref={screenShotRef}>
            <Typography
                borderBottom={1}
                fontWeight="bold"
                borderColor="text.disabled"
            >
                Expenses
            </Typography>
            <CList dense>
                {expenses.map((expense) => (
                    <>
                        <ListItem key={expense.id}>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <div>
                                    <Typography>{expense.friend.name} paid:</Typography>
                                    {expense.reason && (
                                        <Typography>
                                            <small>({expense.reason})</small>
                                        </Typography>
                                    )}
                                </div>
                                <div>{toPrice(expense.amount)}</div>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </>
                ))}
                <Typography
                    textAlign="right"
                    width="100%"
                    fontSize="small"
                    mt="0.875rem"
                >
                    Total: {toPrice(total ?? 0)}
                </Typography>
            </CList>
            <Typography
                borderBottom={1}
                fontWeight="bold"
                borderColor="text.disabled"
            >
                Final Txns
            </Typography>
            <CList dense>
                {transactions &&
                    transactions.map((txn) => (
                        <ListItem key={txn.id}>
                            <Grid
                                container
                                justifyContent="space-between"
                            >
                                <span>
                                    {txn.from_friend.name} gives{" "}
                                    {txn.to_friend.name}:
                                </span>{" "}
                                {toPrice(txn.amount)}
                            </Grid>
                        </ListItem>
                    ))}
            </CList>
            <Typography
                textAlign="center"
                marginTop="0.875rem"
                fontSize="small"
            >
                <sub>❤︎ swport.github.io/payment-split</sub>
            </Typography>
        </Wrapper>
    );
});

export default ScreenShot;
