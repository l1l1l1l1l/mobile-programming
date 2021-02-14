import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function EuroConverter() {
    const [result, SetResult] = useState('');
    const [rates, setRates] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const getRates = () => {
        const url = `https://api.exchangeratesapi.io/latest`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setRates(data.rates);
            })
            .catch((error) => {
                Alert.alert('Error', error.message)
            });
    }
    useEffect(() => {
        getRates()
    }, [])


    const convert = () => {
        const rate = rates[selectedValue];
        SetResult((amount / rate).toFixed(2));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Convert to €</Text>
            <Text style={styles.heading}>Result: {result} €</Text>
            <View style={{ flexDirection: "row", margin: 16 }}>
                <TextInput
                    style={{ borderBottomWidth: 1, width: 100 }}
                    value={amount}
                    placeholder={'Amount'}
                    keyboardType='numeric'
                    onChangeText={text => setAmount(text)}
                />
                <Picker
                    style={{ height: 50, width: 100 }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue)
                        console.log(itemValue, itemIndex)
                    }}
                >
                    {Object.keys(rates).map(key => (
                        <Picker.Item label={key} value={key} key={key} />))}
                </Picker>
            </View>
            <Button title="Convert" onPress={convert} />
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
        justifyContent: 'space-evenly',
        width: '50%'
    },
    heading: {
        fontSize: 25
    }
});