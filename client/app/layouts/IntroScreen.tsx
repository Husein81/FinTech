import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Colors } from "../theme/Colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { defaultStyles } from "../theme/Styles";

const IntroScreen = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  const navigation = useNavigation();
  const navigateTo = (screen: string) => {
    navigation.navigate(screen as never);
  };
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping={true}
          shouldPlay={true}
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Ready to change the way you money?
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          style={[{ flex: 1 }, defaultStyles.pillButton]}
          textColor="white"
          onPress={() => navigateTo("Login")}
        >
          <Text style={styles.text}>Sign in</Text>
        </Button>
        <Button
          mode="contained"
          buttonColor="white"
          style={[defaultStyles.pillButton, { flex: 1 }]}
          textColor="black"
          onPress={() => navigateTo("Register")}
        >
          <Text style={styles.text}>Sign up</Text>
        </Button>
      </View>
    </View>
  );
};
export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    marginTop: 50,
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  buttonsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    gap: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
  },
  button: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
