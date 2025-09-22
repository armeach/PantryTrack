import { useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

import NavButton from './NavButton';

import useInteractionStyles from '../styles/InteractionStyles';

export default function PopoverMenuPantryManage({ navigation, route }) {
    const InteractionStyles = useInteractionStyles(); 

    const [showPopover, setShowPopover] = useState(false);
    const anchorRef = useRef();

    return (
        <View>
            <TouchableOpacity
                ref={anchorRef}
                onPress={() => {
                    setShowPopover(true)
                }}
            >
                <Ionicons name="add-circle" size={80} color="#6F8C84" />
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