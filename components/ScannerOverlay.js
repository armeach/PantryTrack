import { View } from 'react-native'; 

export default function ScannerOverlay() {
    const cornerSize = 30;
    const cornerWidth = 30;
    const borderWidth = 5;

    return (

        <View
            style = {{
                position: 'absolute',
                top: '40%',
                left: '10%',
                width: '80%',
                height: 240,
            }}
        >
            
            {/* Top-Left */}
            <View
                style = {{
                    position: 'absolute', 
                    top: 0,
                    left: 0,

                    width: cornerSize,
                    height: cornerWidth,
                    borderTopWidth: borderWidth,
                    borderLeftWidth: borderWidth,
                    borderColor: 'black',
                }}
            />

            {/* Top-Right */}
            <View
                style = {{
                    position: 'absolute',
                    top: 0, 
                    right: 0,

                    width: cornerSize,
                    height: cornerWidth,
                    borderTopWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    borderColor: 'black',
                }}
            />

            {/* Bottom-Left */}
            <View
                style = {{
                    position: 'absolute',
                    top: 180, 
                    left: 0,

                    width: cornerSize,
                    height: cornerWidth,
                    borderBottomWidth: borderWidth,
                    borderLeftWidth: borderWidth,
                    borderColor: 'black',
                }}
            />

            {/* Bottom-Right */}
            <View
                style = {{
                    position: 'absolute',
                    top: 180, 
                    right: 0,

                    width: cornerSize,
                    height: cornerWidth,
                    borderBottomWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    borderColor: 'black',
                }}
            />

        </View>
        
    );
};