import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';

import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

import { useAuth } from '../context/AuthProvider';
import { createUserDoc } from '../services/userService';

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

import { useTheme } from '../context/ThemeProvider';

export default function SignupScreen({ navigation, route }) {
    const theme = useTheme(); 
    const ScreenStyles = useScreenStyles(); 
    const InteractionStyles = useInteractionStyles(); 
    const insets = useSafeAreaInsets(); 

    const { signUp } = useAuth(); 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true); 

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState(''); 

    const handleSubmit = async () => {
        if (password != confirmPassword) {
            setSnackbarText("Passwords do not match. \nPlease reenter passwords."); 
            setSnackbarVisible(true); 

            setConfirmPassword(''); 
            return
        }; 

        try {
            // If user account info is adequate, create an account.
            const userCredential = await signUp(email.trim(), password);
            await createUserDoc(userCredential.user.uid, email.trim()); 

            setSnackbarText('Account created. \nLogged in!');
            setSnackbarVisible(true);

            setTimeout(() => navigation.goBack(), 1000); 

        } catch (signUpError) {
            // If email is already in use
            if (signUpError.code === 'auth/email-already-in-use'){
                setSnackbarText("Email is already in use. \n Try signing in instead."); 
                setSnackbarVisible(true);
            }
            // If email is invalid
            else if (signUpError.code === 'auth/invalid-email') {
                setSnackbarText("Email is invalid. \nPlease enter a valid email address."); 
                setSnackbarVisible(true);
            }
            // If no password provided
            else if (signUpError.code === 'auth/missing-password') {
                setSnackbarText("No password provided. \nPlease enter a password");
                setSnackbarVisible(true);
            }
            // If password is weak
            else if (signUpError.code === 'auth/weak-password') {
                setSnackbarText("Weak password. \nPasswords must be at least 6 characters."); 
                setSnackbarVisible(true);
            } 
            // Other errors
            else {
                setSnackbarText(`Unable to create an account. \nError: ${signUpError.message || signUpError}`); 
                setSnackbarVisible(true);
            }   
        };
    };

    return (
        <SafeAreaView style={ScreenStyles.container} edges={['top', 'bottom']}>
            <View style={{ flex: 1, width: '100%' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: 20, paddingHorizontal: 10 }}>
                    <BackButton navigation={navigation} route={route} /> 
                    <SubmitButton handleSubmit={handleSubmit} navigation={navigation} skipNav={true} />
                </View>

                <View style={{ alignItems: 'center' }}>

                    {/* Input Email */}
                    <View style={InteractionStyles.inputWrapper}>
                        <TextInput
                            style={InteractionStyles.inputText}
                            value={email}
                            placeholder="Input email..."
                            placeholderTextColor={theme.text}
                            autoCapitalize='none'
                            onChangeText={(val) => {
                                setEmail(val);
                            }}
                        />
                    </View>

                    {/* Input Password */}
                    <View style={[InteractionStyles.inputWrapper, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                        <TextInput
                            secureTextEntry={hidePassword}
                            style={InteractionStyles.inputText}
                            value={password}
                            placeholder="Input password..."
                            placeholderTextColor={theme.text}
                            autoCapitalize='none'
                            onChangeText={(val) => {
                                setPassword(val);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setHidePassword(!hidePassword)}
                        >
                            <Ionicons 
                                name={hidePassword ? 'eye-off' : 'eye'}
                                size={28}
                                color={theme.text}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password */}
                    <View style={[InteractionStyles.inputWrapper, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                        <TextInput
                            secureTextEntry={hideConfirmPassword}
                            style={InteractionStyles.inputText}
                            value={confirmPassword}
                            placeholder="Confirm password..."
                            placeholderTextColor={theme.text}
                            autoCapitalize='none'
                            onChangeText={(val) => {
                                setConfirmPassword(val);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                        >
                            <Ionicons 
                                name={hideConfirmPassword ? 'eye-off' : 'eye'}
                                size={28}
                                color={theme.text}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            {/* Notifications */}
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <Snackbar
                    style={{ backgroundColor: theme.accent, borderRadius: 12 }}
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={2000}
                >
                    <Text style={{ color: theme.text, textAlign: 'center' }}>{snackbarText}</Text>
                </Snackbar>
            </View>

        </SafeAreaView>
    ); 
};