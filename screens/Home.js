import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Button, Surface, Title, Avatar, Image , Subheading} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Products from './Products';
import Shop from './Shop';

const Home = ({route}) => {
  const {token} = route.params;
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [tempToken, setTempToken] = useState('hey');
  const [balance, setBalance] = useState([]);
  const [exchange, setExchange] = useState({});

  useEffect(() => {
    if (token) {
      getBalance();
    }
    getExchange();
  }, []);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        Alert.alert('jo', value);
        //setTempToken(value);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const getTotalBalance = () => {
    const balances = balanceFiltered.length
      ? balanceFiltered?.map(item =>
          mapCoinToEx(item?.coin_name, item?.balances.available),
        )
      : [''];

    const total = balances?.reduce(
      (acc, val) => parseFloat(acc) + parseFloat(val),
    );
    return total;
  };

  const mapCoinToEx = (name, balance) => {
    if (name === 'Test Bitcoin') {
      return (exchange?.bitcoin?.mxn * balance).toFixed(2);
    }
    if (name === 'Test Stellar') {
      return (exchange?.stellar?.mxn * balance).toFixed(2);
    }
  };

  const getBalance = async () => {
    const response = await fetch(
      'https://api.staging.tauros.io/api/v1/data/listbalances/',
      {
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
    setBalance(result.data.wallets);
  };

  const getExchange = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cstellar&vs_currencies=mxn',
    );
    const result = await response.json();
    setExchange(result);
  };

  const balanceFiltered = balance?.filter(
    item => item.balances.available !== '0',
  );

  return (
    <View style={styles.main}>
      <View style={styles.inlineContainer}>
        <View>
          <Title>Total combinado</Title>
          <Subheading>$ {getTotalBalance()} MXN</Subheading>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Settings', {nav: navigation})}>
          <Avatar.Image
            size={34}
            source={require('../assets/images/avatar.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <Title>Wallets</Title>
        <ScrollView>
          {balanceFiltered?.map(item => (
            <Surface style={styles.surface}>
              <View style={styles.flexContainer}>
                <Text>{item?.coin_name}</Text>
                <View>
                  <Text>{item?.balances.available}</Text>
                  <Text>
                    $ {mapCoinToEx(item?.coin_name, item?.balances.available)}
                  </Text>
                </View>
              </View>
            </Surface>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {padding: 20},
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContainer: {
    height: 500,
    marginTop: 10,
  },
  surface: {
    padding: 8,
    margin: 10,
    height: 80,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default Home;
