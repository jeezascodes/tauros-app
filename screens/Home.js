import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Surface, Title, Avatar, Subheading} from 'react-native-paper';
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
    try {
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
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo obtener su balance, por favor vuelva a iniciar sesion',
      );
    }
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
          <Subheading style={styles.totalAmount}>
            $ {getTotalBalance()} MXN
          </Subheading>
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
          <View style={styles.contain}>
            {balanceFiltered?.map(item => (
              <Surface style={styles.surface}>
                <View style={styles.flexContainer}>
                  <View style={styles.inlineContainer}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={{
                        uri: item?.coin_icon,
                      }}
                    />
                    <Text style={styles.coinName}>{item?.coin_name}</Text>
                  </View>

                  <View>
                    <Title style={styles.right}>
                      {item?.balances.available}
                    </Title>
                    <Text style={styles.right}>
                      $ {mapCoinToEx(item?.coin_name, item?.balances.available)}
                    </Text>
                  </View>
                </View>
              </Surface>
            ))}
          </View>
        </ScrollView>
        <Button onPress={() => navigation.navigate('Login')}>Log out</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {padding: 20},
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    height: 500,
    marginTop: 10,
  },
  surface: {
    padding: 8,
    margin: 10,
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  totalAmount: {
    fontSize: 20,
  },
  right: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  coinName: {
    marginLeft: 10,
  },
  contain: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default Home;
