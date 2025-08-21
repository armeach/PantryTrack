import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import SwipeableListItem from './SwipeableListItem';

import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

export default function PantryList({ enableSwipe = true}) {  
    const { items, addItem, removeItem } = usePantry(); 
    const { items: shoppingItems, addItem: addShoppingItem, removeItem: removeShoppingItem } = useShoppingList(); 

    return (
        <FlatList
            style={styles.container}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                const textContent = `${item.id} ${item.title}, ${item.quantity} ${item.unit}, ${item.category}, ${item.dateAdded.toLocaleDateString()}, ${item.expirationDate.toLocaleDateString()}`
                
                const content = (
                    <Text
                        style={[styles.item, { backgroundColor: getItemColor(item) }]}
                    >
                        {textContent}
                    </Text> 
                );
                
                return (
                    enableSwipe ? (
                        <SwipeableListItem 
                            textContent={textContent}
                            itemColor={getItemColor(item)}
                            onSwipeRight={() => removeItem(item.id)}
                            onSwipeLeft={() => {
                                addShoppingItem(item);
                                removeItem(item.id);
                            }}
                        />
                    ) : (
                        content
                    )
                );
            }}
        />
    );
};

function getItemColor (item) {
    const now = new Date(); 
    const diff = item.expirationDate - now; // difference between now and item expiration (ms)
    const daysToExpiration = diff / (1000 * 60 * 60 * 24); // compute time to expiration in days

    switch(true) { 
        case daysToExpiration < 0: 
            return '#f04141ff';
        case daysToExpiration < 2: 
            return '#efb631ff';
        default: 
            return '#3f9af0ff';
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 15,
        marginBottom: 2,
        borderRadius: 12,
    },
    title: {
        color: 'white',
    },
});