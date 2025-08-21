import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

import SwipeableListItem from './SwipeableListItem';

import { useShoppingList } from '../context/ShoppingProvider';

export default function ShoppingList({ enableSwipe = true }) {
    const { items, addItem, removeItem, toggleChecked } = useShoppingList(); 
    
    const CheckBoxListItem = ({ item }) => {
        const content = `${item.title}, ${item.quantity} ${item.unit}, ${item.category}, ${item.dateAdded.toLocaleDateString()}, ${item.expirationDate.toLocaleDateString()}`;
                
        return(
            <ListItem style={styles.item}> 
                <ListItem.Content>
                    <Text>{content}</Text>
                </ListItem.Content>
                <CheckBox
                    checked={item.checked}
                    onPress={() => toggleChecked(item.id)}
                />
            </ListItem>
        );
    };

    return (
        <FlatList
            style={styles.container}
            data={items}
            keyExtractor={(item) => item.id}

            renderItem={({ item, index }) => {    
                return (
                    enableSwipe ? (
                        <SwipeableListItem 
                            key={item.id}
                            itemColor={'#3f9af0ff'}
                            onSwipeRight={() => removeItem(item.id)}
                        >
                            <CheckBoxListItem item={item} />
                        </SwipeableListItem>
                    ) : (
                        <CheckBoxListItem item={item} />
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
    item: {
        padding: 15,
        marginBottom: 2,
        borderRadius: 12,
        backgroundColor: '#3f9af0ff',
    },
});