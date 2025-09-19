import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import EditItem from '../components/EditItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import { saveBarCode } from '../utils/barCodeStorage';

import useScreenStyles from '../styles/ScreenStyles';

export default function EditItemScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles();
    const insets = useSafeAreaInsets(); 

    const { item } = route.params;

    const listType = route.params?.listType;
    const editItem = listType === 'pantry'
        ? usePantry().editItem
        : useShoppingList().editItem;

    const onSubmitEditing = (updatedItem) => {
        editItem(updatedItem);
        if (updatedItem.barcode) { 
            saveBarCode(updatedItem.barcode, updatedItem);
        };
    };

    return (
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom+20 }}>

                <View>
                    <EditItem
                        navigation={navigation}
                        route={route}
                        item={item}
                        onSubmitEditing={onSubmitEditing}
                    />
                </View>
                        
            </View>
        </SafeAreaView>
    );
};