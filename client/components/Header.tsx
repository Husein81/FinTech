import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Colors } from "@/app/theme/Colors";
import { logoutActionUser } from "@/app/redux/slice/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate("Profile" as never);
  };
  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.userIcon}
            onPress={() => navigateToProfile()}
          >
            {user && (
              <Text style={styles.userText}>
                {user?.firstname?.charAt(0)?.toUpperCase() +
                  "" +
                  user?.lastname?.charAt(0)?.toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={20}
              color={Colors.dark}
            />
            <TextInput
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor={Colors.dark}
            />
          </View>
          <View style={styles.circle}>
            <Ionicons name="stats-chart" size={20} color={Colors.dark} />
          </View>
          <View style={styles.circle}>
            <Ionicons name="card" size={20} color={Colors.dark} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BlurView>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 30,
  },
});
