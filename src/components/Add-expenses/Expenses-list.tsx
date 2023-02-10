import React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/system/styled";
import { useTripContext } from "../Trips/Trip-context/Trip-context";
import ExpensesListItem from "./Expenses-list-item";
import { TxnType } from "../Trips/Trip-context/Trip-types";

const UITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
}));

const sortTxns = (txns: TxnType[]) => {
    function compare(txnA: TxnType, txnB: TxnType) {
        if (txnA.friend.id < txnB.friend.id) {
            return -1;
        }
        if (txnA.friend.id > txnB.friend.id) {
            return 1;
        }
        return 0;
    }

    return [...txns].sort(compare);
};

const ExpensesList = () => {
    const { txns } = useTripContext();

    return (
        <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                    stickyHeader
                    aria-label="sticky table"
                >
                    <TableBody>
                        {sortTxns(txns).map((txn) => (
                            <TableRow
                                hover
                                key={txn.id}
                            >
                                <UITableCell align="left">
                                    <ExpensesListItem txn={txn} />
                                </UITableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ExpensesList;
