import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';

import ShoppingList from '../components/ShoppingList';
import AddPurchasedButton from '../components/AddPurchasedButton';

import ScreenStyles from '../styles/ScreenStyles';
import PopoverMenuShoppingList from '../components/PopoverMenuShoppingList';

export default function ShoppingListScreen({ navigation, route }) {  
    const insets = useSafeAreaInsets();
    return(
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1 }}>
                {/* <View style={{ flexDirection: 'row' }}>
                    <NavButton icon='add-circle-outline' destination="AddItem" navigation={navigation} route={route} params={{ listType: 'shopping' }} />
                    <AddPurchasedButton icon='cube' navigation={navigation} />
                </View> */}
                <ShoppingList/>
            </View>

            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-end', 
                paddingHorizontal: 20, 
                paddingVertical: 20,

                position: 'absolute',
                bottom: 2,
                right: 2,
                zIndex: 10,
                }} >
                <PopoverMenuShoppingList navigation={navigation} route={route} />
            </View>
        </SafeAreaView>
    );
};