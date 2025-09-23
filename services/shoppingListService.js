import { Alert } from 'react-native';

import { db } from '../config/FirebaseConfig'; 
import { collection, doc, addDoc, deleteDoc, getDoc, setDoc, updateDoc, writeBatch, serverTimestamp, arrayUnion } from 'firebase/firestore'; 

import { getExpirationDate } from '../utils/getExpirationDate';

// Create a new shopping list
export const createShoppingList = async (uid, shoppingListName) => {
    try { 
        // Create a new shopping list document and get its id
        const newShoppingListRef = await addDoc(collection(db, 'shoppingLists'), {
            name: shoppingListName,
            description: '', // optional
            ownerId: uid,
            createdAt: serverTimestamp(),
        }); 

        // Add the creator as the owner in the members subcollection
        const memberDocRef = doc(db, 'shoppingLists', newShoppingListRef.id, 'members', uid); 
        await setDoc(memberDocRef, {
            userId: uid,
            role: 'owner',
        }); 

        // Add pantry to users collection
        await setDoc(doc(db, 'users', uid), {
            shoppingLists: arrayUnion(newShoppingListRef.id) // add shopping list ID to array
        }, { merge: true });

        // Return the new shopping list ID to use as a shareable link
        return newShoppingListRef.id;

    } catch (error) { 
        console.error('Error creating shopping list:', error); 
        return null; 
    }
}; 

// Join existing shopping list
export const joinShoppingList = async (uid, shoppingListId, role='editor') => {
    // Check if the shopping list exists
    const shoppingListDocRef = doc(db, 'shoppingLists', shoppingListId);
    const shoppingListDoc = await getDoc(shoppingListDocRef); 
    if (!shoppingListDoc.exists()) {
        throw new Error('Shopping list not found.'); 
    }; 

    // Check if the user is already a member
    const memberDocRef = doc(db, 'shoppingLists', shoppingListId, 'members', uid);
    const memberDoc = await getDoc(memberDocRef); 
    if (memberDoc.exists()) {
        throw new Error('You are already a member of this shopping list.'); 
    };

    // Add user to the members subcollection
    await setDoc(memberDocRef, {
        userId: uid,
        role: role,
    }); 

    // Add pantry to users collection
    await setDoc(doc(db, 'users', uid), {
        shoppingLists: arrayUnion(shoppingListId) // add shopping list ID to array
    }, { merge: true }); 

    return true; 
}; 

// Fetch All User Shopping Lists
export const fetchUserShoppingLists = async(uid) => {
    try {
        const userDocRef = doc(db, 'users', uid); 
        const userDocSnap = await getDoc(userDocRef); 

        if (userDocSnap.exists()) {
            return userDocSnap.data().shoppingLists || [];
        } else {
            console.log("No user document found!"); 
            return []; 
        }

    } catch (error) {
        console.error("Error fetching user's shopping lists:", error);
        return [];
    }
}; 

// Fetch Shopping List by ID
export const fetchShoppingListById = async (shoppingListId) => {
    try { 
        const shoppingListRef = doc(db, 'shoppingLists', shoppingListId);
        const shoppingListSnap = await getDoc(shoppingListRef);
        return shoppingListSnap.exists() ? { id: shoppingListSnap.id, ...shoppingListSnap.data() } : null;

    } catch (error) {
        console.error(`Error fetching shopping list ${shoppingListId}`, error);
        return;
    }
};

// Favorite a Shopping List
export const setFavoriteShoppingList = async (uid, shoppingListId) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { favoriteShoppingListId: shoppingListId }); 
}; 

// Add an item to a shopping list
export const addItem = async (shoppingListId, item) => {
    try {
        const itemsCollectionRef = collection(db, 'shoppingLists', shoppingListId, 'items');
        await addDoc(itemsCollectionRef, {
            ...item,
            createdAt: serverTimestamp(),
        }); 
    } catch (error) {
        console.error("Error adding item:", error); 
    }
};

// Remove an item from a shopping list
export const removeItem = async (shoppingListId, itemId) => {
    try {
        const itemRef = doc(db, 'shoppingLists', shoppingListId, 'items', itemId);
        await deleteDoc(itemRef);
        console.log('Item deleted!'); 
    } catch (error) {
        console.error("Error removing item:", error); 
    }
};

// Edit an item in a shopping list
export const editItem = async (shoppingListId, updatedItem) => {
    try { 
        const itemRef = doc(db, 'shoppingLists', shoppingListId, 'items', updatedItem.id);
        await (updateDoc(itemRef, updatedItem));
    } catch (error) {
        console.error("Error editing item:", error);
    }
}; 

// Batch move check items from shopping list to pantry
export const batchMoveToPantry = async (shoppingListId, pantryId, items) => {
    // If we have no items to move then return
    if (!items.length) return; 

    // Define batch
    const batch = writeBatch(db); 

    try {
        // Batch add items to pantry
        items.forEach((item) => {
        const pantryItemRef = doc(collection(db, 'pantries', pantryId, 'items'));
        
        // Conditionally calculate expirationDate
        const calculatedExpirationDate = (item.expirationValue && item.expirationUnitsValue)
            ? getExpirationDate(new Date(), item.expirationValue, item.expirationUnitsValue)
            : null;
        
        batch.set(pantryItemRef, {
            title: item.title,
            quantity: item.quantity,
            unit: item.unit,
            category: item.category,
            dateAdded: new Date(), 
            expirationValue: item.expirationValue,
            expirationUnitsValue: item.expirationUnitsValue,
            expirationDate: calculatedExpirationDate,
        });

        // Batch remove items from shopping list
        const shoppingListRef = doc(db, 'shoppingLists', shoppingListId, 'items', item.id); 
        
        console.log('Deleting shopping list item at path:', shoppingListRef.path, 'with id:', item.id);
        
        batch.delete(shoppingListRef); 
        }); 

        await batch.commit(); 

    } catch (error) {
        console.error('Failed to batch move items to pantry:', error); 
    }
}; 