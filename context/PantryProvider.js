import React, { createContext, useReducer, useContext } from 'react';

import { reducer, initialState, actionCreators } from '../utils/items';

const PantryContext = createContext(); 

export function PantryProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (item) => dispatch(actionCreators.add(item)); 
    const removeItem = (id) => dispatch(actionCreators.remove(id)); 

    return (
        <PantryContext.Provider value={{ items: state.items, addItem, removeItem }}>
            {children}
        </PantryContext.Provider>
    );
};

export const usePantry = () => useContext(PantryContext); 