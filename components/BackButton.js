import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useInteractionStyles from '../styles/InteractionStyles.js';

export default function BackButton ({ navigation, route, style}) {
    const InteractionStyles = useInteractionStyles(); 
    
    return (
        <TouchableOpacity
            style={[InteractionStyles.backButton, style]}
            onPress={() => {
                navigation.pop();
            }}
        >
            <Ionicons name={'chevron-back-outline'} size={36} color='black'/>
        </TouchableOpacity>
    );
};