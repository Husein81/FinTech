import { Transaction } from "@/app/redux/slice/balanceSlice";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/theme/Colors";
import { defaultStyles } from "@/app/theme/Styles";
interface Props {
  transactions: Transaction[];
}
const Transactions: FC<Props> = ({ transactions }) => {
  return (
    <View style={styles.transaction}>
      {transactions.length === 0 ? (
        <Text style={{ padding: 14, color: Colors.dark }}>
          No Transactions yet
        </Text>
      ) : (
        transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionRow}>
            <View>
              <Ionicons
                name={transaction.amount > 0 ? "add-circle" : "remove-circle"}
                size={20}
                color={Colors.primary}
              />
            </View>

            <View style={defaultStyles.root}>
              <Text>{transaction.title}</Text>
              <Text>{transaction.date.toLocaleString()}</Text>
            </View>
            <Text>{transaction.amount} $</Text>
          </View>
        ))
      )}
    </View>
  );
};
export default Transactions;
const styles = StyleSheet.create({
  transaction: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});
