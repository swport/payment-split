import * as React from 'react';

import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import Palettes from './palettes';
import Breakpoints from './breakpoints';

import Overrides from './overrides';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const themeMode: PaletteMode = 'dark';

    const themeOptions = {
        palette: themeMode === 'dark' ? Palettes.dark : Palettes.light,
        breakpoints: Breakpoints,
    };

    const theme = createTheme(themeOptions);
    theme.components = Overrides(theme);
    theme.palette.mode = themeMode;

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    )

}