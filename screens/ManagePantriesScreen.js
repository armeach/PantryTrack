import { useEffect, useState } from 'react'; 
import { Alert, SectionList, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper'; 
import * as Clipboard from 'expo-clipboard'; 

import { useAuth } from '../context/AuthProvider';
import { removeUserFromPantry, fetchFavoritePantry } from '../services/userService';
import { fetchUserPantries, fetchPantryById, createPantry, joinPantry, setFavoritePantry } from '../services/pantryService'; 

import BackButton from "../components/BackButton";

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';
import useListStyles from '../styles/ListStyles';
import { useTheme } from '../context/ThemeProvider';

export default function ManagePantriesScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles(); 
    const InteractionStyles = useInteractionStyles(); 
    const ListStyles = useListStyles(); 
    const theme = useTheme(); 

    const { user, userPantries, setUserPantries, refreshPantries } = useAuth(); 

    const [pantryDetails, setPantryDetails] = useState([]); 
    const [newPantryName, setNewPantryName] = useState(''); 
    const [joinPantryId, setJoinPantryId] = useState(''); 

    const [showPantries, setShowPantries] = useState({});
    const toggleShow = (value) => {
        setShowPantries(prev => ({
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

    const [favoritePantryId, setFavoritePantryId] = useState(null); 
    useEffect(() => {
        const loadFavorite = async () => {
            if (user) {
                const favId = await fetchFavoritePantry(user.uid);
                setFavoritePantryId(favId);
            }
        };
        loadFavorite();
    }, [user]);

    const markFavorite = async (id) => {
        await setFavoritePantry(user.uid, id); 
        const favId = await fetchFavoritePantry(user.uid);
        setFavoritePantryId(favId);

        setSnackbarText('Favorite pantry updated!');
        setSnackbarVisible(true);
    }; 

    // useEffect to fetch all pantryIds when the user is available
    useEffect(() => {
        const loadPantries = async() => {
            if (user) {
                const pantries = await fetchUserPantries(user.uid); 
                setUserPantries(pantries); 
            } else {
                console.log('No user!'); 
            } 
        }; 
        loadPantries(); 
    }, [user]); 
    
    // useEffect to resolve the documents associated with each user pantryId
    useEffect(() => {
        const loadPantryDetails = async () => {
            const docs = await Promise.all(
                (userPantries || []).map((id) => fetchPantryById(id)) // || handles the userPantries being undefined
            ); 
            setPantryDetails(docs.filter(Boolean)); 
        }; 

        if (userPantries.length > 0) {
            loadPantryDetails();
        } else { 
            setPantryDetails([]); 
        }
    }, [userPantries]);

    const pantryItems = pantryDetails.map(pantry => ({
        label: pantry.name,
        value: pantry.id,
    }))

    const handleCreatePantry = async () => {
        if (newPantryName !== '') {
            await createPantry(user.uid, newPantryName); 
            await refreshPantries(); 

            setSnackbarText(`Created pantry: ${newPantryName}`); 
            setSnackbarVisible(true); 
        } else {
            setSnackbarText('No pantry name input.'); 
            setSnackbarVisible(true); 
        }
    }; 

    const handleJoinPantry = async () => {
        if (!user) {
            setSnackbarText('You must be logged in to join a pantry.')
            setSnackbarVisible(true); 
            return;
        };

        if (joinPantryId.trim() !== '') {
            try {
                await joinPantry(user.uid, joinPantryId); 
                await refreshPantries(); 

                setSnackbarText('Joined pantry successfully!')
                setSnackbarVisible(true); 
            } catch (error) {
                setSnackbarText(`Failed to join pantry: ${error.message || error}`);
                setSnackbarVisible(true);
            }
        } else {
            setSnackbarText('No pantry ID input.');
            setSnackbarVisible(true);
        }
    }; 

    const handleRemovePantry = async (pantryId, pantryName) => {
        await removeUserFromPantry(user.uid, pantryId);
        await refreshPantries(); 
        
        setSnackbarText(`Removed user from ${pantryName}`); 
        setSnackbarVisible(true); 
    };

    const confirmRemovePantry = (pantryId, pantryName) => {
        Alert.alert(
            "Leave Pantry?",
            `Are you sure you want to leave ${pantryName}?`,
            [
                { text: "Leave", style: "destructive", onPress: () => handleRemovePantry(pantryId, pantryName) },
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
                
                {/* Create a New Pantry */}
                <View style={InteractionStyles.inputWrapper}>
            
                    <TextInput 
                        style={InteractionStyles.inputText}
                        value={newPantryName}
                        placeholder="Input new pantry name..."
                        placeholderTextColor={theme.text}
                        autoCapitalize='none'
                        onChangeText={(val) => {
                            setNewPantryName(val); 
                        }}
                    />

                    <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={handleCreatePantry}
                    >
                        <Text> Create New Pantry </Text>
                    </TouchableHighlight>

                </View>

                {/* Join Existing Pantry */}
                <View style={InteractionStyles.inputWrapper}>
                    
                    <TextInput
                        style={InteractionStyles.inputText}
                        value={joinPantryId}
                        placeholder="Input pantry id..."
                        placeholderTextColor={theme.text}
                        autoCapitalize='none'
                        onChangeText={(val) => {
                            setJoinPantryId(val);
                        }}
                    />

                    <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={handleJoinPantry}
                    >
                        <Text> Join Pantry </Text>
                    </TouchableHighlight>

                </View>
                
                {/* Display Existing User Pantries */}
                <View style={{ flex: 1, width: '100%', paddingHorizontal: 15 }}>
                    <SectionList
                        sections={[{ title: "User Pantries", data: showPantries["User Pantries"] ? pantryItems : [] }]}
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
                                        <Ionicons name={item.value === favoritePantryId ? 'star' : 'star-outline' } size={24} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ marginHorizontal: 8 }}
                                        onPress={() => copyToClipboard(item.value)}
                                    >
                                        <Ionicons name='copy-outline' size={24} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ marginHorizontal: 8 }}
                                        onPress={() => confirmRemovePantry(item.value, item.label)}
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