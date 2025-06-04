import { globalStyles } from "@/styles/globalStyles";
import { ROUTES } from "@/utils/routes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Grocery() {
  const { cartData } = useSelector((state: any) => state.product);
  const router = useRouter();
  const data = cartData || [];

  const total = cartData?.reduce((sum: number, item: any) => {
    const discountAmount = ((item?.price || 0) * (item?.discount || 0)) / 100;
    return sum + discountAmount;
  }, 0);

  const renderItem = ({ item }: { item: any }) => {
    const title = item?.title.split("").join("").slice(0, 40);
    return (
      <TouchableOpacity
        onPress={() => router.push(ROUTES.productDetail(item?.id))}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 8,
            borderBottomWidth: 2,
            borderBottomColor: "#568566",
          }}
        >
          <Image
            source={{ uri: item?.image }}
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
            resizeMode="contain"
          />

          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
            <Text style={{ color: "#666", fontSize: 14 }}>{item?.model}</Text>
            <Text style={{ color: "#666", fontSize: 14 }}>{item?.color}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center' ,columnGap: 5}}>
              <Text style={{ fontSize: 20, ...globalStyles.themeTextColor }}>
                $
                {item?.discount
                  ? `${
                      item?.price -
                      ((item?.price * item?.discount) / 100).toFixed(0)
                    }`
                  : item?.price}
              </Text>
              <Text>
                {!!item?.discount && (
                  <Text
                    style={{ textDecorationLine: "line-through", fontSize: 12 }}
                  >
                    <FontAwesome name="dollar" size={12} />
                    {item?.price}
                  </Text>
                )}

                {!!item?.discount && (
                  <Text style={{ fontSize: 12, color: "#a62c1c" }}>
                    -{item?.discount ?? 10}%
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ flex: 1, padding: 10, marginBottom: 50 }}>
        <FlatList
          data={data}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          ListEmptyComponent={<Text>No items in cart.</Text>}
        />
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <TouchableOpacity
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#568566",
            padding: 20,
            borderRadius: 8,
            flexDirection: "row",
          }}
          activeOpacity={0.97}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
            Total Amount
          </Text>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            $ {total.toFixed(2)}
          </Text>
          {/* <Text style={{ color: "beige", fontWeight: "bold", fontSize: 16 }}>
            Checkout
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
