import { useEffect, useState } from 'react'; 
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsMenu from '../components/SettingsMenu';
import PopoverMenuShoppingList from '../components/PopoverMenuShoppingList';

import ShoppingList from '../components/ShoppingList';

import { useAuth } from '../context/AuthProvider'; 
import { fetchUserShoppingLists, fetchShoppingListById } from '../services/shoppingListService';
import { useShoppingList } from '../context/ShoppingProvider';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

export default function ShoppingListScreen({ navigation, route }) {  
    const ScreenStyles = useScreenStyles();
    const InteractionStyles = useInteractionStyles(); 
    const insets = useSafeAreaInsets();

    const { user, activeShoppingListId, selectShoppingList, userShoppingLists, setUserShoppingLists, refreshShoppingLists } = useAuth(); 
    const { items } = useShoppingList(); 

    const [shoppingListDetails, setShoppingListDetails] = useState([]); 
    const [showShoppingListDropdown, setShowShoppingListDropdown] = useState(false); 
    const [selectedShoppingList, setSelectedShoppingList] = useState(activeShoppingListId); 

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
                    <ShoppingList navigation={navigation}/>
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
                    <PopoverMenuShoppingList navigation={navigation} route={route} />
                </View>

            </View>

        </SafeAreaView>
    );
};