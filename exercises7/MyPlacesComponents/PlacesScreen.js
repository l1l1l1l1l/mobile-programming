import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, ListItem, Input } from "react-native-elements";

const PlacesScreen = ({ navigation }) => {
    const [places, setPlaces] = useState([]);
    const [address, setAddress] = useState("");

    const handleSave = () => {
        const newPlace = {
            id: Math.floor(Math.random() * 99999 + 1),
            address,
        };
        setPlaces([...places, newPlace]);
        setAddress("");
    };

    const handleDelete = (id) => {
        setPlaces([...places.filter((place) => place.id !== id)]);
    };

    const renderItem = ({ item }) => (
        <ListItem
            key={item.id}
            bottomDivider
            containerStyle={{ width: 400 }}
            onPress={() => navigation.navigate("Map", { item })}
            onLongPress={() => handleDelete(item.id)}
        >
            <ListItem.Content>
                <ListItem.Title>{item.address}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Subtitle>show on map</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <Input
                label="Placefinder"
                placeholder="Type in address"
                onChangeText={(value) => setAddress(value)}
                value={address}
            />
            <Button
                raised
                containerStyle={styles.button}
                title="Save"
                onPress={handleSave}
            />
            <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    button: {
        width: "96%",
    },
});

export default PlacesScreen;