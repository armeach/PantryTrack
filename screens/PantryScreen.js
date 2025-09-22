import { useEffect, useState } from 'react'; 
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsMenu from '../components/SettingsMenu';
import PopoverMenuPantryManage from '../components/PopoverMenuPantryManage';

import PantryList from '../components/PantryList';

import { useAuth } from '../context/AuthProvider'; 
import { fetchUserPantries, fetchPantryById } from '../services/pantryService'; 
import { usePantry } from '../context/PantryProvider';

import { categories } from '../utils/categories';
import { capitalizeWords } from '../utils/capitalizeWords';

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

export default function PantryScreen({ navigation, route }) {
    const ScreenStyles = useScreenStyles();
    const InteractionStyles = useInteractionStyles(); 
    const insets = useSafeAreaInsets(); 

    const { user, activePantryId, selectPantry, userPantries, setUserPantries, refreshPantries, loadingPantries } = useAuth();    
    const { items } = usePantry(); 

    const [pantryDetails, setPantryDetails] = useState([]); 
    const [showPantryList, setShowPantryList] = useState(false); 
    const [selectedPantry, setSelectedPantry] = useState(activePantryId); 
    
    const [allOpen, setAllOpen] = useState(false); 
    const [expandedSections, setExpandedSections] = useState({}); 

    // useEffect to fetch all pantryIds when the user is available
    useEffect(() => {
        const loadPantries = async () => {
            if (user) {
                await refreshPantries(); 
            } else {
                setUserPantries([]); 
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
        loadPantryDetails(); 
    }, [userPantries]);

    const pantryItems = pantryDetails.map(pantry => ({
        label: pantry.name,
        value: pantry.id,
    }))

    return (
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            <View style={{ flex: 1, marginTop: 10 }}> 
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    
                    <View style={[InteractionStyles.searchWrapper, { flex: 1, alignItems: 'center', zIndex: 1000 }]}> 
                        <DropDownPicker
                            style={[InteractionStyles.dropdownPicker, { width: '100%' }]}
                            textStyle={InteractionStyles.dropdownText}
                            dropDownContainerStyle={{ ...InteractionStyles.dropdownWindow, maxHeight: 300}}
                            open={showPantryList}
                            setOpen={setShowPantryList}
                            value={selectedPantry}
                            setValue={(val) => {
                                setSelectedPantry(val);
                                selectPantry(val);
                            }}
                            items={pantryItems}
                            placeholder={pantryItems.length > 0 
                                            ? "Select a pantry..." 
                                            : "No pantries found"}
                        />
                    </View>

                    <View>
                        <SettingsMenu navigation={navigation} route={route} />
                    </View>
                    
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                    <PantryList 
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
                        backgroundColor: 'transparent',

                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        zIndex: 10,
                    }} >
                        <PopoverMenuPantryManage 
                            navigation={navigation} 
                            route={route} 
                        />
                </View>

            </View>
        </SafeAreaView>
    );
};