import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';

let answer;
let numberOfTries;

export default function NumberGuessingGame() {

    const [question, setQuestion] = useState("Guess a number between 1 - 100");
    const [guess, setGuess] = useState(0);

    const start = () => {
        numberOfTries = 0;
        answer = Math.floor(Math.random() * 100) + 1;
    }

    useEffect(() => {
        start()
    }, [])

    const guessingGame = () => {

        if (guess > answer) {
            setQuestion("Your guess " + guess + " is too high");
            numberOfTries += 1;
        } else if (guess < answer) {
            setQuestion("Your guess " + guess + " is too low");
            numberOfTries += 1;
        } else {
            Alert.alert("You guessed the number in " + numberOfTries + " guesses");
        }
        setGuess('');
    }

    return (
        <View style={styles.container}>

            <Text>{question}</Text>

            <TextInput style={styles.input}
                keyboardType={'numeric'}
                onChangeText={text => setGuess(text)} value={guess}
            />

            <Button title='MAKE GUESS' onPress={guessingGame} />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        width: 50,
        height: 30,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15
    }
});