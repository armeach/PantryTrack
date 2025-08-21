import { StyleSheet, View } from 'react-native';

import NavButton from './NavButton';

export default function NavBar({ navigation, route }) { 
    return (
        <View style={styles.buttonView}>
            <NavButton title="Pantry Contents" destination='Home' navigation={navigation} route={route} />
            <NavButton title="Manage Pantry" destination='ManagePantry' navigation={navigation} route={route} />
            <NavButton title="Shopping List" destination='ShoppingList' navigation={navigation} route={route} />
            {/* <NavButton title="Scanner" destination="Scan" navigation={navigation} route={route} /> */}
        </View>
    );
};

const styles = StyleSheet.create({ 
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },  
});