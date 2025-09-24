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

            borderWidth: 1, 
            borderColor: theme.listSectionBorder, 

            backgroundColor: theme.listSection,
        },
        listItem: {
            padding: 15, 
            marginBottom: 2, 
            borderRadius: 12,
            alignSelf: 'stretch',

            borderWidth: 1, 
            borderColor: theme.listItemBorder,

        },
    });
};