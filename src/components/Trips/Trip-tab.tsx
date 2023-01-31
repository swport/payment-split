import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const SxTab = styled(Tab)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(9),
    [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.pxToRem(11),
    },
    [theme.breakpoints.up("md")]: {
        fontSize: theme.typography.body2,
    },
}));

export default SxTab;
