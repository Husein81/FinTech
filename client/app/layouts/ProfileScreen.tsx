import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { defaultStyles } from "../theme/Styles";
import { useDispatch } from "react-redux";
import { logoutActionUser } from "../redux/slice/authSlice";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutActionUser());
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Pressable style={styles.button} onPress={logoutHandler}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 15,
    margin: 16,
    color: "white",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
  },
});
