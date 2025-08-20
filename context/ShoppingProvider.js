import React, { createContext, useReducer, useContext } from 'react';

import { reducer, initialState, actionCreators } from '../utils/items';

const ShoppingListContext = createContext(); 

export function ShoppingProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (item) => dispatch(actionCreators.add(item)); 
    const removeItem = (id) => dispatch(actionCreators.remove(id)); 

    return (
        <ShoppingListContext.Provider value={{ items: state.items, addItem, removeItem }}>
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingList = () => useContext(ShoppingListContext); 