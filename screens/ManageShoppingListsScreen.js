import { useEffect, useState } from 'react';
import { Alert, SectionList, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper'; 
import * as Clipboard from 'expo-clipboard'; 

import { useAuth } from '../context/AuthProvider';
import { removeUserFromShoppingList, fetchFavoriteShoppingList } from '../services/userService';
import { fetchUserShoppingLists, fetchShoppingListById, createShoppingList, joinShoppingList, setFavoriteShoppingList } from '../services/shoppingListService';

import BackButton from "../components/BackButton";

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';
import useListStyles from '../styles/ListStyles';
import { useTheme } from '../context/ThemeProvider';

export default function ManageShoppingListsScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles(); 
    const InteractionStyles = useInteractionStyles(); 
    const ListStyles = useListStyles(); 
    const theme = useTheme(); 

    const { user, userShoppingLists, setUserShoppingLists, refreshShoppingLists } = useAuth(); 
    
    const [shoppingListDetails, setShoppingListDetails] = useState([]); 
    const [newShoppingListName, setNewShoppingListName] = useState(''); 
    const [joinShoppingListId, setJoinShoppingListId] = useState(''); 

    const [showShoppingLists, setShowShoppingLists] = useState({}); 
    const toggleShow = (value) => {
        setShowShoppingLists(prev => ({
            ...prev,
            [value]: !prev[value],
        })); 
    }; 

    const [snackbarVisible, setSnackbarVisible] = useState(false); 
    const [snackbarText, setSnackbarText ] = useState(''); 
    
    const copyToClipboard = async (id) => {
        await Clipboard.setStringAsync(id); 
        setSnackbarText(`Pantry ID copied: ${id}`);
        setSnackbarVisible(true); 
    }; 

    const [favoriteShoppingListId, setFavoriteShoppingListId] = useState(null); 
    useEffect(() => {
        const loadFavorite = async () => {
            if (user) {
                const favId = await fetchFavoriteShoppingList(user.uid);
                setFavoriteShoppingListId(favId);
            }
        };
        loadFavorite();
    }, [user]);

    const markFavorite = async (id) => {
        await setFavoriteShoppingList(user.uid, id); 
        const favId = await fetchFavoriteShoppingList(user.uid);
        setFavoriteShoppingListId(favId);

        setSnackbarText('Favorite shopping list updated!');
        setSnackbarVisible(true);
    }; 

    // useEffect to fetch all shoppingListIds when the user is available
    useEffect(() => {
        const loadShoppingLists = async() => {
            if (user) {
                const shoppingLists = await fetchUserShoppingLists(user.uid);
                setUserShoppingLists(shoppingLists); 
            };
        };
        loadShoppingLists();
    }, [user]); 

    // useEffect to resolve the the documents associated with each user shoppingListId
    useEffect(() => {
        const loadShoppingListDetails = async () => {
            const docs = await Promise.all(
                (userShoppingLists || []).map((id) => fetchShoppingListById(id)) // || handles the userShoppingLists being undefined
            );
            setShoppingListDetails(docs.filter(Boolean)); 
        };

        if (userShoppingLists.length > 0) {
            loadShoppingListDetails();
        } else {
            setShoppingListDetails([]); 
        }
    }, [userShoppingLists]); 

    const shoppingListItems = shoppingListDetails.map(shoppingList => ({
        label: shoppingList.name,
        value: shoppingList.id,
    })); 

    const handleCreateShoppingList = async () => {
        if (newShoppingListName !== '') {
            await createShoppingList(user.uid, newShoppingListName); 
            await refreshShoppingLists(); 

            setSnackbarText(`Created shopping list: ${newShoppingListName}`); 
            setSnackbarVisible(true); 
        } else {
            setSnackbarText('No shopping list name input.'); 
            setSnackbarVisible(true); 
        }
    };

    const handleJoinShoppingList = async () => {
        if (!user) {
            setSnackbarText('You must be logged in to join a shopping list.')
            setSnackbarVisible(true); 
            return;
        };

        if (joinShoppingListId.trim() !== '') {
            try {
                await joinShoppingList(user.uid, joinShoppingListId); 
                await refreshShoppingLists(); 
                
                setSnackbarText('Joined shopping list successfully!')
                setSnackbarVisible(true); 
            } catch (error) {
                setSnackbarText(`Failed to join shopping list: ${error.message || error}`);
                setSnackbarVisible(true); 
            }
        } else {
            setSnackbarText('No shopping list ID input.');
            setSnackbarVisible(true); 
        }
    }; 

    const handleRemoveShoppingList = async (shoppingListId, shoppingListName) => {
        await removeUserFromShoppingList(user.uid, shoppingListId);
        await refreshShoppingLists(); 
        
        setSnackbarText(`Removed user from ${shoppingListName}`); 
        setSnackbarVisible(true); 
    };
    
    const confirmRemoveShoppingList = (shoppingListId, shoppingListName) => {
        Alert.alert(
            "Leave Shopping List?",
            `Are you sure you want to leave ${shoppingListName}?`,
            [
                { text: "Leave", style: "destructive", onPress: () => handleRemoveShoppingList(shoppingListId, shoppingListName) },
                { text: "Cancel", style: "cancel" }
            ]
        ); 
    }; 

    return (
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            
            <View>
                <BackButton navigation={navigation} route={route} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                
                {/* Create a New Shopping List */}
                <View style={InteractionStyles.inputWrapper}>

                    <TextInput
                        style={InteractionStyles.inputText}
                        value={newShoppingListName}
                        placeholder="Input new shopping list name..."
                        placeholderTextColor={theme.text}
                        autoCapitalize='none'
                        onChangeText={(val) => {
                            setNewShoppingListName(val); 
                        }} 
                    />

                    <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={handleCreateShoppingList}
                    >
                        <Text> Create New Shopping List </Text>
                    </TouchableHighlight>

                </View>

                {/* Join a Shopping List */}
                <View style={InteractionStyles.inputWrapper}>

                    <TextInput 
                        style={InteractionStyles.inputText}
                        value={joinShoppingListId}
                        placeholder="Input shopping list id..."
                        placeholderTextColor={theme.text}
                        autoCapitalize='none'
                        onChangeText={(val) => {
                            setJoinShoppingListId(val); 
                        }}
                    />

                    <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={handleJoinShoppingList}
                    >
                        <Text> Join Shopping List </Text>
                    </TouchableHighlight>


                </View>

                {/* Display Existing User Shopping Lists */}
                <View style={{ flex: 1, width: '100%', paddingHorizontal: 15 }}>
                    <SectionList 
                        sections={[{ title: "User Shopping Lists", data: showShoppingLists["User Shopping Lists"] ? shoppingListItems : [] }]}
                        keyExtractor={(item, index) => item?.value ?? index.toString()}
                        renderSectionHeader={({ section }) => (
                            <View style={ListStyles.listSection}>
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleShow(section.title); 
                                    }}
                                >
                                    <Text style={{ fontSize: 20}}>{section.title}</Text>
                                </TouchableOpacity>
                                
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <View style={[ListStyles.listItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F7F3' }]}>
                                
                                <Text style={{ fontSize: 16 }}>{item.label}</Text>
                                
                                <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>

                                    <TouchableOpacity
                                        style={{ marginHorizontal: 8 }}
                                        onPress={() => markFavorite(item.value)}
                                    >
                                        <Ionicons name={item.value === favoriteShoppingListId ? 'star' : 'star-outline' } size={24} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ marginHorizontal: 8 }}
                                        onPress={() => copyToClipboard(item.value)}
                                    >
                                        <Ionicons name='copy-outline' size={24} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ marginHorizontal: 8 }}
                                        onPress={() => confirmRemoveShoppingList(item.value, item.label)}
                                    >
                                        <Ionicons name='person-remove' size={24} />
                                    </TouchableOpacity>

                                </View>
                                
                            </View>
                        )}
                    />
                </View>

            </View>

            {/* Notifications */}
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <Snackbar
                    style={{ backgroundColor: theme.secondary, borderRadius: 12 }}
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                >
                    {snackbarText}
                </Snackbar>
            </View>

        </SafeAreaView>
    );
};