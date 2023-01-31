import type { Theme } from "@mui/material";

const Buttons = (theme: Theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    }
  };
};

export default Buttons;
