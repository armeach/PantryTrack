import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useInteractionStyles from '../styles/InteractionStyles';

export default function SubmitButton ({ handleSubmit, navigation, skipNav = false }) { 
    const InteractionStyles = useInteractionStyles(); 

    return (
        <TouchableOpacity
            style={InteractionStyles.backButton}
            onPress = {async () => {
                const success = await handleSubmit(); 
                if (!skipNav && success) navigation.goBack(); 
            }}
        >
            <Ionicons name={'checkmark'} size={36} color='black' />
        </TouchableOpacity>
    );
};