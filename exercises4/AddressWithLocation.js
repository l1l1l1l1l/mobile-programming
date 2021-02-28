import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function AddressWithLocation() {
    const [location, setLocation] = useState('');
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    const [marker, setMarker] = useState({
        latitude: 60.201373,
        longitude: 24.934041,
    });

    useEffect(() => {
        getPhoneLocation();
    }, []);

    const getPhoneLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("No permission to access phone location");
        } else {
            let phoneLocation = await Location.getCurrentPositionAsync({});
            const result = {
                ...region,
                latitude: phoneLocation.coords.latitude,
                longitude: phoneLocation.coords.longitude,
            };
            setRegion(result);
            setMarker(result);
        }
    };

    const search = () => {
        const KEY = "vN6b2iez3Tj32ExoHUsOFVEUowTAeQN7";

        fetch(
            `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&inFormat=jsonN&outFormat=json&location=${location}`
        )
            .then((response) => response.json())
            .then((data) => {
                const result = {
                    ...region,
                    latitude: data.results[0].locations[0].latLng.lat,
                    longitude: data.results[0].locations[0].latLng.lng,
                };

                setRegion(result);
                setMarker(result);
            })
            .catch((error) => Alert.alert("Error", error));
    };

    return (
        <View style={styles.container}>
            <MapView style={{ flex: 1, width: "100%" }} region={region}>
                <Marker coordinate={marker} />
            </MapView>
            <View style={styles.bottomBar}>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={(value) => setLocation(value)}
                />
                <Button title="Search" onPress={search} />
            </View>
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
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    bottomBar: {
        width: "100%",
        margin: 4,
        padding: 8,
    },
});