import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "../../components/Cart/cartItem";

export const cardStyle = {
  mainCard: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 7,
    padding: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    borderRadius: 10
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  addMoreBtn: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderColor: 'gray',
  }
}

export default function Grocery() {
  const { cartData } = useSelector((state: any) => state.product);
  const data = cartData || [];

  const total = cartData?.reduce((sum: number, item: any) => {
    const discountAmount = item?.price - ((item?.price * item?.discount) / 100).toFixed(2);
    return sum + discountAmount;
  }, 0);

  const taxes = total / 18;
  const afterTax = total + taxes;

  const renderItem = ({ item }: { item: any }) => {
    return <CartItem item={item} />
  };

  const billDeatis = () => {
    return (
      <View style={{ width: "100%", paddingVertical: 15, gap: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Bill Deatils
        </Text>

        <View
          style={cardStyle.mainCard}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: 2,
            }}
          >
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap", color: '#777777' }}>Item Total</Text>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}>$ {total}</Text>
              </View>
              <View style={{ borderWidth: 1, width: '110%', borderStyle: 'dashed' }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap", color: '#5677' }}>Taxes and charges</Text>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}>$ {taxes.toFixed(2)}</Text>
              </View>
              <View style={{ borderWidth: 1, width: '110%', borderStyle: 'dashed' }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}>To pay</Text>
                <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}>$ {afterTax.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ flex: 1, padding: 10, marginBottom: 50 }}>
        <FlatList
          data={data}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          ListFooterComponent={billDeatis}
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
