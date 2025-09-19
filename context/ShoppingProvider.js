import { createContext, useContext, useEffect, useState} from 'react';
import { db } from '../config/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

import { useAuth } from './AuthProvider';
import { addItem, removeItem, editItem } from '../services/shoppingListService'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingListContext = createContext(); 

export function ShoppingProvider({ children }) {
    const [items, setItems] = useState([]); 
    const { activeShoppingListId } = useAuth(); 

    // This useEffect hook re-runs if the shoppingListId changes
    useEffect(() => {
        // Exit if not shopping list
        if (!activeShoppingListId) {
            setItems([]);
            return; 
        }

        // Set up reference to Firestore db
        const itemsCollectionRef = collection(db, 'shoppingLists', activeShoppingListId, 'items'); 

        // Set up a real-time listener whose callback runs everytime data in the collection changes
        const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
            // Fetch local persistence of checked status
            const mergeCheckedState = async () => {
                const stored = await AsyncStorage.getItem(`checked-${activeShoppingListId}`);
                const checkedMap = stored ? JSON.parse(stored) : {};

                const itemsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    checked: checkedMap[doc.id] || false,
                }));

                setItems(itemsList); 
            };
            mergeCheckedState();
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe(); 
    }, [activeShoppingListId]);

    // This handles local checkbox tracking for shopping lists (so that we don't have a TON of Firestore writes)
    const toggleChecked = (itemId) => {
        setItems(prev => {
            const newItems = prev.map(i =>
                i.id === itemId ? { ...i, checked: !i.checked } : i
            );

            // Persist locally
            const checkedMap = {};
            newItems.forEach(i => { checkedMap[i.id] = i.checked; });
            AsyncStorage.setItem(`checked-${activeShoppingListId}`, JSON.stringify(checkedMap));

            return newItems;
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
    }; 

    return ( 
        <ShoppingListContext.Provider value={value}>
            {children}
        </ShoppingListContext.Provider>
    ); 
}; 

export const useShoppingList = () => useContext(ShoppingListContext); 