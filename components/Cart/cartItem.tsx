import { cardStyle } from "@/app/(tabs)/cart";
import {
  addMoreItem,
  removeCartData,
  removeItem,
} from "@/redux/carts/cartSlice";
import { globalStyles } from "@/styles/globalStyles";
import { ROUTES } from "@/utils/routes";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { memo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import PopupModal from "../Model/PopUp";

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const title = item?.title.slice(0, 40);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleIncrease = (id: number) => {
    dispatch(addMoreItem(id));
  };
  const handleDecrease = (id: number) => {
    if (item?.count < 2) {
      setVisible(true);
    } else {
      dispatch(removeItem(id));
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.89}>
      <View style={cardStyle.mainCard}>
        <TouchableOpacity
          onPress={() => router.push(ROUTES.productDetail(item?.id))}
        >
          <Image
            source={{ uri: item?.image }}
            style={cardStyle.img}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 2,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                width: "70%",
                flexWrap: "wrap",
              }}
              onPress={() => router.push(ROUTES.productDetail(item?.id))}
            >
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ fontSize: 17, ...globalStyles.themeTextColor }}>
                $
                {item?.discount
                  ? (
                      item?.price -
                      (item?.price * (item?.discount || 0)) / 100
                    ).toFixed(2)
                  : item?.price}
              </Text>
            </View>
          </View>

          <Text style={{ color: "#666", fontSize: 14 }}>{item?.model}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            {item?.color ? (
              <Text style={{ color: "#666", fontSize: 14 }}>
                color : {item?.color}
              </Text>
            ) : (
              <Text />
            )}

            <View style={cardStyle.addMoreBtn}>
              <TouchableOpacity onPress={() => handleDecrease(item?.id)}>
                <Entypo name="minus" size={20} color="black" />
              </TouchableOpacity>

              <Text>{item?.count}</Text>

              <TouchableOpacity
                onPress={() => {
                  handleIncrease(item?.id);
                }}
              >
                <Entypo name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PopupModal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Delete Item"
          message="Are you sure you want to delete this item? 😢"
          onConfirm={() => {
            dispatch(removeCartData(item?.id));
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(CartItem);
