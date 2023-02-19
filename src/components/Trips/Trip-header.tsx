import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useTripContext } from "./Trip-context/Trip-context";

const TripHeader = () => {

    const { reset } = useTripContext();

    const resetTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if( window.confirm("Are you sure? All data will be lost.") ) {
            reset();
        }
    };

    return (
        <Box
            borderBottom={1}
            borderColor="divider"
        >
            <Grid
                container
                wrap="nowrap"
            >
                <Grid
                    item
                    xs={6}
                >
                    <IconButton
                            onClick={resetTrip}
                        >
                        <RefreshIcon />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    
                </Grid>
            </Grid>
        </Box>
    );
};

export default TripHeader;
