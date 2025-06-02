import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Props {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const ItemCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item?.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 180,
    height: 270,
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#537D5D",
  },
});

export default React.memo(ItemCard);
