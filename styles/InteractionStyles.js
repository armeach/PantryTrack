import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    navButton: {
        margin: 5,
        padding: 20,
        borderRadius: 12, 
        alignItems: 'center',
        backgroundColor: '#8AA29E',
    },
    addItemsButton: {
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
    dateButton: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },
    dateButtonText: {
        fontSize: 20,
    },
    dropdownPicker: {
        height: 50, 
        width: 200,
        borderWidth: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
    },
    dropdownWindow: {
        borderRadius: 12, 
        backgroundColor: 'white',
        zIndex: 2000,
    },
    dropdownText: {
        fontSize: 20,
        color: 'black',
    },
    dropdownWrapper: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },
    inputText: {
        padding: 10, 
        height: 50,
        fontSize: 20,
        textAlign: 'left',
    },
    inputWrapper: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5, 
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});