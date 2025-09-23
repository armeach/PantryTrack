import { useState } from 'react'; 
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';

import SwipeableListItem from './SwipeableListItem';

import { useAuth } from '../context/AuthProvider';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import { categories } from '../utils/categories';
import { capitalizeWords } from '../utils/capitalizeWords';

import useListStyles from '../styles/ListStyles';

import { useTheme } from '../context/ThemeProvider';

export default function PantryList({ enableSwipe = true, filter = null, isSearching = false, navigation, expandedSections, setExpandedSections, onRequestSnackbar }) {     
    const ListStyles = useListStyles();
    const theme = useTheme();

    const { activeShoppingListId, refreshShoppingLists } = useAuth(); 
    
    const { items, addItem, removeItem, editItem } = usePantry(); 
    const { items: shoppingItems, addItem: addShoppingItem, removeItem: removeShoppingItem, editItem: editShoppingItem } = useShoppingList(); 

    const dataToRender = filter || items;

    const sections = categories.map(cat => ({
        title: capitalizeWords(cat.label),
        data: (dataToRender).filter(item => 
            item.category === cat.value
        )
    }));
 
    const toggleSection = (value) => {
        setExpandedSections(prev => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    const moveItemToShopping = async (item) => {
        if (!activeShoppingListId) {
            await refreshShoppingLists(); 
        };

        if (!activeShoppingListId) {
            onRequestSnackbar?.("No shopping list available.");
            return; 
        };

        await addShoppingItem(item);
        await removeItem(item.id); 
    }; 

    return (
        <SectionList
            style={{ flex: 1, paddingHorizontal: 15 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => {
                const category = categories.find(cat => cat.value === section.title.toLowerCase());
                const iconName = category?.icon || 'ellipsis-horizontal';

                return (
                    <View style={ListStyles.listSection}>
                        <TouchableOpacity
                            onPress={() => {
                                toggleSection(section.title);
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name={iconName} size={24} color={theme.text} style={{ marginRight: 10 }} />
                                <Text style={{ color: theme.text }}>{section.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                );
            }}

            renderItem={({ item, section }) => {
                if (!isSearching && !expandedSections[section.title]) return null; // If we haven't expanded the section don't show it

                const textContent = `${item.title}, ${item.quantity} ${item.unit}`;
                
                const content = (
                    <View style={[ListStyles.listItem, { backgroundColor: getItemColor(item) }]}>
                        <Text>
                            {textContent}
                        </Text> 
                    </View>
                    
                );
                
                return (
                    enableSwipe ? (
                        <View>
                            <SwipeableListItem 
                                textContent={textContent}
                                itemColor={getItemColor(item)}
                                onSwipeRight={() => removeItem(item.id)}
                                onSwipeLeft={() => moveItemToShopping(item)}
                                    
                                onPress={() => navigation.push('EditItem', { item, listType: 'pantry' })}
                            />
                        </View>
                    ) : (
                        content
                    )
                );
            }}
        />
    );
};

function getItemColor (item) {
    if (item.expirationDate === null) return '#BFFCC6';

    const now = new Date(); 
    const diff = new Date(item.expirationDate) - now; // difference between now and item expiration (ms)
    const daysToExpiration = diff / (1000 * 60 * 60 * 24); // compute time to expiration in days

        if (daysToExpiration < 0) return '#FFB3B3';
        else if (daysToExpiration < 2) return '#FFF5BA';
        else return '#BFFCC6';
};