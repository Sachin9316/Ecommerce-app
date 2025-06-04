import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/products/productSlice";
import AntDesign from '@expo/vector-icons/AntDesign';
import Loading from "@/components/Loader/Loading";
import { globalStyles } from "@/styles/globalStyles";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state: any) => state.product);
  const product = productDetail || {};
  const [buy, setBuy] = useState(true);
  const [readMoreTitle, setReadmoreTitle] = useState(true);
  const title = readMoreTitle ? `${product?.title?.split(" ").join(' ').slice(0, 50)}...` : product?.title
  const [readMore, setReadmore] = useState(true);
  const description = readMore ? `${product?.description?.split(" ").join(' ').slice(0, 200)}...` : product?.description

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
        <View>
          <Image
            source={{ uri: product?.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.texts}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setReadmoreTitle(!readMoreTitle)}>
              <Text style={globalStyles.themeTextColor}>
                {
                  readMoreTitle ? "Read more" : "Read less"
                }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={{ ...globalStyles.themeTextColor, fontWeight: 'bold', fontSize: 15 }}>Model: {product?.model}</Text>
            <Text style={{ ...globalStyles.themeTextColor, fontWeight: 'bold', fontSize: 15 }}>${product?.price}</Text>
          </View>
          <View>
            <Text style={styles.description}>{description || "No description available."}</Text>
            <TouchableOpacity onPress={() => setReadmore(!readMore)}>
              <Text style={{ ...globalStyles.themeTextColor }}>
                {
                  readMore ? "Read more" : "Read less"
                }
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <Text style={{ fontWeight: 'bold' }}>Reviews: {product?.brand}</Text>
            <Text style={{ fontWeight: 'bold' }}>Rating: {product?.rating?.rate} <AntDesign name="star" size={14} color={'gold'} /></Text>
          </View> */}

          <View>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#568566" }}>Product Deatils</Text>
            </View>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3 }}>
                <Text style={{ color: 'black', fontSize: 10 }}>
                  Brand :
                </Text>
                <Text style={{ ...styles.price, fontSize: 10 }}>{product?.brand}</Text>
              </View>
              <Text style={{ ...styles.price, fontSize: 10 }}>{product?.color}</Text>
              <Text style={styles.price}>{product?.model}</Text>
            </View>
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
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
