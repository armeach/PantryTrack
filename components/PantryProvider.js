import React, { createContext, useReducer } from 'react';

import { reducer, initialState } from './pantry';

export const PantryContext = createContext(); 

export default function PantryProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PantryContext.Provider value={{ state, dispatch }}>
            {children}
        </PantryContext.Provider>
    );
};