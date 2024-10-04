import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Colors } from "@/app/theme/Colors";

interface RoundButtonProps {
  onPress: () => void;
  text: string;
  icon: string;
}
const RoundButton: FC<RoundButtonProps> = ({ icon, text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon as any} size={25} color={Colors.dark} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};
export default RoundButton;
const styles = StyleSheet.create({
  text: { color: Colors.dark, fontSize: 16, fontWeight: "500" },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
