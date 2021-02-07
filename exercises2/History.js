import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

export default function History({ route }) {
    const { history } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>History</Text>
            <FlatList
                data={history}
                renderItem={({ item }) =>
                    <Text>{item.key}</Text>}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20
    }
});