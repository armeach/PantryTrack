import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    }
});