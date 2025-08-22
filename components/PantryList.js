import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SwipeableListItem from './SwipeableListItem';

import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import ListStyles from '../styles/ListStyles';

export default function PantryList({ enableSwipe = true, filter}) {  
    const { items, addItem, removeItem } = usePantry(); 
    const { items: shoppingItems, addItem: addShoppingItem, removeItem: removeShoppingItem } = useShoppingList(); 

    const dataToRender = filter || items;

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={dataToRender}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                // const textContent = `${item.id} ${item.title}, ${item.quantity} ${item.unit}, ${item.category}, ${item.dateAdded.toLocaleDateString()}, ${item.expirationDate.toLocaleDateString()}`
                const textContent = `${item.title}, ${item.quantity} ${item.unit}`;
                
                const content = (
                    <Text
                        style={[ListStyles.listItem, { backgroundColor: getItemColor(item) }]}
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
            return '#FFB3B3';
        case daysToExpiration < 2: 
            return '#FFF5BA';
        default: 
            return '#BFFCC6';
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