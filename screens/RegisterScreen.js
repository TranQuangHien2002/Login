// RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Kiểm tra xem username và password có được nhập hay không
      if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin đăng ký.');
        return;
      }

      // Kiểm tra xem username đã tồn tại trong API hay chưa
      const response = await fetch(
        'https://6550eceb7d203ab6626e57fd.mockapi.io/account'
      );
      const users = await response.json();
      const isUsernameTaken = users.some((user) => user.username === username);

      if (isUsernameTaken) {
        alert('Tên người dùng đã tồn tại. Vui lòng chọn một tên khác.');
        return;
      }

      // Nếu tên người dùng chưa tồn tại, thực hiện yêu cầu API POST
      const registerResponse = await fetch(
        'https://6550eceb7d203ab6626e57fd.mockapi.io/account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            name: 'Default Name',
          }),
        }
      );
      const responseData = await registerResponse.json();

      if (responseData.id) {
        await AsyncStorage.setItem('username', username);
        navigation.navigate('Login');
      } else {
        alert('Dữ liệu đăng ký không hợp lệ');
      }
    } catch (error) {
        alert('Lỗi khi thực hiện yêu cầu API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
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
      <Button title="Register" onPress={handleRegister} />
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


export default RegisterScreen;
