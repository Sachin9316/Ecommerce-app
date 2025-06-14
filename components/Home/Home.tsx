import {
  fetchAllCategories,
  fetchAllProducts,
  fetchCategoryById,
  resetProductDetails,
} from "@/redux/products/productSlice";
import { ROUTES } from "@/utils/routes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React, { lazy, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
const ItemCard = lazy(() => import("./ItemCard"));
import Loading from "../Loader/Loading";

const { width } = Dimensions.get("window");

function Home() {
  const productState = useSelector((state: any) => state.product);
  const products = productState?.products || [];
  const categories = productState?.categories || [];
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((p: any) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchCategoryById(selectedCategory));
    if (!selectedCategory) {
      dispatch(fetchAllProducts());
    }
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(resetProductDetails());
  }, []);

  const handleEdit = (id: number) => {
    router.push(ROUTES.productDetail(id));
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity activeOpacity={0.97} onPress={() => handleEdit(item?.id)}>
      <ItemCard item={item} />
    </TouchableOpacity>
  );

  const keyExtractor = (item: any) => item.id.toString();

  const ListEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products found</Text>
    </View>
  );

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() =>
        setSelectedCategory(item === selectedCategory ? null : item)
      }
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const categoryKeyExtractor = (item: any) => item;

  if (productState?.loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome
          <Entypo name="hand" size={24} color="orange" />
        </Text>

        <FontAwesome
          name="user-o"
          size={24}
          color="black"
        />
      </View>

      <View style={styles.searchWrapper}>
        <AntDesign
          name="search1"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={categoryKeyExtractor}
          renderItem={renderCategoryItem}
        />
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        refreshing={productState?.loading}
        onRefresh={() => dispatch(fetchAllProducts())}
        getItemLayout={(data, index) => ({
          length: 290,
          offset: 290 * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  searchWrapper: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    paddingLeft: 40,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#dfe2e5",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 2,
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingTop: 50,
    alignItems: "center",
  },
  emptyText: {
    color: "gray",
    fontSize: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fdfdfd",
  },
  selectedCategoryButton: {
    backgroundColor: "#222",
    borderColor: "#222",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default React.memo(Home);
