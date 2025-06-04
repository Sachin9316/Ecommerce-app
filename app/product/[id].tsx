import Loading from "@/components/Loader/Loading";
import {
  addCartData,
  fetchProductById,
  removeCartData,
} from "@/redux/products/productSlice";
import { globalStyles } from "@/styles/globalStyles";
import { fetchUSD } from "@/utils/currencyConvertor";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { productDetail, loading, cartData } = useSelector(
    (state: any) => state.product
  );
  const product = productDetail || {};
  const [buy, setBuy] = useState(true);
  const [readMoreTitle, setReadmoreTitle] = useState(true);
  const [loader, setLoader] = useState(false);
  const title = readMoreTitle
    ? `${product?.title?.split(" ").join(" ").slice(0, 50)}...`
    : product?.title;
  const [readMore, setReadmore] = useState(true);
  const description = readMore
    ? `${product?.description?.split(" ").join(" ").slice(0, 200)}...`
    : product?.description;

  const handleToggel = (id: string) => {
    setBuy(!buy);
    if (buy) {
      dispatch(addCartData(product));
      console.log("Inside", id);
      return;
    }
    dispatch(removeCartData(id));
    console.log("outside", id);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      const findId = cartData?.find((check: any) => check.id == id);
      if (findId) {
        console.log("findId", findId);
        return setBuy(false);
      }
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  console.log({
    price: product?.price,
    dis: product?.discount,
    buy,
  });

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View>
            {!!product?.discount && (
              <Text style={{ ...styles.discount, zIndex: 10 }}>
                {product?.discount ?? 10}%
              </Text>
            )}
            <Image
              source={{ uri: product?.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.texts}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                onPress={() => setReadmoreTitle(!readMoreTitle)}
              >
                <Text style={globalStyles.themeTextColor}>
                  {readMoreTitle ? "Read more" : "Read less"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...globalStyles.themeTextColor,
                  fontWeight: "bold",
                  fontSize: 15,
                  flexWrap: "wrap",
                  width: "50%",
                }}
              >
                Model: {product?.model}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  width: "50%",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    ...globalStyles.themeTextColor,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  <FontAwesome name="dollar" size={17} color={"#568566"}/>
                  {product?.discount
                    ? `${
                        product?.price -
                        ((product?.price * product?.discount) / 100).toFixed(0)
                      }`
                    : product?.price}
                </Text>

                {!!product?.discount && (
                  <Text
                    style={{ textDecorationLine: "line-through", fontSize: 12 }}
                  >
                    <FontAwesome name="dollar" size={12} />
                    {product?.price}
                  </Text>
                )}

                {!!product?.discount && (
                  <Text style={{ fontSize: 17, color: "#a62c1c" }}>
                    -{product?.discount ?? 10}%
                  </Text>
                )}
              </View>
            </View>
            <View>
              <Text style={styles.description}>
                {description || "No description available."}
              </Text>
              <TouchableOpacity onPress={() => setReadmore(!readMore)}>
                <Text style={{ ...globalStyles.themeTextColor }}>
                  {readMore ? "Read more" : "Read less"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <Text style={{ fontWeight: 'bold' }}>Reviews: {product?.brand}</Text>
            <Text style={{ fontWeight: 'bold' }}>Rating: {product?.rating?.rate} <AntDesign name="star" size={14} color={'gold'} /></Text>
          </View> */}

            <View>
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "#568566" }}
                >
                  Product Deatils
                </Text>
              </View>

              <View>
                {!!product?.brand && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 3,
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 10 }}>
                      Brand :
                    </Text>
                    <Text style={{ ...styles.price, fontSize: 10 }}>
                      {product?.brand}
                    </Text>
                  </View>
                )}

                {!!product?.color && (
                  <Text style={{ ...styles.price, fontSize: 10 }}>
                    {product?.color}
                  </Text>
                )}

                {!!product?.model && (
                  <Text style={styles.price}>{product?.model}</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 3, width: "100%" }}>
        {buy ? (
          <TouchableOpacity
            onPress={() => handleToggel(product?.id)}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#568566",
              padding: 20,
              borderRadius: 8,
            }}
            activeOpacity={0.97}
          >
            <Text style={{ color: "white", fontWeight: "semibold" }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleToggel(product?.id)}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#8caf98",
              padding: 20,
              borderRadius: 8,
            }}
            activeOpacity={0.97}
          >
            <Text style={{ color: "white", fontWeight: "semibold" }}>
              Remove item
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingBottom: 50,
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
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
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
    paddingTop: 50,
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
  discount: {
    position: "absolute",
    top: 1,
    right: 0,
    backgroundColor: "#7caf98",
    borderRadius: 10,
    padding: 10,
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
