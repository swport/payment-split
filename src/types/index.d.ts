import * as React from "react";
import { SelectChangeEvent } from "@mui/material/Select";

export type MuiInputSelectType =
    | React.ChangeEvent<
          HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >
    | SelectChangeEvent;
