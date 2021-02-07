import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';


export default function Calculator() {
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [result, setResult] = useState(0);

  const add = () => {
    setResult(parseInt(firstNum) + parseInt(secondNum));
  }

  const subtract = () => {
    setResult(parseInt(firstNum) - parseInt(secondNum));
  }

  const Separator = () => (
    <View style={styles.separator} />
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberField: {
    width: 100,
    marginLeft: 10,
    height: 20,
    borderColor: 'gray',
    borderWidth: 2
  },

  buttonStyle: {
    flexDirection: 'row',
  },

  inputField: {
    flexDirection: 'row',
    margin: 5
  },

  separator: {
    marginHorizontal: 15,
  },
});