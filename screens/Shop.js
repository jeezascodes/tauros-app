import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  useEffect(() => {
    getRecipes();
  });

  const getRecipes = async () => {
    const response = await fetch('http://18.216.81.111:3000/formatrecipes')
      .then(response => response.json())
      .then(data => setShopItems(data));
  };

  const navigation = useNavigation();
  return (
    <View>
      {shopItems.map(item => (
        <Text>Shop</Text>
      ))}
    </View>
  );
};

export default Shop;
