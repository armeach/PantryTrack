import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useShoppingList } from '../context/ShoppingProvider';
import { usePantry } from '../context/PantryProvider';

import InteractionStyles from '../styles/InteractionStyles';

export default function AddPurchasedButton({ icon, iconSize, navigation, onPressCustom }) {
    const { items, removeItem: removeShoppingListItem } = useShoppingList(); 
    const { addItem: addPantryItem } = usePantry(); 
    
    const handlePress = () => {
        if (onPressCustom) onPressCustom(); 

        items.filter(item => item.checked).forEach(item => {
            addPantryItem({
                title: item.title,
                quantity: item.quantity,
                unit: item.unit,
                category: item.category,
                dateAdded: new Date(),
                // expirationDate: getExpirationDate(new Date(), ) // I need to reword how expiration times are stored to get this working
            }); 
            removeShoppingListItem(item.id);
        });
    };

    return (
        <View>
            <TouchableOpacity
                style={InteractionStyles.addItemsButton}
                underlayColor='lightgray'
                onPress={handlePress}
            >  
                <Ionicons name={icon} size={iconSize} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
    },
});