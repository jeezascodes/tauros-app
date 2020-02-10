import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PorductDetail = ( { route} ) => {
  const navigation = useNavigation();
  const { product } = route.params;
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  );
};

export default PorductDetail;
