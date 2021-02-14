import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function RecipeFinder() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');

    const getRecipes = () => {
        const url = `http://www.recipepuppy.com/api/?i=${query}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setRecipes(data.results);
            })
            .catch((error) => {
                Alert.alert('Error', error.message)
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ marginLeft: "5%" }}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.title}</Text>
                            <Image
                                style={{ height: 40, width: 40 }}
                                source={{
                                    uri: `${item.thumbnail}`,
                                }}
                            />
                        </View>
                    );
                }}
                data={recipes}
            />
                <TextInput style={styles.input}
                    value={query}
                    placeholder="Search for recipes"
                    onChangeText={(text) => setQuery(text)}
                />
            <Button title="Find" onPress={getRecipes} />
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