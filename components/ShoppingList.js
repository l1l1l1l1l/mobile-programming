import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function ShoppingList() {
    const [product, setProduct] = useState('');
    const [list, setList] = useState([]);

    const addToList = () => {
        setList([...list, { key: String(list.length), text: product }]);
        setProduct('');
    }
    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputField}
                onChangeText={text => setProduct(text)}
                placeholder='Enter product'
                value={product}
            />
            <View style={styles.buttonStyle}>
                <View>
                    <Button title='ADD' onPress={addToList} />
                </View>
                <Separator />
                <View>
                    <Button title='CLEAR' onPress={() => setList([])} />
                </View>
            </View>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <Text style={{ alignSelf: 'center' }}>{item.text}</Text>}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly'
    },
    buttonStyle: {
        flexDirection: 'row',
        marginVertical: 20
    },
    inputField: {
        marginTop: 100,
        marginBottom: 20,
        width: 150,
        height: 30,
        borderColor: 'black',
        borderWidth: 3
    },
    separator: {
        marginHorizontal: 15,

    },


});