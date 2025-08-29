import React, { use, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import filterItems from '../utils/filterItems';

import PantryList from '../components/PantryList';
import { usePantry } from '../context/PantryProvider'

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

import { useTheme } from '../context/ThemeProvider';

export default function HomeScreen({ navigation, route })  {
    theme = useTheme(); 

    const ScreenStyles = useScreenStyles();
    const InteractionStyles = useInteractionStyles();
    const insets = useSafeAreaInsets(); 

    const [search, setSearch] = useState('');
    const { items } = usePantry(); 

    return (
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, marginTop: 10 }}> 
                
                <View style={{ alignItems: 'center' }}>
                    <View style={InteractionStyles.searchWrapper}> 
                        <TextInput
                            style={InteractionStyles.inputText}
                            value={search}
                            placeholder='Search...'
                            placeholderTextColor={theme.text}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
                
                <View style={{ flex: 1, width: '100%' }}>
                    <PantryList
                        items={items}
                        route = {route}
                        enableSwipe = {false}
                        filter={filterItems(items, search)}
                        isSearching={search.length > 0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};