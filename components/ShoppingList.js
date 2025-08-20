import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import SwipeableListItem from './SwipeableListItem';

import { useShoppingList } from '../context/ShoppingProvider';

export default function ShoppingList({ enableSwipe = true }) {
    const { items, addItem, removeItem } = useShoppingList(); 
    
    return (
        <FlatList
            style={styles.container}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                const textContent = `${item.title}, ${item.quantity} ${item.unit}, ${item.category}, ${item.dateAdded.toLocaleDateString()}, ${item.expirationDate.toLocaleDateString()}`
                
                const content = (
                    <Text
                        style={[styles.item, { backgroundColor: '#3f9af0ff' }]}
                    >
                        {textContent}
                    </Text> 
                );
                
                return (
                    enableSwipe ? (
                        <SwipeableListItem 
                            textContent={textContent}
                            itemColor={'#3f9af0ff'}
                            onSwipeRight={() => removeItem(item.id)}
                        />
                    ) : (
                        content
                    )
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});