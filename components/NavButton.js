import { TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import useInteractionStyles from '../styles/InteractionStyles';
import { useTheme } from '../context/ThemeProvider';

export default function NavButton ({ icon, iconSize=24, destination, navigation, route, params, onPressCustom }) {
    const InteractionStyles = useInteractionStyles();
    const theme = useTheme(); 

    return (
        <TouchableHighlight
            style={InteractionStyles.navButton}
            underlayColor='lightgray'
            onPress={() => {
                if (onPressCustom) onPressCustom();
                if (route.name !== destination) {
                    navigation.push(destination, params);
                };
            }}
        >
            <Ionicons name={icon} size={iconSize} color={theme.popoverIconColor} />
        </TouchableHighlight>
    )
};