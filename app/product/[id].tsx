import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/products/productSlice";
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from "@/components/Loader/Loading";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state: any) => state.product);
  const product = productDetail || {};
  const [buy, setBuy] = useState(true);

  const handleToggel = () => {
    setBuy(!buy);
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id]);

  if (product.length === 0 && !id || loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  console.log({
    product
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: product?.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.texts}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>${product?.price}</Text>
          <Text style={styles.description}>
            {product?.description || "No description available."}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <Text style={{ fontWeight: 'bold' }}>Reviews: {product?.rating?.count}</Text>
            <Text style={{ fontWeight: 'bold' }}>Rating: {product?.rating?.rate} <AntDesign name="star" size={14} color={'gold'} /></Text>
          </View>
        </View>

        <View>
          {
            buy ? (
              <TouchableOpacity onPress={handleToggel} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#568566', padding: 20, borderRadius: 8 }} activeOpacity={0.7}>
                <Text style={{ color: 'white', fontWeight: 'semibold' }}>
                  Add to cart
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleToggel} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8caf98', padding: 20, borderRadius: 8 }} activeOpacity={0.7}>
                <Text style={{ color: 'white', fontWeight: 'semibold' }}>
                  Remove item
                </Text>
              </TouchableOpacity>
            )
          }
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
  card: {
    width: "100%",
    height: '100%',
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  texts: {
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    width: '100%',
    textAlign: 'right'
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
