import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Text} from 'react-native';
import {Button, Title, Avatar, TextInput, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

const Confirm = () => {
  const navigation = useNavigation();
  const [sessionToken, setSessionToken] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [tempToken, setTempToken] = useState('');

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    if (tempToken !== '') {
      return navigation.navigate('Home', {token: tempToken});
    }
  }, [tempToken]);

  const handleConfirm = async () => {
    const response = await fetch(
      'https://api.staging.tauros.io/api/v2/auth/verify-tfa-email/',
      {
        body: `{"tempToken": ${sessionToken}, "code": ${sessionCode}, "unique_device_id": "123456789", "device_name": "Motorola"}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    ).catch(error => Alert.alert('error', error));
    const result = await response.json();
    setTempToken(result.payload.token);
    //Alert.alert(JSON.stringify(result));
    _storeData('sessionToken', tempToken);
  };
  //_storeData('sessionToken', result.payload.token);
  const _storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
      //navigation.navigate('Home', {token: tempToken});
    } catch (error) {
      Alert.alert('error', error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setSessionToken(value);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.inlineContainer}>
        <Title>Verification code</Title>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Code"
          value={sessionCode}
          onChangeText={text => setSessionCode(text)}
        />
      </View>
      <Text>{tempToken && tempToken}</Text>

      <Button mode="contained" onPress={() => handleConfirm()}>
        Verify
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

export default Confirm;
