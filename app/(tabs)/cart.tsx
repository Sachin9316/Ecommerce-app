import CartItem from "@/components/Cart/cartItem";
import React, { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export const cardStyle = {
  mainCard: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 7,
    padding: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  addMoreBtn: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: "gray",
  },
};

export default function Grocery() {
  const { cartItemCount } = useSelector((state: any) => state.cart);
  const data = cartItemCount || [];

  const total = cartItemCount?.reduce((sum: number, item: any) => {
    let itemTotal = 0;
    if (item?.discount) {
      const discountedPrice = item.price - (item.price * item.discount) / 100;
      itemTotal = discountedPrice * item.count;
    } else {
      itemTotal = item.price * item.count;
    }
    return sum + itemTotal;
  }, 0);

  const taxes = total / 18;
  const afterTax = total + taxes;

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <CartItem item={item} />;
  }, []);

  const billDeatis = useCallback(() => {
    return (
      <View style={{ width: "100%", paddingVertical: 15, gap: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bill Deatils</Text>

        <View style={cardStyle.mainCard}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: 2,
            }}
          >
            <View style={{ alignItems: "center", gap: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    flexWrap: "wrap",
                    color: "#777777",
                  }}
                >
                  Total Item {`(${cartItemCount.length})`}
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}
                >
                  $ {total?.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    flexWrap: "wrap",
                    color: "#5677",
                  }}
                >
                  Taxes and charges
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}
                >
                  $ {taxes?.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}
                >
                  To pay
                </Text>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}
                >
                  $ {afterTax?.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }, [total]);

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ flex: 1, padding: 10, marginBottom: 50 }}>
        <FlatList
          data={data}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          ListFooterComponent={cartItemCount?.length > 0 && billDeatis}
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
            padding: 10,
            paddingHorizontal: 20,
            flexDirection: "row",
          }}
          activeOpacity={1}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            $ {afterTax?.toFixed(2)}
          </Text>
          <Text
            style={{
              color: "#568566",
              fontWeight: "600",
              fontSize: 16,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            Place order
          </Text>
          {/* <Text style={{ color: "beige", fontWeight: "bold", fontSize: 16 }}>
            Checkout
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
