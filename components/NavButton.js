import { TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import ButtonStyles from '../styles/ButtonStyles';

export default function NavButton ({ icon, iconSize=24, destination, navigation, route, params, onPressCustom }) {
    return (
        <TouchableHighlight
            style={ButtonStyles.navButton}
            underlayColor='lightgray'
            onPress={() => {
                if (onPressCustom) onPressCustom();
                if (route.name !== destination) {
                    navigation.push(destination, params);
                };
            }}
        >
            <Ionicons name={icon} size={iconSize} />
        </TouchableHighlight>
    )
};