import { createContext, useEffect, useReducer, useContext, act } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer, createInitialState, actionCreators } from '../utils/items';
import { loadItems, saveItems } from '../utils/storage';

const PantryContext = createContext(); 

export function PantryProvider({ children }) {
    
    const [state, dispatch] = useReducer(reducer, { items: [] });

    // Load items when the provider mounts --> ONLY add initialState() items if its the FIRST opening of the app
    useEffect(() => {
        (async() => {
            const firstRun = await AsyncStorage.getItem('pantryFirstRun');
            const stored = await loadItems('pantry');
            
            // populate with the defaults if its the first load or the pantry is empty (mostly for testing)
            if (!firstRun || stored.length === 0) {
                const defaults = createInitialState().items;
                defaults.forEach(item => dispatch(actionCreators.add(item)));
                await saveItems('pantry', defaults);
                await AsyncStorage.setItem('pantryFirstRun', 'true');
            } 
            else {
                dispatch(actionCreators.setItems(stored));
            };       
        })();
    }, []);

    const addItem = async (item) => {
        dispatch(actionCreators.add(item)); 
        await saveItems('pantry', [...state.items, item]);
    };

    const removeItem = async (id) => {
        dispatch(actionCreators.remove(id));
        await saveItems('pantry', state.items.filter(i => i.id !== id));
    };

    const editItem = async (item) => {
        dispatch(actionCreators.edit(item));
        const updatedItems = state.items.map(i => (i.id === item.id ? item : i));
        await saveItems('pantry', updatedItems);
    };

    return (
        <PantryContext.Provider value={{ items: state.items, addItem, removeItem, editItem }}>
            {children}
        </PantryContext.Provider>
    );
};

export const usePantry = () => useContext(PantryContext); 