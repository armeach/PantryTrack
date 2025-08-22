import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../components/NavButton';

import ShoppingList from '../components/ShoppingList';
import AddPurchasedButton from '../components/AddPurchasedButton';

import ScreenStyles from '../styles/ScreenStyles';

export default function ShoppingListScreen({ navigation, route }) {  
    const insets = useSafeAreaInsets();
    return(
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <NavButton icon='add-circle-outline' destination="AddItem" navigation={navigation} route={route} params={{ listType: 'shopping' }} />
                    <AddPurchasedButton icon='cube' navigation={navigation} />
                </View>
                <ShoppingList/>
            </View>
        </SafeAreaView>
    );
};