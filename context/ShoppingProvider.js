import { createContext, useContext, useEffect, useState} from 'react';
import { db } from '../config/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

import { useAuth } from './AuthProvider';
import { addItem, removeItem, editItem } from '../services/shoppingListService'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingListContext = createContext(); 

export function ShoppingProvider({ children }) {
    const [items, setItems] = useState([]); 
    const { user, activeShoppingListId } = useAuth(); 

    // This useEffect hook re-runs if the shoppingListId changes
    useEffect(() => {
        // Exit if not shopping list
        if (!activeShoppingListId || !user) {
            setItems([]);
            return; 
        }

        // Set up reference to Firestore db
        const itemsCollectionRef = collection(db, 'shoppingLists', activeShoppingListId, 'items'); 

        // Set up a real-time listener whose callback runs everytime data in the collection changes
        const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
            const itemsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(itemsList); 
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe(); 
    }, [activeShoppingListId, user]);

    // Locally handle tracking of checkbox status
    const [checkedMap, setCheckedMap] = useState({}); 
    useEffect(() => {
        const loadChecked = async () => {
            const stored = await AsyncStorage.getItem(`checked-${activeShoppingListId}`);
            setCheckedMap(stored ? JSON.parse(stored) : {});
        };
        if (activeShoppingListId) loadChecked(); 
    }, [activeShoppingListId]); 

    const toggleChecked = (itemId) => {
        setCheckedMap(prev => {
            const newMap = { ...prev, [itemId]: !prev[itemId] };
            AsyncStorage.setItem(`checked-${activeShoppingListId}`, JSON.stringify(newMap));
            return newMap;
        });
    }; 

    // Expose items and the Firestore functions to the rest of the app
    const value = {
        items,
        // These functions call our Firestore API from shoppingListService.js
        addItem: (item) => addItem(activeShoppingListId, item),
        removeItem: (itemId) => removeItem(activeShoppingListId, itemId),
        editItem: (updatedData) => editItem(activeShoppingListId, updatedData),
        toggleChecked, 
        checkedMap, 
    }; 

    return ( 
        <ShoppingListContext.Provider value={value}>
            {children}
        </ShoppingListContext.Provider>
    ); 
}; 

export const useShoppingList = () => useContext(ShoppingListContext); 