import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PantryList({ items, onPressItem, route }) { 
    return (
        <FlatList
            style={styles.container}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        if (route.name != 'Home') {
                            onPressItem(item.id)    
                        };
                    }}
                >
                    <Text style={styles.title}>{item.title}, {item.quantity} {item.unit}, {item.dateAdded.toLocaleDateString()}</Text>
                </TouchableOpacity>
            )}
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
        backgroundColor: 'gray'
    },
    title: {
        color: 'white',
    },
});