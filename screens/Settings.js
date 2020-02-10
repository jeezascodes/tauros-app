import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Button, Title, Avatar, TextInput, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

const Settings = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    userName: '',
    active: false,
  });

  const isUserActive = userInfo.active;

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      Alert.alert("Success", "Successfully updated your info")
    } catch (error) {
      Alert.alert('error', error);
    }
  };

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const parsed = JSON.parse(value);
          setUserInfo(parsed);
        }
      } catch (error) {
        Alert.alert(error);
      }
    };
    _retrieveData()
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.inlineContainer}>
        <Title>Profile settings</Title>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings', {nav: navigation})}>
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
          label="Name"
          value={userInfo.name}
          onChangeText={text => setUserInfo({...userInfo, name: text})}
        />
        <TextInput
          label="User name"
          value={userInfo.userName}
          onChangeText={text => setUserInfo({...userInfo, userName: text})}
        />
        <View style={styles.inlineContainer}>
          <Text>Im actively trading</Text>
          <Switch
            value={isUserActive}
            onValueChange={() => {
              setUserInfo({...userInfo, active: !isUserActive});
            }}
          />
        </View>
      </View>

      <Button icon="file" mode="contained" onPress={() => _storeData()}>
        Save
      </Button>

      {/*<Button icon="file" mode="contained" onPress={() => _retrieveData()}>
        Show info
          </Button>*/}
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
    height: 300,
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

export default Settings;
