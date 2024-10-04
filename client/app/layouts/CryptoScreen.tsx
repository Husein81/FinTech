import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "../theme/Colors";
import { defaultStyles } from "../theme/Styles";
import { Ionicons } from "@expo/vector-icons";
import { cryptoData } from "../models/Currency";
import { useNavigation, NavigationProp } from "@react-navigation/native";
const CryptoScreen = () => {
  const header = useHeaderHeight();
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: header }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={[defaultStyles.block, { marginVertical: 16 }]}>
        {cryptoData.map((currency) => (
          <TouchableOpacity
            key={currency.id}
            onPress={() =>
              navigation.navigate("CryptoDetail", { crypto: currency })
            }
            style={{
              flexDirection: "row",
              gap: 14,
              alignItems: "center",
              padding: 6,
              marginBottom: 8,
            }}
          >
            <Image
              source={{ uri: currency.image }}
              style={{ width: 40, height: 40 }}
            />
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={{ fontWeight: "600", color: Colors.dark }}>
                {currency.name}
              </Text>
              <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
            </View>
            <View style={{ gap: 6, alignItems: "flex-end" }}>
              <Text>{currency.priceUSD} $</Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons
                  name={
                    currency.percentageChange > 0 ? "caret-up" : "caret-down"
                  }
                  size={16}
                  color={currency.percentageChange > 0 ? "green" : "red"}
                />
                <Text
                  style={{
                    color: currency.percentageChange > 0 ? "green" : "red",
                  }}
                >
                  {currency.percentageChange.toFixed(2)} %
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
export default CryptoScreen;
const styles = StyleSheet.create({});
