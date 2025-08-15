import React, { useContext, useReducer } from 'react';
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavBar from '../components/NavBar';

import PantryList from '../components/PantryList';
import AddItem from '../components/AddItem';
import { actionCreators, reducer, initialState } from '../components/pantry'
import { PantryContext } from '../components/PantryProvider'

export default function ManagePantryScreen() {
    return (
        <View>
            <Text style={styles.title}>Modify Pantry</Text>
        </View>
    );
};

export const ManageScreenWrapper = ({ navigation, route }) => {
    const insets = useSafeAreaInsets(); 

    // const [state, dispatch] = useReducer(reducer, initialState);
    const { state, dispatch } = useContext(PantryContext); 

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center'}}> 
                {/*Top Content*/}
                <View style={{ flex: 1 }}>
                    <ManagePantryScreen/>
                    <AddItem
                        placeholder={"Add a pantry item, then hit enter!"}
                        onSubmitEditing={(title) => dispatch(actionCreators.add(title))}
                    />
                    <PantryList
                        items={state.items}
                        onPressItem={(id) => dispatch(actionCreators.remove(id))}
                        route = {route}
                    />
                </View>
                
                {/*Navigation Buttons*/}
                <NavBar navigation={navigation} route={route}/>
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
    screen: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
    },  
    title: {
        textAlign: 'center', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 52,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
    },
    navButton: {
        padding: 40,
        borderRadius: 4, 
    },
    button: {
        padding: 40, 
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
});