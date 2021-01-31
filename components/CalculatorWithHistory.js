import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default function CalculatorWithHistory() {

    return (
        <View style={styles.container}>
          <View>
            <Text>Result: {result}</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput style={styles.numberField}
              keyboardType={'numeric'}
              onChangeText={text => setFirstNum(text)} value={firstNum}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput style={styles.numberField}
              keyboardType={'numeric'}
              onChangeText={text => setSecondNum(text)} value={secondNum}
            />
          </View>
          <View>
            <View style={styles.buttonStyle}>
              <Button title='+' onPress={add} />
              <Separator />
              <Button title='-' onPress={subtract} />
            </View>
          </View>
        </View>
      );
    }