import React from 'react';
import { Text, StyleSheet } from 'react-native'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';

import ListStyles from '../styles/ListStyles';

function RightAction({ prog, dragX }) { 
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: dragX.value+50 }],
    }));

    return (
        <Reanimated.View style={[styleAnimation, { justifyContent: 'center', alignItems: 'center' }]}>
            {/* <Text style={styles.rightAction}>Move to Shopping List</Text> */}
            <Ionicons name={'bag-add-outline'} size={24} color="white" />
            {/* <Ionicons name={'cart-plus-outline'} size={24} color="white" /> */}
        </Reanimated.View>
    );
};

function LeftAction({ prog, dragX }) {
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: dragX.value-50 }],
    }));

    return (
        <Reanimated.View style={[styleAnimation, { justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name={'trash-outline'} size={24} color="white" />
        </Reanimated.View>
    );
};

export default function SwipeableListItem({ textContent, itemColor, onSwipeRight = () => {}, onSwipeLeft = () => {}, children }) { 
    const content = children || <Text>{textContent}</Text>;

    return (
        <GestureHandlerRootView style={styles.viewStyle}>
            <ReanimatedSwipeable
                containerStyle={[ListStyles.listItem, { backgroundColor: itemColor }]}
                friction={2}
                rightThreshold={80}
                leftThreshold={80}
                onSwipeableWillOpen={(direction) => {
                    if (direction === 'right') {
                        onSwipeRight(); 
                    };

                    if (direction === 'left') {
                        onSwipeLeft(); 
                    };
                }}

                renderRightActions={(progress, dragX) => (
                    <RightAction prog={progress} dragX={dragX} />
                )}

                renderLeftActions={(progress, dragX) => (
                    <LeftAction prog={progress} dragX={dragX} />
                )}
                
            >
                {content}
            </ReanimatedSwipeable>
            
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    rightAction: {
        // width: 50,
        height: 100, 
        padding: 15,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftAction: {
        width: 50, 
        height: 50,
        backgroundColor: 'maroon',
        alignItems: 'center',
        justifyContent: 'center',
    },
});