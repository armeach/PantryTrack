import { createContext, useEffect, useReducer, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer, createInitialState, actionCreators } from '../utils/items';
import { loadItems, saveItems } from '../utils/storage';

const ShoppingListContext = createContext(); 

export function ShoppingProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, { items: [] });

    // Load items when the provider mounts --> ONLY added initialState() items if its the FIRST opening of the app
    useEffect(() => {
        (async() => {
            const firstRun = await AsyncStorage.getItem('shoppingFirstRun');
            const stored = await loadItems('shopping');

            // firstRun defaults to null, so we use !firstRun to check if we have run this before
            if (!firstRun || stored.length === 0) {
                const defaults = createInitialState().items; 
                defaults.forEach(item => dispatch(actionCreators.add(item)));
                await saveItems('shopping', defaults);
                await AsyncStorage.setItem('shoppingFirstRun', 'true');
            } else {
                stored.forEach(item => dispatch(actionCreators.add(item)));
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

    const toggleChecked = (id) => dispatch(actionCreators.toggleChecked(id)); 

    return (
        <ShoppingListContext.Provider value={{ items: state.items, addItem, removeItem, editItem,   toggleChecked }}>
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingList = () => useContext(ShoppingListContext); 