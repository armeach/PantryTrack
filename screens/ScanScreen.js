import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { checkBarCode } from '../utils/barCodeStorage';

import BackButton from '../components/BackButton';
import ScannerOverlay from '../components/ScannerOverlay';

export default function ScanScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();

    const { listType } = route.params; 

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
        // <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <SafeAreaView style={styles.container}>

            {/* {Platform.OS === 'android' ? <StatusBar hidden={true} backgroundColor="transparent" /> : null} */}

            <BackButton 
              style={{
                position: 'absolute',
                top: 40, 
                left: 16, 
                zIndex: 10,
                color: 'white',
              }}
              navigation={navigation} 
              route={route} 
            />
            <CameraView 
                style={styles.camera}
                facing={'back'}
                barcodeScannerSettings={
                    {
                        barcodeTypes: 'upc_a'
                    }
                } 
                onBarcodeScanned={async (scanResult) => {
                    if (!scanned) {
                        setScanned(true);

                        const barcode = scanResult.data;

                        const item = await checkBarCode(barcode); 
                        
                        if (!item) { 
                          navigation.replace('AddItem', { barcode, listType }); 
                        } else {
                          navigation.replace('AddItem', { barcode, listType, item})
                        };
                    };
                }}
            />
            <ScannerOverlay />

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