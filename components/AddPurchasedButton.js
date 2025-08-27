import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useShoppingList } from '../context/ShoppingProvider';
import { usePantry } from '../context/PantryProvider';

import { getExpirationDate } from '../utils/getExpirationDate.js';

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
                expirationValue: item.expirationValue,
                expirationUnitsValue: item.expirationunitsValue,
                expirationDate: getExpirationDate(new Date(), item.expirationValue, item.expirationUnitsValue),
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