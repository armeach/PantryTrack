import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

import { useAuth } from '../context/AuthProvider';

import { Ionicons } from '@expo/vector-icons';

import useScreenStyles from '../styles/ScreenStyles';
import useInteractionStyles from '../styles/InteractionStyles';

import { useTheme } from '../context/ThemeProvider';

export default function LoginScreen({ navigation, route }) {
    const theme = useTheme(); 
    
    const ScreenStyles = useScreenStyles();
    const insets = useSafeAreaInsets(); 

    const InteractionStyles = useInteractionStyles(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [hidePassword, setHidePassword] = useState(true); 

    const { signIn } = useAuth(); 

    const handleSubmit = async () => {
        try { 
            // If user account info is correct, login.
            await signIn(email.trim(), password); 
            Alert.alert(
                "Login Successful!",
                "",
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    }
                ]
            );
        } catch (signInError) { 
            // If email and/or password are incorrect (or if account does not exist). 
            if (signInError.code === 'auth/invalid-credential') {
                Alert.alert(
                    "Invalid Login",
                    "Please try again or create an account."
                );
            } 
            // Other errors
            else {
                Alert.alert("Unable to login. Error:", signInError.message); 
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

                </View>

            </View>
        </SafeAreaView>
    )
}