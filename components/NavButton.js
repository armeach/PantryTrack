import { StyleSheet, Text, TouchableHighlight } from 'react-native'

export default function NavButton ({ title, destination, navigation, route }) {
    return (
        <TouchableHighlight
            style={styles.button}
            underlayColor='lightgray'
            onPress={() => {
                if (route.name !== destination) {
                    navigation.push(destination);
                };
            }}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        margin: 5,
        padding: 20, 
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    text: {
        textAlign: 'center',
        color: 'white',
    }
});