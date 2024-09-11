import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../theme/Colors";
import { defaultStyles } from "../theme/Styles";
import { useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { authRepository } from "../api/repositories/auth";
import { User } from "../models/User";

const RegisterScreen = () => {
  const [countryCode, setCountryCode] = useState("+961");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const navigateTo = (screen: string, user?: User) => {
    navigation.navigate(screen, user);
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 100;
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
      const response = await authRepository.register({
        phoneNumber: fullNumber,
        password,
      });
      console.log(response);
      navigateTo("Verify", response);
    } catch (error) {}
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.root}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
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
              style={[styles.input, { flex: 1 }]}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor={Colors.gray}
              value={phoneNumber}
              onChangeText={onPhoneNumChange}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={password}
              onChangeText={onPasswordChange}
              placeholderTextColor={Colors.gray}
            />
            <Pressable
              onPress={onShowPassword}
              style={{ position: "absolute", right: 35, top: 20 }}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={30}
                color={Colors.gray}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigateTo("Login")}>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.root} />

        <View>
          <Button
            contentStyle={[{ marginVertical: 8 }]}
            mode="contained"
            disabled={phoneNumber.length < 8}
            buttonColor="black"
            textColor="white"
            onPress={onSubmit}
          >
            <Text style={styles.text}>Sign up</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  form: {
    marginVertical: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
  },
  input: {
    borderRadius: 16,
    padding: 18,
    backgroundColor: Colors.lightGray,
    fontSize: 20,
    marginRight: 10,
  },
});
