import { addCartData, removeCartData } from "@/redux/carts/cartSlice";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const ItemCard = ({ item }: Props) => {
  const dispatch = useDispatch();

  const isInCart = useSelector((state: any) =>
    state.cart.cartData?.some((cartItem: any) => cartItem.id === item.id)
  );

  const titleSize = useMemo(() => {
    return item?.title ? `${item.title.slice(0, 16)}..` : "";
  }, [item?.title]);

  const handleToggle = useCallback(() => {
    if (isInCart) {
      dispatch(removeCartData(item.id));
    } else {
      dispatch(addCartData({ ...item, count: 1 }));
    }
  }, [isInCart, item, dispatch]);

  const buttonStyle = useMemo(
    () => ({
      width: "100%",
      justifyContent: "center" as const,
      alignItems: "center" as const,
      backgroundColor: isInCart ? "#8caf98" : "#568566",
      padding: 8,
    }),
    [isInCart]
  );

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {titleSize}
        </Text>
        <View style={styles.priceTag}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleToggle}
          style={buttonStyle}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isInCart ? "Remove item" : "Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 270,
    margin: 10,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  priceTag: {
    alignSelf: "flex-start",
    backgroundColor: "#e1f5c4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  buttonText: {
    color: "white",
  },
});

export default React.memo(ItemCard);
