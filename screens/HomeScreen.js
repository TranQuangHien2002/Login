// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      navigation.navigate('Login');
    } catch (error) {
        alert('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
