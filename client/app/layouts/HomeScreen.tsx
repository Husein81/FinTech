import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme/Colors";
import {
  clearTransactions,
  runTransaction,
  selectBalance,
} from "../redux/slice/balanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { defaultStyles } from "../theme/Styles";
import RoundButton from "@/components/RoundButton";
import { RootState } from "../redux/store";
import Transactions from "@/components/Home/Transactions";
import Widgets from "@/components/Home/Widgets";
const HomeScreen = () => {
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions
  );
  const onAddMoney = () => {
    dispatch(
      runTransaction({
        id: Math.random().toString(),
        amount:
          Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
        date: new Date(),
        title: "Added money",
      })
    );
  };
  const onClear = () => {
    dispatch(clearTransactions());
  };
  return (
    <ScrollView style={styles.root}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}
        >
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>
            Accounts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon="add-circle" text="Top Up" onPress={onAddMoney} />
        <RoundButton icon="refresh-circle" text="Transfer" onPress={onClear} />
        <RoundButton icon={"list-circle"} text="Details" onPress={() => {}} />
        {/* <Dropdown */}
      </View>
      <Text style={[defaultStyles.sectionHeader]}>Transactions</Text>
      <Transactions transactions={transactions} />
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <Widgets />
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
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
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
