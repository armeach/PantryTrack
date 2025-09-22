import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import filterItems from '../utils/filterItems';

import PantryList from '../components/PantryList';
import { usePantry } from '../context/PantryProvider'

import SettingsMenu from '../components/SettingsMenu';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

import { useTheme } from '../context/ThemeProvider';

export default function HomeScreen({ navigation, route })  {
    const theme = useTheme(); 

    const ScreenStyles = useScreenStyles();
    const InteractionStyles = useInteractionStyles();
    const insets = useSafeAreaInsets(); 

    const [search, setSearch] = useState('');
    const { items } = usePantry(); 

    const [expandedSections, setExpandedSections] = useState({}); 

    return (
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            <View style={{ flex: 1, marginTop: 10 }}> 
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <View style={[InteractionStyles.searchWrapper, { flex: 1 }]}> 
                        <TextInput
                            style={InteractionStyles.inputText}
                            value={search}
                            placeholder='Search...'
                            placeholderTextColor={theme.text}
                            onChangeText={setSearch}
                        />
                    </View>
                    <View>
                        <SettingsMenu navigation={navigation} route={route} />
                    </View>
                </View>
                
                <View style={{ flex: 1, width: '100%' }}>
                    <PantryList
                        route = {route}
                        enableSwipe = {false}
                        filter={filterItems(items, search)}
                        isSearching={search.length > 0}
                        expandedSections={expandedSections}
                        setExpandedSections={setExpandedSections}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};