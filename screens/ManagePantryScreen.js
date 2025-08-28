import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PopoverMenuPantryManage from '../components/PopoverMenuPantryManage';

import PantryList from '../components/PantryList';
import { usePantry } from '../context/PantryProvider';

import useScreenStyles from '../styles/ScreenStyles';

export default function ManagePantryScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles();
    const insets = useSafeAreaInsets(); 

    const { items } = usePantry(); 

    return (
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, marginTop: 10 }}> 
                
                <View style={{ flex: 1, width: '100%' }}>
                    <PantryList 
                        items={items}
                        navigation={navigation}
                    />
                </View>

                <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'flex-end', 
                        paddingHorizontal: 20, 
                        paddingVertical: 20, 
                        backgroundColor: 'transparent',

                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        zIndex: 10,
                    }} >
                        <PopoverMenuPantryManage navigation={navigation} route={route} />
                </View>

            </View>
        </SafeAreaView>
    );
};