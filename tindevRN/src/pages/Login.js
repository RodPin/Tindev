import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
export default function Login({ navigation }) {
  function handleLogin() {
    navigation.navigate('Main');
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS == 'ios'}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="GitHub user"
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f5f5f5'
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
