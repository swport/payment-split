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
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import VerticalSplit from "@mui/icons-material/VerticalSplit";

import { SxProps } from "@mui/material";
import { useAppContext } from "../App-context";

const sxDialogBox: SxProps = {
    "& .MuiDialog-container": {
        alignItems: 'flex-start'
    }
};

const Header = () => {
    const [infoModalOpen, setInfoModalOpen] = React.useState(false);

    const { toggleThemeMode, mode } = useAppContext();

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleThemeMode();
    };

    return (
        <>
            <Box borderBottom={1} borderColor="divider">
                <Grid container wrap="nowrap">
                    <Grid item xs={6}>
                        <IconButton onClick={toggleTheme}>
                            {mode === 'dark' ? (
                                <LightModeIcon />
                            ) : (
                                <Brightness4Icon />
                            )}
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
                                href="https://github.com/swport/payment-split"
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
                        <Typography ml="0.65rem" fontWeight="bold" variant="h6">Payment split app</Typography>
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText marginBottom="12px">
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
