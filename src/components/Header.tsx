import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import VerticalSplit from "@mui/icons-material/VerticalSplit";

import { SxProps } from "@mui/material";

const sxDialogBox: SxProps = {
    "& .MuiDialog-container": {
        alignItems: 'flex-start'
    }
};

const Header = () => {
    const [infoModalOpen, setInfoModalOpen] = React.useState(false);

    return (
        <>
            <Box borderBottom={1} borderColor="divider">
                <Grid container wrap="nowrap">
                    <Grid item xs={6}>
                        <IconButton href="https://github.com" target="_blank">
                            <Brightness4Icon />
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        container
                        wrap="nowrap"
                        justifyContent="flex-end"
                    >
                        <Grid item>
                            <IconButton
                                href="https://github.com"
                                target="_blank"
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setInfoModalOpen(true)}>
                                <InfoIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Dialog
                open={infoModalOpen}
                onClose={() => setInfoModalOpen(false)}
                sx={sxDialogBox}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Typography display="flex" alignItems="center" justifyContent="center">
                        <VerticalSplit />
                        <Typography ml="0.65rem" fontWeight="bold" variant="h6">Split Payments App</Typography>
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        Split trip expenses among friends with least number of transactions.
                    </DialogContentText>
                    <DialogContentText>
                        To get started, simply add friends.
                        Add payment made by each friend during the trip.
                        And voila, in the third tab you can see who owes to whome.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;
