import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";

export default function TextToSpeexh() {
    const [text, setText] = useState("");

    const handleSpeech = () => {
        Speech.speak(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => setText(value)}
            />
            <Button title="Convert text to speech" onPress={handleSpeech} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "70%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
    },
});