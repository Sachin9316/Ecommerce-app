import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { ROUTES } from '@/utils/routes';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { cardStyle } from '@/app/(tabs)/cart';

type CartItemProps = {
    item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const [count, setCount] = useState(1);
    const title = item?.title.slice(0, 40);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push(ROUTES.productDetail(item?.id))}
        >
            <View style={cardStyle.mainCard}>
                <Image
                    source={{ uri: item?.image }}
                    style={cardStyle.img}
                    resizeMode="contain"
                />

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        paddingHorizontal: 2,
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                width: '70%',
                                flexWrap: 'wrap',
                            }}
                        >
                            {title}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                columnGap: 5,
                                justifyContent: 'flex-end',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Text style={{ fontSize: 20, ...globalStyles.themeTextColor }}>
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

                    <Text style={{ color: '#666', fontSize: 14 }}>{item?.model}</Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'flex-end',
                        }}
                    >
                        {item?.color ? (
                            <Text style={{ color: '#666', fontSize: 14 }}>
                                color : {item?.color}
                            </Text>
                        ) : (
                            <Text />
                        )}

                        <View style={cardStyle.addMoreBtn}>
                            <TouchableOpacity
                                onPress={() =>
                                    setCount((prev: number) => (prev > 1 ? prev - 1 : 1))
                                }
                            >
                                <Entypo name="minus" size={20} color="black" />
                            </TouchableOpacity>
                            <Text>{count}</Text>
                            <TouchableOpacity
                                onPress={() => setCount((prev: number) => prev + 1)}
                            >
                                <Entypo name="plus" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CartItem;
