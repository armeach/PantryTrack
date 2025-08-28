import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EditItem from '../components/EditItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import useScreenStyles from '../styles/ScreenStyles';

export default function EditItemScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles();
    const insets = useSafeAreaInsets(); 

    const { item } = route.params;

    const listType = route.params?.listType;
    const editItem = listType === 'pantry'
        ? usePantry().editItem
        : useShoppingList().editItem;

    return (
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top+10, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom+20 }}>

                <View>
                    <EditItem
                        navigation={navigation}
                        route={route}
                        item={item}
                        onSubmitEditing={(item) => editItem(item)}
                    />
                </View>
                        
            </View>
        </SafeAreaView>
    );
};