import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { defaultStyles } from "../theme/Styles";
import { Colors } from "../theme/Colors";
import { Button } from "react-native-paper";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { authRepository } from "../api/repositories/auth";
import { useDispatch } from "react-redux";
import { loginActionUser } from "../redux/slice/authSlice";
import { useNavigation } from "@react-navigation/native";

enum SubmitType {
  PHONE,
  GOOGLE,
}
const LoginScreen = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const [countryCode, setCountryCode] = useState("+961");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onCountryCodeChange = (text: string) => {
    setCountryCode(text);
  };
  const onPhoneNumChange = (text: string) => {
    setPhoneNumber(text);
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
  };
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async () => {
    const fullNumber = countryCode + phoneNumber;
    try {
      const user = await authRepository.login({
        phoneNumber: fullNumber,
        password,
      });

      dispatch(loginActionUser(user));
    } catch (error) {}
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.root}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcom Back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.form}>
          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Contry Code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
              onChangeText={onCountryCodeChange}
            />
            <TextInput
              style={[styles.root, styles.input]}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor={Colors.gray}
              value={phoneNumber}
              onChangeText={onPhoneNumChange}
            />
          </View>
          <View>
            <TextInput
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={onPasswordChange}
            />
            <Pressable
              onPress={onShowPassword}
              style={{ position: "absolute", right: 35, top: 20 }}
            >
              {showPassword ? (
                <Ionicons name="eye" size={24} color={Colors.gray} />
              ) : (
                <Ionicons name="eye-off" size={24} color={Colors.gray} />
              )}
            </Pressable>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            disabled={phoneNumber.length < 8}
            buttonColor="black"
            textColor="white"
            mode="contained"
            contentStyle={[defaultStyles.pillButton]}
            onPress={onSubmit}
          >
            <Text style={styles.text}>Continue</Text>
          </Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={styles.line} />
          <Text style={[styles.text, { color: Colors.gray }]}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            buttonColor="white"
            textColor="black"
            mode="contained"
            contentStyle={[defaultStyles.pillButton]}
            onPress={() => {}}
          >
            <View>
              <Ionicons name="mail" size={24} color={"black"} />
            </View>
            <View>
              <Text style={[styles.text]}>Continue with email</Text>
            </View>
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            buttonColor="white"
            textColor="black"
            mode="contained"
            contentStyle={[defaultStyles.pillButton, { gap: 10 }]}
            onPress={() => {}}
          >
            <View>
              <Ionicons name="logo-google" size={24} color={"black"} />
            </View>
            <View>
              <Text style={[styles.text]}>Continue with Google</Text>
            </View>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  form: {
    marginVertical: 40,
  },
  input: {
    borderRadius: 16,
    padding: 18,
    backgroundColor: Colors.lightGray,
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
});
