import { useState, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthProvider'; 

import NavButton from './NavButton';
import AddPurchasedButton from './AddPurchasedButton';

export default function PopoverMenuShoppingList({ navigation, route, onRequestSnackbar }) {
    const { user, activeShoppingListId } = useAuth(); 
    
    const [showPopover, setShowPopover] = useState(false);
    const anchorRef = useRef();

    const handlePress = () => {
        if (!user || !activeShoppingListId) {
               onRequestSnackbar?.("You must be logged in and select a shopping list to add an item!");
        } else {
            setShowPopover(true); 
        }
    };

    return (
        <View>
            <TouchableOpacity
                ref={anchorRef}
                onPress={handlePress}
            >
                <Ionicons name="add-circle" size={80} color="#6F8C84" />
            </TouchableOpacity>

            <Popover
                popoverStyle={{ backgroundColor: 'transparent' }}
                isVisible={showPopover}
                from={anchorRef}
                onRequestClose={() => {
                    setShowPopover(false)
                }}
            >
                <View>
                    <NavButton 
                        icon='add-circle-outline' 
                        iconSize={40}
                        destination='AddItem' 
                        navigation={navigation} 
                        route={route} 
                        params={{ listType: 'shopping' }} 
                        onPressCustom={() => {
                            setShowPopover(false);
                        }}
                    />
                    <NavButton 
                        icon='barcode' 
                        iconSize={40}
                        destination='Scan' 
                        navigation={navigation} 
                        route={route} 
                        params={{ listType: 'shopping' }} 
                        onPressCustom={() => {
                            setShowPopover(false);
                        }}
                    />
                    <AddPurchasedButton 
                        icon='arrow-forward-circle'
                        iconSize={40}
                        onPressCustom={() => {
                            setShowPopover(false)
                        }}
                    />
                </View>
            </Popover>
        </View>
    );
};