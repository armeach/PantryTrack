import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const insets = useSafeAreaInsets(); 

    const InteractionStyles = useInteractionStyles(); 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true); 

    const { signUp } = useAuth(); 

    const handleSubmit = async () => {
        if (password != confirmPassword) {
            Alert.alert("Passwords do not match.", "Please reenter passwords."); 
            setPassword(''); 
            setConfirmPassword(''); 
            return
        }; 

        try {
            // If user account info is adequate, create an account.
            const userCredential = await signUp(email.trim(), password);
            await createUserDoc(userCredential.user.uid, email.trim()); 

            Alert.alert(
                "Account created.",
                "Logged in!",
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    }
                ]
            );
        } catch (signUpError) {
            // If password is weak
            if (signUpError.code === 'auth/weak-password') {
                Alert.alert("Weak password.", "Passwords must be at least 6 characters.");
            } 
            // If no password provided
            else if (signUpError.code === 'auth/missing-password') {
                Alert.alert("No password provided.", "Please enter a password.")
            }
            // If email is invalid
            else if (signUpError.code === 'auth/invalid-email') {
                Alert.alert("Email is invalid.", "Please enter a valid email address.");
            }
            // If email is already in use
            else if (signUpError.code === 'auth/email-already-in-use'){
                Alert.alert("Email already in use.", "Try signing in instead.")
            }
            // Other errors
            else {
                Alert.alert("Unable to create account.", signUpError.message); 
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
        </SafeAreaView>
    )
}







