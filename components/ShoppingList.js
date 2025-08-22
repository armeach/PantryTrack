import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import SwipeableListItem from './SwipeableListItem';

import { useShoppingList } from '../context/ShoppingProvider';

import ListStyles from '../styles/ListStyles';

export default function ShoppingList({ enableSwipe = true }) {
    const { items, addItem, removeItem, toggleChecked } = useShoppingList(); 
    
    const CheckBoxListItem = ({ item, itemColor }) => {
        // const content = `${item.id} ${item.title}, ${item.quantity} ${item.unit}`;//, ${item.category}, ${item.dateAdded.toLocaleDateString()}, ${item.expirationDate.toLocaleDateString()}`;
        const content = `${item.title}, ${item.quantity} ${item.unit}`;
                
        return(
            <View style={[ListStyles.item, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: itemColor }]}>
                <Text>{content}</Text>
                <CheckBox
                    containerStyle={{ padding: 0, margin: 0 }}
                    checked={item.checked}
                    onPress={() => toggleChecked(item.id)}
                />
            </View>
        );
    };

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={items}
            keyExtractor={(item) => item.id}

            renderItem={({ item, index }) => {    
                const itemColor = item.checked ? '#C6E2B3' : '#F9F7F3';

                return (
                    enableSwipe ? (
                        <SwipeableListItem 
                            key={item.id}
                            itemColor={itemColor}
                            onSwipeRight={() => removeItem(item.id)}
                        >
                            <CheckBoxListItem item={item} itemColor={itemColor} />
                        </SwipeableListItem>
                    ) : (
                        <CheckBoxListItem item={item} itemColor={itemColor} />
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