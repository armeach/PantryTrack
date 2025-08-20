import React from 'react';
import { Text, StyleSheet } from 'react-native'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';

function RightAction({ prog, dragX }) { 
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: dragX.value+50 }],
    }));

    return (
        <Reanimated.View style={styleAnimation}>
            <Text style={styles.rightAction}>MOVE TO SHOPPING LIST NOT IMPLEMENTED</Text>
        </Reanimated.View>
    );
};

function LeftAction({ prog, dragX }) {
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: dragX.value-50 }],
    }));

    return (
        <Reanimated.View style={styleAnimation}>
            <Text style={styles.rightAction}>Delete?</Text>
        </Reanimated.View>
    );
};

export default function SwipeableListItem({ textContent, itemColor, onSwipeRight }) { 
    const content = <Text>{textContent}</Text>;

    return (
        <GestureHandlerRootView style={styles.viewStyle}>
            <ReanimatedSwipeable
                containerStyle={[styles.swipeable, { backgroundColor: itemColor }]}
                friction={2}
                rightThreshold={80}
                leftThreshold={80}
                onSwipeableWillOpen={(direction) => {
                    if (direction === 'right') {
                        onSwipeRight(); 
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
    swipeable: {
        padding: 15, 
        marginBottom: 2, 
        borderRadius: 12,
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