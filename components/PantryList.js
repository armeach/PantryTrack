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
                    style={[styles.item, { backgroundColor: getItemColor(item) }]}
                    onPress={() => {
                        if (route.name != 'Home') {
                            onPressItem(item.id)    
                        };
                    }}
                >
                    <Text style={styles.title}>{item.title}, {item.quantity} {item.unit}, {item.category}, {item.dateAdded.toLocaleDateString()}, {item.expirationDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
            )}
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