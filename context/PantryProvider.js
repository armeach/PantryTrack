import React, { createContext, useEffect, useReducer, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer, createInitialState, actionCreators } from '../utils/items';
import { loadItems, saveItems } from '../utils/storage';

const PantryContext = createContext(); 

export function PantryProvider({ children }) {
    
    const [state, dispatch] = useReducer(reducer, { items: [] });

    // Load items when the provider mounts --> ONLY added initialState() items if its the FIRST opening of the app
    useEffect(() => {
        (async() => {
            const firstRun = await AsyncStorage.getItem('pantryFirstRun');
            
            // firstRun defaults to null if we haven't set it yet, so this way we set it to true later and can preserve the !firstRun check regardless 
            if (!firstRun) {
                const defaults = createInitialState();
                defaults.forEach(item => dispatch(actionCreators.add(item)));
                await saveItems('pantry', defaults);
                await AsyncStorage.setItem('pantryFirstRun', 'true');
            } else {
                const stored = await loadItems('pantry');
                stored.forEach(item => dispatch(actionCreators.add(item)));
            }           
        })();
    }, []);

    const addItem = async (item) => {
        dispatch(actionCreators.add(item)); 
        await saveItems('pantry', [...state.items, item]);
    };

    const removeItem = async (id) => {
        dispatch(actionCreators.remove(id));
        await saveItems('pantry', state.items.filter(i => i.id !== id));
    } 

    return (
        <PantryContext.Provider value={{ items: state.items, addItem, removeItem }}>
            {children}
        </PantryContext.Provider>
    );
};

export const usePantry = () => useContext(PantryContext); 