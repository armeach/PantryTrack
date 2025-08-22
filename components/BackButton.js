import { StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import InteractionStyles from '../styles/InteractionStyles.js';

export default function BackButton ({ navigation, route }) {
    return (
        <TouchableHighlight
            style={InteractionStyles.backButton}
            underlayColor='lightgray'
            onPress={() => {
                navigation.pop();
            }}
        >
            <Ionicons name={'chevron-back-outline'} size={36} color='black'/>
        </TouchableHighlight>
    );
};