import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/products/productSlice";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state: any) => state.product);
  const products = productDetail || {};

  console.log({
    products,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id]);

  if (!products) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.card}>
        <Image
          source={{ uri: products?.image }}
          width={200}
          height={200}
          resizeMode="contain"
        />
        <View style={style.texts}>
          <Text>{products?.title}</Text>
          <Text
            style={{ textAlign: "left", color: "green", fontWeight: "bold" }}
          >
            ${products?.price}
          </Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
    borderWidth: 2,
  },
  card: {
    borderWidth: 2,
    borderColor: "red",
    height: 400,
    width: 320,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  texts: {
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
  },
});
