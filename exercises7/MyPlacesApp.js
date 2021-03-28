
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlacesScreen from "./MyPlacesComponents/PlacesScreen";
import MapScreen from "./MyPlacesComponents/MapScreen";

const Stack = createStackNavigator();

export default function MyPlacesApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="My Places">
                <Stack.Screen name="My Places" component={PlacesScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}