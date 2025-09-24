import { useState, useRef } from 'react';
import { Alert, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthProvider';

import useInteractionStyles from '../styles/InteractionStyles';

export default function SettingsMenu({ navigation, route }) {
    const InteractionStyles = useInteractionStyles();

    const { user, logOut } = useAuth(); 

    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const anchorRef = useRef(); 

    return (
        <View style={{ marginTop: -10, marginLeft: 10 }}>

            <TouchableOpacity
                ref={anchorRef}
                onPress={() => {
                    setShowSettingsMenu(true)
                }}
            >
                <Ionicons name='menu' size={36} color="black" />
            </TouchableOpacity>

            <Popover
                popoverStyle={{ backgroundColor: 'transparent' }}
                isVisible={showSettingsMenu}
                from={anchorRef}
                onRequestClose={() => {
                    setShowSettingsMenu(false);
                }}
            >
                <View style={{ flex: 1, width: 250}}>
                    
                    {/* User/Account Management */}
                    <View style={{ flexDirection: 'row' }}>
                        {/* Case 1: User is Logged in -> Display "Log Out" */}
                        { user ? (
                            <TouchableHighlight
                                style={[InteractionStyles.navButton, { flex: 1 }]}
                                underlayColor='lightgray'
                                onPress={() => {
                                    setShowSettingsMenu(false); 
                                    logOut();
                                    navigation.reset({
                                        index: 0, 
                                        routes: [{ name: 'Title'}],
                                    }); 
                                    Alert.alert("Logged out successfully.")
                                }}
                            >
                                <Text>Logout</Text>
                            </TouchableHighlight>
                            ) : 
                        // Case 2: User is NOT Logged in -> Display both "Login" and "Create Account"
                            (
                            <>
                                <TouchableHighlight
                                    style={[InteractionStyles.navButton, { flex: 1 }]}
                                    underlayColor='lightgray'
                                    onPress = {() => {
                                        setShowSettingsMenu(false); 
                                        navigation.push('Login');
                                    }}
                                >
                                    <Text>Login</Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    style={[InteractionStyles.navButton, { flex: 1 }]}
                                    underlayColor='lightgray'
                                    onPress = {() => {
                                        setShowSettingsMenu(false); 
                                        navigation.push('Signup')
                                    }}
                                >
                                    <Text>Signup</Text>
                                </TouchableHighlight>
                            </>
                            )
                        }        
                    </View>                    

                    {/* Mange Pantries (Create, Join, etc.) */}
                    <View>
                        <TouchableHighlight
                            style={InteractionStyles.navButton}
                            underlayColor='lightgray'
                            onPress={() => {
                                setShowSettingsMenu(false);
                                navigation.push('ManagePantries');
                            }}
                        >
                            <Text>Manage Pantries</Text>
                        </TouchableHighlight>
                    </View>

                    {/* Manage Shopping Lists (Create, Join, etc.) */}
                    <View>
                        <TouchableHighlight
                            style={InteractionStyles.navButton}
                            underlayColor='lightgray'
                            onPress={() => {
                                setShowSettingsMenu(false);
                                navigation.push('ManageShoppingLists');
                            }}
                        >
                            <Text>Manage Shopping Lists</Text>
                        </TouchableHighlight>
                    </View>

                    {/* Notifications */}
                    {/* <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={() => {

                        }}
                    >
                        <Text>When items expire? When items are close to expiring?</Text>
                    </TouchableHighlight> */}

                    {/* Data Management */}
                    {/* <TouchableHighlight
                        style={InteractionStyles.navButton}
                        underlayColor='lightgray'
                        onPress={() => {

                        }}
                    >
                        <Text>Clear data? Backup data? Export data?</Text>
                    </TouchableHighlight> */}

                </View>
            </Popover>
                
        </View>
    );
};