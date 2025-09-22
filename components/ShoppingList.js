import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import SwipeableListItem from './SwipeableListItem';

import { useShoppingList } from '../context/ShoppingProvider';

import { categories } from '../utils/categories';
import { capitalizeWords } from '../utils/capitalizeWords';

import useListStyles from '../styles/ListStyles';

export default function ShoppingList({ enableSwipe = true, navigation, expandedSections, setExpandedSections }) {
    const ListStyles = useListStyles(); 
    
    const { items, addItem, removeItem, editItem, toggleChecked } = useShoppingList(); 
    
    const CheckBoxListItem = ({ item, itemColor }) => {
        const content = `${item.title}, ${item.quantity} ${item.unit}`;
                
        return(
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: itemColor }}>
                <Text>{content}</Text>
                <CheckBox
                    containerStyle={{ padding: 0, margin: 0 }}
                    checked={item.checked}
                    onPress={() => toggleChecked(item.id)}
                />
            </View>
        );
    };

    const sections = categories.map(cat => ({
        title: capitalizeWords(cat.label),
        data: items.filter(item => 
            item.category ? item.category === cat.value : categories.value === 'Misc.'
        )
    }))

    const toggleSection = (value) => {
        setExpandedSections(prev => ({
            ...prev,
            [value]: !prev[value],
        }))
    }

    return (
        <SectionList
            style={{ flex: 1, paddingHorizontal: 15 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => {
                const category = categories.find(cat => cat.value === section.title.toLowerCase());
                const iconName = category?.icon || 'ellipsis-horizontal'

                return (
                    <View style={ListStyles.listSection}>
                        <TouchableOpacity
                            onPress={() => {
                                toggleSection(section.title);
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name={iconName} size={24} style={{ marginRight: 10 }} />
                                <Text>{section.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }}

            renderItem={({ item, section }) => {    
                const itemColor = item.checked ? '#C6E2B3' : '#F9F7F3';
                if (!expandedSections[section.title]) return null; // If we haven't expanded the section don't show it


                return (
                    enableSwipe ? (
                        <SwipeableListItem 
                            key={item.id}
                            itemColor={itemColor}
                            onSwipeRight={() => removeItem(item.id)}
                            onPress={() => navigation.push('EditItem', { item, listType: 'shopping' })}
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