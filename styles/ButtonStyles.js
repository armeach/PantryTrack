import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    navButton: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 12, 
        alignItems: 'center',
        backgroundColor: '#8AA29E',
    },
    addItemsButton: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 12, 
        alignItems: 'center',
        backgroundColor: '#8AA29E',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverMenuButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    }
});