import { Text, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EditItem from '../components/EditItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import BackButton from '../components/BackButton';
import ScreenStyles from '../styles/ScreenStyles';
import InteractionStyles from '../styles/InteractionStyles';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

export default function EditItemScreen({ navigation, route }) {
    const insets = useSafeAreaInsets(); 

    const { item } = route.params;

    const listType = route.params?.listType;
    const editItem = listType === 'pantry'
        ? usePantry().editItem
        : useShoppingList().editItem;

    return (
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom+20 }}>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 10 }}>
                    <BackButton navigation={navigation} route={route} />
                </View>

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