import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('itemdb.db');

export default function ShoppingListDB() {
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists item (id integer primary key not null, amount text, title text);');
        }, null, updateList);
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into item (title, amount) values (?, ?);',
                [title, amount]);
        }, null, updateList
        )
    }

    const deleteItem = () => {
        db.transaction(tx => {
            tx.executeSql('delete from item where id = ?;', [id]);
        }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from item;', [], (_, { rows }) =>
                setItems(rows._array)
            );
        });
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Title' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(title) => setTitle(title)}
                value={title} />
            <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(amount) => setAmount(amount)}
                value={amount} />
            <Button onPress={saveItem} title="Save" />
            <Text style={{ marginTop: 30, fontSize: 20 }}>Products</Text>
            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.title}, {item.amount}</Text>
                    <Text style={{ fontSize: 18, color: '#0000ff' }}
                        onPress={() => deleteItem(item.id)}> Done</Text></View>}
                data={items}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});
