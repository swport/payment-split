import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/system/styled";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

import FriendListItem from "./Friend-list-item";

const UITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none"
}));

const FriendsList = () => {

    const { friends } = useTripContext();

    return (
        <div>
            <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableBody>
                            {friends.map((friend) => (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={friend.id}
                                >
                                    <UITableCell
                                        align="left"
                                    >
                                        <FriendListItem
                                            key={friend.id}
                                            friend={friend}
                                        />
                                    </UITableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default FriendsList;
