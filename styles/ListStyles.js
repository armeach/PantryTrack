import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default  function useListStyles () {
    const theme = useTheme(); 

    return StyleSheet.create({
        listSection: {
            padding: 15, 
            marginBottom: 2,
            borderRadius: 12,
            alignSelf: 'stretch',

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,

            backgroundColor: theme.secondary,
        },
        listItem: {
            padding: 15, 
            marginBottom: 2, 
            borderRadius: 12,
            alignSelf: 'stretch',

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
    });
};