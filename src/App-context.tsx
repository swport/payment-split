import React from "react";

interface State {
    mode: "light" | "dark";
}

interface AppProviderState extends State {
    toggleThemeMode: () => void;
}

const initialState: State = {
    mode: "light",
};

const AppContext = React.createContext<AppProviderState | undefined>(undefined);

type IProps = {
    children: React.ReactNode;
};

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
};

function AppProvider({ children }: IProps) {
    const [state, setState] = React.useState<State>(initialState);

    React.useEffect(() => {
        const theme_mode = localStorage.getItem("theme_mode") as
            | "light"
            | "dark";

        if (theme_mode) {
            setState((s) => ({
                ...s,
                mode: theme_mode,
            }));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem("theme_mode", state.mode);
    }, [state.mode]);

    const toggleThemeMode = React.useCallback(() => {
        setState({
            ...state,
            mode: state.mode === "light" ? "dark" : "light",
        });
    }, [state]);

    const value = React.useMemo(
        () => ({
            mode: state.mode,
            toggleThemeMode: toggleThemeMode,
        }),
        [state, toggleThemeMode]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
