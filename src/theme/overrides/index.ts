import type { Theme } from "@mui/material";

import Buttons from './Buttons';
import Tab from './Tab';

const Overrides = (theme: Theme) => {
    return Object.assign(
        Buttons(theme),
        Tab(theme)
    );
};

export default Overrides;