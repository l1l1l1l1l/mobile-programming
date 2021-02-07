import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList } from 'react-native';

export default function CalculatorWithHistory() {

    const [result, setResult] = useState('');
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [data, setData] = useState([]);

    const add = () => {
        var num1 = parseInt(firstNum);
        var num2 = parseInt(secondNum);
        var result = num1 + num2;

        setResult(num1 + num2);
        setData([...data, { key: num1 + " + " + num2 + " = " + result }]);
        setFirstNum('');
        setSecondNum('');
    }

    const subtract = () => {
        var num1 = parseInt(firstNum);
        var num2 = parseInt(secondNum);
        var result = num1 - num2;

        setResult(num1 - num2);
        setData([...data, { key: num1 + " - " + num2 + " = " + result }]);
        setFirstNum('');
        setSecondNum('');
    }

    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.resultsField}>
                <Text>Result: {result}</Text>
            </View>
            <View style={styles.inputField}>
                <TextInput style={styles.numberField}
                    keyboardType={'numeric'}
                    onChangeText={text => setFirstNum(text)} value={firstNum}
                />
            </View>
            <View style={styles.inputField}>
                <TextInput style={styles.numberField}
                    keyboardType={'numeric'}
                    onChangeText={text => setSecondNum(text)} value={secondNum}
                />
            </View>
            <View>
                <View style={styles.buttonStyle}>
                    <Button title='+' onPress={add} />
                    <Separator />
                    <Button title='-' onPress={subtract} />
                </View>
                <Text style={styles.text}>History</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <Text>
                            {item.key}
                        </ Text>}
                />
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

    numberField: {
        width: 150,
        marginLeft: 10,
        height: 20,
        borderColor: 'gray',
        borderWidth: 2
    },

    buttonStyle: {
        flexDirection: 'row',
    },

    inputField: {
        flexDirection: 'row',
        margin: 5
    },

    separator: {
        marginHorizontal: 15,

    },

    resultsField: {
        marginTop: 200
    },

    text: {
        marginTop: 50
    }
});