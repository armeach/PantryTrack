import { useState, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthProvider'; 

import NavButton from './NavButton';

import { useTheme } from '../context/ThemeProvider';

export default function PopoverMenuPantryManage({ navigation, route, onRequestSnackbar }) {
    const theme = useTheme(); 
    
    const { user, activePantryId } = useAuth(); 

    const [showPopover, setShowPopover] = useState(false);
    const anchorRef = useRef();
    
    const handlePress = () => {
        if (!user || !activePantryId) {
               onRequestSnackbar?.("You must be logged in and select a pantry to add an item!");
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
                <Ionicons name="add-circle" size={80} color={theme.floatingButtonIcon} />
            </TouchableOpacity>

            <Popover
                popoverStyle={{ backgroundColor: 'transparent' }}
                isVisible={showPopover}
                from={anchorRef}
                onRequestClose={() => {
                    setShowPopover(false);
                }}
            >
                <View>

                    <NavButton 
                        icon='add-circle-outline' 
                        iconSize={40}
                        destination='AddItem' 
                        navigation={navigation} 
                        route={route} 
                        params={{ listType: 'pantry' }} 
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
                        params={{ listType: 'pantry' }} 
                        onPressCustom={() => {
                            setShowPopover(false);
                        }}
                    />

                </View>
            </Popover>

        </View>
    );
};