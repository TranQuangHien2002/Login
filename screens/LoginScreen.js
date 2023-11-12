// LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Check if the username and password are entered
      if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
        return;
      }

      const response = await fetch(
        'https://6550eceb7d203ab6626e57fd.mockapi.io/account'
      );
      const users = await response.json();

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        await AsyncStorage.setItem('username', username);
        navigation.navigate('Home');
      } else {
        alert('Thông tin đăng nhập không hợp lệ');
      }
    } catch (error) {
      alert('Lỗi khi yêu cầu API', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
});
export default LoginScreen;
