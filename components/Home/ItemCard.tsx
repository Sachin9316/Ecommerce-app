import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const ItemCard = ({ item }: Props) => {
  const titleSize = item?.title && `${item.title.split("").join('').slice(0, 15)}..`
  const [buy, setBuy] = useState(true);

  const handleToggel = () => {
    setBuy(!buy);
  }
  return (
    <View style={styles.card}>
      <Image source={{ uri: item?.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {titleSize}
        </Text>
        <View style={styles.priceTag}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <View>
        {
          buy ? (
            <TouchableOpacity onPress={handleToggel} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#568566', padding: 8 }} activeOpacity={0.7}>
              <Text style={{ color: 'white' }}>
                Add to cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleToggel} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8caf98', padding: 8 }} activeOpacity={0.7}>
              <Text style={{ color: 'white' }}>
                Remove item
              </Text>
            </TouchableOpacity>
          )
        }
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
});

export default React.memo(ItemCard);
