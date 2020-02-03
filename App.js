import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  sendRequest() {
    const url='http://192.168.1.116:5000/users/add';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "jared2",
      }),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.sendRequest} title="Click Me!" color="#FF0000"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
