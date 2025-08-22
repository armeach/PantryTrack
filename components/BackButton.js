import { StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ButtonStyles from '../styles/ButtonStyles';

export default function BackButton ({ navigation, route }) {
    return (
        <TouchableHighlight
            style={ButtonStyles.backButton}
            underlayColor='lightgray'
            onPress={() => {
                navigation.pop();
            }}
        >
            <Ionicons name={'chevron-back-outline'} size={24} color='black'/>
        </TouchableHighlight>
    );
};