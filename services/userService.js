import { doc, setDoc, getDoc, updateDoc, arrayRemove, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig'; 

// Create a new user document
export const createUserDoc = async (uid, email) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            email,
            pantries: [],
            createdAt: serverTimestamp(),
        });
        console.log("User document created!"); 
    } catch (error) {
        console.error("Error creating user document:", error); 
    }
}; 

// Leave Pantry
export const removeUserFromPantry = async (uid, pantryId) => {
    const userRef = doc(db, 'users', uid); 
    const memberRef = doc(db, 'pantries', pantryId, 'members', uid); 

    const batch = writeBatch(db); 

    batch.update(userRef, { pantries: arrayRemove(pantryId) }); 
    batch.delete(memberRef); 

    try {
        await batch.commit();
        console.log(`User ${uid} removed from pantry ${pantryId}`);
    } catch (error) {
        console.error('Error removing user from pantry:', error);
    }
}; 

// Leave Shopping List
export const removeUserFromShoppingList = async (uid, shoppingListId) => {
    const userRef = doc(db, 'users', uid); 
    const memberRef = doc(db, 'shoppingLists', shoppingListId, 'members', uid); 

    const batch = writeBatch(db); 

    batch.update(userRef, { shoppingLists: arrayRemove(shoppingListId) }); 
    batch.delete(memberRef); 

    try {
        await batch.commit();
        console.log(`User ${uid} removed from shopping list ${shoppingListId}`);
    } catch (error) {
        console.error('Error removing user from shopping list:', error);
    }
}; 

// Fetch user doc
export const fetchUserDoc = async (uid) => {
    const userRef = doc(db, 'users', uid); 
    const userSnap = await getDoc(userRef); 
    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return null; 
    }
}; 

// Fetch favorite pantry ID
export const fetchFavoritePantry = async (uid) => {
    const userDoc = await fetchUserDoc(uid); 
    return userDoc?.favoritePantryId || null; 
}; 

// Fetch favorite shopping list ID
export const fetchFavoriteShoppingList = async (uid) => {
    const userDoc = await fetchUserDoc(uid); 
    return userDoc?.favoriteShoppingListId || null; 
}; 