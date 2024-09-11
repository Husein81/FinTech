import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { defaultStyles } from "../theme/Styles";
import { Button } from "react-native-paper";
import { Colors } from "../theme/Colors";
import { useEffect, useState } from "react";
import { authRepository } from "../api/repositories/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserAction } from "../redux/slice/authSlice";
import { User } from "../models/User";
import { userRepository } from "../api/repositories/user";

type VerifyScreenProps = {
  user: User;
};

const VerifyScreen = () => {
  const [code, setCode] = useState("");
  const route = useRoute();
  const dispatch = useDispatch();
  const user = route.params as User;

  const onCodeChange = (text: string) => {
    setCode(text);
  };
  const onSubmit = async () => {
    try {
      const repo = await authRepository.verify(user.user.phoneNumber, code);
      const userData = await userRepository.getUser(user.user?._id);
      console.log("userData", userData);
      dispatch(setUserAction(userData));
    } catch (error) {}
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.root}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Verify your account</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the code sent to your phone number
        </Text>
        <View style={styles.form}>
          <TextInput
            value={code}
            onChangeText={onCodeChange}
            style={styles.input}
          />
        </View>
        <View>
          <Button
            contentStyle={{ marginVertical: 8 }}
            mode="contained"
            buttonColor="black"
            textColor="white"
            onPress={onSubmit}
          >
            <Text style={styles.text}>Verfiy</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default VerifyScreen;
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
    fontWeight: "900",
  },
});
