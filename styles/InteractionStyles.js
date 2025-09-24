import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default function useInteractionStyles () {
    const theme = useTheme(); 
    
    return StyleSheet.create({
        // Buttons
        navButton: {
            margin: 5,
            padding: 20,
            borderRadius: 12, 
            alignItems: 'center',
            backgroundColor: theme.popoverButtonColor,
        },
        addItemsButton: {
            margin: 5,
            padding: 20,
            borderRadius: 12, 
            alignItems: 'center',
            backgroundColor: theme.popoverButtonColor,
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
            backgroundColor: theme.interactionBackground,

            shadowColor: theme.interactionShadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        dateButtonText: {
            fontSize: 20,
            color: theme.text,
        },

        // Dropdowns and Text Inputs
        dropdownPicker: {
            height: 50, 
            width: 200,
            borderWidth: 0,
            backgroundColor: theme.interactionBackground,
            zIndex: 1000,

        },
        dropdownWindow: {
            borderRadius: 12, 
            backgroundColor: theme.interactionBackground,
            zIndex: 2000,
        },
        dropdownText: {
            fontSize: 20,
            color: theme.text,
        },
        dropdownWrapper: {
            height: 50, 
            width: 200,
            borderWidth: 0,
            backgroundColor: theme.interactionBackground,
            zIndex: 1000,

            shadowColor: theme.interactionShadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        inputText: {
            padding: 10, 
            height: 50,
            fontSize: 20,
            textAlign: 'left', 
            color: theme.text,
        },
        inputWrapper: {
            width: '90%',
            backgroundColor: theme.interactionBackground,
            borderRadius: 15,
            paddingHorizontal: 15,
            paddingVertical: 5, 
            marginBottom: 10,

            shadowColor: theme.interactionShadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        searchWrapper: {
            width: '90%',
            backgroundColor: theme.interactionBackground,
            borderRadius: 25,
            paddingHorizontal: 15,
            paddingVertical: 5, 
            marginBottom: 10,

            shadowColor: theme.interactionShadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
    });
};