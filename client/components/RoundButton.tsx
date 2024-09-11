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
      <Ionicons name={icon as any} size={40} color={Colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};
export default RoundButton;
const styles = StyleSheet.create({
  text: { color: Colors.dark, fontSize: 16, fontWeight: "500" },
});
