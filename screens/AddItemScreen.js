import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View}  from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import AddItem, {SubmitButton } from '../components/AddItem';
import { usePantry } from '../context/PantryProvider';
import { useShoppingList } from '../context/ShoppingProvider';

import BackButton from '../components/BackButton';
import ScreenStyles from '../styles/ScreenStyles';
import InteractionStyles from '../styles/InteractionStyles.js';

export default function AddItemScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();

    const listType = route.params?.listType;
    const addItem = listType === 'pantry'
        ? usePantry().addItem
        : useShoppingList().addItem;

    return(
        <SafeAreaView style={[ScreenStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={[styles.view, { paddingBottom: insets.bottom+20}]}>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', paddingBottom: 10 }}>
                    <BackButton navigation={navigation} route={route} />
                </View>
                
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor: '#40e46fff',
    },
    view: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
});