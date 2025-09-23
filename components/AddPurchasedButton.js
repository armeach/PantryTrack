import { TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthProvider.js';
import { batchMoveToPantry } from '../services/shoppingListService.js';
import { useShoppingList } from '../context/ShoppingProvider';
import { usePantry } from '../context/PantryProvider';

import { getExpirationDate } from '../utils/getExpirationDate.js';

import useInteractionStyles from '../styles/InteractionStyles';

export default function AddPurchasedButton({ icon, iconSize, navigation, onPressCustom }) {
    const InteractionStyles = useInteractionStyles();
    
    const { items, checkedMap } = useShoppingList(); 
    const { activePantryId, activeShoppingListId } = useAuth(); 
    
    const handlePress = async () => {      
        const checkedItems = items.filter(item => checkedMap[item.id]); 
        if (!checkedItems.length) return; 

        await batchMoveToPantry(activeShoppingListId, activePantryId, checkedItems); 
    };

    return (
        <View>
            <TouchableOpacity
                style={InteractionStyles.addItemsButton}
                underlayColor='lightgray'
                onPress={() => {
                    if (onPressCustom) onPressCustom(); 
                    handlePress(); 
                }}
            >  
                <Ionicons name={icon} size={iconSize} />
            </TouchableOpacity>
        </View>
    );
};