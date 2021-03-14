import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactExercise() {
    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync({
                fields: [
                    Contacts.Fields.FirstName,
                    Contacts.Fields.LastName,
                    Contacts.Fields.PhoneNumbers,
                ],
            });

            if (data.length > 0) {
                setContacts(data);
            }
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ flexDirection: "row" }}>
                        {item.firstName} {item.lastName}{" "}
                        {item.phoneNumbers ? item.phoneNumbers[0].number : ""}
                    </Text>
                )}
            />
            <Button title="Get contacts" onPress={getContacts}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        paddingBottom: 20,
    },
});