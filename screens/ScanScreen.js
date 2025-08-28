import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import BackButton from '../components/BackButton';

export default function ScanScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();

    const [permission, requestPermission] = useCameraPermissions();

    const [scanned, setScanned] = useState(false);

    // Camera permissions are still loading.
    if (!permission) {
        return <View />;
    };

    // Camera permissions are not yet granted.
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera.</Text>
                <Button 
                    title='Grant Permission'
                    onPress={() => {
                        requestPermission();
                    }}
                />
            </View>
        );
    };

    // Show camera if permissions are granted. 
    return(
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

            {/* {Platform.OS === 'android' ? <StatusBar hidden={true} backgroundColor="transparent" /> : null} */}

            <BackButton navigation={navigation} route={route} />
            <CameraView 
                style={styles.camera}
                facing={'back'}
                barcodeScannerSettings={
                    {
                        barcodeTypes: 'upc_a'
                    }
                } 
                onBarcodeScanned={(data) => {
                    if (!scanned) {
                        setScanned(true);
                        console.log(data);
                        navigation.pop();
                    };
                }}
            />
        </SafeAreaView>
    );    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 32,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});