import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {productList} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Navigation from '../navigation/Navigation';

const Products = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.twoColumns}>
        {productList.map(product => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })}>
            <Surface key={product.id} style={styles.surface}>
              <Image style={styles.productImage} source={product.image} />
              <Text>{product.name}</Text>
            </Surface>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  twoColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Products;
