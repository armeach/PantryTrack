import { View}  from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddItem from '../components/AddItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import { saveBarCode } from '../utils/barCodeStorage';

import useScreenStyles from '../styles/ScreenStyles';

export default function AddItemScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles(); 
    const insets = useSafeAreaInsets();

    const {listType, barcode = null, item = null} = route.params; 

    const addItem = listType === 'pantry'
        ? usePantry().addItem
        : useShoppingList().addItem;

    const onSubmitEditing = (item) => {
        addItem(item);

        if (item.barcode) {
            saveBarCode(item.barcode, item);
        };
    };

    return(
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top+10, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom+20 }}>
                
                <View>
                    <AddItem
                        navigation={navigation}
                        route={route}
                        onSubmitEditing={onSubmitEditing}
                        barcode={barcode}
                        item={item}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};