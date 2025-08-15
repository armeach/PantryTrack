import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function AddItem({ placeholder, onSubmitEditing }) {
    const [text, setText] = useState('');

    return (
        <TextInput
            style={styles.input}
            value={text}
            placeholder={placeholder}
            onChangeText={(value) => setText(value)}
            onSubmitEditing={() => {
                if (!text) return // if empty don't submit

                onSubmitEditing(text);
                setText('');
            }}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10, 
        height: 50,
        fontSize: 20,
    },
});