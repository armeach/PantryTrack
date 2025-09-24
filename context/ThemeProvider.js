import { createContext, useContext, useState } from 'react';
import { baseTheme, cozyTheme, v1Theme } from '../theme/colors';

export const ThemeContext = createContext(baseTheme);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // const [theme] = useState(baseTheme); 
    // const [theme] = useState(cozyTheme);
    const [theme] = useState(v1Theme);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};