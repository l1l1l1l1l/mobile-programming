import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    const [region, setRegion] = useState({
        latitude: 60.2,
        longitude: 24.93,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    const [marker, setMarker] = useState({
        latitude: 0,
        longitude: 0,
    });

    const { item } = route.params;

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        const KEY = "vN6b2iez3Tj32ExoHUsOFVEUowTAeQN7";

        fetch(
            `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${item.address}`
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
            <MapView style={styles.map} region={region}>
                <Marker coordinate={marker} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: "100%",
    },
});

export default MapScreen;