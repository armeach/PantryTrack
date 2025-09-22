import { useEffect, useState } from 'react'; 
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsMenu from '../components/SettingsMenu';
import PopoverMenuShoppingList from '../components/PopoverMenuShoppingList';

import ShoppingList from '../components/ShoppingList';

import { useAuth } from '../context/AuthProvider'; 
import { fetchUserShoppingLists, fetchShoppingListById } from '../services/shoppingListService';
import { useShoppingList } from '../context/ShoppingProvider';

import { categories } from '../utils/categories';
import { capitalizeWords } from '../utils/capitalizeWords';

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';
import { useTheme } from '../context/ThemeProvider';

export default function ShoppingListScreen({ navigation, route }) {  
    const ScreenStyles = useScreenStyles();
    const InteractionStyles = useInteractionStyles();
    const theme = useTheme();  
    const insets = useSafeAreaInsets();

    const { user, activeShoppingListId, selectShoppingList, userShoppingLists, setUserShoppingLists, refreshShoppingLists } = useAuth(); 
    const { items } = useShoppingList(); 

    const [shoppingListDetails, setShoppingListDetails] = useState([]); 
    const [showShoppingListDropdown, setShowShoppingListDropdown] = useState(false); 
    const [selectedShoppingList, setSelectedShoppingList] = useState(activeShoppingListId); 

    const [allOpen, setAllOpen] = useState(false); 
    const [expandedSections, setExpandedSections] = useState({}); 

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState(''); 

    // useEffect to fetch all shoppingListIds when the user is available
    useEffect(() => {
        const loadShoppingLists = async() => {
            if (user) {
                await refreshShoppingLists(); 
            } else {
                setUserShoppingLists([]); 
            }
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
        loadShoppingListDetails();
    }, [userShoppingLists]); 

    const shoppingListItems = shoppingListDetails.map(shoppingList => ({
        label: shoppingList.name,
        value: shoppingList.id,
    })); 

    console.log('User:', user); 
    console.log('Active Shopping List Id:', activeShoppingListId);
    console.log('Selected shopping list:', selectedShoppingList);  
    console.log(shoppingListItems); 
    
    return(
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            <View style={{ flex: 1, marginTop: 10 }}> 
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    
                    <View style={[InteractionStyles.searchWrapper, { flex: 1, alignItems: 'center', zIndex: 1000 }]}> 
                        <DropDownPicker
                            style={[InteractionStyles.dropdownPicker, { width: '100%' }]}
                            textStyle={InteractionStyles.dropdownText}
                            dropDownContainerStyle={{ ...InteractionStyles.dropdownWindow, maxHeight: 300}}
                            open={showShoppingListDropdown}
                            setOpen={setShowShoppingListDropdown}
                            value={selectedShoppingList}
                            setValue={(val) => {
                                setSelectedShoppingList(val);
                                selectShoppingList(val);
                            }}
                            items={shoppingListItems}
                            placeholder={shoppingListItems.length > 0 ? "Select a shopping list..." : "No shopping lists found"}
                        />
                    </View>

                    <View>
                        <SettingsMenu navigation={navigation} route={route} />
                    </View>
                    
                </View>
            
                <View style={{ flex: 1, width: '100%' }}>
                    <ShoppingList 
                        navigation={navigation}
                        expandedSections={expandedSections}
                        setExpandedSections={setExpandedSections}
                    />
                </View>

                <View 
                    style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'flex-end', 
                        paddingHorizontal: 20, 
                        paddingVertical: 20, 
                        backgroundColor: 'transparent',

                        position: 'absolute',
                        bottom: 80,
                        right: 2,
                        zIndex: 10,
                    }} 
                >
                    <TouchableOpacity
                        underlayColor='lightgray'
                        onPress={() => {
                            const allSectionsExpanded = {};
                            categories.forEach(cat => {
                                allSectionsExpanded[capitalizeWords(cat.label)] = !allOpen;
                            });
                            setExpandedSections(allSectionsExpanded);
                            setAllOpen(!allOpen); 
                        }}
                    >
                        <Ionicons name={!allOpen ? 'chevron-down-circle' : 'chevron-up-circle'} size={80} color="#6F8C84" />
                    </TouchableOpacity>
                </View>

                <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'flex-end', 
                    paddingHorizontal: 20, 
                    paddingVertical: 20,

                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    zIndex: 10,
                    }} >
                    <PopoverMenuShoppingList 
                        navigation={navigation} 
                        route={route} 
                        onRequestSnackbar={(msg) => {
                            setSnackbarText(msg);
                            setSnackbarVisible(true);
                        }}
                    />
                </View>

                <View>
                    {/* Notifications */}
                    <Snackbar
                        style={{ backgroundColor: theme.secondary, borderRadius: 12,
                                 position: 'absolute', bottom: 15, left: 0, right: 90
                            }}
                        visible={snackbarVisible}
                        onDismiss={() => setSnackbarVisible(false)}
                        duration={2000}
                    >
                        {snackbarText}
                    </Snackbar>
                </View>

            </View>

        </SafeAreaView>
    );
};