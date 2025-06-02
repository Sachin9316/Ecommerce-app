import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/products/productSlice";
import ItemCard from "./ItemCard";
import { useRouter } from "expo-router";
import { ROUTES } from "@/utils/routes";

function Home() {
  const productState = useSelector((state: any) => state.product);
  const products = productState?.products || [];
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const filteredProducts = products?.filter((p: any) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: number) => {
    router.push(ROUTES.productDetail(id));
  };

  if (!products || products?.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleEdit(item?.id)}>
              <ItemCard item={item} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No products found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  searchInput: {
    borderWidth: 1,
    width: 360,
    height: 50,
    borderColor: "purple",
    borderRadius: 8,
    paddingLeft: 20,
    marginBottom: 22,
    marginTop: 22,
    outlineColor: "red",
    margin: "auto",
    color: "white",
  },
});

export default React.memo(Home);
