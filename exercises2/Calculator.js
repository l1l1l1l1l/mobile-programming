import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList } from 'react-native';

export default function Calculator({ navigation }) {

    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const initialFocus = useRef(null);

    const calculate = operator => {
        const [number1, number2] = [Number(firstNum), Number(secondNum)];

        if (isNaN(number1) || isNaN(number2)) {
            setResult(0);
        } else {
            let result = 0;
            switch (operator) {
                case '+':
                    result = number1 + number2;
                    break;
                case '-':
                    result = number1 - number2;
                    break;
            }
            setResult(result);
            const text = `${number1} ${operator} ${number2} = ${result}`;
            setHistory([...history, { key: text }]);
        }
        setFirstNum('');
        setSecondNum('');
        initialFocus.current.focus();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Result: {result}</Text>
            <TextInput style={styles.input} ref={initialFocus}
                keyboardType={`numeric`}
                onChangeText={text => setFirstNum(text)}
                value={firstNum}
            />
            <TextInput style={styles.input} ref={initialFocus}
                keyboardType={`numeric`}
                onChangeText={text => setSecondNum(text)}
                value={secondNum}
            />
            <View style={styles.buttons}>
                <Button onPress={() => calculate('+')} title="+" />
                <Button onPress={() => calculate('-')} title="-" />
                <Button onPress={() => navigation.navigate('History', { history })} title="History"> </Button>
            </View>
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
        borderColor: 'black',
        borderWidth: 2,
        width: '50%',
        padding: 5,
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%'
    },
    heading: {
        fontSize: 25
    }
});