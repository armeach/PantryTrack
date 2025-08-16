import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View}  from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddItem from '../components/AddItem';
import { actionCreators, reducer, initialState } from '../components/pantry'
import { PantryContext } from '../components/PantryProvider'

export default function AddPantryItemScreen() {
    return (
        <View>
            <Text style={styles.title}>ITEM INPUT SCREEN</Text>
        </View>
    );
};

export const AddItemScreenWrapper = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();

    const { state, dispatch } = useContext(PantryContext);

    return(
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom}]}>
            <View style={[styles.view, { paddingBottom: insets.bottom+20}]}>
                <View>
                    <Text style={styles.title}>Add Item</Text>
                    <AddItem
                        navigation={navigation}
                        route={route}
                        onSubmitEditing={(item) => dispatch(actionCreators.add(item))}
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
        backgroundColor: 'lightgreen',
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