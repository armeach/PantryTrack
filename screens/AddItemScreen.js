import { View}  from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddItem from '../components/AddItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import BackButton from '../components/BackButton';
import ScreenStyles from '../styles/ScreenStyles';

export default function AddItemScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();

    const listType = route.params?.listType;
    const addItem = listType === 'pantry'
        ? usePantry().addItem
        : useShoppingList().addItem;

    return(
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top+10, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom+20 }}>
                
                {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 10 }}>
                    <BackButton navigation={navigation} route={route} />
                </View> */}
                
                <View>
                    <AddItem
                        navigation={navigation}
                        route={route}
                        onSubmitEditing={(item) => addItem(item)}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};