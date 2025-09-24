import { StyleSheet, Platform, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default function useScreenStyles () {
    const theme = useTheme();
    
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundColor, // main background color
        },
    });
};