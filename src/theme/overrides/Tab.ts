import type { Theme } from "@mui/material";

const Tab = (theme: Theme) => {
  return {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  };
};

export default Tab;
