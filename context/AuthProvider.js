import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../config/FirebaseConfig.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { fetchUserPantries } from '../services/pantryService.js';
import { fetchUserShoppingLists } from '../services/shoppingListService.js';

// Create context container for authentification data. Holds { user, signUp, signIn, logOut }
const AuthContext = createContext({}); 

// Component Wrapper that provides the context to all children components
export const AuthProvider = ({ children }) => {
    // Track the currently logged-in user; null if no user is signed-in. 
    const [user, setUser] = useState(null);
    // Track the currently active pantry; null if no pantry is active.
    const [activePantryId, setActivePantryId] = useState(null); 
    // Track the currently active shopping list; null if no shopping list is active.
    const [activeShoppingListId, setActiveShoppingListId] = useState(null); 

    // Load stored activePantry on mount
    useEffect(() => {
        const loadActivePantry = async () => {
            const storedPantry = await AsyncStorage.getItem('activePantryId'); 
            if (storedPantry) setActivePantryId(storedPantry); 
        }
        loadActivePantry(); 
    }, []); 

    // Load stored activeShoppingList on mount
    useEffect(() => {
        const loadActiveShoppingList = async () => {
            const storedShoppingList = await AsyncStorage.getItem('activeShoppingListId'); 
            if (storedShoppingList) setActiveShoppingListId(storedShoppingList); 
        }
        loadActiveShoppingList(); 
    }, []); 

    // Monitor Firebase for login/logout and update the 'user' state
    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, setUser); 
        return unsubscribe;
    }, []);

    // Store userPantries and userShoppingLists for rendering across screens
    const [userPantries, setUserPantries] = useState([]);
    const refreshPantries = async () => {
        if (user) {
            const pantries = await fetchUserPantries(user.uid);
            setUserPantries(pantries); 
        }
    }; 

    const [userShoppingLists, setUserShoppingLists] = useState([]); 
    const refreshShoppingLists = async () => {
        if (user) {
            const shoppingLists = await fetchUserShoppingLists(user.uid);
            setUserShoppingLists(shoppingLists); 
        }
    }

    // Functions to wrap the Firebase authentification methods
    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logOut = () => signOut(auth); 
    const selectPantry = async (pantryId) => {
        setActivePantryId(pantryId); 
        await AsyncStorage.setItem('activePantryId', pantryId); 
    }; 
    const selectShoppingList = async (shoppingListId) => {
        setActiveShoppingListId(shoppingListId);
        await AsyncStorage.setItem('activeShoppingListId', shoppingListId); 
    }; 

    // Return Context
    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut, activePantryId, selectPantry, userPantries, setUserPantries, refreshPantries, activeShoppingListId, selectShoppingList, userShoppingLists, setUserShoppingLists, refreshShoppingLists }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access AuthContext in any component
export const useAuth = () => useContext(AuthContext); 