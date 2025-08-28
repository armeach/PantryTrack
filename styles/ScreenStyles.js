import { StyleSheet, Platform, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default function useScreenStyles () {
    const theme = useTheme();
    
    return StyleSheet.create({
        container: {
            flex: 1,
            // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            backgroundColor: theme.primary, // main background color
        },
    });
};