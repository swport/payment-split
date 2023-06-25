import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import AddCardIcon from "@mui/icons-material/AddCard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// screens
import AddFriends from "../Add-friends/Add-friends";
import AddExpenses from "../Add-expenses/Add-expenses";
import Payments from "../Payments/Payments";

import TabPanel from "./Trip-tabpanel";
import SxTab from "./Trip-tab";
import { useTripContext } from "./Trip-context/Trip-context";

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `se-tabpanel-${index}`,
    };
};

const Trip = () => {
    const { friends, txns } = useTripContext();

    const [screen, setScreen] = React.useState(0);

    const handleScreenChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setScreen(newValue);
    };

    return (
        <Box width="100%">
            <Box
                borderBottom={1}
                borderColor="divider"
            >
                <Tabs
                    value={screen}
                    onChange={handleScreenChange}
                    variant="fullWidth"
                    aria-label="screens"
                >
                    <SxTab
                        label="Friends"
                        icon={<GroupAddIcon />}
                        iconPosition="top"
                        {...a11yProps(0)}
                    />
                    <SxTab
                        disabled={friends.length <= 0}
                        label="Expenses"
                        icon={<AddCardIcon />}
                        iconPosition="top"
                        {...a11yProps(1)}
                    />
                    <SxTab
                        disabled={txns.length <= 0}
                        label="Transactions"
                        icon={<AccountBalanceIcon />}
                        iconPosition="top"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <Box padding={2}>
                <TabPanel
                    value={screen}
                    index={0}
                >
                    <AddFriends />
                </TabPanel>
                <TabPanel
                    value={screen}
                    index={1}
                >
                    <AddExpenses />
                </TabPanel>
                <TabPanel
                    value={screen}
                    index={2}
                >
                    <Payments />
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Trip;
