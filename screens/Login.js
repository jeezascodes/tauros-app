import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Button, Title, Avatar, TextInput, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    passWord: '',
  });

  const triggerLogin = async () => {
    handleLogin();
  };

  const handleLogin = async () => {
    const data = {
      email: userInfo.email,
      password: userInfo.passWord,
      unique_device_id: '123456789',
      device_name: 'Motorola',
    };
    const response = await fetch(
      'https://api.staging.tauros.io/api/v2/auth/signin/',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    const result = await response.json();
    _storeData('token', result.payload.token);
  };

  const _storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
      navigation.navigate('Confirm');
    } catch (error) {
      Alert.alert('error', error);
    }
  };

  /*const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const parsed = JSON.parse(value);
        setUserInfo(parsed);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };*/

  return (
    <View style={styles.main}>
      <View style={styles.inlineContainer}>
        <Title>Welcome to tauros</Title>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', {nav: navigation})}>
          <Avatar.Image
            size={34}
            source={require('../assets/images/avatar.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={userInfo.email}
          onChangeText={text => setUserInfo({...userInfo, email: text})}
        />
        <TextInput
          label="Password"
          value={userInfo.passWord}
          onChangeText={text => setUserInfo({...userInfo, passWord: text})}
        />
      </View>

      <Button mode="contained" onPress={() => triggerLogin()}>
        Sing in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {padding: 20},
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formContainer: {
    height: 180,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  surface: {
    padding: 8,
    margin: 10,
    height: 80,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default Login;
