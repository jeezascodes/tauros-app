import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Surface, Title, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Products from './Products';
import Shop from './Shop';

const Home = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.main}>
      <View style={styles.inlineContainer}>
        <Title>Browse</Title>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings', {nav: navigation})}>
          <Avatar.Image
            size={34}
            source={require('../assets/images/avatar.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator>
          <Tab.Screen name="Products" component={Products} />
          <Tab.Screen name="Shop" component={Shop} />
        </Tab.Navigator>
      </View>

      <Button
        icon="settings"
        mode="contained"
        onPress={() => navigation.navigate('Settings', {nav: navigation})}>
        Go to settings
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
  tabContainer: {
    height: 450,
    marginTop: 10,
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

export default Home;
